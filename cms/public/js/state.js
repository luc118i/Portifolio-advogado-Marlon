// ═══════════════════════════════════════════════════════════════
// state.js — Estado global da aplicação
// Único lugar que define a estrutura de dados do post em criação.
// Para adicionar um campo novo ao slide: adicione em createEmptySlide()
// ═══════════════════════════════════════════════════════════════

function createEmptySlide() {
  return {
    type:             'content',
    layout:           'default',
    imagePath:        null,
    imageX:           0,
    imageY:           0,
    imageScale:       1,
    imageRotate:      0,
    imageFlipH:       false,
    imageFlipV:       false,
    imageFilter:      'none',
    imageBlur:        0,
    imageBrightness:  100,
    imageContrast:    100,
    imageSaturation:  100,
    headline:         '',
    body:             '',
    headlineFont:     'DM Serif Display',
    bodyFont:         'Space Grotesk',
  };
}

function createCtaSlide() {
  return {
    type:         'cta',
    headline:     'Está com dúvidas jurídicas?',
    body:         'Fale comigo antes de tomar qualquer decisão.',
    headlineFont: 'DM Serif Display',
    bodyFont:     'Space Grotesk',
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
  format:         'story',
  currentSlide:   0,
  slides:         [createEmptySlide()],
  // Artigo
  coverImagePath: null,
  excerpt:        '',
  content:        '',
};
