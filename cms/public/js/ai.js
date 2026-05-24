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

// ─── Config Screen (tela dedicada de configurações) ───────────
async function openConfigScreen() {
  document.getElementById('config-screen').classList.remove('hidden');
  document.getElementById('studio-layout').classList.add('hidden');
  switchConfigSection('ai'); // sempre abre na seção de IA
  _loadConfigValues();
}

function closeConfigScreen() {
  document.getElementById('config-screen').classList.add('hidden');
  document.getElementById('studio-layout').classList.remove('hidden');
  setNavActive('editor');
}

// ── Navegar entre seções da config ────────────────────────────
function switchConfigSection(id) {
  document.querySelectorAll('.config-section').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.config-nav-item').forEach(el => el.classList.remove('active'));
  document.getElementById('cs-' + id)?.classList.add('active');
  document.querySelector(`.config-nav-item[data-cs="${id}"]`)?.classList.add('active');
}

// Marca a seção ativa como salva com badge "✓"
function _markConfigNavSaved() {
  const active = document.querySelector('.config-nav-item.active');
  if (!active) return;
  const badge = active.querySelector('.config-nav-badge');
  if (badge) { badge.textContent = '✓'; badge.classList.add('visible'); }
}

// Mantido para compatibilidade com qualquer referência antiga
async function openConfigModal() {
  openConfigScreen();
}

async function _loadConfigValues() {
  try {
    const data = await fetch('/api/config').then(r => r.json());
    const s = (id, val) => { const el = document.getElementById(id); if (el && val) el.value = val; };

    s('output-folder-input', data.output_folder);
    // Connection string mascarada → só atualiza placeholder
    if (data.database_url) {
      const el = document.getElementById('database-url-input');
      if (el) el.placeholder = data.database_url; // já vem mascarada do server
    }
    s('ig-user-id-input', data.meta_ig_user_id || '');
    if (data.meta_access_token) {
      const el = document.getElementById('ig-token-input');
      if (el) el.placeholder = data.meta_access_token;
    }
    if (data.meta_token_expires_at) {
      const days = Math.round((new Date(data.meta_token_expires_at) - Date.now()) / 86400000);
      const hint = document.getElementById('ig-token-input');
      if (hint) hint.placeholder = `Token válido por mais ${days} dias`;
    }
    // Sincroniza badge da config screen
    const badge = document.getElementById('ai-status-badge-config');
    if (badge) {
      badge.className   = aiConfigured ? 'ai-badge ai-badge-on'  : 'ai-badge ai-badge-off';
      badge.textContent = aiConfigured ? '✦ IA ativa' : 'IA desativada';
    }
  } catch {}
}

async function saveApiKey() {
  const key        = document.getElementById('openai-key-input').value.trim();
  const folder     = document.getElementById('output-folder-input')?.value.trim()  ?? '';
  const dbUrl      = document.getElementById('database-url-input')?.value.trim()   ?? '';
  const igUserId   = document.getElementById('ig-user-id-input')?.value.trim()     ?? '';
  const igToken    = document.getElementById('ig-token-input')?.value.trim()       ?? '';
  const igAppId    = document.getElementById('ig-app-id-input')?.value.trim()      ?? '';
  const igAppSec   = document.getElementById('ig-app-secret-input')?.value.trim()  ?? '';

  const payload = {};
  if (key)        payload.groq_api_key      = key;
  if (folder)     payload.output_folder     = folder;
  if (dbUrl)      payload.database_url      = dbUrl;
  if (igUserId)   payload.meta_ig_user_id   = igUserId;
  if (igToken)    payload.meta_access_token = igToken;
  if (igAppId)    payload.meta_app_id       = igAppId;
  if (igAppSec)   payload.meta_app_secret   = igAppSec;

  if (!Object.keys(payload).length) {
    toast('Nenhum campo preenchido para salvar.', 'warning');
    return;
  }

  // Desabilita o botão da seção ativa
  const saveBtn = document.querySelector('.config-section.active .cs-save-btn');
  if (saveBtn) { saveBtn.disabled = true; saveBtn.textContent = 'Salvando…'; }

  try {
    const r    = await fetch('/api/config', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    });
    const data = await r.json();
    if (!r.ok) throw new Error(data.error);

    await checkAiStatus();
    _markConfigNavSaved();
    toast('Configurações salvas!', 'success');
  } catch (err) {
    toast('Erro ao salvar: ' + err.message, 'error');
  } finally {
    if (saveBtn) { saveBtn.disabled = false; saveBtn.textContent = 'Salvar'; }
  }
}

// ─── Testar conexão Neon ──────────────────────────────────────
async function testDbConnection() {
  const btn      = document.getElementById('db-test-btn');
  const resultEl = document.getElementById('db-test-result');
  const dbUrl    = document.getElementById('database-url-input')?.value.trim();

  btn.textContent = '…';
  btn.disabled    = true;
  resultEl.style.display = 'block';
  resultEl.style.color   = 'var(--muted)';
  resultEl.textContent   = 'Testando conexão…';

  try {
    const r    = await fetch('/api/config/test-db', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ database_url: dbUrl || undefined }),
    });
    const data = await r.json();

    if (data.ok) {
      resultEl.style.color = '#3ecf8e';
      resultEl.textContent = `✓ Conectado ao Neon! Latência: ${data.latency_ms}ms`;
    } else {
      resultEl.style.color = 'var(--color-danger)';
      resultEl.textContent = '✕ Falha: ' + (data.error || 'Erro desconhecido');
    }
  } catch {
    resultEl.style.color = 'var(--color-danger)';
    resultEl.textContent = '✕ Erro de rede ao testar conexão.';
  } finally {
    btn.textContent = '⚡';
    btn.disabled    = false;
  }
}

// ─── Abrir pasta no Explorer ──────────────────────────────────
async function openFolderInExplorer() {
  const folder = document.getElementById('output-folder-input')?.value.trim();
  if (!folder) { toast('Digite o caminho da pasta primeiro.', 'warning'); return; }
  try {
    await fetch('/api/config/open-folder', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ folder }),
    });
    toast('Pasta aberta no Explorer.', 'info');
  } catch { toast('Não foi possível abrir a pasta.', 'error'); }
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
    toast('Erro ao gerar headline: ' + err.message, 'error');
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
    toast('Erro ao gerar texto: ' + err.message, 'error');
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
    toast('Erro ao humanizar: ' + err.message, 'error');
  } finally {
    btn.disabled  = false;
    btn.innerHTML = '◈ Humanizar';
  }
}
