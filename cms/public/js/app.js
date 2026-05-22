// ═══════════════════════════════════════════════════════════════
// app.js — Ponto de entrada. Só inicialização e event listeners globais.
// Ordem de carregamento no HTML:
//   data → state → utils → image-editor → font-picker →
//   wizard → slides → preview → upload → ai → publish → posts-list → app
// ═══════════════════════════════════════════════════════════════

function init() {
  activateStep(1);
  renderSlidesForms();
  updatePreview();
  checkAiStatus();

  // ─── Drag global (image-editor.js) ──────────────────────────
  document.addEventListener('mousemove', (e) => {
    if (!imgDrag) return;
    const { index, startX, startY, startImgX, startImgY } = imgDrag;
    state.slides[index].imageX = startImgX + (e.clientX - startX);
    state.slides[index].imageY = startImgY + (e.clientY - startY);
    applyImgTransform(index);
  });

  document.addEventListener('mouseup', () => {
    if (!imgDrag) return;
    const canvas = document.getElementById(`img-canvas-${imgDrag.index}`);
    if (canvas) canvas.style.cursor = 'grab';
    imgDrag = null;
  });

  // ─── Fechar font picker ao clicar fora (font-picker.js) ─────
  document.addEventListener('click', (e) => {
    const picker = document.getElementById('font-picker');
    if (picker && !picker.classList.contains('hidden')) {
      if (!picker.contains(e.target) && !e.target.closest('.btn-font-picker')) {
        closeFontPicker();
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', init);
