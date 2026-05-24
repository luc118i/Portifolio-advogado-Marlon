// ═══════════════════════════════════════════════════════════════
// FONTES DISPONÍVEIS
// ═══════════════════════════════════════════════════════════════
const FONTS = [
  { id: 'Playfair Display',   name: 'Playfair Display'   },
  { id: 'Cormorant Garamond', name: 'Cormorant Garamond'  },
  { id: 'EB Garamond',        name: 'EB Garamond'         },
  { id: 'Lora',               name: 'Lora'                },
  { id: 'Merriweather',       name: 'Merriweather'        },
  { id: 'Crimson Text',       name: 'Crimson Text'        },
  { id: 'Source Serif 4',     name: 'Source Serif 4'      },
  { id: 'PT Serif',           name: 'PT Serif'            },
  { id: 'Spectral',           name: 'Spectral'            },
  { id: 'Libre Baskerville',  name: 'Libre Baskerville'   },
];

// ═══════════════════════════════════════════════════════════════
// LAYOUTS DE COMPOSIÇÃO
// ═══════════════════════════════════════════════════════════════
const LAYOUTS = [
  {
    id: 'default',
    name: 'Padrão',
    mini: `<div style="height:3px;background:rgba(255,255,255,0.15);margin-bottom:4px;width:40%"></div>
           <div style="height:5px;background:rgba(255,255,255,0.5);margin-bottom:3px"></div>
           <div style="height:3px;background:rgba(255,255,255,0.25);width:80%"></div>`,
  },
  {
    id: 'dica-semana',
    name: 'Dica',
    mini: `<div style="text-align:center;font-size:6px;color:rgba(255,255,255,0.5);margin-bottom:3px">✦ DICA</div>
           <div style="width:16px;height:16px;border-radius:50%;background:rgba(255,255,255,0.1);margin:0 auto 3px;display:flex;align-items:center;justify-content:center;font-size:9px">💡</div>
           <div style="height:4px;background:rgba(255,255,255,0.4);margin-bottom:2px;width:90%;margin-left:auto;margin-right:auto;border-radius:2px"></div>`,
  },
  {
    id: 'voce-sabia',
    name: 'Sabia?',
    mini: `<div style="font-size:6px;font-weight:700;margin-bottom:3px;opacity:0.9">VOCÊ SABIA?</div>
           <div style="height:1px;background:rgba(255,255,255,0.4);margin-bottom:4px"></div>
           <div style="height:4px;background:rgba(255,255,255,0.5);margin-bottom:2px;border-radius:2px"></div>
           <div style="height:3px;background:rgba(255,255,255,0.2);width:70%;border-radius:2px"></div>`,
  },
  {
    id: 'caso-real',
    name: 'Caso Real',
    mini: `<div style="display:inline-block;font-size:5px;border:1px solid rgba(255,255,255,0.4);padding:1px 4px;border-radius:2px;margin-bottom:4px;opacity:0.8">⚖ CASO REAL</div>
           <div style="height:4px;background:rgba(255,255,255,0.5);margin-bottom:2px;border-radius:2px"></div>
           <div style="height:3px;background:rgba(255,255,255,0.3);width:85%;margin-bottom:2px;border-radius:2px"></div>
           <div style="height:3px;background:rgba(255,255,255,0.15);width:60%;border-radius:2px"></div>`,
  },
  {
    id: 'mito-verdade',
    name: 'Mito?',
    mini: `<div style="font-size:5px;font-weight:700;margin-bottom:3px;opacity:0.7">MITO OU VERDADE?</div>
           <div style="border:1px solid rgba(255,255,255,0.3);padding:2px 3px;border-radius:2px;margin-bottom:4px">
             <div style="height:3px;background:rgba(255,255,255,0.4);border-radius:1px"></div>
           </div>
           <div style="font-size:5px;font-weight:700;opacity:0.9">✓ VERDADE</div>`,
  },
  {
    id: 'foco',
    name: 'Foco',
    mini: `<div style="height:2px;background:rgba(255,255,255,0.5);width:30%;margin-bottom:4px"></div>
           <div style="height:7px;background:rgba(255,255,255,0.6);margin-bottom:2px;border-radius:1px"></div>
           <div style="height:5px;background:rgba(255,255,255,0.4);width:80%;margin-bottom:4px;border-radius:1px"></div>
           <div style="height:2px;background:rgba(255,255,255,0.3);width:40%"></div>`,
  },
];

