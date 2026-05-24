// ═══════════════════════════════════════════════════════════════
// data.js — Constantes puras: fontes, layouts e templates
// Para adicionar um novo layout: insira um objeto no array LAYOUTS
// Para uma nova área: insira uma chave em TEMPLATES
// ═══════════════════════════════════════════════════════════════

const FONTS = [
  // ── Serif Editorial — headlines de luxo e impacto ─────────────
  { id: 'Playfair Display',    name: 'Playfair Display',    category: 'serif', desc: 'Editorial clássico'      },
  { id: 'Cormorant Garamond',  name: 'Cormorant Garamond',  category: 'serif', desc: 'Elegante e refinado'     },
  { id: 'Bodoni Moda',         name: 'Bodoni Moda',         category: 'serif', desc: 'Luxo, moda, 2024'        },
  { id: 'Instrument Serif',    name: 'Instrument Serif',    category: 'serif', desc: 'Tendência 2024'          },
  { id: 'Cinzel',              name: 'Cinzel',              category: 'serif', desc: 'Romano, perfeito p/ lei' },
  { id: 'DM Serif Display',    name: 'DM Serif Display',    category: 'serif', desc: 'Impacto moderno'         },
  { id: 'Fraunces',            name: 'Fraunces',            category: 'serif', desc: 'Expressivo, único'       },
  { id: 'Yeseva One',          name: 'Yeseva One',          category: 'serif', desc: 'Display elegante'        },
  { id: 'Young Serif',         name: 'Young Serif',         category: 'serif', desc: 'Fresco, editorial'       },

  // ── Serif Clássica — leitura e credibilidade ──────────────────
  { id: 'EB Garamond',         name: 'EB Garamond',         category: 'serif', desc: 'Literário, clássico'     },
  { id: 'Lora',                name: 'Lora',                category: 'serif', desc: 'Moderno e legível'       },
  { id: 'Bitter',              name: 'Bitter',              category: 'serif', desc: 'Jornalístico, nítido'    },
  { id: 'Merriweather',        name: 'Merriweather',        category: 'serif', desc: 'Forte e marcante'        },
  { id: 'Libre Baskerville',   name: 'Libre Baskerville',   category: 'serif', desc: 'Institucional'           },
  { id: 'Source Serif 4',      name: 'Source Serif 4',      category: 'serif', desc: 'Contemporâneo'           },
  { id: 'Spectral',            name: 'Spectral',            category: 'serif', desc: 'Digital-first serif'     },
  { id: 'Crimson Text',        name: 'Crimson Text',        category: 'serif', desc: 'Lírico, delicado'        },
  { id: 'PT Serif',            name: 'PT Serif',            category: 'serif', desc: 'Neutro, funcional'       },

  // ── Sans-serif — limpeza e modernidade ───────────────────────
  { id: 'Inter',               name: 'Inter',               category: 'sans',  desc: 'Clean, universal'        },
  { id: 'Space Grotesk',       name: 'Space Grotesk',       category: 'sans',  desc: 'Tech editorial, 2024'    },
  { id: 'Bricolage Grotesque', name: 'Bricolage Grotesque', category: 'sans',  desc: 'Variável, tendência 2024' },
  { id: 'DM Sans',             name: 'DM Sans',             category: 'sans',  desc: 'Geométrico suave'        },
  { id: 'Plus Jakarta Sans',   name: 'Plus Jakarta Sans',   category: 'sans',  desc: 'Moderno e amplo'         },
  { id: 'Outfit',              name: 'Outfit',              category: 'sans',  desc: 'Friendly, tech'          },
  { id: 'Manrope',             name: 'Manrope',             category: 'sans',  desc: 'Geométrico elegante'     },
  { id: 'Figtree',             name: 'Figtree',             category: 'sans',  desc: 'Limpo, contemporâneo'    },
  { id: 'Albert Sans',         name: 'Albert Sans',         category: 'sans',  desc: 'Geométrico, nítido'      },
  { id: 'Epilogue',            name: 'Epilogue',            category: 'sans',  desc: 'Editorial moderno'       },
  { id: 'Work Sans',           name: 'Work Sans',           category: 'sans',  desc: 'Funcional, legível'      },
  { id: 'Raleway',             name: 'Raleway',             category: 'sans',  desc: 'Sofisticado, fino'       },
  { id: 'Josefin Sans',        name: 'Josefin Sans',        category: 'sans',  desc: 'Geométrico claro'        },
  { id: 'Syne',                name: 'Syne',                category: 'sans',  desc: 'Ousado, contemporâneo'   },

  // ── Display · Impact — para headlines que param o scroll ─────
  { id: 'Abril Fatface',       name: 'Abril Fatface',       category: 'display', desc: 'Ultra bold, editorial' },
  { id: 'Bebas Neue',          name: 'Bebas Neue',          category: 'display', desc: 'Caps, redes sociais'   },
  { id: 'Archivo Black',       name: 'Archivo Black',       category: 'display', desc: 'Bold, impacto direto'  },
];

