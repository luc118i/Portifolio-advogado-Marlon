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
const PORT        = 4000;
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
app.listen(PORT, () => {
  console.log(`\n  CMS rodando em http://localhost:${PORT}\n`);
  try { execSync(`start http://localhost:${PORT}`); } catch {}
});
