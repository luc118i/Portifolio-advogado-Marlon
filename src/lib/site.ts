// ═══════════════════════════════════════════════════════════════
// Dados do site — fonte única de verdade.
// Nome público padronizado: "Dr. Marlon Inácio" (ver diagnóstico, mudança nº 2).
// ═══════════════════════════════════════════════════════════════

export const SITE = {
  name: "Dr. Marlon Inácio",
  shortName: "Marlon Inácio",
  role: "Advogado",
  oab: "OAB/DF 87.696",
  oabSubsecao: "Subseção São Sebastião",
  city: "Brasília, DF",
  graduation: "Bacharel em Direito · Universidade Católica de Brasília · 2025",
  oabYear: "2025",

  whatsappNumber: "5561999138905",
  phoneDisplay: "(61) 9 9913-8905",
  email: "marloninacio.adv@outlook.com",
  instagram: "https://instagram.com/marloninacio.adv",
  instagramHandle: "@marloninacio.adv",
  linkedin: "https://linkedin.com/in/marlon-silva-082b811a4",
  linkedinDisplay: "Marlon Inácio",
  cnaUrl: "https://cna.oab.org.br/",
} as const;

/** Crédito de desenvolvimento. */
export const DEV = {
  name: "Lucas Inácio",
  github: "https://github.com/luc118i",
  githubHandle: "@luc118i",
} as const;

/** Monta um link de WhatsApp com mensagem pré-preenchida. */
export function wa(message: string): string {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const WA_DEFAULT = wa(
  "Olá, Dr. Marlon! Vi seu site e gostaria de conversar sobre uma questão jurídica."
);

/** Seções na ordem em que aparecem — dirigem a navbar e o scroll-spy. */
export const NAV_SECTIONS = [
  { id: "sobre", label: "Sobre" },
  { id: "atuacao", label: "Atuação" },
  { id: "formacao", label: "Formação" },
  { id: "publicacoes", label: "Publicações" },
  { id: "contato", label: "Contato" },
] as const;
