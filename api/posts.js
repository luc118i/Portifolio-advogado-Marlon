// ═══════════════════════════════════════════════════════════════
// api/posts.js — Vercel Serverless Function
//
// GET /api/posts → retorna todos os posts do Neon Postgres
//
// Variável de ambiente necessária no Vercel Dashboard:
//   NEON_DATABASE_URL = postgresql://user:pass@ep-xxx.neon.tech/dbname?sslmode=require
//
// Cache: 30 s no CDN, revalidação silenciosa em até 2 min (stale-while-revalidate)
// ═══════════════════════════════════════════════════════════════

const { Pool } = require('pg');

// ─── Pool singleton — reutilizado entre invocações do mesmo contêiner ──
let _pool = null;

function getPool() {
  const url = process.env.NEON_DATABASE_URL;
  if (!url) return null;
  if (_pool) return _pool;

  _pool = new Pool({
    connectionString: url,
    ssl: { rejectUnauthorized: false }, // Neon usa TLS válido
    max:                     2,          // máximo baixo para serverless
    idleTimeoutMillis:   10_000,
    connectionTimeoutMillis: 5_000,
  });

  _pool.on('error', (err) => {
    console.error('[api/posts] pool error:', err.message);
    _pool = null; // força recriação na próxima invocação
  });

  return _pool;
}

// ─── Converte row do banco → objeto de post ────────────────────
function fromRow(r) {
  return {
    slug:         r.slug,
    title:        r.title,
    type:         r.type,
    category:     r.category     || null,
    date:         r.date         || null,
    readTime:     r.read_time    || null,
    logoPosition: r.logo_position || null,
    slides:       r.slides       || null,   // jsonb — pg já parseia
    coverImage:   r.cover_image  || null,
    excerpt:      r.excerpt      || null,
    content:      r.content      || null,
    ig_media_id:  r.ig_media_id  || null,
    ig_permalink: r.ig_permalink || null,
    created_at:   r.created_at   || null,
    _source:      'neon',
  };
}

// ─── Handler ──────────────────────────────────────────────────
module.exports = async function handler(req, res) {
  // Só GET é suportado
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const pool = getPool();
  if (!pool) {
    res.status(500).json({ error: 'NEON_DATABASE_URL não configurado no Vercel.' });
    return;
  }

  try {
    const { rows } = await pool.query(`
      SELECT
        slug, title, type, category, date,
        read_time, logo_position,
        slides, cover_image, excerpt, content,
        ig_media_id, ig_permalink, created_at
      FROM posts
      ORDER BY created_at DESC
    `);

    const posts = rows.map(fromRow);

    // Cache no CDN da Vercel: 30 s "fresco", até 2 min stale-while-revalidate
    res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=120');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.json(posts);
  } catch (err) {
    console.error('[api/posts] query error:', err.message);
    res.status(500).json({ error: 'Erro ao buscar posts: ' + err.message });
  }
};
