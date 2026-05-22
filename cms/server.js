const express = require('express');
const multer  = require('multer');
const path    = require('path');
const fs      = require('fs');
const { execSync } = require('child_process');

const app        = express();
const PORT       = 4000;
const PROJECT    = path.resolve(__dirname, '..');
const POSTS_JSON = path.join(PROJECT, 'src', 'data', 'posts');
const POSTS_IMG  = path.join(PROJECT, 'public', 'posts');
const CONFIG_FILE= path.join(__dirname, 'config.json');

// ─── CONFIG ──────────────────────────────────────────────────────────────────
function loadConfig() {
  try { return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8')); }
  catch { return {}; }
}
function saveConfig(data) {
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// Garante que as pastas existem
fs.mkdirSync(POSTS_JSON, { recursive: true });
fs.mkdirSync(POSTS_IMG,  { recursive: true });

// Upload de imagens → public/posts/
const storage = multer.diskStorage({
  destination: POSTS_IMG,
  filename: (req, file, cb) => {
    const ext  = path.extname(file.originalname).toLowerCase();
    const name = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}${ext}`;
    cb(null, name);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
});

app.use(express.json({ limit: '2mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Serve assets do projeto (logo, etc.)
app.use('/project-assets', express.static(path.join(PROJECT, 'public')));

// ─── UPLOAD ──────────────────────────────────────────────────────────────────
app.post('/api/upload', (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      console.error('Multer error:', err.message);
      return res.status(400).json({ error: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhum arquivo recebido.' });
    }
    res.json({ path: `/posts/${req.file.filename}` });
  });
});

// ─── LISTAR POSTS ────────────────────────────────────────────────────────────
app.get('/api/posts', (req, res) => {
  const files = fs.readdirSync(POSTS_JSON).filter(f => f.endsWith('.json'));
  const posts = files.map(f => {
    try { return JSON.parse(fs.readFileSync(path.join(POSTS_JSON, f), 'utf8')); }
    catch { return null; }
  }).filter(Boolean).sort((a, b) => new Date(b.date) - new Date(a.date));
  res.json(posts);
});

// ─── PUBLICAR ────────────────────────────────────────────────────────────────
app.post('/api/publish', (req, res) => {
  const post = req.body;

  if (!post.slug || !post.title) {
    return res.status(400).json({ error: 'Título e slug são obrigatórios.' });
  }

  const filePath = path.join(POSTS_JSON, `${post.slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(post, null, 2), 'utf8');

  try {
    execSync('git add src/data/posts public/posts', { cwd: PROJECT, stdio: 'pipe' });
    execSync(`git commit -m "post: ${post.title}"`,  { cwd: PROJECT, stdio: 'pipe' });
    execSync('git push origin main',                  { cwd: PROJECT, stdio: 'pipe' });

    const url = `https://advogado-marlon.vercel.app/posts/${post.slug}`;
    res.json({ success: true, url });
  } catch (err) {
    // Salvar o arquivo mesmo se o git falhar
    res.status(500).json({ error: err.message || 'Erro no git push.' });
  }
});

// ─── CONFIG API ──────────────────────────────────────────────────────────────
app.get('/api/config/status', (req, res) => {
  const cfg = loadConfig();
  res.json({ configured: !!cfg.groq_api_key });
});

app.post('/api/config', (req, res) => {
  const { groq_api_key } = req.body;
  if (!groq_api_key || !groq_api_key.startsWith('gsk_')) {
    return res.status(400).json({ error: 'Chave inválida. Deve começar com gsk_' });
  }
  const cfg = loadConfig();
  cfg.groq_api_key = groq_api_key;
  saveConfig(cfg);
  res.json({ success: true });
});

// ─── IA — GERAR TEXTO ─────────────────────────────────────────────────────────
app.post('/api/ai/generate', async (req, res) => {
  const cfg = loadConfig();
  if (!cfg.groq_api_key) return res.status(401).json({ error: 'Configure a chave da Groq primeiro.' });

  const { mode, category, headline, topic } = req.body;

  const prompts = {
    headline: `Você é um especialista em marketing jurídico brasileiro.
Crie UM headline curto e impactante (máximo 10 palavras) para um slide de carrossel na área de ${category}.
Assunto: "${topic || category}".
O headline deve despertar curiosidade ou urgência no leitor leigo.
Retorne APENAS o headline, sem aspas, sem explicações.`,

    body: `Você é um especialista em marketing jurídico brasileiro.
Escreva o texto de corpo para um slide jurídico. Máximo 2 frases curtas e diretas.
Área: ${category}.
Headline do slide: "${headline || topic}".
Público: pessoas comuns sem conhecimento jurídico.
Linguagem: simples, direta, levemente urgente.
Retorne APENAS as 2 frases, sem explicações.`,

    idea: `Você é um especialista em conteúdo jurídico digital brasileiro.
Sugira 3 ideias criativas de post (carrossel) para um advogado na área de ${category}.
Cada ideia deve ter: título gancho + 1 linha de descrição.
Formato:
1. [Título] — [descrição]
2. [Título] — [descrição]
3. [Título] — [descrição]
Retorne APENAS as 3 ideias.`,
  };

  const prompt = prompts[mode];
  if (!prompt) return res.status(400).json({ error: 'Modo inválido.' });

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cfg.groq_api_key}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 300,
        temperature: 0.85,
      }),
    });
    const data = await response.json();
    if (data.error) return res.status(500).json({ error: data.error.message });
    res.json({ text: data.choices[0].message.content.trim() });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao chamar a Groq: ' + err.message });
  }
});

