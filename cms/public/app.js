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

let publishedUrl = null;

// ═══════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════
function createEmptySlide() {
  return { type: 'content', imagePath: null, headline: '', body: '' };
}
function createCtaSlide() {
  return { type: 'cta', headline: 'Está com dúvidas jurídicas?', body: 'Fale comigo antes de tomar qualquer decisão.' };
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
// TIPO
// ═══════════════════════════════════════════════════════════════
function setType(t) {
  state.type = t;
  document.getElementById('btn-carousel').classList.toggle('active', t === 'carousel');
  document.getElementById('btn-article').classList.toggle('active',  t === 'article');
  document.getElementById('slides-section').classList.toggle('hidden',  t !== 'carousel');
  document.getElementById('article-section').classList.toggle('hidden', t !== 'article');
  updatePreview();
}

// ═══════════════════════════════════════════════════════════════
// CATEGORIA
// ═══════════════════════════════════════════════════════════════
function onCategoryChange() {
  state.category = document.getElementById('category').value;
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
// SLIDES — FORM
// ═══════════════════════════════════════════════════════════════
function addSlide() {
  state.slides.push(createEmptySlide());
  renderSlidesForms();
  selectSlide(state.slides.length - 1);
}

function addCtaSlide() {
  // Remove CTA anterior se existir
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
  const isCta = slide.type === 'cta';
  const card  = document.createElement('div');
  card.className = `slide-card${state.currentSlide === index ? ' selected' : ''}${isCta ? ' cta-card' : ''}`;
  card.onclick = () => selectSlide(index);

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
    <div class="slide-upload ${slide.imagePath ? 'has-image' : ''}"
         id="upload-area-${index}"
         onclick="document.getElementById('file-${index}').click(); event.stopPropagation()">
      ${slide.imagePath
        ? `<img src="${slide.imagePath}" alt="Imagem">
           <button class="slide-upload-clear" onclick="clearSlideImage(${index}); event.stopPropagation()">✕</button>`
        : '<span>Clique para enviar imagem (opcional)</span>'}
    </div>
    <input type="file" id="file-${index}" accept="image/*" class="hidden"
           onchange="uploadSlideImage(this, ${index})" />
    ` : ''}

    <div onclick="event.stopPropagation()">
      <input id="headline-${index}" class="slide-input" type="text"
             placeholder="${isCta ? 'Headline do CTA' : 'Headline (título do slide)'}"
             value="${escHtml(slide.headline)}"
             oninput="state.slides[${index}].headline = this.value; updatePreview()" />
      <div class="slide-ai-row" style="margin-top:5px">
        <button id="btn-ai-headline-${index}" class="btn-ai-inline"
                onclick="aiGenerateHeadline(${index})">✦ Gerar headline</button>
        <button id="btn-humanize-headline-${index}" class="btn-humanize"
                onclick="aiHumanize(${index}, 'headline')">◈ Humanizar</button>
      </div>
    </div>

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

function clearSlideImage(index) {
  state.slides[index].imagePath = null;
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
    state.slides[index].imagePath = data.path;
    renderSlidesForms();
    selectSlide(index);
  } catch { alert('Erro ao enviar imagem.'); }
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
    state.coverImagePath = data.path;
    document.getElementById('cover-upload-text').textContent = '✓ ' + data.path.split('/').pop();
    updatePreview();
  } catch { alert('Erro ao enviar capa.'); }
}

// ═══════════════════════════════════════════════════════════════
// PREVIEW
// ═══════════════════════════════════════════════════════════════
function updatePreview() {
  state.category    = document.getElementById('category').value;
  state.readTime    = document.getElementById('readTime').value;
  state.logoPosition= getLogoPos();

  const card    = document.getElementById('preview-card');
  const dots    = document.getElementById('preview-dots');
  const counter = document.getElementById('slide-counter');

  if (state.type === 'article') {
    renderArticlePreview(card);
    dots.innerHTML    = '';
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

  if (slide.type === 'cta') {
    card.style.background = tpl.bg;
    card.innerHTML = `
      <div class="pc-bg" style="background:${tpl.bg}"></div>
      <div class="pc-cta">
        <img src="/project-assets/favicon.png" class="pc-cta-logo" alt="Logo" onerror="this.style.display='none'">
        <div class="pc-cta-name">Dr. Marlon Inácio</div>
        <div class="pc-cta-oab">OAB/DF 87.696</div>
        <div class="pc-cta-headline">${escHtml(slide.headline || 'Está com dúvidas?')}</div>
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

  card.innerHTML = `
    <div class="pc-bg" style="${hasBgImg
      ? `background-image:url(${slide.imagePath}); background-size:cover; background-position:center`
      : `background:${tpl.bg}`
    }"></div>
    <div class="pc-overlay"></div>
    ${!hasBgImg ? `<div class="pc-icon-bg">${tpl.icon}</div>` : ''}
    ${watermark ? `<img src="/project-assets/favicon.png" class="pc-watermark" alt="Logo" onerror="this.style.display='none'">` : ''}

    <div class="pc-content">
      <div class="pc-category" style="color:${tpl.accent}">${tpl.label}</div>
      <div class="pc-headline">${escHtml(slide.headline || 'Headline do slide')}</div>
      ${slide.body ? `<div class="pc-body">${escHtml(slide.body)}</div>` : ''}
      ${footerLogo ? `
        <div class="pc-footer">
          <div class="pc-footer-logo">
            <img src="/project-assets/favicon.png" alt="Logo" onerror="this.style.display='none'">
            <span class="pc-footer-name">Dr. Marlon Inácio</span>
          </div>
          <span class="pc-footer-url">advogado-marlon.vercel.app</span>
        </div>
      ` : ''}
    </div>
  `;
}

function renderArticlePreview(card) {
  const tpl = TEMPLATES[state.category] || TEMPLATES['Direito Penal'];
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
          <img src="/project-assets/favicon.png" class="pc-article-meta-logo" alt="Logo" onerror="this.style.display='none'">
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

  const btn  = document.getElementById('publish-btn');
  const txt  = document.getElementById('publish-text');
  const res  = document.getElementById('publish-result');
  btn.disabled = true;
  txt.textContent = 'Publicando...';
  res.className = 'publish-result hidden';

  const post = {
    slug:         state.slug || generateSlug(title),
    title,
    type:         state.type,
    category:     document.getElementById('category').value,
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
    res.className = 'publish-result success';
    res.textContent = '✓ Post publicado! Vercel está atualizando (aguarde ~40s).';
  } catch (err) {
    res.className = 'publish-result error';
    res.textContent = '✕ ' + err.message;
  } finally {
    btn.disabled = false;
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
  const modal = document.getElementById('posts-modal');
  const isHidden = modal.classList.toggle('hidden');
  if (!isHidden) await loadPostsList();
}

async function loadPostsList() {
  const container = document.getElementById('posts-list');
  container.innerHTML = 'Carregando...';
  try {
    const res   = await fetch('/api/posts');
    const posts = await res.json();
    if (!posts.length) { container.innerHTML = '<p style="color:#888;padding:12px;font-size:0.8rem">Nenhum post publicado ainda.</p>'; return; }
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
  } catch { container.innerHTML = '<p style="color:#d44;padding:12px;font-size:0.8rem">Erro ao carregar posts.</p>'; }
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
      badge.className = 'ai-badge ai-badge-on';
      badge.textContent = '✦ IA ativa';
    } else {
      badge.className = 'ai-badge ai-badge-off';
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
  res.className = 'publish-result hidden';
  if (!key) return;
  try {
    const r    = await fetch('/api/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ openai_api_key: key }),
    });
    const data = await r.json();
    if (!r.ok) throw new Error(data.error);
    res.className = 'publish-result success';
    res.textContent = '✓ Chave salva! IA ativada.';
    res.classList.remove('hidden');
    await checkAiStatus();
    setTimeout(() => document.getElementById('config-modal').classList.add('hidden'), 1500);
  } catch (err) {
    res.className = 'publish-result error';
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
  const category = document.getElementById('category').value;
  catLabel.textContent = category;
  content.innerHTML = '<span class="spinner"></span> Gerando ideias...';
  modal.classList.remove('hidden');
  try {
    const res  = await fetch('/api/ai/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode: 'idea', category }),
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
  const btn      = document.getElementById(`btn-ai-headline-${index}`);
  const input    = document.getElementById(`headline-${index}`);
  const category = document.getElementById('category').value;
  const topic    = state.title || category;

  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span>';
  try {
    const res  = await fetch('/api/ai/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode: 'headline', category, topic }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    input.value = data.text;
    state.slides[index].headline = data.text;
    updatePreview();
  } catch (err) {
    alert('Erro: ' + err.message);
  } finally {
    btn.disabled = false;
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
  const category = document.getElementById('category').value;
  const headline = state.slides[index].headline || state.title;

  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span>';
  try {
    const res  = await fetch('/api/ai/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode: 'body', category, headline }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    textarea.value = data.text;
    state.slides[index].body = data.text;
    updatePreview();
  } catch (err) {
    alert('Erro: ' + err.message);
  } finally {
    btn.disabled = false;
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

  btn.disabled = true;
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
    btn.disabled = false;
    btn.innerHTML = '◈ Humanizar';
  }
}

// ═══════════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════════
function init() {
  renderSlidesForms();
  updatePreview();
  checkAiStatus();
  document.querySelectorAll('input[name="logoPos"]').forEach(el => {
    el.addEventListener('change', updatePreview);
  });
}

document.addEventListener('DOMContentLoaded', init);
