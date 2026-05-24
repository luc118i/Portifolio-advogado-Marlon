-- ═══════════════════════════════════════════════════════════════
-- schema.sql — Tabela de posts no Neon (PostgreSQL)
--
-- Execute este script no SQL Editor do Neon:
--   console.neon.tech → seu projeto → SQL Editor → cole e rode
-- ═══════════════════════════════════════════════════════════════

-- Extensão necessária para gen_random_uuid()
create extension if not exists "pgcrypto";

-- ─── Tabela principal ─────────────────────────────────────────
create table if not exists posts (
  id            uuid        default gen_random_uuid() primary key,
  slug          text        unique not null,
  title         text        not null,
  type          text        not null,           -- 'carousel' | 'article'
  category      text,
  date          text,
  read_time     text,
  logo_position text,
  slides        jsonb,                          -- array de slides (carrossel)
  cover_image   text,
  excerpt       text,
  content       text,                           -- HTML do artigo
  ig_media_id   text,                           -- ID da mídia no Instagram
  ig_permalink  text,                           -- URL do post no Instagram
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- ─── Índices ──────────────────────────────────────────────────
create index if not exists posts_created_at_idx on posts (created_at desc);
create index if not exists posts_type_idx       on posts (type);
create index if not exists posts_category_idx   on posts (category);

-- ─── Trigger: atualiza updated_at automaticamente ────────────
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists posts_updated_at on posts;
create trigger posts_updated_at
  before update on posts
  for each row execute function set_updated_at();

-- ─── Row Level Security (RLS) — Desativado para CMS local ────
-- O CMS usa a anon key diretamente. Se quiser proteger a tabela
-- no futuro, ative o RLS e crie policies adequadas.
alter table posts disable row level security;

-- ─── Comentários ──────────────────────────────────────────────
comment on table posts is 'Posts do CMS do Advogado Marlon (carrosséis e artigos)';
comment on column posts.slides       is 'Array JSON de slides do carrossel';
comment on column posts.ig_media_id  is 'ID da mídia publicada no Instagram';
comment on column posts.ig_permalink is 'URL permanente do post no Instagram';
