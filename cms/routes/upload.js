// ═══════════════════════════════════════════════════════════════
// routes/upload.js — POST /api/upload
// Para mudar o limite de tamanho ou filtrar tipos: edite aqui
// ═══════════════════════════════════════════════════════════════

const express = require('express');
const multer  = require('multer');
const path    = require('path');

module.exports = function uploadRouter(POSTS_IMG) {
  const router  = express.Router();

  const storage = multer.diskStorage({
    destination: POSTS_IMG,
    filename: (_req, file, cb) => {
      const ext  = path.extname(file.originalname).toLowerCase();
      const name = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}${ext}`;
      cb(null, name);
    },
  });

  const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  });

  router.post('/', (req, res) => {
    upload.single('image')(req, res, (err) => {
      if (err)       return res.status(400).json({ error: err.message });
      if (!req.file) return res.status(400).json({ error: 'Nenhum arquivo recebido.' });
      res.json({ path: `/posts/${req.file.filename}` });
    });
  });

  return router;
};
