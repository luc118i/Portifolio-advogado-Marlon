// ═══════════════════════════════════════════════════════════════
// lib/pg-client.js — Pool singleton para Neon (ou qualquer Postgres)
//
// Aceita uma connection string padrão PostgreSQL:
//   postgresql://user:pass@ep-xxx.neon.tech/dbname?sslmode=require
// ═══════════════════════════════════════════════════════════════

const { Pool } = require('pg');

let _pool      = null;
let _cachedUrl = null;

/**
 * Substitui sslmode=require → verify-full para silenciar o warning de
 * deprecação do pg (que trata ambos igualmente na versão atual).
 */
function normalizeSsl(cs) {
  return cs.replace(/sslmode=require/gi, 'sslmode=verify-full');
}

/**
 * Retorna um Pool pg, ou null se a connection string não estiver configurada.
 * Re-cria o pool se a URL mudar.
 */
function getPool(connectionString) {
  if (!connectionString) return null;
  if (_pool && _cachedUrl === connectionString) return _pool;

  // Fecha pool anterior se existir
  if (_pool) { try { _pool.end(); } catch {} }

  _pool = new Pool({
    connectionString: normalizeSsl(connectionString),
    ssl: { rejectUnauthorized: false }, // Neon usa TLS com cert válido
    max:             3,                 // limite baixo: CMS local, sem concorrência alta
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 8_000,
  });

  _pool.on('error', (err) => {
    console.warn('[pg] Pool error:', err.message);
  });

  _cachedUrl = connectionString;
  return _pool;
}

function resetPool() {
  if (_pool) { try { _pool.end(); } catch {} }
  _pool      = null;
  _cachedUrl = null;
}

module.exports = { getPool, resetPool };
