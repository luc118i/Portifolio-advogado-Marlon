// ═══════════════════════════════════════════════════════════════
// posts-list.js — Tela exclusiva de gerenciamento de posts
// Ações: Editar (carrega no studio) · Compartilhar · Excluir
// ═══════════════════════════════════════════════════════════════

var _igLoaded  = false;       // var → acessível de onclick inline
var _postsList = [];          // cache dos posts para edição
var _shareUrl  = '';          // URL ativa no popover de share

// ── Abrir / fechar tela ─────────────────────────────────────────
function openPostsScreen() {
  document.getElementById('posts-screen').classList.remove('hidden');
  document.getElementById('studio-layout').classList.add('hidden');
  loadPostsList();
}

function closePostsScreen() {
  document.getElementById('posts-screen').classList.add('hidden');
  document.getElementById('studio-layout').classList.remove('hidden');
  setNavActive('editor');
}

// ── Carregar e renderizar os posts do CMS ──────────────────────
async function loadPostsList() {
  const grid = document.getElementById('posts-list');
  grid.innerHTML = '<p class="posts-loading">Carregando…</p>';
  _postsList = [];

  try {
    const res   = await fetch('/api/posts');
    const posts = await res.json();
    _postsList  = posts;

    if (!posts.length) {
      grid.innerHTML = '<p class="posts-empty">Nenhum post publicado ainda.</p>';
      return;
    }

    grid.innerHTML = posts.map((p, i) => {
      const typeLabel = p.type === 'carousel' ? 'Carrossel' : 'Artigo';
      const typeCls   = p.type === 'carousel' ? 'tag-carousel' : 'tag-article';
      const srcLabel  = p._source === 'neon' ? 'Neon ✦' : 'Local';
      const srcCls    = p._source === 'neon' ? 'badge-supa' : 'badge-local';
      const slideCount = Array.isArray(p.slides) ? p.slides.length : 0;

      // Thumbnail: miniatura escura com headline ou capa de artigo
      let thumb = '';
      if (p.type === 'carousel') {
        const headline = escHtml(p.slides?.[0]?.headline || p.title || '');
        thumb = `
          <div class="post-card-thumb">
            <span class="post-card-slides-badge">${slideCount} slide${slideCount !== 1 ? 's' : ''}</span>
            <div class="post-card-thumb-text">${headline}</div>
          </div>`;
      } else {
        thumb = p.coverImage
          ? `<div class="post-card-thumb"><img src="${escHtml(p.coverImage)}" alt=""></div>`
          : `<div class="post-card-thumb post-thumb-article"><span>📄</span></div>`;
      }

      return `
        <div class="post-card" id="post-card-${i}">
          ${thumb}
          <div class="post-card-body">
            <div class="post-card-badges">
              <span class="post-item-tag ${typeCls}">${typeLabel}</span>
              <span class="post-source-badge ${srcCls}">${srcLabel}</span>
            </div>
            <div class="post-card-title">${escHtml(p.title)}</div>
            <div class="post-card-meta">${escHtml(p.category || '—')} · ${p.date || '—'}</div>
          </div>
          <div class="post-card-actions">
            <button class="post-action-btn edit" id="edit-btn-${i}" onclick="editPost(${i})" title="Carregar no studio para editar">
              ✏️ Editar
            </button>
            <button class="post-action-btn share" onclick="openSharePopover(${i})" title="Compartilhar">
              📤 Compartilhar
            </button>
            <button class="post-action-btn delete" id="del-btn-${i}" onclick="deletePost('${escHtml(p.slug)}', ${i})" title="Excluir permanentemente">
              🗑 Excluir
            </button>
          </div>
        </div>`;
    }).join('');

  } catch {
    grid.innerHTML = '<p class="posts-error">Erro ao carregar posts.</p>';
  }
}