const LAYOUTS = [
  {
    id: 'default',
    name: 'Padrão',
    mini: `<div style="height:3px;background:rgba(255,255,255,0.15);margin-bottom:4px;width:40%"></div>
           <div style="height:5px;background:rgba(255,255,255,0.5);margin-bottom:3px"></div>
           <div style="height:3px;background:rgba(255,255,255,0.25);width:80%"></div>`,
  },
  {
    id: 'dica-semana',
    name: 'Dica',
    mini: `<div style="text-align:center;font-size:6px;color:rgba(255,255,255,0.5);margin-bottom:3px">✦ DICA</div>
           <div style="width:16px;height:16px;border-radius:50%;background:rgba(255,255,255,0.1);margin:0 auto 3px;display:flex;align-items:center;justify-content:center;font-size:9px">💡</div>
           <div style="height:4px;background:rgba(255,255,255,0.4);margin-bottom:2px;width:90%;margin-left:auto;margin-right:auto;border-radius:2px"></div>`,
  },
  {
    id: 'voce-sabia',
    name: 'Sabia?',
    mini: `<div style="font-size:6px;font-weight:700;margin-bottom:3px;opacity:0.9">VOCÊ SABIA?</div>
           <div style="height:1px;background:rgba(255,255,255,0.4);margin-bottom:4px"></div>
           <div style="height:4px;background:rgba(255,255,255,0.5);margin-bottom:2px;border-radius:2px"></div>
           <div style="height:3px;background:rgba(255,255,255,0.2);width:70%;border-radius:2px"></div>`,
  },
  {
    id: 'caso-real',
    name: 'Caso Real',
    mini: `<div style="display:inline-block;font-size:5px;border:1px solid rgba(255,255,255,0.4);padding:1px 4px;border-radius:2px;margin-bottom:4px;opacity:0.8">⚖ CASO REAL</div>
           <div style="height:4px;background:rgba(255,255,255,0.5);margin-bottom:2px;border-radius:2px"></div>
           <div style="height:3px;background:rgba(255,255,255,0.3);width:85%;margin-bottom:2px;border-radius:2px"></div>
           <div style="height:3px;background:rgba(255,255,255,0.15);width:60%;border-radius:2px"></div>`,
  },
  {
    id: 'mito-verdade',
    name: 'Mito?',
    mini: `<div style="font-size:5px;font-weight:700;margin-bottom:3px;opacity:0.7">MITO OU VERDADE?</div>
           <div style="border:1px solid rgba(255,255,255,0.3);padding:2px 3px;border-radius:2px;margin-bottom:4px">
             <div style="height:3px;background:rgba(255,255,255,0.4);border-radius:1px"></div>
           </div>
           <div style="font-size:5px;font-weight:700;opacity:0.9">✓ VERDADE</div>`,
  },
  {
    id: 'foco',
    name: 'Foco',
    mini: `<div style="height:2px;background:rgba(255,255,255,0.5);width:30%;margin-bottom:4px"></div>
           <div style="height:7px;background:rgba(255,255,255,0.6);margin-bottom:2px;border-radius:1px"></div>
           <div style="height:5px;background:rgba(255,255,255,0.4);width:80%;margin-bottom:4px;border-radius:1px"></div>
           <div style="height:2px;background:rgba(255,255,255,0.3);width:40%"></div>`,
  },
  {
    id: 'estatistica',
    name: 'Estatística',
    mini: `<div style="text-align:center">
             <div style="font-size:5px;opacity:0.45;letter-spacing:0.1em;margin-bottom:2px">EM NÚMEROS</div>
             <div style="font-size:15px;font-weight:700;opacity:0.9;line-height:1;margin-bottom:3px">78%</div>
             <div style="height:1px;background:rgba(255,255,255,0.45);width:20px;margin:0 auto 4px"></div>
             <div style="height:3px;background:rgba(255,255,255,0.25);border-radius:1px;width:80%;margin:0 auto"></div>
           </div>`,
  },
  {
    id: 'pull-quote',
    name: 'Citação',
    mini: `<div style="padding:0 2px">
             <div style="font-size:16px;font-weight:700;opacity:0.55;line-height:0.75;margin-bottom:3px">"</div>
             <div style="height:3px;background:rgba(255,255,255,0.5);border-radius:1px;margin-bottom:2px"></div>
             <div style="height:2px;background:rgba(255,255,255,0.3);border-radius:1px;width:80%;margin-bottom:3px"></div>
             <div style="height:2px;background:rgba(255,255,255,0.15);border-radius:1px;width:50%"></div>
           </div>`,
  },
  {
    id: 'alerta',
    name: 'Alerta',
    mini: `<div style="border-left:2px solid rgba(255,255,255,0.65);padding-left:4px">
             <div style="font-size:5px;opacity:0.65;letter-spacing:0.08em;margin-bottom:3px">⚠ ATENÇÃO</div>
             <div style="height:4px;background:rgba(255,255,255,0.5);border-radius:1px;margin-bottom:2px"></div>
             <div style="height:3px;background:rgba(255,255,255,0.3);border-radius:1px;width:85%"></div>
           </div>`,
  },
  {
    id: 'magazine',
    name: 'Magazine',
    mini: `<div>
             <div style="height:6px;background:rgba(255,255,255,0.55);border-radius:1px;margin-bottom:2px"></div>
             <div style="height:4px;background:rgba(255,255,255,0.35);border-radius:1px;width:80%;margin-bottom:5px"></div>
             <div style="height:1px;background:rgba(255,255,255,0.25);margin-bottom:4px"></div>
             <div style="height:3px;background:rgba(255,255,255,0.2);border-radius:1px;margin-bottom:2px"></div>
             <div style="height:3px;background:rgba(255,255,255,0.15);border-radius:1px;width:70%"></div>
           </div>`,
  },
  {
    id: 'split',
    name: 'Split',
    mini: `<div style="display:flex;gap:3px;height:36px;margin:-2px">
             <div style="width:36%;background:rgba(255,255,255,0.22);border-radius:1px"></div>
             <div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:2px;padding:2px 0">
               <div style="height:4px;background:rgba(255,255,255,0.5);border-radius:1px"></div>
               <div style="height:3px;background:rgba(255,255,255,0.3);border-radius:1px;width:80%"></div>
               <div style="height:3px;background:rgba(255,255,255,0.18);border-radius:1px;width:60%"></div>
             </div>
           </div>`,
  },
  {
    id: 'lista',
    name: 'Lista',
    mini: `<div style="display:flex;flex-direction:column;gap:3px">
             <div style="font-size:5px;opacity:0.4;letter-spacing:0.08em;margin-bottom:1px">PASSO A PASSO</div>
             ${[1,2,3].map(n=>`
               <div style="display:flex;gap:3px;align-items:center">
                 <div style="min-width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,0.32);font-size:5px;display:flex;align-items:center;justify-content:center;color:rgba(0,0,0,0.8);font-weight:700">${n}</div>
                 <div style="height:2px;flex:1;background:rgba(255,255,255,0.32);border-radius:1px"></div>
               </div>`).join('')}
           </div>`,
  },
  {
    id: 'checklist',
    name: 'Checklist',
    mini: `<div style="display:flex;flex-direction:column;gap:3px">
             <div style="font-size:5px;opacity:0.45;letter-spacing:0.08em;margin-bottom:1px">CHECKLIST</div>
             ${[0,1,2].map(()=>`
               <div style="display:flex;gap:3px;align-items:center">
                 <div style="width:8px;height:8px;border-radius:2px;background:rgba(37,211,102,0.45);display:flex;align-items:center;justify-content:center;font-size:6px;color:#fff">✓</div>
                 <div style="height:2px;flex:1;background:rgba(255,255,255,0.35);border-radius:1px"></div>
               </div>`).join('')}
           </div>`,
  },
  {
    id: 'comparativo',
    name: 'Comparativo',
    mini: `<div style="display:flex;gap:2px;height:28px;margin-top:2px">
             <div style="flex:1;background:rgba(210,60,60,0.25);border-radius:2px;display:flex;align-items:center;justify-content:center;font-size:9px">✕</div>
             <div style="width:1px;background:rgba(255,255,255,0.12)"></div>
             <div style="flex:1;background:rgba(37,211,102,0.2);border-radius:2px;display:flex;align-items:center;justify-content:center;font-size:9px">✓</div>
           </div>`,
  },
  {
    id: 'pergunta-resp',
    name: 'Pergunta',
    mini: `<div style="display:flex;flex-direction:column;gap:3px">
             <div style="border-radius:2px;padding:2px 4px;background:rgba(255,255,255,0.1)">
               <div style="font-size:5px;opacity:0.45;margin-bottom:1px">PERGUNTA</div>
               <div style="height:3px;background:rgba(255,255,255,0.5);border-radius:1px"></div>
             </div>
             <div style="display:flex;align-items:center;gap:2px;padding:0 2px">
               <div style="flex:1;height:1px;background:rgba(255,255,255,0.15)"></div>
               <div style="font-size:5px;opacity:0.5;font-weight:700">R</div>
               <div style="flex:1;height:1px;background:rgba(255,255,255,0.15)"></div>
             </div>
             <div style="height:2px;background:rgba(255,255,255,0.3);border-radius:1px"></div>
             <div style="height:2px;background:rgba(255,255,255,0.2);border-radius:1px;width:70%"></div>
           </div>`,
  },
  {
    id: 'ranking',
    name: 'Ranking',
    mini: `<div style="display:flex;flex-direction:column;gap:2px">
             <div style="font-size:5px;opacity:0.4;letter-spacing:0.08em;margin-bottom:1px">🏆 RANKING</div>
             <div style="display:flex;gap:3px;align-items:center">
               <div style="font-size:7px;font-weight:700;opacity:0.95;min-width:7px">1</div>
               <div style="height:4px;flex:1;background:rgba(255,255,255,0.7);border-radius:1px"></div>
             </div>
             <div style="display:flex;gap:3px;align-items:center">
               <div style="font-size:6px;font-weight:700;opacity:0.6;min-width:7px">2</div>
               <div style="height:3px;width:80%;background:rgba(255,255,255,0.45);border-radius:1px"></div>
             </div>
             <div style="display:flex;gap:3px;align-items:center">
               <div style="font-size:5px;font-weight:700;opacity:0.4;min-width:7px">3</div>
               <div style="height:2px;width:60%;background:rgba(255,255,255,0.28);border-radius:1px"></div>
             </div>
           </div>`,
  },
];

