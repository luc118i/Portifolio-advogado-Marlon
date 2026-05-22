// ═══════════════════════════════════════════════════════════════
// routes/config.js
//   GET  /api/config/status  → { configured: bool }
//   GET  /api/config         → { output_folder: "..." }
//   POST /api/config         → salva groq_api_key e/ou output_folder
// ═══════════════════════════════════════════════════════════════

const express      = require('express');
const fs           = require('fs');
const { execSync } = require('child_process');

module.exports = function configRouter(loadConfig, saveConfig) {
  const router = express.Router();

  // Status da IA (chave configurada?)
  router.get('/status', (req, res) => {
    const cfg = loadConfig();
    res.json({ configured: !!cfg.groq_api_key });
  });

  // Retorna config pública (sem expor a chave)
  router.get('/', (req, res) => {
    const cfg = loadConfig();
    res.json({ output_folder: cfg.output_folder || '' });
  });

  // Abre a pasta no Explorer (Windows)
  router.post('/open-folder', (req, res) => {
    const { folder } = req.body;
    if (!folder) return res.status(400).json({ error: 'Pasta não informada.' });
    try {
      fs.mkdirSync(folder, { recursive: true }); // cria se não existir
      execSync(`explorer "${folder}"`, { stdio: 'ignore' });
    } catch { /* ignora erro do explorer */ }
    res.json({ success: true });
  });

  // Salva configurações (chave e/ou pasta)
  router.post('/', (req, res) => {
    const { groq_api_key, output_folder } = req.body;

    // Valida chave somente se foi enviada
    if (groq_api_key && !groq_api_key.startsWith('gsk_'))
      return res.status(400).json({ error: 'Chave inválida. Deve começar com gsk_' });

    const cfg = loadConfig();
    if (groq_api_key)              cfg.groq_api_key  = groq_api_key;
    if (output_folder !== undefined) cfg.output_folder = output_folder;
    saveConfig(cfg);
    res.json({ success: true });
  });

  return router;
};