// ── Editar: carrega o post de volta no studio ───────────────────
function editPost(index) {
  const p = _postsList[index];
  if (!p) return;

  // Feedback visual no botão
  const btn = document.getElementById(`edit-btn-${index}`);
  if (btn) { btn.classList.add('loading'); btn.textContent = '…'; }

  // 1. Popula o state
  state.type           = p.type || 'carousel';
  state.title          = p.title || '';
  state.slug           = p.slug  || '';
  state.category       = p.category || 'Direito Penal';
  state.readTime       = p.readTime  || p.read_time || '3 min';
  state.logoPosition   = p.logoPosition || p.logo_position || 'footer';
  state.currentSlide   = 0;

  if (state.type === 'carousel') {
    state.slides = Array.isArray(p.slides) && p.slides.length
      ? p.slides
      : [createEmptySlide()];
    state.coverImagePath = null;
    state.excerpt        = '';
    state.content        = '';
  } else {
    state.slides         = [createEmptySlide()];
    state.coverImagePath = p.coverImage || p.cover_image || null;
    state.excerpt        = p.excerpt || '';
    state.content        = p.content || '';
  }

  // 2. Sincroniza inputs de texto
  const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };
  setVal('title',    state.title);
  setVal('readTime', state.readTime);
  setVal('excerpt',  state.excerpt);
  setVal('content',  state.content);

  const slugEl = document.getElementById('slug-preview');
  if (slugEl) slugEl.textContent = state.slug || '—';

  // 3. Tipo (atualiza DOM)
  if (typeof setType === 'function') setType(state.type);

  // 4. Categoria
  const catCard = document.querySelector(`.cat-card[data-cat="${CSS.escape(state.category)}"]`);
  if (catCard && typeof selectCategory === 'function') selectCategory(catCard);

  // 5. Posição do logo
  const logoRadio = document.querySelector(`input[name="logoPos"][value="${state.logoPosition}"]`);
  if (logoRadio) logoRadio.checked = true;

  // 6. Re-renderiza slides e preview
  if (typeof renderSlidesForms === 'function') renderSlidesForms();
  if (typeof updatePreview     === 'function') updatePreview();
  if (typeof activateStep      === 'function') activateStep(1);

  // 7. Volta ao editor
  closePostsScreen();
  toast(`Post "${p.title}" carregado no estúdio.`, 'success');
}

// ── Excluir ─────────────────────────────────────────────────────
async function deletePost(slug, index) {
  const cardEl = typeof index !== 'undefined'
    ? document.getElementById(`post-card-${index}`)
    : null;

  // Confirmar com dialog customizado
  const confirmed = await showConfirm(
    `Excluir o post "${slug}"?\nEsta ação não pode ser desfeita.`,
    'Excluir', true
  );
  if (!confirmed) return;

  // Feedback imediato: escurece o card
  if (cardEl) cardEl.classList.add('deleting');

  try {
    const r = await fetch(`/api/posts/${slug}`, { method: 'DELETE' });
    if (!r.ok) throw new Error('Falha na exclusão');

    // Remove o card do DOM após a transição (300ms)
    if (cardEl) {
      await new Promise(res => setTimeout(res, 320));
      cardEl.remove();
    }
    toast('Post excluído com sucesso.', 'success');

    // Recarrega se o grid ficou vazio
    const grid = document.getElementById('posts-list');
    if (grid && !grid.querySelector('.post-card')) {
      grid.innerHTML = '<p class="posts-empty">Nenhum post publicado ainda.</p>';
    }
  } catch {
    if (cardEl) cardEl.classList.remove('deleting');
    toast('Erro ao excluir post. Tente novamente.', 'error');
  }
}

// ── Compartilhar ────────────────────────────────────────────────
function openSharePopover(index) {
  const p = _postsList[index];
  if (!p) return;

  _shareUrl = p.ig_permalink || '';

  const waText  = encodeURIComponent(`Confira meu post jurídico: ${p.title}\n${_shareUrl || 'marloninacio.adv'}`);
  document.getElementById('share-wa-btn').href = `https://wa.me/?text=${waText}`;

  const igBtn = document.getElementById('share-ig-btn');
  if (p.ig_permalink) {
    igBtn.href = p.ig_permalink;
    igBtn.style.opacity = '1';
    igBtn.style.pointerEvents = 'auto';
  } else {
    igBtn.href = '#';
    igBtn.style.opacity = '0.4';
    igBtn.style.pointerEvents = 'none';
  }

  document.getElementById('share-copy-btn').textContent = '🔗 Copiar link';
  document.getElementById('share-popover').classList.remove('hidden');
}

function closeSharePopover() {
  document.getElementById('share-popover').classList.add('hidden');
}

