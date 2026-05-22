// ═══════════════════════════════════════════════════════════════
// publish.js — Publicação do post + exportação local automática
// Fluxo: git push → exportar imagens/DOCX → mostrar resultado
// ═══════════════════════════════════════════════════════════════

let publishedUrl = null;

async function publish() {
  const title = document.getElementById('title').value.trim();
  if (!title) { alert('Informe o título do post.'); return; }
  if (state.type === 'carousel' && state.slides.every(s => !s.headline)) {
    alert('Adicione pelo menos um slide com headline.'); return;
  }

  const btn = document.getElementById('publish-btn');
  const txt = document.getElementById('publish-text');
  const res = document.getElementById('publish-result');
  btn.disabled    = true;
  txt.textContent = 'Publicando...';
  res.className   = 'result-msg hidden';

  // Monta o objeto do post
  const post = {
    slug:         state.slug || generateSlug(title),
    title,
    type:         state.type,
    category:     state.category,
    date:         today(),
    readTime:     document.getElementById('readTime').value || '3 min',
    logoPosition: getLogoPos(),
    ...(state.type === 'carousel'
      ? { slides: state.slides }
      : {
          coverImage: state.coverImagePath,
          excerpt:    document.getElementById('excerpt').value,
          content:    document.getElementById('content').value,
        }
    ),
  };

  try {
    // ── 1. Publica no portfólio (git push) ──────────────────────
    const r    = await fetch('/api/publish', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(post),
    });
    const data = await r.json();
    if (!r.ok) throw new Error(data.error || 'Erro desconhecido.');

    publishedUrl = data.url;
    showUrl(publishedUrl);

    res.className   = 'result-msg success';
    res.textContent = '✓ Publicado! Exportando arquivos...';
    res.classList.remove('hidden');

    // ── 2. Exporta localmente (imagens ou DOCX) ──────────────────
    try {
      const exp = await exportAfterPublish(post);

      if (exp?.folder) {
        // Carrossel: imagens salvas
        res.textContent = `✓ Publicado! ${exp.saved.length} imagem(ns) salva(s) em:\n${exp.folder}`;
      } else if (exp?.fileName) {
        // Artigo: DOCX gerado
        res.textContent = `✓ Publicado! DOCX salvo: ${exp.fileName}`;
      } else {
        // Pasta não configurada — resultado normal
        res.textContent = '✓ Post publicado! Vercel está atualizando (~40s).';
      }
    } catch (exportErr) {
      // Exportação falhou mas publicação OK
      res.textContent = `✓ Publicado! (Aviso de exportação: ${exportErr.message})`;
    }

  } catch (err) {
    res.className   = 'result-msg error';
    res.textContent = '✕ ' + err.message;
  } finally {
    btn.disabled    = false;
    txt.textContent = 'Publicar post';
    res.classList.remove('hidden');
  }
}

function showUrl(url) {
  const box = document.getElementById('preview-url-box');
  box.classList.remove('hidden');
  document.getElementById('preview-url-text').textContent = url;
  const waText = encodeURIComponent(`Olá! Confira minha última publicação:\n${url}`);
  document.getElementById('whatsapp-share-btn').href = `https://wa.me/?text=${waText}`;
}

function copyUrl() {
  if (!publishedUrl) return;
  navigator.clipboard.writeText(publishedUrl).then(() => {
    const btn = document.querySelector('.btn-copy');
    btn.textContent = '✓ Copiado';
    setTimeout(() => btn.textContent = 'Copiar', 1500);
  });
}
