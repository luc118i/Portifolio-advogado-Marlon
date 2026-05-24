// ═══════════════════════════════════════════════════════════════
// studio.js — Layout do estúdio: sidebar, toolbar, fullscreen,
//             breadcrumb, zoom. Carregado depois de wizard.js.
// ═══════════════════════════════════════════════════════════════

// ── Sidebar ─────────────────────────────────────────────────────
let sidebarExpanded = false;

function toggleSidebar() {
  sidebarExpanded = !sidebarExpanded;
  document.getElementById('studio-layout')
    .classList.toggle('sidebar-open', sidebarExpanded);
}

function setNavActive(section) {
  document.querySelectorAll('.sidebar-item[data-nav]').forEach(el => {
    el.classList.toggle('active', el.dataset.nav === section);
  });
}

// ── Reset studio ─────────────────────────────────────────────────
async function resetStudio() {
  const ok = await showConfirm('Iniciar novo post? O rascunho atual será perdido.', 'Novo post', false);
  if (!ok) return;
  location.reload();
}

// ── Grid guides ─────────────────────────────────────────────────
let gridVisible = false;

function toggleGrid() {
  gridVisible = !gridVisible;
  document.getElementById('editor-canvas')
    .classList.toggle('show-grid', gridVisible);
  document.getElementById('toolbar-grid-btn')
    .classList.toggle('active', gridVisible);
}

// ── Zoom ────────────────────────────────────────────────────────
let zoomLevel = 100;

function studioZoomIn() {
  zoomLevel = Math.min(zoomLevel + 10, 150);
  applyZoom();
}

function studioZoomOut() {
  zoomLevel = Math.max(zoomLevel - 10, 70);
  applyZoom();
}

function applyZoom() {
  const el = document.getElementById('toolbar-zoom');
  if (el) el.textContent = zoomLevel + '%';
  const scroll = document.querySelector('.editor-canvas-scroll');
  if (scroll) scroll.style.zoom = (zoomLevel / 100).toFixed(2);
}

// ── Preview modes ────────────────────────────────────────────────
let currentPreviewMode = 'story';

function setPreviewMode(formatId) {
  // Mapear IDs legados
  const legacyMap = { mobile: 'story', social: 'feed', desktop: 'youtube' };
  formatId = legacyMap[formatId] || formatId;

  if (typeof state !== 'undefined') state.format = formatId;
  currentPreviewMode = formatId;

  // Atualizar chips ativos
  document.querySelectorAll('.format-chip').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.format === formatId);
  });

  // Atualizar classe no preview body
  const body = document.querySelector('.preview-panel-body');
  if (body) {
    [...body.classList].filter(c => c.startsWith('mode-')).forEach(c => body.classList.remove(c));
    body.classList.add(`mode-${formatId}`);
  }

  // Atualizar label
  const fmt = typeof FORMATS !== 'undefined' ? FORMATS.find(f => f.id === formatId) : null;
  const label = document.getElementById('preview-mode-label');
  if (label && fmt) label.textContent = `${fmt.name} · ${fmt.ratio}`;
}

// ── Breadcrumb + toolbar step sync ──────────────────────────────
function syncStudioUI(n) {
  // Breadcrumb items
  document.querySelectorAll('.breadcrumb-item[data-step]').forEach(el => {
    const s = parseInt(el.dataset.step, 10);
    el.classList.remove('active', 'done');
    if (s === n) el.classList.add('active');
    else if (s < n) el.classList.add('done');
  });

  // Toolbar step label
  const label = document.getElementById('toolbar-step');
  if (label) label.textContent = `Passo ${n} de 5`;

  // Show step-5 quick actions only on step 5
  const step5 = document.getElementById('toolbar-step5-actions');
  if (step5) step5.style.display = n === 5 ? '' : 'none';
}

// ── Toolbar badges sync ──────────────────────────────────────────
function syncToolbarBadges() {
  if (typeof state === 'undefined') return;
  const typeBadge = document.getElementById('toolbar-type-badge');
  const catBadge  = document.getElementById('toolbar-cat-badge');
  if (typeBadge) typeBadge.textContent = state.type === 'carousel' ? 'Carrossel' : 'Artigo';
  if (catBadge)  catBadge.textContent  = state.category || 'Categoria';
}

// ── Fullscreen preview ───────────────────────────────────────────
function expandPreview() {
  const overlay = document.getElementById('preview-fullscreen');
  const fsCard  = document.getElementById('preview-fullscreen-card');
  const source  = document.getElementById('preview-card');

  if (fsCard && source) {
    fsCard.innerHTML = source.innerHTML;
    // Copy inline style (bg color set by JS)
    fsCard.style.cssText = source.style.cssText;
  }

  updateFullscreenCounter();
  overlay.classList.remove('hidden');
}

function closeFullscreen() {
  document.getElementById('preview-fullscreen').classList.add('hidden');
}

function fullscreenPrev() {
  if (typeof prevSlide === 'function') prevSlide();
  // Re-sync card after slide changes
  requestAnimationFrame(() => {
    const fsCard = document.getElementById('preview-fullscreen-card');
    const source = document.getElementById('preview-card');
    if (fsCard && source) {
      fsCard.innerHTML = source.innerHTML;
      fsCard.style.cssText = source.style.cssText;
    }
    updateFullscreenCounter();
  });
}

