// ═══════════════════════════════════════════════════════════════
// preview.js — Renderização do card de preview ao vivo
// Para adicionar um novo layout: adicione um bloco else if abaixo
// Para adicionar um novo template: edite data.js → TEMPLATES
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

  const total = state.slides.length;
  if (state.currentSlide >= total) state.currentSlide = total - 1;

  counter.textContent = `${state.currentSlide + 1} / ${total}`;
  dots.innerHTML = state.slides.map((_, i) =>
    `<div class="preview-dot ${i === state.currentSlide ? 'active' : ''}"></div>`
  ).join('');

  renderCarouselSlide(card, state.slides[state.currentSlide]);
}

function renderCarouselSlide(card, slide) {
  const tpl  = TEMPLATES[state.category] || TEMPLATES['Direito Penal'];
  const lpos = state.logoPosition;
  const font = slide.headlineFont || 'Playfair Display';
  const bodyFont = slide.bodyFont || 'Inter';

  // ── Slide CTA ────────────────────────────────────────────────
  if (slide.type === 'cta') {
    card.innerHTML = `
      <div class="pc-bg" style="background:${tpl.bg}"></div>
      <div class="pc-cta">
        <img src="/favicon.png" class="pc-cta-logo" alt="Logo" onerror="this.style.display='none'">
        <div class="pc-cta-name">Dr. Marlon Inácio</div>
        <div class="pc-cta-oab">OAB/DF 87.696</div>
        <div class="pc-cta-headline" style="font-family:'${escHtml(font)}',serif">
          ${escHtml(slide.headline || 'Está com dúvidas?')}
        </div>
        <div class="pc-cta-body" style="font-family:'${escHtml(bodyFont)}',sans-serif">${escHtml(slide.body || 'Fale comigo antes de tomar qualquer decisão.')}</div>
        <div class="pc-cta-btn">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Falar com o Dr. Marlon
        </div>
      </div>`;
    return;
  }

  // ── Slide normal — partes comuns ─────────────────────────────
  const hasBgImg   = !!slide.imagePath;
  const watermark  = lpos === 'watermark';
  const footerLogo = lpos === 'footer';
  const layout     = slide.layout || 'default';
  const headline   = escHtml(slide.headline || 'Headline do slide');
  const body       = escHtml(slide.body || '');
  const fontStyle  = `font-family:'${escHtml(font)}',serif;`;
  const bodyFontStyle = `font-family:'${escHtml(bodyFont)}',sans-serif;`;

  const bgHtml = `
    <div class="pc-bg" style="background:${tpl.bg}">
      ${hasBgImg ? `<img src="${slide.imagePath}"
        style="position:absolute;top:50%;left:50%;min-width:100%;min-height:100%;
               width:auto;height:auto;pointer-events:none;
               transform:${buildImgTransform(slide)};
               filter:${buildImgFilter(slide)};
               transform-origin:center center;">` : ''}
    </div>`;
  const overlayHtml   = `<div class="pc-overlay"></div>`;
  const iconBgHtml    = !hasBgImg ? `<div class="pc-icon-bg">${tpl.icon}</div>` : '';
  const watermarkHtml = watermark ? `<img src="/favicon.png" class="pc-watermark" alt="Logo" onerror="this.style.display='none'">` : '';
  const footerHtml    = footerLogo ? `
    <div class="pc-footer">
      <div class="pc-footer-logo">
        <img src="/favicon.png" alt="Logo" onerror="this.style.display='none'">
        <span class="pc-footer-name">Dr. Marlon Inácio</span>
      </div>
      <span class="pc-footer-url">advogado-marlon.vercel.app</span>
    </div>` : '';

  // ── Layouts ──────────────────────────────────────────────────
  if (layout === 'default') {
    card.innerHTML = `${bgHtml}${overlayHtml}${iconBgHtml}${watermarkHtml}
      <div class="pc-content">
        <div class="pc-category" style="color:${tpl.accent}">${tpl.label}</div>
        <div class="pc-headline" style="${fontStyle}">${headline}</div>
        ${body ? `<div class="pc-body" style="${bodyFontStyle}">${body}</div>` : ''}
        ${footerHtml}
      </div>`;

  } else if (layout === 'dica-semana') {
    card.innerHTML = `${bgHtml}
      <div class="pc-overlay" style="background:linear-gradient(to bottom,rgba(0,0,0,0.6),rgba(0,0,0,0.55))"></div>
      ${iconBgHtml}${watermarkHtml}
      <div class="pc-layout-dica">
        <div class="pc-dica-badge" style="background:${tpl.accent}">✦ DICA DA SEMANA</div>
        <div class="pc-dica-icon">${tpl.icon.replace('width="180" height="180"','width="72" height="72"')}</div>
        <div class="pc-dica-headline" style="${fontStyle}">${headline}</div>
        ${body ? `<div class="pc-dica-body" style="${bodyFontStyle}">${body}</div>` : ''}
        ${footerHtml}
      </div>`;

  } else if (layout === 'voce-sabia') {
    card.innerHTML = `${bgHtml}
      <div class="pc-overlay" style="background:linear-gradient(160deg,rgba(0,0,0,0.75),rgba(0,0,0,0.5))"></div>
      ${iconBgHtml}${watermarkHtml}
      <div class="pc-layout-voce">
        <div class="pc-voce-eyebrow" style="color:${tpl.accent};${fontStyle}">VOCÊ SABIA?</div>
        <div class="pc-voce-line" style="background:${tpl.accent}"></div>
        <div class="pc-voce-headline" style="${fontStyle}">${headline}</div>
        ${body ? `<div class="pc-voce-body" style="${bodyFontStyle}">${body}</div>` : ''}
        ${footerHtml}
      </div>`;

  } else if (layout === 'caso-real') {
    card.innerHTML = `${bgHtml}
      <div class="pc-overlay" style="background:linear-gradient(to bottom,rgba(0,0,0,0.82) 0%,rgba(0,0,0,0.45) 50%,rgba(0,0,0,0.82))"></div>
      ${iconBgHtml}${watermarkHtml}
      <div class="pc-layout-caso">
        <div class="pc-caso-top">
          <div class="pc-caso-tag" style="border-color:${tpl.accent};color:${tpl.accent}">⚖ CASO REAL</div>
          <div class="pc-caso-label">O que aconteceu:</div>
        </div>
        <div class="pc-caso-headline" style="${fontStyle}">${headline}</div>
        ${body ? `<div class="pc-caso-body" style="${bodyFontStyle}">${body}</div>` : ''}
        <div class="pc-caso-bar" style="background:${tpl.accent}"></div>
        ${footerHtml}
      </div>`;

  } else if (layout === 'mito-verdade') {
    const isVerdade    = body.toLowerCase().includes('verdade');
    const isMito       = body.toLowerCase().includes('mito');
    const verdictColor = isVerdade ? '#25D366' : isMito ? '#d44' : tpl.accent;
    const verdictLabel = isVerdade ? '✓ VERDADE' : isMito ? '✗ MITO' : '?';

    card.innerHTML = `${bgHtml}
      <div class="pc-overlay" style="background:rgba(0,0,0,0.78)"></div>
      ${iconBgHtml}${watermarkHtml}
      <div class="pc-layout-mito">
        <div class="pc-mito-eyebrow">MITO OU VERDADE?</div>
        <div class="pc-mito-box" style="border-color:rgba(255,255,255,0.15)">
          <div class="pc-mito-headline" style="${fontStyle}">${headline}</div>
        </div>
        ${body ? `<div class="pc-mito-body" style="${bodyFontStyle}">${body}</div>` : ''}
        <div class="pc-mito-verdict" style="background:${verdictColor}">${verdictLabel}</div>
        ${footerHtml}
      </div>`;

  } else if (layout === 'foco') {
    card.innerHTML = `${bgHtml}
      <div class="pc-overlay" style="background:rgba(0,0,0,0.72)"></div>
      ${iconBgHtml}${watermarkHtml}
      <div class="pc-layout-foco">
        <div class="pc-foco-bar" style="background:${tpl.accent}"></div>
        <div class="pc-foco-headline" style="${fontStyle}">${headline}</div>
        <div class="pc-foco-bar2" style="background:rgba(255,255,255,0.12)"></div>
        ${body ? `<div class="pc-foco-body" style="${bodyFontStyle}">${body}</div>` : ''}
        <div class="pc-foco-footer">
          ${lpos !== 'watermark' ? `<img src="/favicon.png" class="pc-foco-logo" alt="Logo" onerror="this.style.display='none'">` : ''}
          <span class="pc-foco-name" style="color:${tpl.accent}">Dr. Marlon Inácio</span>
        </div>
      </div>`;

  } else if (layout === 'estatistica') {
    card.innerHTML = `${bgHtml}
      <div class="pc-overlay" style="background:rgba(0,0,0,0.80)"></div>
      ${iconBgHtml}${watermarkHtml}
      <div class="pc-layout-estat">
        <div class="pc-estat-eyebrow" style="color:${tpl.accent}">EM NÚMEROS</div>
        <div class="pc-estat-number" style="${fontStyle} color:${tpl.accent}">${headline}</div>
        <div class="pc-estat-line" style="background:${tpl.accent}"></div>
        ${body ? `<div class="pc-estat-body" style="${bodyFontStyle}">${body}</div>` : ''}
        ${footerHtml}
      </div>`;

  } else if (layout === 'pull-quote') {
    card.innerHTML = `${bgHtml}
      <div class="pc-overlay" style="background:rgba(0,0,0,0.82)"></div>
      ${iconBgHtml}${watermarkHtml}
      <div class="pc-layout-quote">
        <div class="pc-quote-mark" style="color:${tpl.accent}">"</div>
        <div class="pc-quote-text" style="${fontStyle}">${headline}</div>
        ${body ? `<div class="pc-quote-attr" style="${bodyFontStyle}">— ${body}</div>` : ''}
        ${footerHtml}
      </div>`;

  } else if (layout === 'alerta') {
    card.innerHTML = `${bgHtml}
      <div class="pc-overlay" style="background:rgba(0,0,0,0.84)"></div>
      ${iconBgHtml}${watermarkHtml}
      <div class="pc-layout-alerta">
        <div class="pc-alerta-inner" style="border-left-color:${tpl.accent}">
          <div class="pc-alerta-badge" style="color:${tpl.accent}">⚠ ATENÇÃO</div>
          <div class="pc-alerta-headline" style="${fontStyle}">${headline}</div>
          ${body ? `<div class="pc-alerta-body" style="${bodyFontStyle}">${body}</div>` : ''}
        </div>
        ${footerHtml}
      </div>`;

  } else if (layout === 'magazine') {
    card.innerHTML = `${bgHtml}
      <div class="pc-overlay" style="background:linear-gradient(to top,rgba(0,0,0,0.90) 0%,rgba(0,0,0,0.40) 55%,rgba(0,0,0,0.18) 100%)"></div>
      ${iconBgHtml}${watermarkHtml}
      <div class="pc-layout-mag">
        <div class="pc-mag-top">
          <div class="pc-mag-category" style="color:${tpl.accent};${bodyFontStyle}">${tpl.label}</div>
          <div class="pc-mag-headline" style="${fontStyle}">${headline}</div>
        </div>
        <div class="pc-mag-line"></div>
        ${body ? `<div class="pc-mag-body" style="${bodyFontStyle}">${body}</div>` : ''}
        ${footerHtml}
      </div>`;

  } else if (layout === 'split') {
    card.innerHTML = `${bgHtml}
      <div class="pc-overlay" style="background:rgba(0,0,0,0.68)"></div>
      ${watermarkHtml}
      <div class="pc-layout-split">
        <div class="pc-split-accent" style="background:${tpl.accent}">
          <div class="pc-split-label">${tpl.label}</div>
        </div>
        <div class="pc-split-content">
          <div class="pc-split-headline" style="${fontStyle}">${headline}</div>
          ${body ? `<div class="pc-split-body" style="${bodyFontStyle}">${body}</div>` : ''}
          ${footerHtml}
        </div>
      </div>`;

  } else if (layout === 'lista') {
    const rawLines = slide.body || '';
    const items    = rawLines.split('\n').map(l => l.trim()).filter(Boolean).slice(0, 4);
    const itemsHtml = items.map((item, i) => `
      <div class="pc-lista-item">
        <div class="pc-lista-num" style="background:${tpl.accent}">${i + 1}</div>
        <div class="pc-lista-text" style="${bodyFontStyle}">${escHtml(item)}</div>
      </div>`).join('');
    card.innerHTML = `${bgHtml}
      <div class="pc-overlay" style="background:rgba(0,0,0,0.82)"></div>
      ${iconBgHtml}${watermarkHtml}
      <div class="pc-layout-lista">
        <div class="pc-lista-eyebrow" style="color:${tpl.accent}">PASSO A PASSO</div>
        <div class="pc-lista-headline" style="${fontStyle}">${headline}</div>
        <div class="pc-lista-items">${itemsHtml}</div>
        ${footerHtml}
      </div>`;

  } else if (layout === 'checklist') {
    const rawLines = slide.body || '';
    const items = rawLines.split('\n').map(l => l.trim()).filter(Boolean).slice(0, 5);
    const itemsHtml = items.map(item => `
      <div class="pc-check-item">
        <div class="pc-check-box" style="border-color:${tpl.accent}">
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="${tpl.accent}" stroke-width="2.5" stroke-linecap="round">
            <path d="M2 6l3 3 5-5"/>
          </svg>
        </div>
        <span class="pc-check-text" style="${bodyFontStyle}">${escHtml(item)}</span>
      </div>`).join('');
    card.innerHTML = `${bgHtml}
      <div class="pc-overlay" style="background:rgba(0,0,0,0.82)"></div>
      ${iconBgHtml}${watermarkHtml}
      <div class="pc-layout-check">
        <div class="pc-check-eyebrow" style="color:${tpl.accent}">✦ CHECKLIST</div>
        <div class="pc-check-headline" style="${fontStyle}">${headline}</div>
        <div class="pc-check-items">${itemsHtml}</div>
        ${footerHtml}
      </div>`;

  } else if (layout === 'comparativo') {
    card.innerHTML = `${bgHtml}
      <div class="pc-overlay" style="background:rgba(0,0,0,0.86)"></div>
      ${watermarkHtml}
      <div class="pc-layout-comp">
        <div class="pc-comp-title" style="${bodyFontStyle}">COMPARATIVO</div>
        <div class="pc-comp-cols">
          <div class="pc-comp-col pc-comp-errado">
            <div class="pc-comp-icon">✕</div>
            <div class="pc-comp-label">Errado</div>
            <div class="pc-comp-text" style="${fontStyle}">${headline}</div>
          </div>
          <div class="pc-comp-divider"></div>
          <div class="pc-comp-col pc-comp-certo">
            <div class="pc-comp-icon">✓</div>
            <div class="pc-comp-label">Certo</div>
            <div class="pc-comp-text" style="${fontStyle}">${body || '…'}</div>
          </div>
        </div>
        ${footerHtml}
      </div>`;

  } else if (layout === 'pergunta-resp') {
    card.innerHTML = `${bgHtml}
      <div class="pc-overlay" style="background:rgba(0,0,0,0.83)"></div>
      ${iconBgHtml}${watermarkHtml}
      <div class="pc-layout-qa">
        <div class="pc-qa-q-box" style="border-color:${tpl.accent}">
          <div class="pc-qa-q-label" style="color:${tpl.accent}">PERGUNTA</div>
          <div class="pc-qa-question" style="${fontStyle}">${headline}</div>
        </div>
        <div class="pc-qa-divider">
          <div class="pc-qa-divider-line" style="background:${tpl.accent}"></div>
          <div class="pc-qa-divider-dot" style="background:${tpl.accent}">R</div>
          <div class="pc-qa-divider-line" style="background:${tpl.accent}"></div>
        </div>
        ${body ? `<div class="pc-qa-answer" style="${bodyFontStyle}">${body}</div>` : ''}
        ${footerHtml}
      </div>`;

  } else if (layout === 'ranking') {
    const rawLines = slide.body || '';
    const items = rawLines.split('\n').map(l => l.trim()).filter(Boolean).slice(0, 4);
    const bars = ['100%', '80%', '62%', '48%'];
    const opas = [1, 0.75, 0.55, 0.40];
    const itemsHtml = items.map((item, i) => `
      <div class="pc-rank-item">
        <div class="pc-rank-num" style="${fontStyle};color:${i===0?tpl.accent:'rgba(255,255,255,'+(opas[i])+')'};">${i+1}</div>
        <div class="pc-rank-bar">
          <div class="pc-rank-text" style="${bodyFontStyle};opacity:${opas[i]}">${escHtml(item)}</div>
          <div class="pc-rank-track" style="width:${bars[i]};background:${i===0?tpl.accent:'rgba(255,255,255,0.18)'}"></div>
        </div>
      </div>`).join('');
    card.innerHTML = `${bgHtml}
      <div class="pc-overlay" style="background:rgba(0,0,0,0.83)"></div>
      ${iconBgHtml}${watermarkHtml}
      <div class="pc-layout-rank">
        <div class="pc-rank-eyebrow" style="color:${tpl.accent}">🏆 RANKING</div>
        <div class="pc-rank-headline" style="${fontStyle}">${headline}</div>
        <div class="pc-rank-items">${itemsHtml}</div>
        ${footerHtml}
      </div>`;
  }
}

function renderArticlePreview(card) {
  const tpl     = TEMPLATES[state.category] || TEMPLATES['Direito Penal'];
  const title   = state.title || 'Título do artigo';
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
    </div>`;
}

// ─── Navegação pelo preview ───────────────────────────────────
function prevSlide() {
  if (state.currentSlide > 0) { state.currentSlide--; updatePreview(); }
}

function nextSlide() {
  const total = state.type === 'carousel' ? state.slides.length : 1;
  if (state.currentSlide < total - 1) { state.currentSlide++; updatePreview(); }
}
