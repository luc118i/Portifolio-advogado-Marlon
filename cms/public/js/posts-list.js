// ═══════════════════════════════════════════════════════════════
// posts-list.js — Modal de listagem e exclusão de posts
// ═══════════════════════════════════════════════════════════════

async function togglePostsList() {
  const modal    = document.getElementById('posts-modal');
  const isHidden = modal.classList.toggle('hidden');
  if (!isHidden) await loadPostsList();
}

async function loadPostsList() {
  const container = document.getElementById('posts-list');
  container.innerHTML = 'Carregando...';
  try {
    const res   = await fetch('/api/posts');
    const posts = await res.json();
    if (!posts.length) {
      container.innerHTML = '<p style="color:#888;padding:12px;font-size:0.8rem">Nenhum post publicado ainda.</p>';
      return;
    }
    container.innerHTML = posts.map(p => `
      <div class="post-item">
        <div class="post-item-info">
          <div class="post-item-title">${escHtml(p.title)}</div>
          <div class="post-item-meta">${p.date} · ${p.category}</div>
        </div>
        <span class="post-item-tag ${p.type === 'carousel' ? 'tag-carousel' : 'tag-article'}">
          ${p.type === 'carousel' ? 'Carrossel' : 'Artigo'}
        </span>
        <button class="btn-delete" onclick="deletePost('${p.slug}')">🗑</button>
      </div>
    `).join('');
  } catch {
    container.innerHTML = '<p style="color:#d44;padding:12px;font-size:0.8rem">Erro ao carregar posts.</p>';
  }
}

async function deletePost(slug) {
  if (!confirm(`Excluir o post "${slug}"? Esta ação não pode ser desfeita.`)) return;
  try {
    await fetch(`/api/posts/${slug}`, { method: 'DELETE' });
    await loadPostsList();
  } catch {
    alert('Erro ao excluir post.');
  }
}
