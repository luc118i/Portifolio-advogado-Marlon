// ═══════════════════════════════════════════════════════════════
// batch-export.js — Exportar todos os posts como imagens planas
// Nomenclatura: {CATEGORIA} - {TITULO} - {DATA} - {N} de {TOTAL}.png
// Salva na pasta raiz configurada em Configurações → Exportação
// ═══════════════════════════════════════════════════════════════

// ─── Sanitizar nome de arquivo para Windows ───────────────────
// Remove chars proibidos: \ / : * ? " < > |
function _sanitizeFilename(str) {
  return str
    .replace(/[\\/:*?"<>|]/g, '-')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

// ─── Overlay de progresso ─────────────────────────────────────
function _showBatchProgress() {
  const overlay = document.getElementById('batch-export-overlay');
  if (overlay) overlay.classList.remove('hidden');
  _updateBatchProgress(0, 0, '');
}

function _hideBatchProgress() {
  const overlay = document.getElementById('batch-export-overlay');
  if (overlay) overlay.classList.add('hidden');
}

function _updateBatchProgress(done, total, fileName) {
  const pct  = total > 0 ? Math.round((done / total) * 100) : 0;
  const fill  = document.getElementById('batch-progress-fill');
  const count = document.getElementById('batch-progress-count');
  const file  = document.getElementById('batch-progress-file');
  if (fill)  fill.style.width = pct + '%';
  if (count) count.textContent = total > 0 ? `${done} de ${total} imagens` : 'Preparando…';
  if (file)  file.textContent  = fileName || '';
}

// ─── Ponto de entrada ─────────────────────────────────────────
async function exportAllPosts() {
  if (typeof html2canvas === 'undefined') {
    toast('html2canvas não disponível.', 'error'); return;
  }

  // Verifica se há posts carregados
  if (!Array.isArray(_postsList) || !_postsList.length) {
    toast('Nenhum post disponível para exportar.', 'warning'); return;
  }

  // Verifica pasta de exportação
  let cfg;
  try { cfg = await fetch('/api/config').then(r => r.json()); } catch { cfg = {}; }
  if (!cfg.output_folder) {
    toast('Configure a pasta de exportação em Configurações → Exportação.', 'warning');
    return;
  }

  // Filtra apenas carrosseis com slides
  const carouselPosts    = _postsList.filter(
    p => p.type === 'carousel' && Array.isArray(p.slides) && p.slides.length > 0
  );
  const skippedArticles  = _postsList.length - carouselPosts.length;

  if (!carouselPosts.length) {
    const msg = `Nenhum carrossel para exportar.${skippedArticles
      ? ` (${skippedArticles} artigo${skippedArticles > 1 ? 's' : ''} ignorado${skippedArticles > 1 ? 's' : ''})`
      : ''}`;
    toast(msg, 'warning');
    return;
  }

  // Total de imagens a gerar
  const totalImages = carouselPosts.reduce((sum, p) => sum + p.slides.length, 0);

  // Confirmação
  const artInfo = skippedArticles
    ? `\n(${skippedArticles} artigo${skippedArticles > 1 ? 's' : ''} será${skippedArticles > 1 ? 'ão' : ''} ignorado${skippedArticles > 1 ? 's' : ''})`
    : '';
  const confirmed = await showConfirm(
    `Exportar ${carouselPosts.length} carrossel(is) · ${totalImages} imagem(ns) para:\n${cfg.output_folder}${artInfo}`,
    'Exportar tudo'
  );
  if (!confirmed) return;

  // ── Salva state atual (deep copy dos campos que vamos alterar) ──
  const savedState = {
    type:         state.type,
    category:     state.category,
    logoPosition: state.logoPosition,
    slides:       state.slides,
    currentSlide: state.currentSlide,
    title:        state.title,
    slug:         state.slug,
  };

  // ── Ativa overlay e muda para o studio (preview-card deve estar visível) ──
  _showBatchProgress();

  const postsScreen  = document.getElementById('posts-screen');
  const studioLayout = document.getElementById('studio-layout');
  postsScreen?.classList.add('hidden');
  studioLayout?.classList.remove('hidden');

  // Garante que o DOM atualize antes de começar
  await _batchDelay(80);

  const card = document.getElementById('preview-card');
  let done   = 0;
  let errors = 0;

  try {
    for (const post of carouselPosts) {
      const totalSlides = post.slides.length;

      // Carrega post temporariamente no state
      state.type         = 'carousel';
      state.category     = post.category     || '';
      state.logoPosition = post.logoPosition || post.logo_position || 'footer';
      state.slides       = post.slides;

      for (let i = 0; i < totalSlides; i++) {
        state.currentSlide = i;

        const slideNum = i + 1;
        const name = _sanitizeFilename(
          `${post.category} - ${post.title} - ${post.date} - ${slideNum} de ${totalSlides}.png`
        );

        _updateBatchProgress(done, totalImages, name);

        // Renderiza slide atual no preview
        if (typeof updatePreview === 'function') updatePreview();

        // Aguarda imagens carregarem e CSS estabilizar
        await _batchWaitForImages(card);
        await _batchDelay(120);

        // Captura com html2canvas
        let canvas;
        try {
          canvas = await html2canvas(card, {
            scale:           3,
            useCORS:         true,
            allowTaint:      false,
            backgroundColor: null,
            logging:         false,
          });
        } catch (capErr) {
          console.error('[batch-export] html2canvas falhou:', capErr);
          errors++;
          done++;
          continue;
        }

        // Envia imagem ao servidor
        try {
          const res = await fetch('/api/export/flat-image', {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify({ name, data: canvas.toDataURL('image/png') }),
          });
          if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            console.error('[batch-export] servidor retornou erro:', errData.error || res.status);
            errors++;
          }
        } catch (netErr) {
          console.error('[batch-export] falha de rede:', netErr);
          errors++;
        }

        done++;
        _updateBatchProgress(done, totalImages, name);
      }
    }
  } finally {
    // ── Restaura state original ──────────────────────────────
    state.type         = savedState.type;
    state.category     = savedState.category;
    state.logoPosition = savedState.logoPosition;
    state.slides       = savedState.slides;
    state.currentSlide = savedState.currentSlide;
    state.title        = savedState.title;
    state.slug         = savedState.slug;

    if (typeof updatePreview === 'function') updatePreview();

    // ── Volta para a tela de posts ───────────────────────────
    studioLayout?.classList.add('hidden');
    postsScreen?.classList.remove('hidden');

    _hideBatchProgress();
  }

  // ── Toast de resultado ────────────────────────────────────
  if (errors === 0) {
    const artNote = skippedArticles
      ? ` · ${skippedArticles} artigo${skippedArticles > 1 ? 's' : ''} ignorado${skippedArticles > 1 ? 's' : ''}`
      : '';
    toast(`✓ ${done} imagem(ns) exportada(s)!${artNote}`, 'success', 6000);
  } else {
    toast(`${done - errors} exportadas · ${errors} com erro. Verifique o console.`, 'warning', 6000);
  }
}

// ─── Helpers internos (para não conflitar com export.js) ─────
function _batchWaitForImages(container) {
  const imgs = Array.from(container.querySelectorAll('img'));
  return Promise.all(imgs.map(img => {
    if (img.complete) return Promise.resolve();
    return new Promise(resolve => {
      img.onload  = resolve;
      img.onerror = resolve;
      setTimeout(resolve, 2000);
    });
  }));
}

function _batchDelay(ms) {
  return new Promise(r => setTimeout(r, ms));
}
