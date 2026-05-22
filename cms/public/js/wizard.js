// ═══════════════════════════════════════════════════════════════
// wizard.js — Lógica do stepper (passos 1–5)
// Para adicionar um novo passo: incremente o loop em activateStep()
// e adicione o case em updateChip()
// ═══════════════════════════════════════════════════════════════

let currentStep = 1;

function activateStep(n) {
  for (let i = 1; i <= 5; i++) {
    const el = document.getElementById(`step-${i}`);
    if (!el) continue;
    el.classList.remove('active', 'locked', 'completed');
    if (i === n)    el.classList.add('active');
    else if (i < n) el.classList.add('completed');
    else            el.classList.add('locked');
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
      chip.textContent = pos === 'footer'
        ? 'Rodapé'
        : pos === 'watermark' ? 'Marca d\'água' : 'Slide final';
      break;
    }
    case 5:
      chip.textContent = state.type === 'carousel'
        ? `${state.slides.length} slide(s)`
        : 'Artigo';
      break;
  }
}

// ─── Tipo (Carrossel / Artigo) ────────────────────────────────
function setType(t) {
  state.type = t;
  document.getElementById('card-carousel').classList.toggle('active', t === 'carousel');
  document.getElementById('card-article').classList.toggle('active',  t === 'article');
  document.getElementById('slides-section').classList.toggle('hidden',  t !== 'carousel');
  document.getElementById('article-section').classList.toggle('hidden', t !== 'article');
  updatePreview();
}

// ─── Categoria ────────────────────────────────────────────────
function selectCategory(el) {
  document.querySelectorAll('.cat-card').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  state.category = el.dataset.cat;
  updatePreview();
}

// ─── Título → slug ────────────────────────────────────────────
function onTitleInput() {
  state.title = document.getElementById('title').value;
  state.slug  = generateSlug(state.title);
  document.getElementById('slug-preview').textContent = state.slug || '—';
  updatePreview();
}
