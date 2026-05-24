// ═══════════════════════════════════════════════════════════════
// routes/config.js
//
//  GET  /api/config/status        → { configured: bool }
//  GET  /api/config/integrations  → estado de Neon + Instagram
//  GET  /api/config               → config pública (sem segredos)
//  POST /api/config               → salva chaves (Groq, Neon, Meta)
//  POST /api/config/open-folder   → abre pasta no Explorer
// ═══════════════════════════════════════════════════════════════

const express      = require('express');
const fs           = require('fs');
const { execSync } = require('child_process');

module.exports = function configRouter(loadConfig, saveConfig) {
  const router = express.Router();

  // ── GET /api/config/status ────────────────────────────────
  router.get('/status', (req, res) => {
    const cfg = loadConfig();
    res.json({ configured: !!cfg.groq_api_key });
  });

  // ── GET /api/config/integrations ──────────────────────────
  router.get('/integrations', (req, res) => {
    const cfg = loadConfig();

    const db = {
      configured: !!cfg.database_url,
      host: cfg.database_url
        ? cfg.database_url.replace(/^.*@/, '').split('/')[0]   // ex: ep-xxx.neon.tech
        : null,
    };

    const instagram = {
      configured:   !!(cfg.meta_access_token && cfg.meta_ig_user_id),
      ig_user_id:   cfg.meta_ig_user_id       || null,
      expires_at:   cfg.meta_token_expires_at  || null,
      refreshed_at: cfg.meta_token_refreshed_at || null,
    };

    res.json({ db, instagram });
  });

  // ── GET /api/config ───────────────────────────────────────
  router.get('/', (req, res) => {
    const cfg = loadConfig();
    res.json({
      output_folder:   cfg.output_folder || '',
      // Connection string mascarada — mostra apenas o host
      database_url:    cfg.database_url
        ? cfg.database_url.replace(/:[^@]*@/, ':***@')
        : '',
      meta_ig_user_id: cfg.meta_ig_user_id || '',
      meta_access_token: cfg.meta_access_token
        ? cfg.meta_access_token.slice(0, 12) + '…'
        : '',
      meta_token_expires_at: cfg.meta_token_expires_at || null,
    });
  });

  // ── POST /api/config/test-db ──────────────────────────────
  // Testa a connection string (a salva temporariamente para o teste).
  router.post('/test-db', async (req, res) => {
    const { database_url } = req.body;
    const url = database_url || loadConfig().database_url;

    if (!url) return res.status(400).json({ ok: false, error: 'Connection string não fornecida.' });

    const { getPool } = require('../lib/pg-client');
    const pool = getPool(url);
    try {
      const start = Date.now();
      await pool.query('SELECT 1');
      const ms = Date.now() - start;
      res.json({ ok: true, latency_ms: ms });
    } catch (err) {
      res.json({ ok: false, error: err.message });
    }
  });

  // ── POST /api/config/open-folder ─────────────────────────
  router.post('/open-folder', (req, res) => {
    const { folder } = req.body;
    if (!folder) return res.status(400).json({ error: 'Pasta não informada.' });
    try {
      fs.mkdirSync(folder, { recursive: true });
      execSync(`explorer "${folder}"`, { stdio: 'ignore' });
    } catch { /* ignora erro do explorer */ }
    res.json({ success: true });
  });

  // ── POST /api/config ──────────────────────────────────────
  router.post('/', (req, res) => {
    const path = require('path');
    const {
      groq_api_key,
      output_folder,
      database_url,
      meta_access_token,
      meta_ig_user_id,
      meta_app_id,
      meta_app_secret,
    } = req.body;

    // Validações
    if (groq_api_key && !groq_api_key.startsWith('gsk_'))
      return res.status(400).json({ error: 'Chave Groq inválida. Deve começar com gsk_' });

    if (database_url && !database_url.startsWith('postgresql://') && !database_url.startsWith('postgres://'))
      return res.status(400).json({ error: 'Connection string inválida. Deve começar com postgresql://' });

    const cfg = loadConfig();

    if (groq_api_key)                    cfg.groq_api_key         = groq_api_key;
    if (database_url !== undefined)      cfg.database_url         = database_url;
    if (meta_access_token !== undefined) cfg.meta_access_token    = meta_access_token;
    if (meta_ig_user_id !== undefined)   cfg.meta_ig_user_id      = meta_ig_user_id;
    if (meta_app_id !== undefined)       cfg.meta_app_id          = meta_app_id;
    if (meta_app_secret !== undefined)   cfg.meta_app_secret      = meta_app_secret;

    // Pasta de exportação: normaliza e cria imediatamente
    if (output_folder !== undefined) {
      const folderTrimmed = (output_folder || '').trim();
      if (folderTrimmed) {
        const normalizedFolder = path.resolve(folderTrimmed);
        try {
          fs.mkdirSync(normalizedFolder, { recursive: true });
          cfg.output_folder = normalizedFolder; // salva o caminho normalizado
        } catch (err) {
          return res.status(400).json({
            error: `Não foi possível criar a pasta "${normalizedFolder}": ${err.message}`,
          });
        }
      } else {
        cfg.output_folder = '';
      }
    }

    saveConfig(cfg);

    // Invalida pool pg se connection string mudou
    if (database_url !== undefined) {
      try { require('../lib/pg-client').resetPool(); } catch { /* ignora */ }
    }

    res.json({ success: true, output_folder: cfg.output_folder || null });
  });

  return router;
};
