// ═══════════════════════════════════════════════════════════════
// dashboard.js — Tela de boas-vindas do estúdio
// Exibida ao abrir o CMS. "Criar post" leva ao editor.
// ═══════════════════════════════════════════════════════════════

const DASH_WEEKDAYS = ['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado'];
const DASH_MONTHS   = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
// Seg → Dom (ISO week order)
const DASH_ABBR     = ['S','T','Q','Q','S','S','D'];

// ── Abrir / fechar ────────────────────────────────────────────

function openDashboard() {
  document.getElementById('dashboard-home').classList.remove('hidden');
  document.getElementById('editor-area')?.classList.add('hidden');
  document.getElementById('preview-panel-aside')?.classList.add('hidden');
  _dashInit();
}

function closeDashboard() {
  const dash = document.getElementById('dashboard-home');
  if (dash) dash.classList.add('hidden');
  document.getElementById('editor-area')?.classList.remove('hidden');
  document.getElementById('preview-panel-aside')?.classList.remove('hidden');
  setNavActive('editor');
}

// ── Inicialização ─────────────────────────────────────────────

function _dashInit() {
  _dashCalendar();
  _dashGreeting();
  _dashWeekStrip([]);   // render skeleton; updated after post load
  _dashLoadRecentPosts();
}

// ── Calendário ────────────────────────────────────────────────

function _dashCalendar() {
  const now = new Date();
  const el  = (id, val) => { const e = document.getElementById(id); if (e) e.textContent = val; };
  el('dash-weekday', DASH_WEEKDAYS[now.getDay()].toUpperCase());
  el('dash-day',     String(now.getDate()).padStart(2, '0'));
  el('dash-month',   `${DASH_MONTHS[now.getMonth()].toUpperCase()} · ${now.getFullYear()}`);
}

// ── Saudação por horário ──────────────────────────────────────

function _dashGreeting() {
  const h   = new Date().getHours();
  const msg = h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite';
  const el  = document.getElementById('dash-greeting-time');
  if (el) el.textContent = msg;
}

// ── Faixa da semana — dentro do card do calendário (Seg → Dom) ─

function _dashWeekStrip(postDates) {
  const container = document.getElementById('dash-week-strip');
  if (!container) return;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Segunda-feira da semana atual
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));

  // Mapa date-string → contagem de posts
  const postCount = new Map();
  postDates.forEach(d => {
    if (!d) return;
    const p = new Date(d + 'T12:00:00');
    p.setHours(0, 0, 0, 0);
    const key = p.toDateString();
    postCount.set(key, (postCount.get(key) || 0) + 1);
  });

  container.innerHTML = '';

  for (let i = 0; i < 7; i++) {
    const day = new Date(monday);
    day.setDate(monday.getDate() + i);

    const isToday  = day.toDateString() === today.toDateString();
    const isFuture = day > today;
    const count    = postCount.get(day.toDateString()) || 0;
    const hasPost  = count > 0;

    const cls = ['dash-wday',
      isToday  ? 'is-today'  : '',
      isFuture ? 'is-future' : '',
      hasPost  ? 'has-post'  : '',
    ].filter(Boolean).join(' ');

    // Tooltip mostra a data e quantidade de posts
    const tip = day.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'short' })
              + (hasPost ? ` · ${count} post${count > 1 ? 's' : ''}` : '');

    const div = document.createElement('div');
    div.className = cls;
    div.title = tip;
    div.innerHTML = `
      <span class="dash-wday-abbr">${DASH_ABBR[i]}</span>
      <div class="dash-wday-pip"></div>
      <span class="dash-wday-count">${hasPost && !isFuture ? count : ''}</span>
    `;
    container.appendChild(div);
  }
}

// ── Últimos posts ─────────────────────────────────────────────

