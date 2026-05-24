// ═══════════════════════════════════════════════════════════════
// routes/posts.js — GET /api/posts · DELETE /api/posts/:slug
//
// Agora usa db.js (Supabase + fallback local JSON).
// O arquivo JSON em src/data/posts/ ainda é mantido para o site
// estático; a exclusão também remove o arquivo JSON.
// ═══════════════════════════════════════════════════════════════

const express      = require('express');
const path         = require('path');
const fs           = require('fs');
const { execSync } = require('child_process');
const { listPosts, deletePost } = require('../lib/db');

module.exports = function postsRouter(POSTS_JSON, PROJECT, loadConfig) {
  const router = express.Router();

  // ── GET /api/posts ─────────────────────────────────────────
  // Retorna todos os posts (Supabase + fallback local).
  router.get('/', async (req, res) => {
    try {
      const posts = await listPosts(loadConfig);
      res.json(posts);
    } catch (err) {
      console.error('[posts] listPosts error:', err.message);
      // Fallback de emergência: lê JSON do disco
      try {
        const files = fs.readdirSync(POSTS_JSON).filter(f => f.endsWith('.json'));
        const local = files
          .map(f => {
            try { return JSON.parse(fs.readFileSync(path.join(POSTS_JSON, f), 'utf8')); }
            catch { return null; }
          })
          .filter(Boolean)
          .sort((a, b) => new Date(b.date) - new Date(a.date));
        res.json(local);
      } catch {
        res.status(500).json({ error: 'Erro ao listar posts.' });
      }
    }
  });

  // ── DELETE /api/posts/:slug ────────────────────────────────
  // Remove do Supabase, do fallback local E do arquivo JSON estático.
  router.delete('/:slug', async (req, res) => {
    const { slug } = req.params;

    // 1. Remove do DB (Supabase + fallback local)
    try {
      await deletePost(slug, loadConfig);
    } catch (err) {
      console.warn('[posts] deletePost DB error:', err.message);
    }

    // 2. Remove arquivo JSON estático (para o site)
    const filePath = path.join(POSTS_JSON, `${slug}.json`);
    if (fs.existsSync(filePath)) {
      try { fs.unlinkSync(filePath); } catch { /* ignora */ }
    }

    // 3. Git commit + push
    try {
      execSync(`git add src/data/posts/${slug}.json`, { cwd: PROJECT, stdio: 'pipe' });
      execSync(`git commit -m "remove post: ${slug}"`,  { cwd: PROJECT, stdio: 'pipe' });
      execSync('git push origin main',                   { cwd: PROJECT, stdio: 'pipe' });
    } catch { /* git pode falhar localmente sem internet */ }

    res.json({ success: true });
  });

  return router;
};
