// ═══════════════════════════════════════════════════════════════
// routes/posts.js — GET /api/posts · DELETE /api/posts/:slug
// ═══════════════════════════════════════════════════════════════

const express      = require('express');
const path         = require('path');
const fs           = require('fs');
const { execSync } = require('child_process');

module.exports = function postsRouter(POSTS_JSON, PROJECT) {
  const router = express.Router();

  // Listar todos os posts
  router.get('/', (req, res) => {
    const files = fs.readdirSync(POSTS_JSON).filter(f => f.endsWith('.json'));
    const posts = files
      .map(f => {
        try { return JSON.parse(fs.readFileSync(path.join(POSTS_JSON, f), 'utf8')); }
        catch { return null; }
      })
      .filter(Boolean)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    res.json(posts);
  });

  // Excluir post
  router.delete('/:slug', (req, res) => {
    const filePath = path.join(POSTS_JSON, `${req.params.slug}.json`);
    if (!fs.existsSync(filePath))
      return res.status(404).json({ error: 'Post não encontrado.' });

    fs.unlinkSync(filePath);
    try {
      execSync(`git add src/data/posts/${req.params.slug}.json`, { cwd: PROJECT, stdio: 'pipe' });
      execSync(`git commit -m "remove post: ${req.params.slug}"`,  { cwd: PROJECT, stdio: 'pipe' });
      execSync('git push origin main',                              { cwd: PROJECT, stdio: 'pipe' });
    } catch { /* git pode falhar localmente sem internet */ }

    res.json({ success: true });
  });

  return router;
};
