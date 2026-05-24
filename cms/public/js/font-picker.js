// ═══════════════════════════════════════════════════════════════
// font-picker.js — Seletor de fonte flutuante por slide
// Fontes Google em data.js · Fontes do sistema via queryLocalFonts()
// ═══════════════════════════════════════════════════════════════

let fontPickerTarget  = null;
let _localFonts       = [];      // fontes do sistema carregadas (ordenadas)
let _localFontsOrig   = [];      // ordem original do sistema
let _localLoaded      = false;   // evita múltiplas requisições de permissão
let _localSortMode    = 'az';    // 'az' | 'za' | 'orig'

const FONT_GROUPS = [
  { key: 'serif',   label: 'Serif · Editorial'    },
  { key: 'sans',    label: 'Sans-serif · Moderno' },
  { key: 'display', label: 'Display · Impact'      },
];

// ── Abrir picker ──────────────────────────────────────────────

function openFontPicker(index, anchorEl, field = 'headlineFont') {
  fontPickerTarget = { index, field };

  const picker  = document.getElementById('font-picker');
  const input   = document.getElementById('font-search-input');
  if (input) input.value = '';  // limpa busca ao abrir

  _fpRender(index, field);

  const rect    = anchorEl.getBoundingClientRect();
  const pickerW = 260;
  const left    = Math.min(rect.left, window.innerWidth - pickerW - 12);
  picker.style.top  = (rect.bottom + 6) + 'px';
  picker.style.left = Math.max(8, left) + 'px';
  picker.classList.remove('hidden');

  // Foca no campo de busca
  requestAnimationFrame(() => input?.focus());
}

// ── Renderizar lista de fontes ────────────────────────────────

function _fpRender(index, field) {
  if (!fontPickerTarget) return;
  const idx     = index     ?? fontPickerTarget.index;
  const fld     = field     ?? fontPickerTarget.field;
  const current = state.slides[idx]?.[fld] || (fld === 'bodyFont' ? 'Inter' : 'Playfair Display');
  const inner   = document.getElementById('font-picker-inner');
  if (!inner) return;

  // Google Fonts agrupadas
  let html = FONT_GROUPS.map(g => {
    const fonts = FONTS.filter(f => f.category === g.key);
    if (!fonts.length) return '';
    return `
      <div class="font-separator" data-group="${g.key}">${g.label}</div>
      ${fonts.map(f => _fpItem(f, current, idx, fld)).join('')}`;
  }).join('');

  // Fontes do sistema (se carregadas)
  if (_localFonts.length) {
    html += `
      <div class="font-separator" data-group="local">
        Fontes do sistema <span class="font-local-count">${_localFonts.length}</span>
      </div>
      ${_fontSortBarHtml('picker')}
      ${_localFonts.map(f => _fpItem(f, current, idx, fld)).join('')}`;
  }

  inner.innerHTML = html;
  _fpFilter(document.getElementById('font-search-input')?.value || '');
}

function _fpItem(f, current, index, field) {
  const safe = f.id.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  return `
    <div class="font-opt ${f.id === current ? 'active' : ''}"
         data-name="${f.name.toLowerCase()}"
         style="font-family:'${f.id}', sans-serif"
         onclick="setFont(${index}, '${field}', '${safe}')">
      <span class="font-opt-name">${f.name}</span>
      <span class="font-opt-desc">${f.desc}</span>
    </div>`;
}

// ── Filtro por busca ──────────────────────────────────────────

function _fpFilter(query) {
  const q = (query || '').toLowerCase().trim();
  const inner = document.getElementById('font-picker-inner');
  if (!inner) return;

  inner.querySelectorAll('.font-opt').forEach(el => {
    el.style.display = (!q || el.dataset.name.includes(q)) ? '' : 'none';
  });

  // Esconde separadores cujo grupo não tem resultados visíveis
  inner.querySelectorAll('.font-separator').forEach(sep => {
    let next = sep.nextElementSibling;
    let has  = false;
    while (next && !next.classList.contains('font-separator')) {
      if (next.style.display !== 'none') { has = true; break; }
      next = next.nextElementSibling;
    }
    sep.style.display = has ? '' : 'none';
  });
}

// ── Ordenação das fontes do sistema ──────────────────────────

