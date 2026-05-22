// ═══════════════════════════════════════════════════════════════
// image-editor.js — Editor de imagem por slide (drag + zoom)
// Os handlers de mousemove/mouseup globais ficam no app.js (init)
// ═══════════════════════════════════════════════════════════════

let imgDrag = null;

function startImgDrag(e, index) {
  e.preventDefault();
  e.stopPropagation();
  imgDrag = {
    index,
    startX:    e.clientX,
    startY:    e.clientY,
    startImgX: state.slides[index].imageX || 0,
    startImgY: state.slides[index].imageY || 0,
  };
  const canvas = document.getElementById(`img-canvas-${index}`);
  if (canvas) canvas.style.cursor = 'grabbing';
}

function wheelZoom(e, index) {
  e.preventDefault();
  e.stopPropagation();
  const delta = e.deltaY < 0 ? 0.08 : -0.08;
  const slide  = state.slides[index];
  slide.imageScale = Math.max(0.3, Math.min(3, (slide.imageScale || 1) + delta));
  applyImgTransform(index);
  const slider = document.getElementById(`zoom-slider-${index}`);
  if (slider) slider.value = Math.round(slide.imageScale * 100);
}

function zoomStep(index, delta) {
  const slide  = state.slides[index];
  slide.imageScale = Math.max(0.3, Math.min(3, (slide.imageScale || 1) + delta));
  applyImgTransform(index);
  const slider = document.getElementById(`zoom-slider-${index}`);
  if (slider) slider.value = Math.round(slide.imageScale * 100);
}

function setZoomSlider(val, index) {
  state.slides[index].imageScale = val / 100;
  applyImgTransform(index);
}

function fitImage(index) {
  state.slides[index].imageX     = 0;
  state.slides[index].imageY     = 0;
  state.slides[index].imageScale = 1;
  applyImgTransform(index);
  const slider = document.getElementById(`zoom-slider-${index}`);
  if (slider) slider.value = 100;
}

function applyImgTransform(index) {
  const slide = state.slides[index];
  const img   = document.getElementById(`editor-img-${index}`);
  if (img) {
    img.style.transform =
      `translate(calc(-50% + ${slide.imageX}px), calc(-50% + ${slide.imageY}px)) scale(${slide.imageScale})`;
  }
  updatePreview();
}
