// ═══════════════════════════════════════════════════════════════
// state.js — Estado global da aplicação
// Único lugar que define a estrutura de dados do post em criação.
// Para adicionar um campo novo ao slide: adicione em createEmptySlide()
// ═══════════════════════════════════════════════════════════════

function createEmptySlide() {
  return {
    type:          'content',
    layout:        'default',
    imagePath:     null,
    imageX:        0,
    imageY:        0,
    imageScale:    1,
    headline:      '',
    body:          '',
    headlineFont:  'Playfair Display',
  };
}

function createCtaSlide() {
  return {
    type:         'cta',
    headline:     'Está com dúvidas jurídicas?',
    body:         'Fale comigo antes de tomar qualquer decisão.',
    headlineFont: 'Playfair Display',
  };
}

// Estado mutável do post em edição
const state = {
  type:           'carousel',
  category:       'Direito Penal',
  title:          '',
  slug:           '',
  readTime:       '3 min',
  logoPosition:   'footer',
  currentSlide:   0,
  slides:         [createEmptySlide()],
  // Artigo
  coverImagePath: null,
  excerpt:        '',
  content:        '',
};