function sortLocalFonts(mode) {
  _localSortMode = mode;
  switch (mode) {
    case 'az':
      _localFonts = [..._localFontsOrig].sort((a, b) => a.name.localeCompare(b.name, 'pt'));
      break;
    case 'za':
      _localFonts = [..._localFontsOrig].sort((a, b) => b.name.localeCompare(a.name, 'pt'));
      break;
    default: // 'orig'
      _localFonts = [..._localFontsOrig];
  }
  // Atualiza chips de sort
  document.querySelectorAll('.font-sort-chip').forEach(c =>
    c.classList.toggle('active', c.dataset.mode === mode)
  );
  // Re-renderiza o popover se estiver aberto
  if (!document.getElementById('font-picker')?.classList.contains('hidden')) {
    _fpRender();
  }
  // Re-renderiza o modal se estiver aberto na aba Sistema
  if (typeof _tmSyncSort === 'function') _tmSyncSort();
}

// HTML reutilizável da barra de ordenação
function _fontSortBarHtml(ctx) {
  // ctx: 'picker' | 'modal'
  const cls = ctx === 'modal' ? 'font-sort-bar font-sort-bar--modal' : 'font-sort-bar';
  return `
    <div class="${cls}" id="font-sort-bar-${ctx}">
      <span class="font-sort-label">Ordenar</span>
      <button class="font-sort-chip ${_localSortMode==='az'  ?'active':''}" data-mode="az"   onclick="sortLocalFonts('az')">A → Z</button>
      <button class="font-sort-chip ${_localSortMode==='za'  ?'active':''}" data-mode="za"   onclick="sortLocalFonts('za')">Z → A</button>
      <button class="font-sort-chip ${_localSortMode==='orig'?'active':''}" data-mode="orig" onclick="sortLocalFonts('orig')">Padrão do sistema</button>
    </div>`;
}

// ── Carregar fontes do sistema (Local Font Access API) ────────

async function loadSystemFonts() {
  const btn = document.getElementById('font-load-btn');

  if (_localLoaded) {
    // Já carregado — só re-renderiza (útil se picker foi fechado e aberto)
    _fpRender();
    return;
  }

  if (!('queryLocalFonts' in window)) {
    toast('Fontes do sistema requerem Chrome ou Edge 103+.', 'warning');
    return;
  }

  if (btn) { btn.disabled = true; btn.textContent = 'Carregando…'; }

  try {
    const available = await window.queryLocalFonts();

    // Deduplica por família — prefere o estilo "Regular"
    const map = new Map();
    for (const f of available) {
      if (!map.has(f.family) || f.style === 'Regular') {
        map.set(f.family, f);
      }
    }

    const families = [...map.values()];

    // Registra @font-face via local() para cada família
    const existing = document.getElementById('_local-fonts-style');
    if (existing) existing.remove();
    const styleEl = document.createElement('style');
    styleEl.id = '_local-fonts-style';
    styleEl.textContent = families.map(f =>
      `@font-face { font-family: '${f.family.replace(/'/g, "\\'")}'; src: local('${f.postscriptName.replace(/'/g, "\\'")}'); }`
    ).join('\n');
    document.head.appendChild(styleEl);

    // Constrói lista completa na ordem nativa do sistema
    _localFontsOrig = families.map(f => ({
      id:       f.family,
      name:     f.family,
      category: 'local',
      desc:     'Sistema',
    }));

    // Aplica ordenação inicial (A→Z)
    _localSortMode = 'az';
    _localFonts = [..._localFontsOrig].sort((a, b) => a.name.localeCompare(b.name, 'pt'));

    _localLoaded = true;

    // Esconde botão no popover e re-renderiza
    const bar = document.getElementById('font-local-bar');
    if (bar) bar.style.display = 'none';

    _fpRender();

    // Notifica o modal de texto (text-modal.js)
    if (typeof _tmAfterLoad === 'function') _tmAfterLoad();

    toast(`${_localFonts.length} fontes do sistema carregadas.`, 'success');

  } catch (err) {
    if (err.name === 'NotAllowedError') {
      toast('Permissão negada pelo navegador.', 'warning');
    } else {
      toast('Erro ao acessar fontes: ' + err.message, 'error');
    }
    if (btn) { btn.disabled = false; btn.textContent = 'Fontes do sistema'; }
  }
}

// ── Aplicar fonte ─────────────────────────────────────────────

function setFont(index, field, fontId) {
  if (state.slides[index]) state.slides[index][field] = fontId;
  closeFontPicker();
  renderSlidesForms();
  selectSlide(index);
}

function closeFontPicker() {
  document.getElementById('font-picker').classList.add('hidden');
  fontPickerTarget = null;
}
