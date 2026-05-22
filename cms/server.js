// ═══════════════════════════════════════════════════════════════
// server.js — Ponto de entrada do servidor CMS
// Só setup, caminhos e montagem das rotas.
// Lógica de cada rota fica em /routes/
// ═══════════════════════════════════════════════════════════════

const express      = require('express');
const path         = require('path');
const fs           = require('fs');
const { execSync } = require('child_process');

const app         = express();
const PORT        = Number(process.env.PORT) || 4000;
const MAX_PORT    = PORT + 10;
const PROJECT     = path.resolve(__dirname, '..');
const POSTS_JSON  = path.join(PROJECT, 'src', 'data', 'posts');
const POSTS_IMG   = path.join(PROJECT, 'public', 'posts');
const CONFIG_FILE = path.join(__dirname, 'config.json');

// ─── Config (chave Groq + pasta de exportação) ───────────────
function loadConfig() {
  try { return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8')); }
  catch { return {}; }
}
function saveConfig(data) {
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// ─── Garante diretórios ──────────────────────────────────────
fs.mkdirSync(POSTS_JSON, { recursive: true });
fs.mkdirSync(POSTS_IMG,  { recursive: true });

// ─── Middleware ───────────────────────────────────────────────
app.use(express.json({ limit: '50mb' })); // aumentado para imagens base64
app.use(express.static(path.join(__dirname, 'public')));
app.use('/project-assets', express.static(path.join(PROJECT, 'public')));
app.use('/posts',          express.static(POSTS_IMG));

// html2canvas servido localmente (sem depender de CDN)
app.use('/vendor/html2canvas',
  express.static(path.join(__dirname, 'node_modules', 'html2canvas', 'dist'))
);

// ─── Rotas ────────────────────────────────────────────────────
app.use('/api/upload',  require('./routes/upload') (POSTS_IMG));
app.use('/api/posts',   require('./routes/posts')  (POSTS_JSON, PROJECT));
app.use('/api/publish', require('./routes/publish')(POSTS_JSON, PROJECT));
app.use('/api/config',  require('./routes/config') (loadConfig, saveConfig));
app.use('/api/ai',      require('./routes/ai')     (loadConfig));
app.use('/api/export',  require('./routes/export') (loadConfig));

// ─── Start ────────────────────────────────────────────────────
function startServer(port) {
  const server = app.listen(port, () => {
    const url = `http://localhost:${port}`;
    console.log(`\n  CMS rodando em ${url}\n`);
    if (port !== PORT) {
      console.log(`  Porta ${PORT} ocupada. Usando porta ${port}.\n`);
    }
    try { execSync(`start ${url}`); } catch {}
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE' && port < MAX_PORT) {
      console.log(`  Porta ${port} em uso. Tentando ${port + 1}...`);
      startServer(port + 1);
      return;
    }

    if (err.code === 'EADDRINUSE') {
      console.error(`\n  Nao foi possivel iniciar: portas ${PORT}-${MAX_PORT} estao ocupadas.\n`);
      return;
    }

    console.error('\n  Erro ao iniciar o CMS:', err.message, '\n');
  });
}

startServer(PORT);
