// ═══════════════════════════════════════════════════════════════
// routes/publish.js — POST /api/publish
//
// Fluxo:
//   1. Valida campos obrigatórios
//   2. Salva no Supabase (ou fallback local JSON via db.js)
//   3. Escreve o JSON estático em src/data/posts/ (para o site)
//   4. Git add + commit + push (deploy automático na Vercel)
// ═══════════════════════════════════════════════════════════════

const express      = require('express');
const path         = require('path');
const fs           = require('fs');
const { execSync } = require('child_process');
const { savePost } = require('../lib/db');

const SITE_URL = 'https://advogado-marlon.vercel.app';

module.exports = function publishRouter(POSTS_JSON, PROJECT, loadConfig) {
  const router = express.Router();

  router.post('/', async (req, res) => {
    const post = req.body;

    if (!post.slug || !post.title)
      return res.status(400).json({ error: 'Título e slug são obrigatórios.' });

    // 1. Persiste no Supabase / fallback
    let dbSource = 'local';
    try {
      const result = await savePost(post, loadConfig);
      dbSource = result.source;
    } catch (err) {
      console.warn('[publish] savePost error:', err.message);
      // Não bloqueia o publish — o git push ainda acontece
    }

    // 2. Escreve JSON estático para o site Vercel
    const filePath = path.join(POSTS_JSON, `${post.slug}.json`);
    fs.writeFileSync(filePath, JSON.stringify(post, null, 2), 'utf8');

    // 3. Git add + commit + push
    try {
      execSync('git add src/data/posts public/posts', { cwd: PROJECT, stdio: 'pipe' });
      execSync(`git commit -m "post: ${post.title}"`,  { cwd: PROJECT, stdio: 'pipe' });
      execSync('git push origin main',                  { cwd: PROJECT, stdio: 'pipe' });
      res.json({
        success:   true,
        url:       `${SITE_URL}/posts/${post.slug}`,
        db_source: dbSource,
      });
    } catch (err) {
      res.status(500).json({ error: err.message || 'Erro no git push.' });
    }
  });

  return router;
};
