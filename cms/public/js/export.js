// ═══════════════════════════════════════════════════════════════
// export.js — Exportação local após publicação
// Carrossel → imagens PNG via html2canvas
// Artigo    → arquivo .docx via servidor
// Chamado por publish.js após git push bem-sucedido
// ═══════════════════════════════════════════════════════════════

// ─── Ponto de entrada (após publicação) ───────────────────────
// Retorna: { folder, saved[] } | { fileName, path } | null (se pasta não configurada)
async function exportAfterPublish(post) {
  let cfg;
  try {
    cfg = await fetch('/api/config').then(r => r.json());
  } catch {
    return null;
  }
  if (!cfg.output_folder) return null; // pasta não configurada — silencioso

  if (post.type === 'carousel') {
    return exportCarouselImages(post, '/api/export/images');
  } else {
    return exportArticleDocx(post);
  }
}

// ─── Exportar agora sem publicar (botão "Salvar localmente") ──
async function exportLocalOnly() {
  const title = document.getElementById('title')?.value.trim();
  if (!title) { toast('Defina o título do post antes de exportar.', 'warning'); return; }

  if (state.type === 'carousel' && state.slides.every(s => !s.headline)) {
    toast('Adicione pelo menos um slide com headline.', 'warning'); return;
  }

  // Verifica se pasta está configurada
  let cfg;
  try { cfg = await fetch('/api/config').then(r => r.json()); } catch { cfg = {}; }
  if (!cfg.output_folder) {
    toast('Configure a pasta de exportação em Configurações → Exportação.', 'warning');
    openConfigScreen();
    return;
  }

  const btn = document.getElementById('btn-export-local');
  if (btn) { btn.disabled = true; btn.textContent = 'Salvando…'; }

  try {
    const post = {
      slug:  state.slug || generateSlug(title),
      title,
      type:  state.type,
      slides: state.slides,
    };

    let result;
    if (state.type === 'carousel') {
      result = await exportCarouselImages(post, '/api/export/now');
    } else {
      result = await exportArticleDocx(post);
    }

    if (result?.folder) {
      toast(`✓ ${result.saved.length} imagem(ns) salva(s) em:\n${result.folder}`, 'success', 5000);
    } else if (result?.fileName) {
      toast(`✓ Arquivo salvo: ${result.fileName}`, 'success', 5000);
    }
  } catch (err) {
    toast('Erro ao exportar: ' + err.message, 'error');
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = '💾 Salvar localmente'; }
  }
}

// ─── Carrossel: captura cada slide com html2canvas ────────────
async function exportCarouselImages(post, apiUrl = '/api/export/images') {
  if (typeof html2canvas === 'undefined') {
    throw new Error('html2canvas não disponível');
  }

  const card      = document.getElementById('preview-card');
  const savedSlide = state.currentSlide;
  const images    = [];

  for (let i = 0; i < state.slides.length; i++) {
    state.currentSlide = i;
    renderCarouselSlide(card, state.slides[i]);

    await waitForImages(card);
    await delay(100); // deixa o CSS estabilizar

    const canvas = await html2canvas(card, {
      scale:           3,       // 3× para boa resolução (900×1440px)
      useCORS:         true,
      allowTaint:      false,
      backgroundColor: null,
      logging:         false,
    });

    const isCta  = state.slides[i].type === 'cta';
    const padded = String(i + 1).padStart(2, '0');
    const name   = isCta ? 'cta.png' : `slide-${padded}.png`;
    images.push({ name, data: canvas.toDataURL('image/png') });
  }

  // Restaura o slide que estava aberto
  state.currentSlide = savedSlide;
  updatePreview();

  const res  = await fetch(apiUrl, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ slug: post.slug, images }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erro ao salvar imagens.');
  return data;
}

// ─── Artigo: envia dados ao servidor para gerar .docx ─────────
async function exportArticleDocx(post) {
  const res  = await fetch('/api/export/docx', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(post),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erro ao gerar DOCX.');
  return data;
}

// ─── Helpers ─────────────────────────────────────────────────
function waitForImages(container) {
  const imgs = Array.from(container.querySelectorAll('img'));
  return Promise.all(imgs.map(img => {
    if (img.complete) return Promise.resolve();
    return new Promise(resolve => {
      img.onload  = resolve;
      img.onerror = resolve; // não bloqueia se a imagem falhar
      setTimeout(resolve, 2000); // timeout de segurança
    });
  }));
}

function delay(ms) {
  return new Promise(r => setTimeout(r, ms));
}