async function _dashLoadRecentPosts() {
  const list = document.getElementById('dash-recent-list');
  if (!list) return;

  try {
    const res   = await fetch('/api/posts');
    const posts = await res.json();

    // Populate the shared _postsList so editPost() works from dashboard
    if (Array.isArray(posts)) _postsList = posts;

    // Update week strip with real post dates
    _dashWeekStrip(posts.map(p => p.date).filter(Boolean));

    if (!posts.length) {
      list.innerHTML = `
        <div style="padding:24px 16px;text-align:center">
          <div style="font-size:2rem;margin-bottom:12px">📝</div>
          <div style="font-size:0.78rem;color:var(--muted);line-height:1.6">
            Nenhum post publicado ainda.<br>Crie o primeiro agora!
          </div>
        </div>`;
      return;
    }

    const recent = posts.slice(0, 9);
    list.innerHTML = recent.map((p, i) => {
      const typeLabel = p.type === 'carousel' ? 'Carrossel' : 'Artigo';
      const typeCls   = p.type === 'carousel' ? 'tag-carousel' : 'tag-article';

      let thumbHtml;
      if (p.type === 'carousel') {
        const headline = escHtml(p.slides?.[0]?.headline || p.title || '');
        thumbHtml = `<div class="dash-post-thumb" style="background:var(--surface2)">
          <div class="dash-post-thumb-text">${headline}</div>
        </div>`;
      } else if (p.coverImage) {
        thumbHtml = `<div class="dash-post-thumb"><img src="${escHtml(p.coverImage)}" alt=""></div>`;
      } else {
        thumbHtml = `<div class="dash-post-thumb">📄</div>`;
      }

      return `
        <div class="dash-post-row" onclick="_dashEditPost(${i})">
          ${thumbHtml}
          <div class="dash-post-info">
            <div class="dash-post-title">${escHtml(p.title)}</div>
            <div class="dash-post-meta">${escHtml(p.category || '—')} · ${p.date || '—'}</div>
          </div>
          <span class="dash-post-badge post-item-tag ${typeCls}">${typeLabel}</span>
        </div>`;
    }).join('');

  } catch {
    list.innerHTML = '<p class="posts-error" style="padding:12px">Erro ao carregar posts.</p>';
  }
}

// Editar post direto do dashboard
function _dashEditPost(index) {
  if (!_postsList[index]) return;
  closeDashboard();
  editPost(index);
}

// ── Ajuda Criativa — IA pesquisa tendências ───────────────────

let _dashExcluded = []; // temas descartados pelo usuário (acumula na sessão)

// Extrai só o título de uma ideia "N. Título — Descrição"
function _dashIdeaTitle(idea) {
  const clean = idea.replace(/^\d+\.\s*/, '');
  const sep   = clean.search(/\s[—–-]\s/);
  return sep > -1 ? clean.slice(0, sep).trim() : clean.slice(0, 80).trim();
}

// Converte texto numerado em array de strings
function _dashParseIdeas(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const ideas = [];
  let current = '';
  for (const line of lines) {
    if (/^\d+\./.test(line)) {
      if (current) ideas.push(current.trim());
      current = line;
    } else {
      current += ' ' + line;
    }
  }
  if (current) ideas.push(current.trim());
  return ideas.filter(Boolean);
}

// Renderiza lista de ideas como cards individuais
function _dashRenderIdeas(ideas) {
  const content = document.getElementById('dash-trends-content');
  if (!content) return;

  content.innerHTML = ideas.map((idea, i) => {
    const clean = idea.replace(/^\d+\.\s*/, '');
    const match = clean.match(/^(.+?)\s[—–-]\s(.+)$/s);
    const title = match ? match[1].trim() : clean;
    const desc  = match ? match[2].trim() : '';
    return `
      <div class="dash-idea-card" id="dash-idea-${i}" data-title="${escHtml(title)}"
           onclick="_dashOpenIdeaInEditor(this)"
           title="Clique para criar post com este tema">
        <div class="dash-idea-body">
          <div class="dash-idea-title">${escHtml(title)}</div>
          ${desc ? `<div class="dash-idea-desc">${escHtml(desc)}</div>` : ''}
        </div>
        <button class="dash-idea-dismiss" onclick="event.stopPropagation(); _dashDismissIdea(${i})" title="Já abordei este tema">✕</button>
      </div>`;
  }).join('');
}

// Abre o editor com categoria e título pré-preenchidos
function _dashOpenIdeaInEditor(card) {
  const title = card?.dataset?.title;
  if (!title) return;

  // Fecha o dashboard e mostra o editor
  closeDashboard();

  // Preenche o campo título e dispara o sync (slug, state, preview)
  const titleInput = document.getElementById('title');
  if (titleInput) {
    titleInput.value = title;
    onTitleInput();   // atualiza state.title, state.slug, slug-preview, updatePreview
  }

  // Sincroniza a seleção visual de categoria (state.category já está correto)
  document.querySelectorAll('.cat-card').forEach(el => {
    el.classList.toggle('active', el.dataset.cat === state.category);
  });

  // Atualiza chips dos passos já preenchidos
  updateChip(1); // tipo
  updateChip(2); // categoria

  // Vai ao passo 3 (título) para o usuário conferir e continuar
  activateStep(3);
}

