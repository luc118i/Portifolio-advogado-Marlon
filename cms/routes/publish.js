// ═══════════════════════════════════════════════════════════════
// routes/publish.js — POST /api/publish
// Salva o JSON do post e faz git add + commit + push
// ═══════════════════════════════════════════════════════════════

const express      = require('express');
const path         = require('path');
const fs           = require('fs');
const { execSync } = require('child_process');

const SITE_URL = 'https://advogado-marlon.vercel.app';

module.exports = function publishRouter(POSTS_JSON, PROJECT) {
  const router = express.Router();

  router.post('/', (req, res) => {
    const post = req.body;

    if (!post.slug || !post.title)
      return res.status(400).json({ error: 'Título e slug são obrigatórios.' });

    const filePath = path.join(POSTS_JSON, `${post.slug}.json`);
    fs.writeFileSync(filePath, JSON.stringify(post, null, 2), 'utf8');

    try {
      execSync('git add src/data/posts public/posts', { cwd: PROJECT, stdio: 'pipe' });
      execSync(`git commit -m "post: ${post.title}"`,  { cwd: PROJECT, stdio: 'pipe' });
      execSync('git push origin main',                  { cwd: PROJECT, stdio: 'pipe' });
      res.json({ success: true, url: `${SITE_URL}/posts/${post.slug}` });
    } catch (err) {
      res.status(500).json({ error: err.message || 'Erro no git push.' });
    }
  });

  return router;
};
