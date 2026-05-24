// ═══════════════════════════════════════════════════════════════
// text-modal.js — Modal de configuração de texto e fonte por slide
// ═══════════════════════════════════════════════════════════════

let _tm      = null;     // { index, field }
let _tmCat   = 'serif';
let _tmQuery = '';       // busca ativa

function openTextModal(index, field) {
  _tm = { index, field };

  const slide      = state.slides[index];
  const isHeadline = field === 'headline';
  const fontField  = isHeadline ? 'headlineFont' : 'bodyFont';
  const curFont    = slide[fontField] || (isHeadline ? 'Playfair Display' : 'Inter');
  const curText    = slide[field] || '';

  document.getElementById('text-modal-title').textContent =
    isHeadline ? 'Editar Headline' : 'Editar Texto';

  // Font category follows the selected font
  const fontObj = FONTS.find(f => f.id === curFont)
                ?? _localFonts?.find(f => f.id === curFont);
  _tmCat   = fontObj?.category || (isHeadline ? 'serif' : 'sans');
  _tmQuery = '';
  const searchEl = document.getElementById('tm-search-input');
  if (searchEl) searchEl.value = '';
  _tmRefreshTabs();
  _tmRenderGrid(curFont);

  // Text field
  const wrap = document.getElementById('text-modal-field-wrap');
  if (isHeadline) {
    wrap.innerHTML = `<input
      id="headline-${index}"
      class="text-modal-input"
      type="text"
      placeholder="Headline do slide..."
      value="${escHtml(curText)}"
      style="font-family:'${escHtml(curFont)}',serif"
      oninput="state.slides[${index}].headline=this.value;updatePreview()"
    />`;
  } else {
    wrap.innerHTML = `<textarea
      id="body-${index}"
      class="text-modal-textarea"
      rows="4"
      placeholder="Texto do slide..."
      style="font-family:'${escHtml(curFont)}',sans-serif"
      oninput="state.slides[${index}].body=this.value;updatePreview()"
    >${escHtml(curText)}</textarea>`;
  }

  // AI buttons — IDs must match what ai.js expects
  const prefix  = isHeadline ? 'headline' : 'body';
  const genBtn  = document.getElementById('text-modal-ai-gen');
  const humBtn  = document.getElementById('text-modal-ai-humanize');

  genBtn.id        = `btn-ai-${prefix}-${index}`;
  genBtn.textContent = isHeadline ? '✦ Gerar headline' : '✦ Gerar texto';
  genBtn.onclick   = () => isHeadline ? aiGenerateHeadline(index) : aiGenerateBody(index);

  humBtn.id        = `btn-humanize-${prefix}-${index}`;
  humBtn.textContent = '◈ Humanizar';
  humBtn.onclick   = () => aiHumanize(index, prefix);

  document.getElementById('text-modal').classList.remove('hidden');

  requestAnimationFrame(() => {
    const el = wrap.querySelector('input,textarea');
    if (el) { el.focus(); el.selectionStart = el.selectionEnd = el.value.length; }
  });
}

function closeTextModal() {
  const modal = document.getElementById('text-modal');
  if (modal.classList.contains('hidden')) return;

  // Reset AI button IDs so they don't persist as stale
  ['headline', 'body'].forEach(prefix => {
    const g = document.getElementById(`btn-ai-${prefix}-${_tm?.index}`);
    const h = document.getElementById(`btn-humanize-${prefix}-${_tm?.index}`);
    if (g) g.id = 'text-modal-ai-gen';
    if (h) h.id = 'text-modal-ai-humanize';
  });

  modal.classList.add('hidden');
  _tm = null;
}

function applyTextModal() {
  if (!_tm) { closeTextModal(); return; }
  const idx = _tm.index;
  closeTextModal();
  renderSlidesForms();
  selectSlide(idx);
}

