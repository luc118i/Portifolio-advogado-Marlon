// ═══════════════════════════════════════════════════════════════
// data.js — Constantes puras: fontes, layouts e templates
// Para adicionar um novo layout: insira um objeto no array LAYOUTS
// Para uma nova área: insira uma chave em TEMPLATES
// ═══════════════════════════════════════════════════════════════

const FONTS = [
  { id: 'Inter',              name: 'Inter'              },
  { id: 'Playfair Display',   name: 'Playfair Display'   },
  { id: 'Cormorant Garamond', name: 'Cormorant Garamond'  },
  { id: 'EB Garamond',        name: 'EB Garamond'         },
  { id: 'Lora',               name: 'Lora'                },
  { id: 'Merriweather',       name: 'Merriweather'        },
  { id: 'Crimson Text',       name: 'Crimson Text'        },
  { id: 'Source Serif 4',     name: 'Source Serif 4'      },
  { id: 'PT Serif',           name: 'PT Serif'            },
  { id: 'Spectral',           name: 'Spectral'            },
  { id: 'Libre Baskerville',  name: 'Libre Baskerville'   },
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
