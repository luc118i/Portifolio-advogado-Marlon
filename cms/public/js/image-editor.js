// ═══════════════════════════════════════════════════════════════
// image-editor.js — Editor de imagem: drag, zoom, filtros, ajustes
// ═══════════════════════════════════════════════════════════════

let imgDrag = null;

// ── Drag ────────────────────────────────────────────────────────
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

// ── Transform + filter helpers ───────────────────────────────────
function buildImgTransform(slide) {
  const x  = slide.imageX     || 0;
  const y  = slide.imageY     || 0;
  const s  = slide.imageScale || 1;
  const r  = slide.imageRotate || 0;
  const fx = slide.imageFlipH ? -1 : 1;
  const fy = slide.imageFlipV ? -1 : 1;
  return `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${r}deg) scale(${s * fx}, ${s * fy})`;
}

function buildImgFilter(slide) {
  const blur = (slide.imageBlur || 0) > 0 ? `blur(${slide.imageBlur}px)` : '';

  const preset = IMG_FILTERS.find(f => f.id === (slide.imageFilter || 'none'));
  if (preset && preset.css) {
    return blur ? `${preset.css} ${blur}` : preset.css;
  }

  const parts = [];
  const b = slide.imageBrightness ?? 100;
  const c = slide.imageContrast  ?? 100;
  const s = slide.imageSaturation ?? 100;
  if (b !== 100) parts.push(`brightness(${b}%)`);
  if (c !== 100) parts.push(`contrast(${c}%)`);
  if (s !== 100) parts.push(`saturate(${s}%)`);
  if (blur)      parts.push(blur);
  return parts.join(' ') || 'none';
}

function applyImgTransform(index) {
  const slide = state.slides[index];
  const img   = document.getElementById(`editor-img-${index}`);
  if (img) {
    img.style.transform = buildImgTransform(slide);
    img.style.filter    = buildImgFilter(slide);
  }
  updatePreview();
}

// ── Image editor modal ───────────────────────────────────────────
let _imgIdx      = null;
let _imgSnapshot = null;

function openImageModal(index) {
  _imgIdx      = index;
  const slide  = state.slides[index];

  // Snapshot for cancel
  _imgSnapshot = {
    imageX: slide.imageX, imageY: slide.imageY, imageScale: slide.imageScale,
    imageRotate: slide.imageRotate, imageFlipH: slide.imageFlipH, imageFlipV: slide.imageFlipV,
    imageFilter: slide.imageFilter, imageBlur: slide.imageBlur,
    imageBrightness: slide.imageBrightness, imageContrast: slide.imageContrast,
    imageSaturation: slide.imageSaturation,
  };

  // Populate filter grid with the actual image as thumbnail
  _imgPopulateFilters(slide);

  // Sync sliders
  _imgSyncSliders(slide);

  // Preview
  const previewImg = document.getElementById('img-modal-preview-img');
  if (previewImg) previewImg.src = slide.imagePath || '';
  _imgUpdatePreview(slide);

  document.getElementById('image-edit-modal').classList.remove('hidden');
}

function closeImageModal(apply) {
  if (!apply && _imgSnapshot) {
    Object.assign(state.slides[_imgIdx], _imgSnapshot);
    applyImgTransform(_imgIdx);
  }
  document.getElementById('image-edit-modal').classList.add('hidden');
  _imgSnapshot = null;
  _imgIdx      = null;
}

function applyImageModal() {
  const idx = _imgIdx;
  closeImageModal(true);
  renderSlidesForms();
  selectSlide(idx);
}

function _imgPopulateFilters(slide) {
  const grid = document.getElementById('img-filter-grid');
  if (!grid) return;
  const src = slide.imagePath || '';
  grid.innerHTML = IMG_FILTERS.map(f => `
    <button class="img-filter-btn ${(slide.imageFilter || 'none') === f.id ? 'active' : ''}"
            data-filter="${f.id}"
            onclick="setImgFilter('${f.id}')">
      <div class="img-filter-thumb"
           style="background-image:url('${src}');filter:${f.css || 'none'}"></div>
      <span>${f.label}</span>
    </button>
  `).join('');
}

function _imgSyncSliders(slide) {
  _setSlider('img-modal-blur',        slide.imageBlur        ?? 0,   'px');
  _setSlider('img-modal-brightness',  slide.imageBrightness  ?? 100, '%');
  _setSlider('img-modal-contrast',    slide.imageContrast    ?? 100, '%');
  _setSlider('img-modal-saturation',  slide.imageSaturation  ?? 100, '%');
  _setSlider('img-modal-rotate',      slide.imageRotate      ?? 0,   '°');

  document.getElementById('img-flip-h-btn')?.classList.toggle('active', !!slide.imageFlipH);
  document.getElementById('img-flip-v-btn')?.classList.toggle('active', !!slide.imageFlipV);
}

