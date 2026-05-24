// ═══════════════════════════════════════════════════════════════
// publish.js — Publicação do post + exportação local automática
// Fluxo: git push → exportar imagens/DOCX → mostrar resultado
// ═══════════════════════════════════════════════════════════════

let publishedUrl = null;

async function publish() {
  const title = document.getElementById('title').value.trim();
  if (!title) { toast('Informe o título do post.', 'warning'); return; }
  if (state.type === 'carousel' && state.slides.every(s => !s.headline)) {
    toast('Adicione pelo menos um slide com headline.', 'warning'); return;
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
        res.textContent = `✓ Publicado! ${exp.saved.length} imagem(ns) salva(s) em:\n${exp.folder}`;
      } else if (exp?.fileName) {
        res.textContent = `✓ Publicado! DOCX salvo: ${exp.fileName}`;
      } else {
        res.textContent = '✓ Post publicado! Vercel está atualizando (~40s).';
      }
    } catch (exportErr) {
      res.textContent = `✓ Publicado! (Aviso de exportação: ${exportErr.message})`;
    }

    // ── 3. Reseta o estúdio para novo post ────────────────────────
    resetAfterPublish();

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

// ── Reset do estúdio após publicação bem-sucedida ─────────────────
async function resetAfterPublish() {
  // Aguarda 2 s para o usuário ler a mensagem de sucesso
  await new Promise(r => setTimeout(r, 2000));

  // 1. Reseta o estado global
  state.type           = 'carousel';
  state.category       = 'Direito Penal';
  state.title          = '';
  state.slug           = '';
  state.readTime       = '3 min';
  state.logoPosition   = 'footer';
  state.currentSlide   = 0;
  state.slides         = [createEmptySlide()];
  state.coverImagePath = null;
  state.excerpt        = '';
  state.content        = '';

  // 2. Limpa campos de texto
  const fieldDefaults = { title: '', readTime: '3 min', excerpt: '', content: '' };
  Object.entries(fieldDefaults).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) el.value = val;
  });
  const slugEl = document.getElementById('slug-preview');
  if (slugEl) slugEl.textContent = '—';

  // 3. Tipo → carrossel (usa a função existente que já atualiza o DOM)
  if (typeof setType === 'function') setType('carousel');

  // 4. Categoria → primeira disponível
  const firstCat = document.querySelector('.cat-card');
  if (firstCat && typeof selectCategory === 'function') selectCategory(firstCat);

  // 5. Logo position → footer
  const footerRadio = document.querySelector('input[name="logoPos"][value="footer"]');
  if (footerRadio) footerRadio.checked = true;

  // 6. Wizard → volta ao passo 1
  if (typeof activateStep === 'function') activateStep(1);

  // 7. Limpa chips do breadcrumb
  for (let i = 1; i <= 5; i++) {
    const chip = document.getElementById(`chip-${i}`);
    if (chip) chip.textContent = '';
  }

  // 8. Re-renderiza slides e preview
  if (typeof renderSlidesForms === 'function') renderSlidesForms();
  if (typeof updatePreview     === 'function') updatePreview();

  // 9. Esconde mensagem de resultado (URL box fica visível para o usuário copiar)
  const res = document.getElementById('publish-result');
  if (res) res.classList.add('hidden');
}