const FORMATS = [
  { id: 'story',     name: 'Story',     ratio: '9:16',    pw: 300, ph: 480 },
  { id: 'feed',      name: 'Feed 1:1',  ratio: '1:1',     pw: 300, ph: 300 },
  { id: 'feed-4-5',  name: 'Feed 4:5',  ratio: '4:5',     pw: 300, ph: 375 },
  { id: 'reels',     name: 'Reels',     ratio: '9:16',    pw: 300, ph: 480 },
  { id: 'linkedin',  name: 'LinkedIn',  ratio: '1.91:1',  pw: 380, ph: 199 },
  { id: 'youtube',   name: 'YouTube',   ratio: '16:9',    pw: 340, ph: 191 },
  { id: 'pinterest', name: 'Pinterest', ratio: '2:3',     pw: 300, ph: 450 },
];

const IMG_FILTERS = [
  { id: 'none',      label: 'Normal',     css: '' },
  { id: 'dramatico', label: 'Dramático',  css: 'contrast(145%) brightness(86%) saturate(112%)' },
  { id: 'sepia',     label: 'Sépia',      css: 'sepia(80%) brightness(106%)' },
  { id: 'fade',      label: 'Desbotado',  css: 'saturate(50%) brightness(115%) contrast(86%)' },
  { id: 'noir',      label: 'Noir',       css: 'grayscale(100%) contrast(128%) brightness(90%)' },
  { id: 'dourado',   label: 'Dourado',    css: 'sepia(48%) saturate(155%) brightness(110%)' },
  { id: 'frio',      label: 'Frio',       css: 'hue-rotate(195deg) saturate(78%) brightness(106%)' },
  { id: 'vibrante',  label: 'Vibrante',   css: 'saturate(190%) brightness(107%) contrast(114%)' },
];

