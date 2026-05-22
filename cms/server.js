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
  fileFilter: (req, file, cb) => {
    if (/image\/(jpeg|png|webp|gif)/.test(file.mimetype)) cb(null, true);
    else cb(new Error('Somente imagens são permitidas.'));
  },
});

app.use(express.json({ limit: '2mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Serve assets do projeto (logo, etc.)
app.use('/project-assets', express.static(path.join(PROJECT, 'public')));

// ─── UPLOAD ──────────────────────────────────────────────────────────────────
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Nenhum arquivo recebido.' });
  res.json({ path: `/posts/${req.file.filename}` });
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
