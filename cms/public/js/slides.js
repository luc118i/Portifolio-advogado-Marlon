// ═══════════════════════════════════════════════════════════════
// slides.js — Gerenciamento e renderização dos slides no formulário
// Para adicionar campos novos ao slide: edite renderSlideForm()
// ═══════════════════════════════════════════════════════════════

function addSlide() {
  state.slides.push(createEmptySlide());
  renderSlidesForms();
  selectSlide(state.slides.length - 1);
}

function addCtaSlide() {
  // Garante apenas um CTA
  state.slides = state.slides.filter(s => s.type !== 'cta');
  state.slides.push(createCtaSlide());
  renderSlidesForms();
  selectSlide(state.slides.length - 1);
}

function removeSlide(index) {
  if (state.slides.length <= 1) return;
  state.slides.splice(index, 1);
  if (state.currentSlide >= state.slides.length)
    state.currentSlide = state.slides.length - 1;
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
  const isCta     = slide.type === 'cta';
  const font      = slide.headlineFont || 'Playfair Display';
  const fontShort = font.split(' ')[0];
  const bodyFont      = slide.bodyFont || 'Inter';
  const bodyFontShort = bodyFont.split(' ')[0];
  const card      = document.createElement('div');

  card.className = [
    'slide-card',
    state.currentSlide === index ? 'selected' : '',
    isCta ? 'cta-card' : '',
  ].filter(Boolean).join(' ');

  card.onclick = () => selectSlide(index);

  card.innerHTML = `
    <div class="slide-card-header">
      <span class="slide-num ${isCta ? 'cta-num' : ''}">
        ${isCta ? '★ CTA FINAL' : `SLIDE ${index + 1}`}
      </span>
      <div class="slide-actions" onclick="event.stopPropagation()">
        ${index > 0
          ? `<button onclick="moveSlide(${index},-1)" title="Mover para cima">↑</button>`
          : ''}
        ${index < state.slides.length - 1
          ? `<button onclick="moveSlide(${index},1)" title="Mover para baixo">↓</button>`
          : ''}
        ${state.slides.length > 1
          ? `<button class="btn-rm" onclick="removeSlide(${index})" title="Remover">✕</button>`
          : ''}
      </div>
    </div>

    ${!isCta ? `
      ${slide.imagePath ? `
        <div class="img-editor-wrap" onclick="event.stopPropagation()">
          <div class="img-canvas" id="img-canvas-${index}"
               onmousedown="startImgDrag(event,${index})"
               onwheel="wheelZoom(event,${index})">
            <img id="editor-img-${index}" src="${slide.imagePath}" class="editor-img"
                 style="transform:translate(calc(-50% + ${slide.imageX||0}px), calc(-50% + ${slide.imageY||0}px)) scale(${slide.imageScale||1})"
                 draggable="false">
            <div class="img-canvas-hint">Arraste · Scroll para zoom</div>
          </div>
          <div class="img-editor-controls">
            <button class="img-ctrl-btn" onclick="zoomStep(${index},-0.1)">−</button>
            <input type="range" id="zoom-slider-${index}" class="zoom-slider"
                   min="30" max="300" value="${Math.round((slide.imageScale||1)*100)}"
                   oninput="setZoomSlider(this.value,${index})">
            <button class="img-ctrl-btn" onclick="zoomStep(${index},0.1)">+</button>
            <button class="img-ctrl-btn img-fit-btn" onclick="fitImage(${index})">⊞ Enquadrar</button>
            <button class="img-ctrl-btn img-rm-btn" onclick="clearSlideImage(${index})">✕</button>
          </div>
        </div>
      ` : `
        <div class="slide-upload"
             onclick="document.getElementById('file-${index}').click(); event.stopPropagation()">
          <span class="upload-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="5" width="18" height="14" rx="2"></rect>
              <circle cx="8.5" cy="10" r="1.5"></circle>
              <path d="M21 15l-5-5L5 19"></path>
              <path d="M12 3v7"></path>
              <path d="M9 6l3-3 3 3"></path>
            </svg>
          </span>
          <span class="upload-title">Enviar imagem</span>
          <span class="upload-subtitle">PNG ou JPG opcional</span>
        </div>
      `}
      <input type="file" id="file-${index}" accept="image/*" class="hidden"
             onchange="uploadSlideImage(this,${index})" />
    ` : ''}

    <div class="layout-picker" onclick="event.stopPropagation()">
      <div class="layout-picker-label">LAYOUT</div>
      <div class="layout-picker-options">
        ${LAYOUTS.map(l => `
          <button class="layout-opt${(slide.layout||'default') === l.id ? ' active' : ''}"
                  onclick="setSlideLayout(${index},'${l.id}')" title="${l.name}">
            <div class="layout-mini">${l.mini}</div>
            <span>${l.name}</span>
          </button>
        `).join('')}
      </div>
    </div>

    <div onclick="event.stopPropagation()">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:5px">
        <span class="field-label" style="margin:0">${isCta ? 'Headline do CTA' : 'Headline'}</span>
        <button class="btn-font-picker"
                onclick="event.stopPropagation(); openFontPicker(${index}, this, 'headlineFont')"
                title="Alterar fonte da headline">
          <span class="font-preview" style="font-family:'${escHtml(font)}',serif">Aa</span>
          <span>${escHtml(fontShort)}</span>
        </button>
      </div>
      <input id="headline-${index}" class="slide-input" type="text"
             placeholder="${isCta ? 'Headline do CTA' : 'Headline (título do slide)'}"
             value="${escHtml(slide.headline)}"
             style="font-family:'${escHtml(font)}',serif"
             oninput="state.slides[${index}].headline=this.value; updatePreview()" />
      <div class="slide-ai-row" style="margin-top:5px">
        <button id="btn-ai-headline-${index}" class="btn-ai-inline"
                onclick="aiGenerateHeadline(${index})">✦ Gerar headline</button>
        <button id="btn-humanize-headline-${index}" class="btn-humanize"
                onclick="aiHumanize(${index},'headline')">◈ Humanizar</button>
      </div>
    </div>

    <div onclick="event.stopPropagation()">
      <div class="field-row">
        <span class="field-label" style="margin:0">${isCta ? 'Texto do CTA' : 'Texto / subtítulo'}</span>
        <button class="btn-font-picker"
                onclick="event.stopPropagation(); openFontPicker(${index}, this, 'bodyFont')"
                title="Alterar fonte do texto">
          <span class="font-preview" style="font-family:'${escHtml(bodyFont)}',sans-serif">Aa</span>
          <span>${escHtml(bodyFontShort)}</span>
        </button>
      </div>
      <textarea id="body-${index}" class="slide-textarea" rows="2"
                placeholder="${isCta ? 'Chamada para ação' : 'Texto do slide'}"
                style="font-family:'${escHtml(bodyFont)}',sans-serif"
                oninput="state.slides[${index}].body=this.value; updatePreview()"
      >${escHtml(slide.body)}</textarea>
      <div class="slide-ai-row" style="margin-top:5px">
        <button id="btn-ai-body-${index}" class="btn-ai-inline"
                onclick="aiGenerateBody(${index})">✦ Gerar texto</button>
        <button id="btn-humanize-body-${index}" class="btn-humanize"
                onclick="aiHumanize(${index},'body')">◈ Humanizar</button>
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
  state.slides[index].imagePath  = null;
  state.slides[index].imageX     = 0;
  state.slides[index].imageY     = 0;
  state.slides[index].imageScale = 1;
  renderSlidesForms();
  updatePreview();
}