// ═══════════════════════════════════════════════════════════════
// TEMPLATES POR ÁREA
// ═══════════════════════════════════════════════════════════════
const TEMPLATES = {
  'Direito Penal': {
    bg:     'linear-gradient(135deg, #1A0808 0%, #2D0E0E 100%)',
    accent: '#8B1A1A',
    label:  'DIREITO PENAL',
    icon:   `<svg width="180" height="180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" style="color:#8B1A1A">
               <path d="M14 6l-1-2H5v17h2v-7h5.5l1 2H20V6h-6z"/>
             </svg>`,
  },
  'Direito Administrativo': {
    bg:     'linear-gradient(135deg, #080A1A 0%, #0E1230 100%)',
    accent: '#1A3A8B',
    label:  'DIREITO ADMINISTRATIVO',
    icon:   `<svg width="180" height="180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" style="color:#1A3A8B">
               <path d="M3 22V9l9-7 9 7v13"/><path d="M9 22V12h6v10"/>
             </svg>`,
  },
  'Direito Civil': {
    bg:     'linear-gradient(135deg, #081A0A 0%, #0E2E12 100%)',
    accent: '#1A6B2E',
    label:  'DIREITO CIVIL',
    icon:   `<svg width="180" height="180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" style="color:#1A6B2E">
               <path d="M12 3L3 7l9 4 9-4-9-4z"/><path d="M3 12l9 4 9-4"/><path d="M3 17l9 4 9-4"/>
             </svg>`,
  },
  'Consultoria Jurídica': {
    bg:     'linear-gradient(135deg, #1A1400 0%, #2D2200 100%)',
    accent: '#C9A96E',
    label:  'CONSULTORIA JURÍDICA',
    icon:   `<svg width="180" height="180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" style="color:#C9A96E">
               <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
             </svg>`,
  },
  'Tecnologia e IA Jurídica': {
    bg:     'linear-gradient(135deg, #0F0820 0%, #180E35 100%)',
    accent: '#5A1A9B',
    label:  'TECNOLOGIA E IA',
    icon:   `<svg width="180" height="180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" style="color:#5A1A9B">
               <rect x="9" y="2" width="6" height="6"/><rect x="9" y="16" width="6" height="6"/>
               <rect x="2" y="9" width="6" height="6"/><rect x="16" y="9" width="6" height="6"/>
               <line x1="9" y1="5" x2="2" y2="5"/><line x1="22" y1="5" x2="15" y2="5"/>
               <line x1="5" y1="9" x2="5" y2="2"/><line x1="5" y1="22" x2="5" y2="15"/>
               <line x1="9" y1="19" x2="2" y2="19"/><line x1="22" y1="19" x2="15" y2="19"/>
               <line x1="19" y1="9" x2="19" y2="2"/><line x1="19" y1="22" x2="19" y2="15"/>
             </svg>`,
  },
};

// ═══════════════════════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════════════════════
let state = {
  type:         'carousel',
  category:     'Direito Penal',
  title:        '',
  slug:         '',
  readTime:     '3 min',
  logoPosition: 'footer',
  currentSlide: 0,
  slides: [createEmptySlide()],
  // artigo
  coverImagePath: null,
  excerpt:        '',
  content:        '',
};

let currentStep  = 1;
let publishedUrl = null;

// ═══════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════
function createEmptySlide() {
  return {
    type: 'content', layout: 'default',
    imagePath: null, imageX: 0, imageY: 0, imageScale: 1,
    headline: '', body: '',
    headlineFont: 'Playfair Display',
  };
}
function createCtaSlide() {
  return {
    type: 'cta',
    headline: 'Está com dúvidas jurídicas?',
    body: 'Fale comigo antes de tomar qualquer decisão.',
    headlineFont: 'Playfair Display',
  };
}