function switchFontCategory(cat) {
  _tmCat   = cat;
  _tmQuery = '';
  const searchEl = document.getElementById('tm-search-input');
  if (searchEl) searchEl.value = '';
  _tmRefreshTabs();
  _tmToggleSortBar(cat === 'local');
  if (!_tm) return;
  const { index, field } = _tm;
  const fontField = field === 'headline' ? 'headlineFont' : 'bodyFont';
  _tmRenderGrid(state.slides[index]?.[fontField]);
}

function _tmToggleSortBar(show) {
  const bar = document.getElementById('font-sort-bar-modal');
  if (!bar) return;
  bar.classList.toggle('hidden', !show);
  // Sincroniza chips com o modo atual
  if (show && typeof _localSortMode !== 'undefined') {
    bar.querySelectorAll('.font-sort-chip').forEach(c =>
      c.classList.toggle('active', c.dataset.mode === _localSortMode)
    );
  }
}

// Chamado por sortLocalFonts() para re-renderizar o grid do modal
function _tmSyncSort() {
  if (!_tm) return;
  const modal = document.getElementById('text-modal');
  if (modal?.classList.contains('hidden')) return;
  const fontField = _tm.field === 'headline' ? 'headlineFont' : 'bodyFont';
  _tmRenderGrid(state.slides[_tm.index]?.[fontField]);
  // Sincroniza chips
  _tmToggleSortBar(_tmCat === 'local');
}

function _tmRefreshTabs() {
  document.querySelectorAll('.font-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.cat === _tmCat);
  });
}

function _tmRenderGrid(selectedFont) {
  const grid = document.getElementById('text-modal-font-grid');
  if (!grid) return;
  let fonts;
  if (_tmQuery) {
    // Busca em todas as categorias (Google + sistema)
    const q = _tmQuery.toLowerCase();
    fonts = [...FONTS, ...(_localFonts || [])].filter(f => f.name.toLowerCase().includes(q));
  } else {
    fonts = _tmCat === 'local'
      ? (_localFonts || [])
      : FONTS.filter(f => f.category === _tmCat);
  }
  if (!fonts.length) {
    grid.innerHTML = `<div class="tm-no-results">Nenhuma fonte encontrada</div>`;
    return;
  }
  grid.innerHTML = fonts.map(f => {
    const safe = f.id.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    return `
      <button class="font-card ${f.id === selectedFont ? 'active' : ''}"
              onclick="selectModalFont('${safe}')"
              style="font-family:'${f.id}',sans-serif">
        <div class="font-card-preview">Aa</div>
        <div class="font-card-name">${f.name}</div>
        <div class="font-card-desc">${f.desc}</div>
      </button>`;
  }).join('');
}

// Filtro de busca em tempo real
function _tmFilter(query) {
  _tmQuery = (query || '').trim();
  if (!_tm) return;
  const { index, field } = _tm;
  const fontField = field === 'headline' ? 'headlineFont' : 'bodyFont';
  _tmRenderGrid(state.slides[index]?.[fontField]);
}

// Chamado pelo font-picker.js após carregar fontes do sistema
function _tmAfterLoad() {
  // Mostra aba "Sistema"
  document.getElementById('tm-tab-system')?.classList.remove('hidden');
  // Esconde botão "Carregar fontes do sistema"
  const sysBar = document.getElementById('tm-system-bar');
  if (sysBar) sysBar.style.display = 'none';
  // Se modal está aberto, vai para aba Sistema (que mostra a sort bar)
  if (_tm) switchFontCategory('local');
}

function selectModalFont(fontId) {
  if (!_tm) return;
  const { index, field } = _tm;
  const fontField = field === 'headline' ? 'headlineFont' : 'bodyFont';
  state.slides[index][fontField] = fontId;

  // Update text field font preview live
  const textEl = document.getElementById(
    field === 'headline' ? `headline-${index}` : `body-${index}`
  );
  if (textEl) textEl.style.fontFamily = `'${fontId}', serif`;

  _tmRenderGrid(fontId);
  updatePreview();
}

// Escape applies and closes the modal
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  const modal = document.getElementById('text-modal');
  if (modal && !modal.classList.contains('hidden')) applyTextModal();
});