const PRESET_TEMPLATES = [
  {
    name: 'Dica da Semana',
    desc: '3 slides · dica prática',
    icon: '💡',
    category: 'Direito Penal',
    slides: [
      { headline: 'Dica Jurídica da Semana', body: 'Descubra o que todo cidadão deve saber sobre seus direitos.', layout: 'dica-semana' },
      { headline: 'O que diz a lei?', body: 'Conheça a legislação que garante seus direitos nessa situação.', layout: 'default' },
      { headline: 'Consulte um advogado', body: 'A orientação certa faz toda a diferença. Não arrisque agir sem respaldo jurídico.', layout: 'foco' },
    ],
  },
  {
    name: 'Mito ou Verdade?',
    desc: '2 slides · quiz jurídico',
    icon: '⚖',
    category: 'Direito Civil',
    slides: [
      { headline: 'Isso é MITO ou VERDADE?', body: 'Verdade', layout: 'mito-verdade' },
      { headline: 'A resposta te surpreende', body: 'Muita gente erra nessa questão. Saiba o que diz o Código Civil.', layout: 'voce-sabia' },
    ],
  },
  {
    name: 'Caso Real',
    desc: '3 slides · narrativa de caso',
    icon: '📋',
    category: 'Consultoria Jurídica',
    slides: [
      { headline: 'O que aconteceu', body: 'Um cliente veio até nós em uma situação delicada...', layout: 'caso-real' },
      { headline: 'Como resolvemos', body: 'Com a estratégia jurídica certa, conseguimos reverter o caso.', layout: 'default' },
      { headline: 'O resultado', body: 'Direito garantido. Justiça feita. É pra isso que estamos aqui.', layout: 'foco' },
    ],
  },
  {
    name: 'Você Sabia?',
    desc: '2 slides · curiosidade jurídica',
    icon: '🔍',
    category: 'Direito Administrativo',
    slides: [
      { headline: 'Você sabia disso?', body: 'Uma informação que pode mudar sua visão sobre o sistema jurídico.', layout: 'voce-sabia' },
      { headline: 'O que isso significa pra você', body: 'Entender seus direitos é o primeiro passo para exercê-los com segurança.', layout: 'default' },
    ],
  },
];

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
               <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
               <path d="M14 2v6h6"/>
               <line x1="16" y1="13" x2="8" y2="13"/>
               <line x1="16" y1="17" x2="8" y2="17"/>
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
