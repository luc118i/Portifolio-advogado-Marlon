// ═══════════════════════════════════════════════════════════════
// font-picker.js — Seletor de fonte flutuante por slide
// Abre um popover com as 10 fontes disponíveis (definidas em data.js)
// ═══════════════════════════════════════════════════════════════

let fontPickerTarget = null;

function openFontPicker(index, anchorEl, field = 'headlineFont') {
  fontPickerTarget = { index, field };
  const picker  = document.getElementById('font-picker');
  const inner   = document.getElementById('font-picker-inner');
  const current = state.slides[index]?.[field] || (field === 'bodyFont' ? 'Inter' : 'Playfair Display');

  inner.innerHTML = FONTS.map(f => `
    <div class="font-opt ${f.id === current ? 'active' : ''}"
         style="font-family:'${f.id}', serif"
         onclick="setFont(${index}, '${field}', '${escHtml(f.id)}')">
      ${f.name}
    </div>
  `).join('');

  const rect    = anchorEl.getBoundingClientRect();
  const pickerW = 220;
  const left    = Math.min(rect.left, window.innerWidth - pickerW - 12);
  picker.style.top  = (rect.bottom + 6) + 'px';
  picker.style.left = Math.max(8, left) + 'px';
  picker.classList.remove('hidden');
}

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