function copyShareUrl() {
  const text = _shareUrl || window.location.origin;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById('share-copy-btn');
    btn.textContent = '✓ Copiado!';
    setTimeout(() => { btn.textContent = '🔗 Copiar link'; }, 1800);
  });
}

// ── Tab switcher ────────────────────────────────────────────────
function switchPostsTab(tab) {
  ['cms', 'ig'].forEach(t => {
    document.getElementById(`tab-${t}`)?.classList.toggle('active', t === tab);
    document.getElementById(`panel-${t}`)?.classList.toggle('hidden', t !== tab);
  });
  if (tab === 'ig' && !_igLoaded) loadIgPosts();
}

// ── Instagram ───────────────────────────────────────────────────
async function loadIgPosts() {
  const container = document.getElementById('ig-posts-list');
  const badge     = document.getElementById('ig-status-badge');
  container.innerHTML = '<p class="posts-loading">Conectando ao Instagram…</p>';

  try {
    const stRes  = await fetch('/api/instagram/status');
    const status = await stRes.json();

    if (!status.configured) {
      container.innerHTML = `<div class="ig-not-configured"><span>⚠️</span><p>Configure o token do Instagram em <strong>Configurações → Instagram</strong>.</p></div>`;
      if (badge) { badge.textContent = 'Não configurado'; badge.className = 'ig-badge ig-badge-off'; }
      return;
    }
    if (!status.valid) {
      container.innerHTML = `<div class="ig-not-configured"><span>❌</span><p>Token inválido ou expirado.</p><button class="btn-secondary" onclick="refreshIgToken()">Renovar token</button></div>`;
      if (badge) { badge.textContent = 'Token inválido'; badge.className = 'ig-badge ig-badge-err'; }
      return;
    }
    if (badge) {
      if (status.expires_at) {
        const days = Math.round((new Date(status.expires_at) - Date.now()) / 86400000);
        badge.textContent = days < 7 ? `Expira em ${days}d` : `Válido (${days}d)`;
        badge.className   = days < 7 ? 'ig-badge ig-badge-warn' : 'ig-badge ig-badge-ok';
      } else {
        badge.textContent = 'Conectado'; badge.className = 'ig-badge ig-badge-ok';
      }
    }
  } catch {
    if (badge) { badge.textContent = 'Erro'; badge.className = 'ig-badge ig-badge-err'; }
  }

  try {
    const res  = await fetch('/api/instagram/posts?limit=12');
    const data = await res.json();
    if (data.error) { container.innerHTML = `<p class="posts-error">Erro: ${escHtml(data.error)}</p>`; return; }
    if (!data.items?.length) { container.innerHTML = '<p class="posts-empty">Nenhum post no Instagram.</p>'; return; }

    _igLoaded = true;
    container.innerHTML = data.items.map(m => {
      const thumb   = m.media_url ? `<img src="${escHtml(m.media_url)}" alt="" loading="lazy">` : `<div class="ig-thumb-placeholder">📷</div>`;
      const caption = m.caption ? m.caption.slice(0, 60) + (m.caption.length > 60 ? '…' : '') : '';
      const date    = m.timestamp ? new Date(m.timestamp).toLocaleDateString('pt-BR') : '';
      return `<a class="ig-card" href="${escHtml(m.permalink)}" target="_blank">
        <div class="ig-card-thumb">${thumb}</div>
        <div class="ig-card-info"><div class="ig-card-caption">${escHtml(caption)}</div><div class="ig-card-date">${date}</div></div>
      </a>`;
    }).join('');
  } catch {
    container.innerHTML = '<p class="posts-error">Erro ao carregar posts do Instagram.</p>';
  }
}

async function refreshIgToken() {
  const btn = event.target;
  btn.disabled = true; btn.textContent = 'Renovando…';
  try {
    const res  = await fetch('/api/instagram/refresh-token', { method: 'POST' });
    const data = await res.json();
    if (data.success) {
      toast(`Token renovado! Válido até ${new Date(data.expires_at).toLocaleDateString('pt-BR')}.`, 'success', 5000);
      _igLoaded = false; await loadIgPosts();
    } else {
      toast('Erro ao renovar: ' + (data.error || 'Desconhecido'), 'error');
    }
  } catch { toast('Erro de conexão ao renovar token.', 'error'); }
  finally { btn.disabled = false; btn.textContent = 'Renovar token'; }
}