// ─── IA — HUMANIZAR ──────────────────────────────────────────────────────────
app.post('/api/ai/humanize', async (req, res) => {
  const cfg = loadConfig();
  if (!cfg.groq_api_key) return res.status(401).json({ error: 'Configure a chave da Groq primeiro.' });

  const { text } = req.body;
  if (!text?.trim()) return res.status(400).json({ error: 'Texto vazio.' });

  const prompt = `Você é um editor especializado em tornar textos mais humanos e naturais.
Reescreva o texto abaixo removendo padrões típicos de IA:

REGRAS:
- Proibido usar: "fundamental", "crucial", "essencial", "primordial", "robusto", "eficaz", "garantir", "ressaltar", "destacar", "é importante salientar", "no contexto atual", "vale mencionar", "cabe destacar", "é válido", "em suma", "portanto,", "nesse sentido"
- Evite estruturas simétricas demais (listas paralelas, frases do mesmo tamanho)
- Escreva como um advogado experiente falando diretamente com seu cliente
- Linguagem direta, sem rodeios, sem firula corporativa
- Mantenha o mesmo tamanho aproximado e o mesmo significado
- Sem formalidade excessiva — próximo, humano, confiante

TEXTO:
${text}

Retorne APENAS o texto reescrito, sem explicações, sem aspas.`;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cfg.groq_api_key}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 500,
        temperature: 0.75,
      }),
    });
    const data = await response.json();
    if (data.error) return res.status(500).json({ error: data.error.message });
    res.json({ text: data.choices[0].message.content.trim() });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao chamar a Groq: ' + err.message });
  }
});

// ─── EXCLUIR POST ─────────────────────────────────────────────────────────────
app.delete('/api/posts/:slug', (req, res) => {
  const filePath = path.join(POSTS_JSON, `${req.params.slug}.json`);
  if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'Post não encontrado.' });
  fs.unlinkSync(filePath);
  try {
    execSync(`git add src/data/posts/${req.params.slug}.json`, { cwd: PROJECT, stdio: 'pipe' });
    execSync(`git commit -m "remove post: ${req.params.slug}"`, { cwd: PROJECT, stdio: 'pipe' });
    execSync('git push origin main', { cwd: PROJECT, stdio: 'pipe' });
  } catch {}
  res.json({ success: true });
});

// ─── START ───────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n  CMS rodando em http://localhost:${PORT}\n`);
  try { execSync(`start http://localhost:${PORT}`); } catch {}
});