// Descarta um card e o adiciona à lista de exclusões
function _dashDismissIdea(index) {
  const card = document.getElementById(`dash-idea-${index}`);
  if (!card) return;
  const title = card.dataset.title;
  if (title && !_dashExcluded.includes(title)) _dashExcluded.push(title);
  card.classList.add('dash-idea-dismissed');
  setTimeout(() => card.remove(), 260);
  _dashUpdateExcludedCount();
}

// Atualiza badge de exclusões
function _dashUpdateExcludedCount() {
  const el = document.getElementById('dash-excluded-count');
  if (!el) return;
  el.textContent = _dashExcluded.length > 0
    ? `${_dashExcluded.length} tema${_dashExcluded.length > 1 ? 's' : ''} excluído${_dashExcluded.length > 1 ? 's' : ''}`
    : '';
}

async function dashCreativeHelp(exclude = '') {
  const greeting  = document.getElementById('dash-greeting');
  const panel     = document.getElementById('dash-trends-panel');
  const content   = document.getElementById('dash-trends-content');
  const feedback  = document.getElementById('dash-trends-feedback');
  const btn       = document.getElementById('dash-ai-btn');
  const refreshBtn= document.getElementById('dash-refresh-btn');

  if (!aiConfigured) {
    toast('Configure a IA primeiro em Configurações.', 'warning');
    openConfigScreen();
    return;
  }

  // Mostrar painel, esconder saudação, ocultar feedback durante carga
  if (greeting) greeting.style.display = 'none';
  if (panel)    panel.classList.add('visible');
  if (feedback) feedback.classList.add('hidden');
  if (content)  content.innerHTML = '<div class="dash-ideas-loading"><span class="spinner"></span> Analisando tendências jurídicas…</div>';
  if (btn)       { btn.disabled = true; btn.textContent = '✦ Buscando…'; }
  if (refreshBtn)  refreshBtn.disabled = true;

  try {
    const res = await fetch('/api/ai/generate', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({
        mode:     'idea',
        category: (typeof state !== 'undefined' && state.category) ? state.category : 'Direito Penal',
        topic:    'tendências jurídicas brasileiras do momento ideais para posts de impacto nas redes sociais',
        exclude,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Erro desconhecido');

    // Renderiza como cards
    const ideas = _dashParseIdeas(data.text);
    _dashRenderIdeas(ideas.length ? ideas : [data.text]);

    // Mostra área de feedback
    if (feedback) feedback.classList.remove('hidden');
    _dashUpdateExcludedCount();

  } catch (err) {
    if (content) content.innerHTML = `<div class="dash-ideas-loading" style="color:var(--color-danger)">✕ ${escHtml(err.message)}</div>`;
    setTimeout(closeDashTrends, 2500);
  } finally {
    if (btn)        { btn.disabled = false; btn.textContent = '✦ Ajuda Criativa'; }
    if (refreshBtn)   refreshBtn.disabled = false;
  }
}

// Regenera excluindo os descartados + qualquer card ainda visível (já foram vistos)
async function dashRefreshIdeas() {
  // Coleta títulos de cards ainda visíveis (usuário os viu mas não descartou — exclui assim mesmo)
  document.querySelectorAll('.dash-idea-card[data-title]').forEach(c => {
    const t = c.dataset.title;
    if (t && !_dashExcluded.includes(t)) _dashExcluded.push(t);
  });
  await dashCreativeHelp(_dashExcluded.join(', '));
}

function closeDashTrends() {
  const greeting = document.getElementById('dash-greeting');
  const panel    = document.getElementById('dash-trends-panel');
  const feedback = document.getElementById('dash-trends-feedback');
  _dashExcluded  = []; // reseta ao fechar
  if (greeting) greeting.style.display = '';
  if (panel)    panel.classList.remove('visible');
  if (feedback) feedback.classList.add('hidden');
}
