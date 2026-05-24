// ═══════════════════════════════════════════════════════════════
// lib/db.js — CRUD de posts com Neon/Postgres + fallback local JSON
//
// Fluxo:
//   1. Tenta Neon (se database_url configurada)
//   2. Falha → opera em cms/data/fallback-posts.json
//   3. Na listagem: mescla local + banco (sem duplicatas)
// ═══════════════════════════════════════════════════════════════

const fs   = require('fs');
const path = require('path');
const { getPool } = require('./pg-client');

const FALLBACK_FILE = path.join(__dirname, '..', 'data', 'fallback-posts.json');

// ── Fallback local helpers ──────────────────────────────────────
function readFallback() {
  try   { return JSON.parse(fs.readFileSync(FALLBACK_FILE, 'utf8')); }
  catch { return []; }
}

function writeFallback(posts) {
  fs.mkdirSync(path.dirname(FALLBACK_FILE), { recursive: true });
  fs.writeFileSync(FALLBACK_FILE, JSON.stringify(posts, null, 2), 'utf8');
}

function upsertFallback(post) {
  const posts = readFallback();
  const idx   = posts.findIndex(p => p.slug === post.slug);
  if (idx >= 0) posts[idx] = { ...posts[idx], ...post };
  else          posts.unshift(post);
  writeFallback(posts);
}

function removeFallback(slug) {
  writeFallback(readFallback().filter(p => p.slug !== slug));
}

// ── Row helper ──────────────────────────────────────────────────
function fromRow(row) {
  return {
    slug:         row.slug,
    title:        row.title,
    type:         row.type,
    category:     row.category,
    date:         row.date,
    readTime:     row.read_time,
    logoPosition: row.logo_position,
    slides:       row.slides,          // pg já parseia jsonb → objeto JS
    coverImage:   row.cover_image,
    excerpt:      row.excerpt,
    content:      row.content,
    ig_media_id:  row.ig_media_id  || null,
    ig_permalink: row.ig_permalink || null,
    created_at:   row.created_at,
    _source:      'neon',
  };
}

// ── Public API ──────────────────────────────────────────────────

/**
 * Salva ou atualiza um post.
 * @returns {{ source: 'neon'|'local' }}
 */
async function savePost(post, loadConfig) {
  const cfg  = loadConfig();
  const pool = getPool(cfg.database_url);

  if (pool) {
    try {
      await pool.query(`
        INSERT INTO posts
          (slug, title, type, category, date, read_time, logo_position,
           slides, cover_image, excerpt, content, updated_at)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11, NOW())
        ON CONFLICT (slug) DO UPDATE SET
          title         = EXCLUDED.title,
          type          = EXCLUDED.type,
          category      = EXCLUDED.category,
          date          = EXCLUDED.date,
          read_time     = EXCLUDED.read_time,
          logo_position = EXCLUDED.logo_position,
          slides        = EXCLUDED.slides,
          cover_image   = EXCLUDED.cover_image,
          excerpt       = EXCLUDED.excerpt,
          content       = EXCLUDED.content,
          updated_at    = NOW()
      `, [
        post.slug,
        post.title,
        post.type,
        post.category      || null,
        post.date          || null,
        post.readTime      || null,
        post.logoPosition  || null,
        post.slides        ? JSON.stringify(post.slides) : null,
        post.coverImage    || null,
        post.excerpt       || null,
        post.content       || null,
      ]);

      console.log('[db] ✓ Neon:', post.slug);
      removeFallback(post.slug);
      return { source: 'neon' };
    } catch (err) {
      console.warn('[db] Neon upsert error:', err.message);
    }
  }

  // Fallback
  upsertFallback({ ...post, _source: 'local', created_at: new Date().toISOString() });
  console.log('[db] ✓ Fallback local:', post.slug);
  return { source: 'local' };
}

/**
 * Lista todos os posts (Neon + posts locais ainda não sincronizados).
 * @returns {Array}
 */
async function listPosts(loadConfig) {
  const cfg  = loadConfig();
  const pool = getPool(cfg.database_url);

  if (pool) {
    try {
      const { rows } = await pool.query(`
        SELECT slug, title, type, category, date, read_time,
               ig_media_id, ig_permalink, created_at
        FROM   posts
        ORDER  BY created_at DESC
      `);

      // Mescla: posts locais ainda não sincronizados
      const dbSlugs   = new Set(rows.map(r => r.slug));
      const localOnly = readFallback().filter(p => !dbSlugs.has(p.slug));

      return [
        ...localOnly.map(p => ({ ...p, _source: 'local' })),
        ...rows.map(fromRow),
      ];
    } catch (err) {
      console.warn('[db] Neon list error:', err.message);
    }
  }

  return readFallback();
}

/**
 * Remove um post do banco e do fallback local.
 * @returns {{ source: 'neon'|'local' }}
 */
async function deletePost(slug, loadConfig) {
  const cfg  = loadConfig();
  const pool = getPool(cfg.database_url);

  removeFallback(slug); // sempre limpa local

  if (pool) {
    try {
      await pool.query('DELETE FROM posts WHERE slug = $1', [slug]);
      return { source: 'neon' };
    } catch (err) {
      console.warn('[db] Neon delete error:', err.message);
    }
  }

  return { source: 'local' };
}

/**
 * Associa media_id e permalink do Instagram a um post.
 */
async function linkInstagramMedia(slug, igMediaId, igPermalink, loadConfig) {
  const cfg  = loadConfig();
  const pool = getPool(cfg.database_url);
  if (!pool) return;
  try {
    await pool.query(
      'UPDATE posts SET ig_media_id=$1, ig_permalink=$2 WHERE slug=$3',
      [igMediaId, igPermalink, slug]
    );
  } catch (err) {
    console.warn('[db] linkInstagram error:', err.message);
  }
}

/**
 * Keepalive: ping leve. Neon não pausa, mas mantemos para monitorar.
 */
async function keepalive(loadConfig) {
  const cfg  = loadConfig();
  const pool = getPool(cfg.database_url);
  if (!pool) return;
  try {
    await pool.query('SELECT 1');
    console.log('[keepalive] Neon OK');
  } catch (e) {
    console.warn('[keepalive] Neon falhou:', e.message);
  }
}

module.exports = { savePost, listPosts, deletePost, linkInstagramMedia, keepalive };