function _setSlider(id, val, unit) {
  const el    = document.getElementById(id);
  const label = document.getElementById(id + '-label');
  if (el)    el.value = val;
  if (label) label.textContent = (Number.isInteger(val) ? val : parseFloat(val).toFixed(1)) + unit;
}

function _imgUpdatePreview(slide) {
  const img = document.getElementById('img-modal-preview-img');
  if (!img) return;
  img.style.filter = buildImgFilter(slide);
  // Preview shows filter/rotate/flip only — no X/Y offset (canvas-size-dependent)
  const s  = slide.imageScale || 1;
  const r  = slide.imageRotate || 0;
  const fx = slide.imageFlipH ? -1 : 1;
  const fy = slide.imageFlipV ? -1 : 1;
  img.style.transform = `rotate(${r}deg) scale(${Math.min(s, 1.5) * fx}, ${Math.min(s, 1.5) * fy})`;
}

// ── Slider / control handlers ────────────────────────────────────
function onImgBlurChange(value) {
  if (_imgIdx === null) return;
  state.slides[_imgIdx].imageBlur = parseFloat(value);
  _setSlider('img-modal-blur', parseFloat(value), 'px');
  _imgUpdatePreview(state.slides[_imgIdx]);
  updatePreview();
}

function onImgAdjust(field, rawValue, unit) {
  if (_imgIdx === null) return;
  const value = parseFloat(rawValue);
  state.slides[_imgIdx][field] = value;

  // Moving manual adjustment sliders deactivates preset
  if (['imageBrightness', 'imageContrast', 'imageSaturation'].includes(field)) {
    state.slides[_imgIdx].imageFilter = 'none';
    document.querySelectorAll('.img-filter-btn').forEach(b =>
      b.classList.toggle('active', b.dataset.filter === 'none')
    );
  }

  const labelMap = {
    imageBrightness: 'img-modal-brightness-label',
    imageContrast:   'img-modal-contrast-label',
    imageSaturation: 'img-modal-saturation-label',
    imageRotate:     'img-modal-rotate-label',
  };
  const lbl = document.getElementById(labelMap[field]);
  if (lbl) lbl.textContent = Math.round(value) + unit;

  _imgUpdatePreview(state.slides[_imgIdx]);
  updatePreview();
}

function setImgFilter(filterId) {
  if (_imgIdx === null) return;
  const slide = state.slides[_imgIdx];
  slide.imageFilter = filterId;

  // Preset resets manual adjustment sliders to neutral
  if (filterId !== 'none') {
    slide.imageBrightness = 100;
    slide.imageContrast   = 100;
    slide.imageSaturation = 100;
    _setSlider('img-modal-brightness', 100, '%');
    _setSlider('img-modal-contrast',   100, '%');
    _setSlider('img-modal-saturation', 100, '%');
  }

  document.querySelectorAll('.img-filter-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.filter === filterId)
  );

  _imgUpdatePreview(slide);
  updatePreview();
}

function rotateImgStep(deg) {
  if (_imgIdx === null) return;
  const slide = state.slides[_imgIdx];
  let r = ((slide.imageRotate || 0) + deg + 360) % 360;
  if (r > 180) r -= 360;
  slide.imageRotate = r;
  _setSlider('img-modal-rotate', r, '°');
  _imgUpdatePreview(slide);
  updatePreview();
}

function flipImg(axis) {
  if (_imgIdx === null) return;
  const slide = state.slides[_imgIdx];
  if (axis === 'h') slide.imageFlipH = !slide.imageFlipH;
  else              slide.imageFlipV = !slide.imageFlipV;
  document.getElementById('img-flip-h-btn')?.classList.toggle('active', !!slide.imageFlipH);
  document.getElementById('img-flip-v-btn')?.classList.toggle('active', !!slide.imageFlipV);
  _imgUpdatePreview(slide);
  updatePreview();
}

function resetImgAdjustments() {
  if (_imgIdx === null) return;
  const slide = state.slides[_imgIdx];
  Object.assign(slide, {
    imageRotate: 0, imageFlipH: false, imageFlipV: false,
    imageFilter: 'none', imageBlur: 0,
    imageBrightness: 100, imageContrast: 100, imageSaturation: 100,
  });
  _imgPopulateFilters(slide);
  _imgSyncSliders(slide);
  _imgUpdatePreview(slide);
  updatePreview();
}