function generateSlug(title) {
  return title.toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-').replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function getLogoPos() {
  return document.querySelector('input[name="logoPos"]:checked')?.value || 'footer';
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

// ═══════════════════════════════════════════════════════════════
// STEPPER — WIZARD
// ═══════════════════════════════════════════════════════════════
function activateStep(n) {
  for (let i = 1; i <= 5; i++) {
    const el = document.getElementById(`step-${i}`);
    if (!el) continue;
    el.classList.remove('active', 'locked', 'completed');
    if (i === n)      el.classList.add('active');
    else if (i < n)   el.classList.add('completed');
    else              el.classList.add('locked');
  }
  currentStep = n;
}

function nextStep() {
  updateChip(currentStep);
  if (currentStep < 5) activateStep(currentStep + 1);
}

function updateChip(step) {
  const chip = document.getElementById(`chip-${step}`);
  if (!chip) return;
  switch (step) {
    case 1:
      chip.textContent = state.type === 'carousel' ? 'Carrossel' : 'Artigo';
      break;
    case 2:
      chip.textContent = state.category;
      break;
    case 3: {
      const t = state.title;
      chip.textContent = t ? (t.length > 26 ? t.slice(0, 23) + '…' : t) : '';
      break;
    }
    case 4: {
      const pos = getLogoPos();
      chip.textContent = pos === 'footer' ? 'Rodapé' : pos === 'watermark' ? 'Marca d\'água' : 'Slide final';
      break;
    }
    case 5:
      chip.textContent = state.type === 'carousel'
        ? `${state.slides.length} slide(s)`
        : 'Artigo';
      break;
  }
}

// ═══════════════════════════════════════════════════════════════
// TIPO
// ═══════════════════════════════════════════════════════════════
function setType(t) {
  state.type = t;
  document.getElementById('card-carousel').classList.toggle('active', t === 'carousel');
  document.getElementById('card-article').classList.toggle('active',  t === 'article');
  document.getElementById('slides-section').classList.toggle('hidden',  t !== 'carousel');
  document.getElementById('article-section').classList.toggle('hidden', t !== 'article');
  updatePreview();
}

// ═══════════════════════════════════════════════════════════════
// CATEGORIA
// ═══════════════════════════════════════════════════════════════
function selectCategory(el) {
  document.querySelectorAll('.cat-card').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  state.category = el.dataset.cat;
  updatePreview();
}

// ═══════════════════════════════════════════════════════════════
// TÍTULO → SLUG
// ═══════════════════════════════════════════════════════════════
function onTitleInput() {
  state.title = document.getElementById('title').value;
  state.slug  = generateSlug(state.title);
  document.getElementById('slug-preview').textContent = state.slug || '—';
  updatePreview();
}

// ═══════════════════════════════════════════════════════════════
// FONT PICKER
// ═══════════════════════════════════════════════════════════════
let fontPickerTarget = null;

function openFontPicker(index, anchorEl) {
  fontPickerTarget = index;
  const picker = document.getElementById('font-picker');
  const inner  = document.getElementById('font-picker-inner');
  const current = state.slides[index]?.headlineFont || FONTS[0].id;

  inner.innerHTML = FONTS.map(f => `
    <div class="font-opt ${f.id === current ? 'active' : ''}"
         style="font-family:'${f.id}', serif"
         onclick="setFont(${index}, '${escHtml(f.id)}')">
      ${f.name}
    </div>
  `).join('');

  const rect = anchorEl.getBoundingClientRect();
  picker.style.top  = (rect.bottom + 6) + 'px';
  // Clamp to viewport width
  const pickerW = 220;
  const left = Math.min(rect.left, window.innerWidth - pickerW - 12);
  picker.style.left = Math.max(8, left) + 'px';
  picker.classList.remove('hidden');
}

function setFont(index, fontId) {
  if (state.slides[index]) {
    state.slides[index].headlineFont = fontId;
  }
  closeFontPicker();
  renderSlidesForms();
  selectSlide(index);
}

function closeFontPicker() {
  document.getElementById('font-picker').classList.add('hidden');
  fontPickerTarget = null;
}

// ═══════════════════════════════════════════════════════════════
// SLIDES — FORM
// ═══════════════════════════════════════════════════════════════
function addSlide() {
  state.slides.push(createEmptySlide());
  renderSlidesForms();
  selectSlide(state.slides.length - 1);
}

function addCtaSlide() {
  state.slides = state.slides.filter(s => s.type !== 'cta');
  state.slides.push(createCtaSlide());
  renderSlidesForms();
  selectSlide(state.slides.length - 1);
}

function removeSlide(index) {
  if (state.slides.length <= 1) return;
  state.slides.splice(index, 1);
  if (state.currentSlide >= state.slides.length) state.currentSlide = state.slides.length - 1;
  renderSlidesForms();
  updatePreview();
}

function moveSlide(index, dir) {
  const target = index + dir;
  if (target < 0 || target >= state.slides.length) return;
  [state.slides[index], state.slides[target]] = [state.slides[target], state.slides[index]];
  renderSlidesForms();
  selectSlide(target);
}

function selectSlide(index) {
  state.currentSlide = index;
  document.querySelectorAll('.slide-card').forEach((el, i) => {
    el.classList.toggle('selected', i === index);
  });
  updatePreview();
}

function renderSlidesForms() {
  const container = document.getElementById('slides-container');
  container.innerHTML = '';
  state.slides.forEach((slide, i) => renderSlideForm(slide, i, container));
}

function renderSlideForm(slide, index, container) {
  const isCta      = slide.type === 'cta';
  const font       = slide.headlineFont || 'Playfair Display';
  const fontShort  = font.split(' ')[0];
  const card       = document.createElement('div');
  card.className   = `slide-card${state.currentSlide === index ? ' selected' : ''}${isCta ? ' cta-card' : ''}`;
  card.onclick     = () => selectSlide(index);

  card.innerHTML = `
    <div class="slide-card-header">
      <span class="slide-num ${isCta ? 'cta-num' : ''}">
        ${isCta ? '★ CTA FINAL' : `SLIDE ${index + 1}`}
      </span>
      <div class="slide-actions" onclick="event.stopPropagation()">
        ${index > 0 ? `<button onclick="moveSlide(${index}, -1)" title="Mover para cima">↑</button>` : ''}
        ${index < state.slides.length - 1 ? `<button onclick="moveSlide(${index}, 1)" title="Mover para baixo">↓</button>` : ''}
        ${state.slides.length > 1 ? `<button class="btn-rm" onclick="removeSlide(${index})" title="Remover">✕</button>` : ''}
      </div>
    </div>

    ${!isCta ? `
    ${slide.imagePath ? `
    <div class="img-editor-wrap" onclick="event.stopPropagation()">
      <div class="img-canvas" id="img-canvas-${index}"
           onmousedown="startImgDrag(event,${index})"
           onwheel="wheelZoom(event,${index})">
        <img id="editor-img-${index}"
             src="${slide.imagePath}"
             class="editor-img"
             style="transform:translate(calc(-50% + ${slide.imageX||0}px), calc(-50% + ${slide.imageY||0}px)) scale(${slide.imageScale||1})"
             draggable="false">
        <div class="img-canvas-hint">Arraste para reposicionar · Scroll para zoom</div>
      </div>
      <div class="img-editor-controls">
        <button class="img-ctrl-btn" onclick="zoomStep(${index},-0.1)" title="Diminuir zoom">−</button>
        <input type="range" id="zoom-slider-${index}" class="zoom-slider"
               min="30" max="300" value="${Math.round((slide.imageScale||1)*100)}"
               oninput="setZoomSlider(this.value,${index})">
        <button class="img-ctrl-btn" onclick="zoomStep(${index}, 0.1)" title="Aumentar zoom">+</button>
        <button class="img-ctrl-btn img-fit-btn" onclick="fitImage(${index})">⊞ Enquadrar</button>
        <button class="img-ctrl-btn img-rm-btn" onclick="clearSlideImage(${index})">✕ Remover</button>
      </div>
    </div>
    ` : `
    <div class="slide-upload"
         onclick="document.getElementById('file-${index}').click(); event.stopPropagation()">
      <span>Clique para enviar imagem (opcional)</span>
    </div>
    `}
    <input type="file" id="file-${index}" accept="image/*" class="hidden"
           onchange="uploadSlideImage(this, ${index})" />
    ` : ''}

    <!-- Layout picker -->
    <div class="layout-picker" onclick="event.stopPropagation()">
      <div class="layout-picker-label">LAYOUT</div>
      <div class="layout-picker-options">
        ${LAYOUTS.map(l => `
          <button class="layout-opt${(slide.layout||'default') === l.id ? ' active' : ''}"
                  onclick="setSlideLayout(${index},'${l.id}')"
                  title="${l.name}">
            <div class="layout-mini">${l.mini}</div>
            <span>${l.name}</span>
          </button>
        `).join('')}
      </div>
    </div>

    <!-- Headline com font picker -->
    <div onclick="event.stopPropagation()">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:5px">
        <span class="field-label" style="margin:0">${isCta ? 'Headline do CTA' : 'Headline'}</span>
        <button class="btn-font-picker"
                onclick="event.stopPropagation(); openFontPicker(${index}, this)">
          <span class="font-preview" style="font-family:'${escHtml(font)}', serif">Aa</span>
          <span>${escHtml(fontShort)}</span>
        </button>
      </div>
      <input id="headline-${index}" class="slide-input" type="text"
             placeholder="${isCta ? 'Headline do CTA' : 'Headline (título do slide)'}"
             value="${escHtml(slide.headline)}"
             style="font-family:'${escHtml(font)}', serif"
             oninput="state.slides[${index}].headline = this.value; updatePreview()" />
      <div class="slide-ai-row" style="margin-top:5px">
        <button id="btn-ai-headline-${index}" class="btn-ai-inline"
                onclick="aiGenerateHeadline(${index})">✦ Gerar headline</button>
        <button id="btn-humanize-headline-${index}" class="btn-humanize"
                onclick="aiHumanize(${index}, 'headline')">◈ Humanizar</button>
      </div>
    </div>

    <!-- Body -->
    <div onclick="event.stopPropagation()">
      <textarea id="body-${index}" class="slide-textarea" rows="2"
                placeholder="${isCta ? 'Chamada para ação' : 'Texto do slide'}"
                oninput="state.slides[${index}].body = this.value; updatePreview()"
      >${escHtml(slide.body)}</textarea>
      <div class="slide-ai-row" style="margin-top:5px">
        <button id="btn-ai-body-${index}" class="btn-ai-inline"
                onclick="aiGenerateBody(${index})">✦ Gerar texto</button>
        <button id="btn-humanize-body-${index}" class="btn-humanize"
                onclick="aiHumanize(${index}, 'body')">◈ Humanizar</button>
      </div>
    </div>
  `;

  container.appendChild(card);
}

function setSlideLayout(index, layoutId) {
  state.slides[index].layout = layoutId;
  renderSlidesForms();
  selectSlide(index);
}

function clearSlideImage(index) {
  state.slides[index].imagePath = null;
  state.slides[index].imageX    = 0;
  state.slides[index].imageY    = 0;
  state.slides[index].imageScale= 1;
  renderSlidesForms();
  updatePreview();
}

// ═══════════════════════════════════════════════════════════════
// UPLOAD — SLIDES
// ═══════════════════════════════════════════════════════════════
async function uploadSlideImage(input, index) {
  const file = input.files[0];
  if (!file) return;
  const fd = new FormData();
  fd.append('image', file);
  try {
    const res  = await fetch('/api/upload', { method: 'POST', body: fd });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Erro no servidor.');
    state.slides[index].imagePath = data.path;
    renderSlidesForms();
    selectSlide(index);
  } catch (err) { alert('Erro ao enviar imagem: ' + err.message); }
}

// ═══════════════════════════════════════════════════════════════
// UPLOAD — CAPA (ARTIGO)
// ═══════════════════════════════════════════════════════════════
async function uploadCover(input) {
  const file = input.files[0];
  if (!file) return;
  const fd = new FormData();
  fd.append('image', file);
  try {
    const res  = await fetch('/api/upload', { method: 'POST', body: fd });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Erro no servidor.');
    state.coverImagePath = data.path;
    document.getElementById('cover-upload-text').textContent = '✓ ' + data.path.split('/').pop();
    updatePreview();
  } catch (err) { alert('Erro ao enviar capa: ' + err.message); }
}

// ═══════════════════════════════════════════════════════════════
// PREVIEW
// ═══════════════════════════════════════════════════════════════
function updatePreview() {
  const rtEl = document.getElementById('readTime');
  if (rtEl) state.readTime = rtEl.value;
  state.logoPosition = getLogoPos();

  const card    = document.getElementById('preview-card');
  const dots    = document.getElementById('preview-dots');
  const counter = document.getElementById('slide-counter');

  if (state.type === 'article') {
    renderArticlePreview(card);
    dots.innerHTML      = '';
    counter.textContent = '1 / 1';
    return;
  }

  // Carrossel
  const total = state.slides.length;
  if (state.currentSlide >= total) state.currentSlide = total - 1;

  counter.textContent = `${state.currentSlide + 1} / ${total}`;
  dots.innerHTML = state.slides.map((_, i) =>
    `<div class="preview-dot ${i === state.currentSlide ? 'active' : ''}"></div>`
  ).join('');

  renderCarouselSlide(card, state.slides[state.currentSlide], state.currentSlide);
}

function renderCarouselSlide(card, slide, index) {
  const tpl  = TEMPLATES[state.category] || TEMPLATES['Direito Penal'];
  const lpos = state.logoPosition;
  const font = slide.headlineFont || 'Playfair Display';

  if (slide.type === 'cta') {
    card.style.background = tpl.bg;
    card.innerHTML = `
      <div class="pc-bg" style="background:${tpl.bg}"></div>
      <div class="pc-cta">
        <img src="/favicon.png" class="pc-cta-logo" alt="Logo" onerror="this.style.display='none'">
        <div class="pc-cta-name">Dr. Marlon Inácio</div>
        <div class="pc-cta-oab">OAB/DF 87.696</div>
        <div class="pc-cta-headline" style="font-family:'${escHtml(font)}', serif">${escHtml(slide.headline || 'Está com dúvidas?')}</div>
        <div class="pc-cta-body">${escHtml(slide.body || 'Fale comigo antes de tomar qualquer decisão.')}</div>
        <div class="pc-cta-btn">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Falar com o Dr. Marlon
        </div>
      </div>
    `;
    return;
  }

  // Slide normal
  const hasBgImg   = !!slide.imagePath;
  const watermark  = lpos === 'watermark';
  const footerLogo = lpos === 'footer';
  const layout     = slide.layout || 'default';

  const bgHtml = `
    <div class="pc-bg" style="background:${tpl.bg}">
      ${hasBgImg ? `<img src="${slide.imagePath}"
        style="position:absolute;top:50%;left:50%;min-width:100%;min-height:100%;
               width:auto;height:auto;pointer-events:none;
               transform:translate(calc(-50% + ${slide.imageX||0}px),calc(-50% + ${slide.imageY||0}px)) scale(${slide.imageScale||1});
               transform-origin:center center;">` : ''}
    </div>`;

  const overlayHtml   = `<div class="pc-overlay"></div>`;
  const iconBgHtml    = !hasBgImg ? `<div class="pc-icon-bg">${tpl.icon}</div>` : '';
  const watermarkHtml = watermark  ? `<img src="/favicon.png" class="pc-watermark" alt="Logo" onerror="this.style.display='none'">` : '';

  const footerHtml = footerLogo ? `
    <div class="pc-footer">
      <div class="pc-footer-logo">
        <img src="/favicon.png" alt="Logo" onerror="this.style.display='none'">
        <span class="pc-footer-name">Dr. Marlon Inácio</span>
      </div>
      <span class="pc-footer-url">advogado-marlon.vercel.app</span>
    </div>` : '';

  const headline    = escHtml(slide.headline || 'Headline do slide');
  const body        = escHtml(slide.body     || '');
  const fontStyle   = `font-family:'${escHtml(font)}', serif;`;

  // ── LAYOUT: DEFAULT ──────────────────────────────────────────
  if (layout === 'default') {
    card.innerHTML = `${bgHtml}${overlayHtml}${iconBgHtml}${watermarkHtml}
      <div class="pc-content">
        <div class="pc-category" style="color:${tpl.accent}">${tpl.label}</div>
        <div class="pc-headline" style="${fontStyle}">${headline}</div>
        ${body ? `<div class="pc-body">${body}</div>` : ''}
        ${footerHtml}
      </div>`;

  // ── LAYOUT: DICA DA SEMANA ────────────────────────────────────
  } else if (layout === 'dica-semana') {
    card.innerHTML = `${bgHtml}
      <div class="pc-overlay" style="background:linear-gradient(to bottom,rgba(0,0,0,0.6) 0%,rgba(0,0,0,0.55) 100%)"></div>
      ${iconBgHtml}${watermarkHtml}
      <div class="pc-layout-dica">
        <div class="pc-dica-badge" style="background:${tpl.accent}">✦ DICA DA SEMANA</div>
        <div class="pc-dica-icon">${tpl.icon.replace('width="180" height="180"','width="72" height="72"').replace('opacity:0.06','opacity:0.9')}</div>
        <div class="pc-dica-headline" style="${fontStyle}">${headline}</div>
        ${body ? `<div class="pc-dica-body">${body}</div>` : ''}
        ${footerHtml ? `<div class="pc-footer" style="border-top:1px solid rgba(255,255,255,0.1);margin-top:auto;padding-top:10px">${footerHtml.replace('<div class="pc-footer">','').replace('</div>','')}</div>` : ''}
      </div>`;

  // ── LAYOUT: VOCÊ SABIA? ───────────────────────────────────────
  } else if (layout === 'voce-sabia') {
    card.innerHTML = `${bgHtml}
      <div class="pc-overlay" style="background:linear-gradient(160deg,rgba(0,0,0,0.75) 0%,rgba(0,0,0,0.5) 100%)"></div>
      ${iconBgHtml}${watermarkHtml}
      <div class="pc-layout-voce">
        <div class="pc-voce-eyebrow" style="color:${tpl.accent};${fontStyle}">VOCÊ SABIA?</div>
        <div class="pc-voce-line" style="background:${tpl.accent}"></div>
        <div class="pc-voce-headline" style="${fontStyle}">${headline}</div>
        ${body ? `<div class="pc-voce-body">${body}</div>` : ''}
        ${footerHtml}
      </div>`;

  // ── LAYOUT: CASO REAL ─────────────────────────────────────────
  } else if (layout === 'caso-real') {
    card.innerHTML = `${bgHtml}
      <div class="pc-overlay" style="background:linear-gradient(to bottom,rgba(0,0,0,0.82) 0%,rgba(0,0,0,0.45) 50%,rgba(0,0,0,0.82) 100%)"></div>
      ${iconBgHtml}${watermarkHtml}
      <div class="pc-layout-caso">
        <div class="pc-caso-top">
          <div class="pc-caso-tag" style="border-color:${tpl.accent};color:${tpl.accent}">⚖ CASO REAL</div>
          <div class="pc-caso-label">O que aconteceu:</div>
        </div>
        <div class="pc-caso-headline" style="${fontStyle}">${headline}</div>
        ${body ? `<div class="pc-caso-body">${body}</div>` : ''}
        <div class="pc-caso-bar" style="background:${tpl.accent}"></div>
        ${footerHtml}
      </div>`;

  // ── LAYOUT: MITO OU VERDADE? ──────────────────────────────────
  } else if (layout === 'mito-verdade') {
    const isVerdade     = body.toLowerCase().includes('verdade');
    const isMito        = body.toLowerCase().includes('mito');
    const verdictColor  = isVerdade ? '#25D366' : isMito ? '#d44' : tpl.accent;
    const verdictLabel  = isVerdade ? '✓ VERDADE' : isMito ? '✗ MITO' : '?';

    card.innerHTML = `${bgHtml}
      <div class="pc-overlay" style="background:rgba(0,0,0,0.78)"></div>
      ${iconBgHtml}${watermarkHtml}
      <div class="pc-layout-mito">
        <div class="pc-mito-eyebrow">MITO OU VERDADE?</div>
        <div class="pc-mito-box" style="border-color:rgba(255,255,255,0.15)">
          <div class="pc-mito-headline" style="${fontStyle}">${headline}</div>
        </div>
        ${body ? `<div class="pc-mito-body">${body}</div>` : ''}
        <div class="pc-mito-verdict" style="background:${verdictColor}">${verdictLabel}</div>
        ${footerHtml}
      </div>`;

  // ── LAYOUT: DIREITO EM FOCO ────────────────────────────────────
  } else if (layout === 'foco') {
    card.innerHTML = `${bgHtml}
      <div class="pc-overlay" style="background:rgba(0,0,0,0.72)"></div>
      ${iconBgHtml}${watermarkHtml}
      <div class="pc-layout-foco">
        <div class="pc-foco-bar" style="background:${tpl.accent}"></div>
        <div class="pc-foco-headline" style="${fontStyle}">${headline}</div>
        <div class="pc-foco-bar2" style="background:rgba(255,255,255,0.12)"></div>
        ${body ? `<div class="pc-foco-body">${body}</div>` : ''}
        <div class="pc-foco-footer">
          ${lpos !== 'watermark' ? `<img src="/favicon.png" class="pc-foco-logo" alt="Logo" onerror="this.style.display='none'">` : ''}
          <span class="pc-foco-name" style="color:${tpl.accent}">Dr. Marlon Inácio</span>
        </div>
      </div>`;
  }
}

function renderArticlePreview(card) {
  const tpl     = TEMPLATES[state.category] || TEMPLATES['Direito Penal'];
  const title   = state.title   || 'Título do artigo';
  const excerpt = document.getElementById('excerpt')?.value || 'Resumo do artigo...';

  card.innerHTML = `
    <div class="pc-article" style="background:${tpl.bg}">
      ${state.coverImagePath
        ? `<img src="${state.coverImagePath}" class="pc-article-cover" alt="Capa">`
        : `<div class="pc-article-cover-placeholder" style="background:${tpl.bg}">
             <div style="opacity:0.15">${tpl.icon}</div>
           </div>`
      }
      <div class="pc-article-body">
        <div class="pc-article-cat" style="color:${tpl.accent}">${tpl.label}</div>
        <div class="pc-article-title">${escHtml(title)}</div>
        <div class="pc-article-excerpt">${escHtml(excerpt)}</div>
        <div class="pc-article-meta">
          <img src="/favicon.png" class="pc-article-meta-logo" alt="Logo" onerror="this.style.display='none'">
          <span class="pc-article-meta-text">Dr. Marlon Inácio · ${state.readTime || '3 min'}</span>
        </div>
      </div>
    </div>
  `;
}

// ═══════════════════════════════════════════════════════════════
// NAVEGAÇÃO NO PREVIEW
// ═══════════════════════════════════════════════════════════════
function prevSlide() {
  if (state.currentSlide > 0) { state.currentSlide--; updatePreview(); }
}
function nextSlide() {
  const total = state.type === 'carousel' ? state.slides.length : 1;
  if (state.currentSlide < total - 1) { state.currentSlide++; updatePreview(); }
}

// ═══════════════════════════════════════════════════════════════
// PUBLICAR
// ═══════════════════════════════════════════════════════════════
async function publish() {
  const title = document.getElementById('title').value.trim();
  if (!title) { alert('Informe o título do post.'); return; }
  if (state.type === 'carousel' && state.slides.every(s => !s.headline)) {
    alert('Adicione pelo menos um slide com headline.'); return;
  }

  const btn = document.getElementById('publish-btn');
  const txt = document.getElementById('publish-text');
  const res = document.getElementById('publish-result');
  btn.disabled = true;
  txt.textContent = 'Publicando...';
  res.className = 'result-msg hidden';

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
    const r    = await fetch('/api/publish', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    const data = await r.json();
    if (!r.ok) throw new Error(data.error || 'Erro desconhecido.');

    publishedUrl = data.url;
    showUrl(publishedUrl);
    res.className = 'result-msg success';
    res.textContent = '✓ Post publicado! Vercel está atualizando (aguarde ~40s).';
  } catch (err) {
    res.className = 'result-msg error';
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

// ═══════════════════════════════════════════════════════════════
// LISTA DE POSTS
// ═══════════════════════════════════════════════════════════════
async function togglePostsList() {
  const modal    = document.getElementById('posts-modal');
  const isHidden = modal.classList.toggle('hidden');
  if (!isHidden) await loadPostsList();
}

async function loadPostsList() {
  const container = document.getElementById('posts-list');
  container.innerHTML = 'Carregando...';
  try {
    const res   = await fetch('/api/posts');
    const posts = await res.json();
    if (!posts.length) {
      container.innerHTML = '<p style="color:#888;padding:12px;font-size:0.8rem">Nenhum post publicado ainda.</p>';
      return;
    }
    container.innerHTML = posts.map(p => `
      <div class="post-item">
        <div class="post-item-info">
          <div class="post-item-title">${escHtml(p.title)}</div>
          <div class="post-item-meta">${p.date} · ${p.category}</div>
        </div>
        <span class="post-item-tag ${p.type === 'carousel' ? 'tag-carousel' : 'tag-article'}">
          ${p.type === 'carousel' ? 'Carrossel' : 'Artigo'}
        </span>
        <button class="btn-delete" onclick="deletePost('${p.slug}')">🗑</button>
      </div>
    `).join('');
  } catch {
    container.innerHTML = '<p style="color:#d44;padding:12px;font-size:0.8rem">Erro ao carregar posts.</p>';
  }
}

async function deletePost(slug) {
  if (!confirm(`Excluir o post "${slug}"? Esta ação não pode ser desfeita.`)) return;
  try {
    await fetch(`/api/posts/${slug}`, { method: 'DELETE' });
    await loadPostsList();
  } catch { alert('Erro ao excluir post.'); }
}

// ═══════════════════════════════════════════════════════════════
// UTIL
// ═══════════════════════════════════════════════════════════════
function escHtml(str) {
  return (str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ═══════════════════════════════════════════════════════════════
// EDITOR DE IMAGEM — DRAG & ZOOM
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
    img.style.transform = `translate(calc(-50% + ${slide.imageX}px), calc(-50% + ${slide.imageY}px)) scale(${slide.imageScale})`;
  }
  updatePreview();
}

// ═══════════════════════════════════════════════════════════════
// IA — ESTADO
// ═══════════════════════════════════════════════════════════════
let aiConfigured = false;

async function checkAiStatus() {
  try {
    const res  = await fetch('/api/config/status');
    const data = await res.json();
    aiConfigured = data.configured;
    const badge = document.getElementById('ai-status-badge');
    if (aiConfigured) {
      badge.className   = 'ai-badge ai-badge-on';
      badge.textContent = '✦ IA ativa';
    } else {
      badge.className   = 'ai-badge ai-badge-off';
      badge.textContent = 'IA desativada';
    }
  } catch {}
}

// ═══════════════════════════════════════════════════════════════
// IA — CONFIG
// ═══════════════════════════════════════════════════════════════
function openConfigModal() {
  document.getElementById('config-modal').classList.remove('hidden');
  document.getElementById('config-result').classList.add('hidden');
}

async function saveApiKey() {
  const key = document.getElementById('openai-key-input').value.trim();
  const res = document.getElementById('config-result');
  res.className = 'result-msg hidden';
  if (!key) return;
  try {
    const r    = await fetch('/api/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ groq_api_key: key }),
    });
    const data = await r.json();
    if (!r.ok) throw new Error(data.error);
    res.className   = 'result-msg success';
    res.textContent = '✓ Chave salva! IA ativada.';
    res.classList.remove('hidden');
    await checkAiStatus();
    setTimeout(() => document.getElementById('config-modal').classList.add('hidden'), 1500);
  } catch (err) {
    res.className   = 'result-msg error';
    res.textContent = '✕ ' + err.message;
    res.classList.remove('hidden');
  }
}

// ═══════════════════════════════════════════════════════════════
// IA — SUGERIR IDEIAS
// ═══════════════════════════════════════════════════════════════
async function suggestIdeas() {
  if (!aiConfigured) { openConfigModal(); return; }
  const modal    = document.getElementById('ideas-modal');
  const content  = document.getElementById('ideas-content');
  const catLabel = document.getElementById('ideas-category');
  catLabel.textContent = state.category;
  content.innerHTML    = '<span class="spinner"></span> Gerando ideias...';
  modal.classList.remove('hidden');
  try {
    const res  = await fetch('/api/ai/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode: 'idea', category: state.category }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    content.textContent = data.text;
  } catch (err) {
    content.innerHTML = `<span style="color:#d44">✕ ${err.message}</span>`;
  }
}

// ═══════════════════════════════════════════════════════════════
// IA — GERAR HEADLINE
// ═══════════════════════════════════════════════════════════════
async function aiGenerateHeadline(index) {
  if (!aiConfigured) { openConfigModal(); return; }
  const btn   = document.getElementById(`btn-ai-headline-${index}`);
  const input = document.getElementById(`headline-${index}`);
  const topic = state.title || state.category;

  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span>';
  try {
    const res  = await fetch('/api/ai/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode: 'headline', category: state.category, topic }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    input.value = data.text;
    state.slides[index].headline = data.text;
    updatePreview();
  } catch (err) {
    alert('Erro: ' + err.message);
  } finally {
    btn.disabled  = false;
    btn.innerHTML = '✦ Gerar headline';
  }
}

// ═══════════════════════════════════════════════════════════════
// IA — GERAR CORPO DO SLIDE
// ═══════════════════════════════════════════════════════════════
async function aiGenerateBody(index) {
  if (!aiConfigured) { openConfigModal(); return; }
  const btn      = document.getElementById(`btn-ai-body-${index}`);
  const textarea = document.getElementById(`body-${index}`);
  const headline = state.slides[index].headline || state.title;

  btn.disabled  = true;
  btn.innerHTML = '<span class="spinner"></span>';
  try {
    const res  = await fetch('/api/ai/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode: 'body', category: state.category, headline }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    textarea.value = data.text;
    state.slides[index].body = data.text;
    updatePreview();
  } catch (err) {
    alert('Erro: ' + err.message);
  } finally {
    btn.disabled  = false;
    btn.innerHTML = '✦ Gerar texto';
  }
}

// ═══════════════════════════════════════════════════════════════
// IA — HUMANIZAR
// ═══════════════════════════════════════════════════════════════
async function aiHumanize(index, field) {
  if (!aiConfigured) { openConfigModal(); return; }
  const btnId = `btn-humanize-${field}-${index}`;
  const btn   = document.getElementById(btnId);
  const el    = document.getElementById(`${field}-${index}`);
  const text  = el.value.trim();
  if (!text) return;

  btn.disabled  = true;
  btn.innerHTML = '<span class="spinner"></span>';
  try {
    const res  = await fetch('/api/ai/humanize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    el.value = data.text;
    state.slides[index][field] = data.text;
    updatePreview();
  } catch (err) {
    alert('Erro: ' + err.message);
  } finally {
    btn.disabled  = false;
    btn.innerHTML = '◈ Humanizar';
  }
}

// ═══════════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════════
function init() {
  // Garante step 1 ativo
  activateStep(1);

  // Renderiza slides (estará no step 5, invisível por enquanto)
  renderSlidesForms();
  updatePreview();
  checkAiStatus();

  // Drag global
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

  // Fechar font picker ao clicar fora
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
