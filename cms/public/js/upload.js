// ═══════════════════════════════════════════════════════════════
// upload.js — Upload de imagens via /api/upload
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
  } catch (err) {
    toast('Erro ao enviar imagem: ' + err.message, 'error');
  }
}

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
  } catch (err) {
    toast('Erro ao enviar capa: ' + err.message, 'error');
  }
}
