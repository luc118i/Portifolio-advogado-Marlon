// ═══════════════════════════════════════════════════════════════
// utils.js — Funções utilitárias puras (sem efeitos colaterais)
// ═══════════════════════════════════════════════════════════════

function escHtml(str) {
  return (str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function generateSlug(title) {
  return title.toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-').replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function getLogoPos() {
  return document.querySelector('input[name="logoPos"]:checked')?.value || 'footer';
}