function fullscreenNext() {
  if (typeof nextSlide === 'function') nextSlide();
  requestAnimationFrame(() => {
    const fsCard = document.getElementById('preview-fullscreen-card');
    const source = document.getElementById('preview-card');
    if (fsCard && source) {
      fsCard.innerHTML = source.innerHTML;
      fsCard.style.cssText = source.style.cssText;
    }
    updateFullscreenCounter();
  });
}

function updateFullscreenCounter() {
  const counter = document.getElementById('fullscreen-counter');
  const source  = document.getElementById('slide-counter');
  if (counter && source) counter.textContent = source.textContent;
}

// ── Keyboard shortcuts ───────────────────────────────────────────
document.addEventListener('keydown', (e) => {
  const fs = document.getElementById('preview-fullscreen');
  if (!fs || fs.classList.contains('hidden')) return;
  if (e.key === 'Escape')     closeFullscreen();
  if (e.key === 'ArrowLeft')  fullscreenPrev();
  if (e.key === 'ArrowRight') fullscreenNext();
});

// ── Assets panel ────────────────────────────────────────────────
function openAssetsPanel() {
  setNavActive('assets');
  const imgs = state.slides
    .map((s, i) => ({ src: s.imagePath, index: i }))
    .filter(item => item.src);

  const grid  = document.getElementById('assets-grid');
  const empty = document.getElementById('assets-empty');

  if (imgs.length === 0) {
    grid.classList.add('hidden');
    empty.classList.remove('hidden');
  } else {
    empty.classList.add('hidden');
    grid.classList.remove('hidden');
    grid.innerHTML = imgs.map(({ src, index }) => `
      <div class="asset-thumb" onclick="selectSlide(${index});closeAssetsPanel();activateStep(5)">
        <img src="${src}" alt="Slide ${index + 1}">
        <span class="asset-slide-label">Slide ${index + 1}</span>
      </div>
    `).join('');
  }
  document.getElementById('assets-modal').classList.remove('hidden');
}

function closeAssetsPanel() {
  document.getElementById('assets-modal').classList.add('hidden');
  setNavActive('editor');
}

// ── Templates panel ──────────────────────────────────────────────
function openTemplatesPanel() {
  setNavActive('templates');
  const grid = document.getElementById('templates-grid');
  grid.innerHTML = PRESET_TEMPLATES.map((t, i) => `
    <button class="template-card" onclick="applyTemplate(${i})">
      <div class="template-card-icon">${t.icon}</div>
      <div class="template-card-name">${t.name}</div>
      <div class="template-card-desc">${t.desc}</div>
    </button>
  `).join('');
  document.getElementById('templates-modal').classList.remove('hidden');
}

function closeTemplatesPanel() {
  document.getElementById('templates-modal').classList.add('hidden');
  setNavActive('editor');
}

function applyTemplate(idx) {
  const tpl = PRESET_TEMPLATES[idx];

  state.category    = tpl.category;
  state.type        = 'carousel';
  state.currentSlide = 0;
  state.slides      = tpl.slides.map(s => ({
    ...createEmptySlide(),
    headline: s.headline,
    body:     s.body,
    layout:   s.layout,
  }));

  // Sync category UI
  document.querySelectorAll('.cat-card').forEach(el => {
    el.classList.toggle('active', el.dataset.cat === tpl.category);
  });

  // Force carousel mode in UI
  document.getElementById('card-carousel')?.classList.add('active');
  document.getElementById('card-article')?.classList.remove('active');
  document.getElementById('slides-section')?.classList.remove('hidden');
  document.getElementById('article-section')?.classList.add('hidden');

  // Update chips for all completed steps
  for (let i = 1; i <= 4; i++) updateChip(i);

  closeTemplatesPanel();
  activateStep(5);
  renderSlidesForms();
  selectSlide(0);
  updatePreview();
}

function renderFormatPicker() {
  const bar = document.getElementById('format-bar');
  if (!bar || typeof FORMATS === 'undefined') return;
  const cur = (typeof state !== 'undefined' ? state.format : null) || 'story';
  bar.innerHTML = FORMATS.map(f => `
    <button class="format-chip${f.id === cur ? ' active' : ''}"
            data-format="${f.id}"
            onclick="setPreviewMode('${f.id}')"
            title="${f.name} · ${f.ratio}">
      <span class="format-chip-name">${f.name}</span>
      <span class="format-chip-ratio">${f.ratio}</span>
    </button>
  `).join('');
}

// ── Boot: patch activateStep + updatePreview after all scripts load ──
document.addEventListener('DOMContentLoaded', () => {
  // Patch activateStep (defined in wizard.js)
  if (typeof activateStep === 'function' && !window._studioPatchApplied) {
    const _orig = window.activateStep;
    window.activateStep = function(n) {
      _orig(n);
      syncStudioUI(n);
    };
    window._studioPatchApplied = true;
  }

  // Patch updatePreview (defined in preview.js)
  if (typeof updatePreview === 'function' && !window._studioPreviewPatch) {
    const _origPrev = window.updatePreview;
    window.updatePreview = function() {
      _origPrev();
      syncToolbarBadges();
    };
    window._studioPreviewPatch = true;
  }

  // Initial sync
  syncStudioUI(1);
  syncToolbarBadges();
  renderFormatPicker();
  setPreviewMode('story');
});
