// ═══════════════════════════════════════════════════════════════
// notifications.js — Sistema de notificações in-app
// Substitui alert() e confirm() do navegador por UI própria.
// ═══════════════════════════════════════════════════════════════

// ── Toast ────────────────────────────────────────────────────────
/**
 * toast(message, type, duration)
 * type: 'success' | 'error' | 'warning' | 'info'
 */
function toast(message, type = 'info', duration = 3500) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const icons = { success: '✓', error: '✕', warning: '⚠', info: 'ℹ' };

  const el = document.createElement('div');
  el.className = `toast toast-${type}`;
  el.innerHTML = `
    <span class="toast-icon">${icons[type] ?? 'ℹ'}</span>
    <span class="toast-msg">${message}</span>
    <button class="toast-close" onclick="this.closest('.toast').remove()">✕</button>
  `;

  container.appendChild(el);

  // Entra com animação
  requestAnimationFrame(() => {
    requestAnimationFrame(() => el.classList.add('toast-visible'));
  });

  // Sai automaticamente
  const dismiss = () => {
    el.classList.remove('toast-visible');
    el.addEventListener('transitionend', () => el.remove(), { once: true });
  };

  const timer = setTimeout(dismiss, duration);
  el.querySelector('.toast-close').addEventListener('click', () => {
    clearTimeout(timer);
    dismiss();
  });
}

// ── Confirm dialog ───────────────────────────────────────────────
/**
 * showConfirm(message, confirmLabel, danger)
 * Retorna Promise<boolean>
 */
function showConfirm(message, confirmLabel = 'Confirmar', danger = true) {
  return new Promise(resolve => {
    const overlay  = document.getElementById('confirm-overlay');
    const msgEl    = document.getElementById('confirm-message');
    const okBtn    = document.getElementById('confirm-ok');
    const cancelBtn = document.getElementById('confirm-cancel');

    msgEl.textContent  = message;
    okBtn.textContent  = confirmLabel;
    okBtn.className    = danger ? 'btn-confirm-danger' : 'btn-primary';

    overlay.classList.remove('hidden');
    cancelBtn.focus();

    const cleanup = (result) => {
      overlay.classList.add('hidden');
      resolve(result);
    };

    okBtn.onclick     = () => cleanup(true);
    cancelBtn.onclick = () => cleanup(false);
    overlay.onclick   = (e) => { if (e.target === overlay) cleanup(false); };
  });
}
