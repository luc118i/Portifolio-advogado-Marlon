// ═══════════════════════════════════════════════════════════════
// ai.js — Integração com Groq + modal de configurações
// Para trocar o modelo ou adicionar novos modos: edite routes/ai.js
// ═══════════════════════════════════════════════════════════════

let aiConfigured = false;

// ─── Status da IA ─────────────────────────────────────────────
async function checkAiStatus() {
  try {
    const res  = await fetch('/api/config/status');
    const data = await res.json();
    aiConfigured = data.configured;
    const badge = document.getElementById('ai-status-badge');
    badge.className   = aiConfigured ? 'ai-badge ai-badge-on'  : 'ai-badge ai-badge-off';
    badge.textContent = aiConfigured ? '✦ IA ativa' : 'IA desativada';
  } catch {}
}

// ─── Modal de configurações ───────────────────────────────────
async function openConfigModal() {
  document.getElementById('config-modal').classList.remove('hidden');
  document.getElementById('config-result').classList.add('hidden');
  // Carrega pasta de exportação atual
  try {
    const data = await fetch('/api/config').then(r => r.json());
    const folderInput = document.getElementById('output-folder-input');
    if (folderInput && data.output_folder) folderInput.value = data.output_folder;
  } catch {}
}

async function saveApiKey() {
  const key    = document.getElementById('openai-key-input').value.trim();
  const folder = document.getElementById('output-folder-input')?.value.trim() ?? '';
  const res    = document.getElementById('config-result');
  res.className = 'result-msg hidden';

  if (!key && folder === '') return; // nada para salvar

  const payload = {};
  if (key)    payload.groq_api_key  = key;
  if (folder !== '') payload.output_folder = folder;

  try {
    const r    = await fetch('/api/config', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    });
    const data = await r.json();
    if (!r.ok) throw new Error(data.error);

    res.className   = 'result-msg success';
    res.textContent = '✓ Configurações salvas!';
    res.classList.remove('hidden');
    await checkAiStatus();
    setTimeout(() => document.getElementById('config-modal').classList.add('hidden'), 1500);
  } catch (err) {
    res.className   = 'result-msg error';
    res.textContent = '✕ ' + err.message;
    res.classList.remove('hidden');
  }
}

// ─── Abrir pasta no Explorer ──────────────────────────────────
async function openFolderInExplorer() {
  const folder = document.getElementById('output-folder-input')?.value.trim();
  if (!folder) { alert('Digite o caminho da pasta primeiro.'); return; }
  try {
    await fetch('/api/config/open-folder', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ folder }),
    });
  } catch {}
}

// ─── Sugerir ideias ───────────────────────────────────────────
async function suggestIdeas() {
  if (!aiConfigured) { openConfigModal(); return; }
  const modal   = document.getElementById('ideas-modal');
  const content = document.getElementById('ideas-content');
  document.getElementById('ideas-category').textContent = state.category;
  content.innerHTML = '<span class="spinner"></span> Gerando ideias...';
  modal.classList.remove('hidden');
  try {
    const res  = await fetch('/api/ai/generate', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ mode: 'idea', category: state.category }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    content.textContent = data.text;
  } catch (err) {
    content.innerHTML = `<span style="color:#d44">✕ ${err.message}</span>`;
  }
}

// ─── Gerar headline ───────────────────────────────────────────
async function aiGenerateHeadline(index) {
  if (!aiConfigured) { openConfigModal(); return; }
  const btn   = document.getElementById(`btn-ai-headline-${index}`);
  const input = document.getElementById(`headline-${index}`);
  btn.disabled  = true;
  btn.innerHTML = '<span class="spinner"></span>';
  try {
    const res  = await fetch('/api/ai/generate', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ mode: 'headline', category: state.category, topic: state.title || state.category }),
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

// ─── Gerar corpo do slide ─────────────────────────────────────
async function aiGenerateBody(index) {
  if (!aiConfigured) { openConfigModal(); return; }
  const btn      = document.getElementById(`btn-ai-body-${index}`);
  const textarea = document.getElementById(`body-${index}`);
  btn.disabled  = true;
  btn.innerHTML = '<span class="spinner"></span>';
  try {
    const res  = await fetch('/api/ai/generate', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ mode: 'body', category: state.category, headline: state.slides[index].headline || state.title }),
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

// ─── Humanizar texto ──────────────────────────────────────────
async function aiHumanize(index, field) {
  if (!aiConfigured) { openConfigModal(); return; }
  const btn  = document.getElementById(`btn-humanize-${field}-${index}`);
  const el   = document.getElementById(`${field}-${index}`);
  const text = el.value.trim();
  if (!text) return;
  btn.disabled  = true;
  btn.innerHTML = '<span class="spinner"></span>';
  try {
    const res  = await fetch('/api/ai/humanize', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ text }),
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
