// ═══════════════════════════════════════════════════════════════
// routes/instagram.js — Proxy para a Meta Graph API
//
//  GET  /api/instagram/status          → estado do token
//  GET  /api/instagram/posts           → mídias recentes do perfil
//  POST /api/instagram/refresh-token   → renova o long-lived token
// ═══════════════════════════════════════════════════════════════

const express = require('express');
const https   = require('https');

const GRAPH = 'graph.facebook.com';
const VER   = 'v19.0';

// ── Helpers ─────────────────────────────────────────────────────

function graphGet(path) {
  return new Promise((resolve, reject) => {
    const url = `https://${GRAPH}/${VER}${path}`;
    https.get(url, (res) => {
      let body = '';
      res.on('data', chunk => { body += chunk; });
      res.on('end', () => {
        try { resolve(JSON.parse(body)); }
        catch { reject(new Error('Resposta inválida da Graph API')); }
      });
    }).on('error', reject);
  });
}

function graphPost(path, payload) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(payload);
    const opts = {
      hostname: GRAPH,
      path:     `/${VER}${path}`,
      method:   'POST',
      headers:  {
        'Content-Type':   'application/json',
        'Content-Length': Buffer.byteLength(data),
      },
    };
    const req = https.request(opts, (res) => {
      let body = '';
      res.on('data', chunk => { body += chunk; });
      res.on('end', () => {
        try { resolve(JSON.parse(body)); }
        catch { reject(new Error('Resposta inválida da Graph API')); }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// ── Router factory ───────────────────────────────────────────────

module.exports = function instagramRouter(loadConfig, saveConfig) {
  const router = express.Router();

  // ── GET /api/instagram/status ────────────────────────────────
  // Verifica se o token está configurado e ainda é válido.
  router.get('/status', async (req, res) => {
    const cfg = loadConfig();
    const token = cfg.meta_access_token;

    if (!token) {
      return res.json({ configured: false, valid: false, reason: 'Token não configurado.' });
    }

    try {
      // debug_token endpoint usa o próprio token para verificar
      const data = await graphGet(
        `/debug_token?input_token=${token}&access_token=${token}`
      );

      if (data.error) {
        return res.json({ configured: true, valid: false, reason: data.error.message });
      }

      const info = data.data || {};
      const expiresAt = info.expires_at
        ? new Date(info.expires_at * 1000).toISOString()
        : null;

      res.json({
        configured: true,
        valid:      info.is_valid !== false,
        app_id:     info.app_id,
        expires_at: expiresAt,
        scopes:     info.scopes || [],
      });
    } catch (err) {
      res.json({ configured: true, valid: false, reason: err.message });
    }
  });

  // ── GET /api/instagram/posts ─────────────────────────────────
  // Retorna as mídias mais recentes do perfil Instagram do cliente.
  // Requer: meta_access_token + meta_ig_user_id no config.
  router.get('/posts', async (req, res) => {
    const cfg   = loadConfig();
    const token = cfg.meta_access_token;
    const igId  = cfg.meta_ig_user_id;

    if (!token || !igId) {
      return res.status(400).json({
        error: 'Token ou ID do usuário Instagram não configurados.',
        configured: false,
      });
    }

    const limit  = Math.min(Number(req.query.limit) || 20, 50);
    const fields = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp';

    try {
      const data = await graphGet(
        `/${igId}/media?fields=${fields}&limit=${limit}&access_token=${token}`
      );

      if (data.error) {
        return res.status(400).json({ error: data.error.message });
      }

      const items = (data.data || []).map(m => ({
        id:           m.id,
        caption:      m.caption    || '',
        media_type:   m.media_type,           // IMAGE | VIDEO | CAROUSEL_ALBUM
        media_url:    m.media_url  || m.thumbnail_url || null,
        permalink:    m.permalink,
        timestamp:    m.timestamp,
        _source:      'instagram',
      }));

      res.json({ items, paging: data.paging || null });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // ── POST /api/instagram/refresh-token ────────────────────────
  // Renova o long-lived token (válido por 60 dias).
  // Requer: meta_access_token + meta_app_id + meta_app_secret no config.
  router.post('/refresh-token', async (req, res) => {
    const cfg    = loadConfig();
    const token  = cfg.meta_access_token;
    const appId  = cfg.meta_app_id;
    const secret = cfg.meta_app_secret;

    if (!token) {
      return res.status(400).json({ error: 'Token não configurado.' });
    }

    // Long-lived tokens são renovados via GET (não precisa de app_id/secret)
    try {
      let url;
      if (appId && secret) {
        // Short-lived → long-lived (primeira vez)
        url = `/oauth/access_token?grant_type=fb_exchange_token` +
              `&client_id=${appId}&client_secret=${secret}` +
              `&fb_exchange_token=${token}`;
      } else {
        // Renova long-lived existente (sem segredo, só o token + user_token)
        url = `/oauth/access_token?grant_type=fb_exchange_token` +
              `&fb_exchange_token=${token}` +
              `&access_token=${token}`;
      }

      const data = await graphGet(url);

      if (data.error) {
        return res.status(400).json({ error: data.error.message });
      }

      const newToken    = data.access_token;
      const expiresIn   = data.expires_in;          // segundos
      const expiresDate = new Date(Date.now() + expiresIn * 1000).toISOString();

      // Persiste o novo token
      const updated = loadConfig();
      updated.meta_access_token          = newToken;
      updated.meta_token_expires_at      = expiresDate;
      updated.meta_token_refreshed_at    = new Date().toISOString();
      saveConfig(updated);

      res.json({
        success:    true,
        expires_at: expiresDate,
        expires_in: expiresIn,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};
