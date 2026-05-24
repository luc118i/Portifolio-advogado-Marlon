// ═══════════════════════════════════════════════════════════════
// PostsPage.tsx — Feed de conteúdo jurídico estilo rede social
// ═══════════════════════════════════════════════════════════════

import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, X, Heart } from "lucide-react";

// ── Types ────────────────────────────────────────────────────────
interface Slide {
  type?: string;
  layout?: string;
  imagePath?: string;
  imageX?: number;
  imageY?: number;
  imageScale?: number;
  imageRotate?: number;
  imageFlipH?: boolean;
  imageFlipV?: boolean;
  imageFilter?: string;
  imageBlur?: number;
  imageBrightness?: number;
  imageContrast?: number;
  imageSaturation?: number;
  headline?: string;
  body?: string;
  headlineFont?: string;
  bodyFont?: string;
}

interface Post {
  slug: string;
  title: string;
  type: "carousel" | "article";
  category?: string;
  date?: string;
  readTime?: string;
  slides?: Slide[];
  coverImage?: string;
  excerpt?: string;
  content?: string;
  ig_permalink?: string;
}

// ── Sort helper ───────────────────────────────────────────────────
function sortByDate(posts: Post[]): Post[] {
  return [...posts].sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

// ── Filter presets (mirrors CMS) ─────────────────────────────────
const IMG_FILTERS: Record<string, string> = {
  none:      "",
  dramatico: "contrast(145%) brightness(86%) saturate(112%)",
  sepia:     "sepia(80%) brightness(106%)",
  fade:      "saturate(50%) brightness(115%) contrast(86%)",
  noir:      "grayscale(100%) contrast(128%) brightness(90%)",
  dourado:   "sepia(48%) saturate(155%) brightness(110%)",
  frio:      "hue-rotate(195deg) saturate(78%) brightness(106%)",
  vibrante:  "saturate(190%) brightness(107%) contrast(114%)",
};

const LAYOUT_LABELS: Record<string, string> = {
  "dica-semana":  "DICA DA SEMANA",
  "mito-verdade": "MITO OU VERDADE",
  "caso-real":    "CASO REAL",
  "voce-sabia":   "VOCÊ SABIA?",
};

// ── Cores por área do direito ────────────────────────────────────
const CATEGORY_COLORS: Record<string, { bg: string; color: string }> = {
  "Direito Penal":            { bg: "#7f1d1d", color: "#fca5a5" },
  "Direito Civil":            { bg: "#1e3a5f", color: "#93c5fd" },
  "Direito Administrativo":   { bg: "#3b0764", color: "#d8b4fe" },
  "Consultoria Jurídica":     { bg: "#064e3b", color: "#6ee7b7" },
  "Tecnologia e IA Jurídica": { bg: "#0c4a6e", color: "#7dd3fc" },
  "Direito do Trabalho":      { bg: "#78350f", color: "#fcd34d" },
  "Direito de Família":       { bg: "#831843", color: "#f9a8d4" },
};
const DEFAULT_CAT_COLOR = { bg: "#1C1C1C", color: "#c8a96e" };

// ── Geração de hashtags por palavras-chave do título + área ──────
const KEYWORD_TAGS: Array<[RegExp, string[]]> = [
  [/abandon/i,                     ["#AbandonoAfetivo", "#DireitoDeFamília", "#ResponsabilidadeCivil"]],
  [/divórc|separaç/i,              ["#Divórcio", "#DireitoDeFamília", "#GuardaDosFilhos"]],
  [/herança|inventário|herdeiro/i, ["#Herança", "#DireitoSucessório", "#Inventário"]],
  [/alimentos|pensão/i,            ["#PensãoAlimentícia", "#DireitoDeFamília", "#AlimentosFilhos"]],
  [/acidente|trânsito/i,           ["#AcidenteDeTransito", "#IndenizaçãoDeTransito", "#SeguroVeicular"]],
  [/trabalh|emprego|demiss/i,      ["#DireitoTrabalhista", "#ReclamatóriaTrabalhista", "#FGTS"]],
  [/consumi/i,                     ["#DireitoDoConsumidor", "#ProteçãoDoConsumidor", "#Procon"]],
  [/empresa|societár|sócio/i,      ["#DireitoEmpresarial", "#EmpresaEDireito", "#DireitoSocietário"]],
  [/imóv|locaç|aluguel/i,         ["#DireitoImobiliário", "#ContratoDeLocação", "#AluguelDF"]],
  [/indeniz/i,                     ["#Indenização", "#DanosMorais", "#ResponsabilidadeCivil"]],
  [/contrat/i,                     ["#ContratosJurídicos", "#DireitoContratual", "#RevisãoContratual"]],
  [/preso|prisão|flagrante|habeas/i,["#HabeasCorpus", "#DefesaCriminal", "#LiberdadeProvisória"]],
  [/licitaç/i,                     ["#LicitaçõesPúblicas", "#ContratosAdministrativos", "#ComprasGoverno"]],
  [/ia|inteligência artificial/i,  ["#IAJurídica", "#LegalTech", "#InovaçãoJurídica"]],
  [/servidor|concurso/i,           ["#ServidorPúblico", "#EstabilidadeFuncional", "#DireitoPúblico"]],
  [/fraude|estelionato|crime/i,    ["#CrimesFinanceiros", "#DireitoPenal", "#DefesaCriminal"]],
  [/usucap/i,                      ["#Usucapião", "#DireitoImobiliário", "#PropiedadeUrbana"]],
  [/guarda|custódia|filho/i,       ["#GuardaDosFilhos", "#DireitoDeFamília", "#BemEstarInfantil"]],
  [/multa|infração|trânsito/i,     ["#MultaDeTransito", "#Habilitação", "#DefesaDeMulta"]],
  [/aposentador/i,                 ["#Aposentadoria", "#PrevidênciaSocial", "#DireitosDoIdoso"]],
];

const AREA_TAGS: Record<string, string[]> = {
  "Direito Penal":            ["#DireitoPenal", "#AdvogadoCriminalista"],
  "Direito Civil":            ["#DireitoCivil", "#DireitosDoCidadão"],
  "Direito Administrativo":   ["#DireitoAdministrativo", "#DireitoPúblico"],
  "Consultoria Jurídica":     ["#ConsultoriaJurídica", "#OrientaçãoJurídica"],
  "Tecnologia e IA Jurídica": ["#DireitoDigital", "#LegalTech"],
  "Direito do Trabalho":      ["#DireitoTrabalhista", "#CLT"],
  "Direito de Família":       ["#DireitoDeFamília", "#DireitoDeFamilia"],
};

function generateHashtags(post: Post): string {
  // 1. Palavras-chave do título
  const keywordTags: string[] = [];
  for (const [pattern, tags] of KEYWORD_TAGS) {
    if (pattern.test(post.title)) { keywordTags.push(...tags); break; }
  }

  // 2. Palavras do título como hashtags (> 4 letras, sem pontuação)
  const titleTags = post.title
    .split(/\s+/)
    .filter(w => w.replace(/[^\wÀ-ú]/g, "").length > 4)
    .map(w => `#${w.charAt(0).toUpperCase()}${w.slice(1).toLowerCase().replace(/[^\wÀ-ú]/g, "")}`)
    .slice(0, 2);

  // 3. Tags da área
  const areaTags = AREA_TAGS[post.category ?? ""] ?? ["#Direito"];

  // 4. Base fixa para SEO local
  const base = ["#AdvogadoBrasília", "#OABDF", "#DrMarlonInácio"];

  const all = [...new Set([...keywordTags, ...titleTags, ...areaTags, ...base])];
  return all.slice(0, 9).join(" ");
}

// ── Links externos ────────────────────────────────────────────────
// ⚙️  Atualize com o handle real do Instagram do Dr. Marlon:
const IG_PROFILE_URL = "https://www.instagram.com/marloninacio.adv/";

// ── Utilities ─────────────────────────────────────────────────────
function buildImgFilter(s: Slide): string {
  const parts: string[] = [];
  const preset = IMG_FILTERS[s.imageFilter ?? "none"];
  if (preset) parts.push(preset);
  if ((s.imageBrightness ?? 100) !== 100) parts.push(`brightness(${(s.imageBrightness ?? 100) / 100})`);
  if ((s.imageContrast   ?? 100) !== 100) parts.push(`contrast(${(s.imageContrast   ?? 100) / 100})`);
  if ((s.imageSaturation ?? 100) !== 100) parts.push(`saturate(${(s.imageSaturation ?? 100) / 100})`);
  if ((s.imageBlur ?? 0) > 0)             parts.push(`blur(${s.imageBlur}px)`);
  return parts.join(" ");
}

function buildImgTransform(s: Slide): string {
  const fx = s.imageFlipH ? -1 : 1;
  const fy = s.imageFlipV ? -1 : 1;
  return `translate(${s.imageX ?? 0}px, ${s.imageY ?? 0}px) rotate(${s.imageRotate ?? 0}deg) scale(${(s.imageScale ?? 1) * fx}, ${(s.imageScale ?? 1) * fy})`;
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T12:00:00");
  const now = new Date();
  const diff = Math.floor((now.getTime() - d.getTime()) / 86400000);
  if (diff === 0) return "hoje";
  if (diff === 1) return "ontem";
  if (diff < 7)  return `${diff} dias atrás`;
  return d.toLocaleDateString("pt-BR", { day: "numeric", month: "long" });
}

function getCaption(post: Post): string {
  if (post.excerpt?.trim()) return post.excerpt.trim();
  const body = post.slides?.[0]?.body?.trim();
  if (body) return body;
  return post.title;
}

// ── Injeta keyframes da animação de burst (uma única vez no DOM) ──
function GavelStyleInjector() {
  useEffect(() => {
    const id = "gavel-keyframes";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.textContent = `
      /* Pop do coração ao curtir */
      @keyframes heartPop {
        0%   { transform: scale(1);    }
        20%  { transform: scale(0.78); }
        50%  { transform: scale(1.38); }
        75%  { transform: scale(0.94); }
        100% { transform: scale(1);    }
      }
      /* Anel dourado que expande e some */
      @keyframes burstRing {
        0%   { transform: translate(-50%, -50%) scale(0.25); opacity: 0.9; }
        100% { transform: translate(-50%, -50%) scale(2.8);  opacity: 0;   }
      }
      /* Partículas que disparam em direções diferentes (usa --dx e --dy) */
      @keyframes burstOut {
        0%   { transform: translate(-50%, -50%); opacity: 1; }
        100% { transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(0.2); opacity: 0; }
      }
      /* "DEFERIDO" sobe e desaparece */
      @keyframes deferido-float {
        0%   { opacity: 0; transform: translateX(-50%) translateY(2px);  }
        18%  { opacity: 1; transform: translateX(-50%) translateY(-2px); }
        65%  { opacity: 1; transform: translateX(-50%) translateY(-13px);}
        100% { opacity: 0; transform: translateX(-50%) translateY(-22px);}
      }
    `;
    document.head.appendChild(style);
  }, []);
  return null;
}

// ── Burst de partículas douradas no ícone de coração (estilo X eventos especiais) ──
const BURST_PARTICLES = [
  { dx: "0px",   dy: "-34px", r: 5 },
  { dx: "24px",  dy: "-24px", r: 4 },
  { dx: "34px",  dy: "0px",   r: 5 },
  { dx: "24px",  dy: "24px",  r: 4 },
  { dx: "0px",   dy: "34px",  r: 5 },
  { dx: "-24px", dy: "24px",  r: 4 },
  { dx: "-34px", dy: "0px",   r: 5 },
  { dx: "-24px", dy: "-24px", r: 4 },
];

function HeartBurst({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 950);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div style={{
      position: "absolute", inset: 0,
      pointerEvents: "none", zIndex: 10,
      overflow: "visible",
    }}>
      {/* Anel dourado que expande */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        width: 30, height: 30, borderRadius: "50%",
        border: "2px solid #c8a96e",
        animation: "burstRing 0.5s cubic-bezier(0.2,0.8,0.3,1) forwards",
      }} />

      {/* Partículas douradas */}
      {BURST_PARTICLES.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute", top: "50%", left: "50%",
            width: p.r, height: p.r, borderRadius: "50%",
            backgroundColor: i % 2 === 0 ? "#c8a96e" : "#1C1C1C",
            // @ts-ignore — CSS custom properties para a keyframe
            "--dx": p.dx, "--dy": p.dy,
            animation: `burstOut 0.65s cubic-bezier(0.2,0.8,0.4,1) ${i * 18}ms forwards`,
            opacity: 0,
          } as React.CSSProperties}
        />
      ))}

      {/* "DEFERIDO" sobe e desaparece */}
      <div style={{
        position: "absolute", bottom: "100%", left: "50%",
        fontFamily: "Libre Baskerville, serif",
        fontSize: "0.52rem", fontWeight: 700,
        color: "#c8a96e", letterSpacing: "0.2em",
        whiteSpace: "nowrap",
        animation: "deferido-float 0.95s ease forwards",
        opacity: 0,
      }}>
        DEFERIDO
      </div>
    </div>
  );
}

// ── Slide renderer (300×480 fixed, scaled via CSS) ────────────────
function SlideInner({ slide }: { slide: Slide }) {
  const label   = LAYOUT_LABELS[slide.layout ?? ""];
  const hasText = slide.headline || slide.body;

  return (
    <div style={{
      width: 300, height: 480,
      backgroundColor: "#1a1a1a",
      position: "relative", overflow: "hidden",
      fontFamily: "Inter, sans-serif",
    }}>
      {slide.imagePath && (
        <img
          src={slide.imagePath}
          alt=""
          draggable={false}
          style={{
            position: "absolute", top: "50%", left: "50%",
            transform: `translate(-50%, -50%) ${buildImgTransform(slide)}`,
            filter: buildImgFilter(slide),
            maxWidth: "none", pointerEvents: "none", userSelect: "none",
          }}
        />
      )}

      {label && (
        <div style={{
          position: "absolute", top: 18, left: 18,
          fontSize: 9, fontWeight: 700,
          letterSpacing: "0.18em", color: "#c8a96e",
        }}>
          {label}
        </div>
      )}

      {hasText && (
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "56px 20px 28px",
          background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)",
        }}>
          {slide.headline && (
            <p style={{
              fontFamily: slide.headlineFont ? `'${slide.headlineFont}', serif` : "Libre Baskerville, serif",
              fontSize: 20, fontWeight: 700, color: "#fff",
              margin: 0, marginBottom: slide.body ? 8 : 0, lineHeight: 1.25,
            }}>
              {slide.headline}
            </p>
          )}
          {slide.body && (
            <p style={{
              fontFamily: slide.bodyFont ? `'${slide.bodyFont}', sans-serif` : "Inter, sans-serif",
              fontSize: 11, color: "rgba(255,255,255,0.82)",
              margin: 0, lineHeight: 1.6,
            }}>
              {slide.body}
            </p>
          )}
        </div>
      )}

      <div style={{
        position: "absolute", bottom: 12, right: 14,
        fontSize: 7.5, fontWeight: 600,
        letterSpacing: "0.1em", color: "rgba(255,255,255,0.28)",
      }}>
        ADV. MARLON SILVA
      </div>
    </div>
  );
}

function ScaledSlide({ slide, width }: { slide: Slide; width: number }) {
  const scale  = width / 300;
  const height = Math.round(480 * scale);
  return (
    <div style={{ width, height, overflow: "hidden", position: "relative", flexShrink: 0 }}>
      <div style={{
        width: 300, height: 480,
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        position: "absolute",
      }}>
        <SlideInner slide={slide} />
      </div>
    </div>
  );
}

// ── Fullscreen modal ──────────────────────────────────────────────
function FullscreenModal({ post, startIdx, onClose }: {
  post: Post;
  startIdx: number;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(startIdx);
  const slides = post.slides ?? [];
  const total  = slides.length;
  const prev = useCallback(() => setIdx(i => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setIdx(i => (i + 1) % total), [total]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape")     onClose();
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose, prev, next]);

  const vw     = typeof window !== "undefined" ? window.innerWidth : 400;
  const slideW = Math.min(300, vw - 80);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 300,
        background: "rgba(0,0,0,0.95)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: 20, padding: "20px 12px",
      }}
    >
      <button onClick={onClose} style={{
        position: "fixed", top: 16, right: 16,
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: "50%", width: 42, height: 42,
        color: "#fff", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <X size={18} />
      </button>

      <div onClick={e => e.stopPropagation()} style={{
        fontFamily: "Inter, sans-serif",
        color: "rgba(255,255,255,0.4)",
        fontSize: "0.62rem", letterSpacing: "0.18em", fontWeight: 600,
      }}>
        {post.category?.toUpperCase()} · {idx + 1} / {total}
      </div>

      <div onClick={e => e.stopPropagation()} style={{
        display: "flex", alignItems: "center", gap: 16,
      }}>
        {total > 1 && (
          <button onClick={prev} style={{
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "50%", width: 40, height: 40,
            color: "#fff", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <ChevronLeft size={20} />
          </button>
        )}
        <ScaledSlide slide={slides[idx]} width={slideW} />
        {total > 1 && (
          <button onClick={next} style={{
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "50%", width: 40, height: 40,
            color: "#fff", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <ChevronRight size={20} />
          </button>
        )}
      </div>

      {total > 1 && (
        <div onClick={e => e.stopPropagation()} style={{ display: "flex", gap: 6 }}>
          {slides.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} style={{
              width: i === idx ? 22 : 6, height: 6,
              borderRadius: 100, border: "none", cursor: "pointer",
              background: i === idx ? "#c8a96e" : "rgba(255,255,255,0.22)",
              transition: "all 0.2s ease", padding: 0,
            }} />
          ))}
        </div>
      )}

      {post.ig_permalink && (
        <a onClick={e => e.stopPropagation()} href={post.ig_permalink}
          target="_blank" rel="noreferrer" style={{
            fontFamily: "Inter, sans-serif", fontSize: "0.62rem",
            color: "rgba(255,255,255,0.32)", textDecoration: "none",
            letterSpacing: "0.12em", fontWeight: 600,
          }}>
          VER NO INSTAGRAM ↗
        </a>
      )}
    </div>
  );
}

// ── Feed post ─────────────────────────────────────────────────────
const WA_BASE = "https://wa.me/5561999138905?text=";

function FeedPost({ post }: { post: Post }) {
  const slides        = post.slides ?? [];
  const isArticle     = post.type === "article";
  const [idx, setIdx] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [liked, setLiked]         = useState(false);
  const [showBurst, setShowBurst] = useState(false);
  const containerRef  = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(470);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver(([e]) => setWidth(Math.round(e.contentRect.width)));
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleHeartClick = () => {
    if (liked) return;
    setLiked(true);
    setShowBurst(true);
    setTimeout(() => {
      window.open(post.ig_permalink ?? IG_PROFILE_URL, "_blank", "noreferrer");
    }, 450);
  };

  const excerpt  = post.excerpt?.trim() ?? "";
  const isLong   = excerpt.length > 160;
  const shown    = expanded || !isLong ? excerpt : excerpt.slice(0, 160) + "…";
  const hashtags = generateHashtags(post);
  const contentParagraphs = (post.content ?? "")
    .split(/\n\n+/).map(p => p.trim()).filter(Boolean);
  const visibleParagraphs = expanded
    ? contentParagraphs
    : contentParagraphs.slice(0, 3);
  const waHello  = WA_BASE + encodeURIComponent(`Olá, Dr. Marlon! Vi seu post "${post.title}" e gostaria de saber mais.`);

  return (
    <>
      <article style={{
        backgroundColor: "#fff",
        borderRadius: 16,
        boxShadow: "0 2px 14px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.04)",
        border: "1px solid rgba(0,0,0,0.06)",
        overflow: "hidden",
        marginBottom: 18,
      }}>

        {/* ── Cabeçalho: pill de categoria + data ── */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "11px 16px",
          borderBottom: "1px solid rgba(0,0,0,0.05)",
        }}>
          {post.category ? (
            <span style={{
              display: "inline-block",
              ...(CATEGORY_COLORS[post.category] ?? DEFAULT_CAT_COLOR),
              borderRadius: 100, padding: "3px 11px",
              fontFamily: "Inter, sans-serif",
              fontSize: "0.56rem", fontWeight: 700, letterSpacing: "0.14em",
            }}>
              {post.category.toUpperCase()}
            </span>
          ) : <span />}

          <span style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "0.6rem", color: "#bbb",
          }}>
            {formatDate(post.date)}
          </span>
        </div>

        {/* ── Conteúdo: slides ou artigo ── */}
        {isArticle ? (
          /* ── Layout editorial de artigo jurídico ── */
          <div>
            {/* Imagem de capa */}
            {post.coverImage && (
              <div style={{ overflow: "hidden", maxHeight: 210 }}>
                <img
                  src={post.coverImage} alt={post.title}
                  style={{ width: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
            )}

            <div style={{ padding: "16px 18px 4px" }}>
              {/* Byline: avatar + nome + OAB + leitura */}
              <div style={{
                display: "flex", alignItems: "center", gap: 9,
                marginBottom: 14,
              }}>
                <img
                  src="/favicon.png" alt=""
                  style={{
                    width: 28, height: 28, borderRadius: "50%",
                    objectFit: "cover", flexShrink: 0,
                    border: "1.5px solid rgba(200,169,110,0.45)",
                  }}
                />
                <div style={{ lineHeight: 1.4 }}>
                  <span style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.72rem", fontWeight: 700, color: "#1C1C1C",
                  }}>
                    Dr. Marlon Silva
                  </span>
                  <span style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.65rem", color: "#aaa", marginLeft: 6,
                  }}>
                    OAB/DF 87.696
                    {post.readTime && ` · ${post.readTime} de leitura`}
                  </span>
                </div>
              </div>

              {/* Título */}
              <h2 style={{
                fontFamily: "Libre Baskerville, serif",
                fontSize: "1.12rem", fontWeight: 700,
                color: "#1C1C1C", margin: "0 0 10px", lineHeight: 1.4,
              }}>
                {post.title}
              </h2>

              {/* Excerpt como lead (itálico) */}
              {excerpt && (
                <p style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.84rem", fontStyle: "italic",
                  color: "#555", margin: 0, lineHeight: 1.7,
                  paddingBottom: 14,
                  borderBottom: "1px solid rgba(0,0,0,0.08)",
                  marginBottom: 14,
                }}>
                  {excerpt}
                </p>
              )}

              {/* Corpo do artigo */}
              {contentParagraphs.length > 0 && (
                <div>
                  {visibleParagraphs.map((para, i) => (
                    <p key={i} style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.875rem", color: "#2a2a2a",
                      margin: "0 0 14px", lineHeight: 1.85,
                    }}>
                      {para}
                    </p>
                  ))}
                  {!expanded && contentParagraphs.length > 3 && (
                    <button
                      onClick={() => setExpanded(true)}
                      style={{
                        background: "none", border: "none",
                        color: "#3d6aa6", cursor: "pointer",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.78rem", fontWeight: 600,
                        padding: "0 0 14px", letterSpacing: "0.02em",
                      }}
                    >
                      Ler artigo completo ↓
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Carrossel */
          slides.length > 0 && (
            <div ref={containerRef} style={{ position: "relative", overflow: "hidden" }}>
              <div style={{
                display: "flex",
                transform: `translateX(-${idx * 100}%)`,
                transition: "transform 0.32s cubic-bezier(0.4,0,0.2,1)",
              }}>
                {slides.map((slide, i) => (
                  <div key={i} style={{ flexShrink: 0, width: "100%", cursor: "zoom-in" }}
                    onClick={() => setFullscreen(true)}>
                    <ScaledSlide slide={slide} width={width} />
                  </div>
                ))}
              </div>

              {slides.length > 1 && (
                <div style={{
                  position: "absolute", top: 10, right: 10,
                  background: "rgba(0,0,0,0.52)", backdropFilter: "blur(6px)",
                  color: "#fff", borderRadius: 100, padding: "2px 9px",
                  fontFamily: "Inter, sans-serif", fontSize: "0.58rem", fontWeight: 600,
                }}>
                  {idx + 1} / {slides.length}
                </div>
              )}

              {slides.length > 1 && idx > 0 && (
                <button onClick={e => { e.stopPropagation(); setIdx(i => i - 1); }}
                  style={{
                    position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)",
                    background: "rgba(255,255,255,0.9)", border: "none", borderRadius: "50%",
                    width: 32, height: 32, cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.18)", color: "#1C1C1C",
                  }}>
                  <ChevronLeft size={16} />
                </button>
              )}

              {slides.length > 1 && idx < slides.length - 1 && (
                <button onClick={e => { e.stopPropagation(); setIdx(i => i + 1); }}
                  style={{
                    position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
                    background: "rgba(255,255,255,0.9)", border: "none", borderRadius: "50%",
                    width: 32, height: 32, cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.18)", color: "#1C1C1C",
                  }}>
                  <ChevronRight size={16} />
                </button>
              )}
            </div>
          )
        )}

        {/* ── Dots (carrossel) ── */}
        {!isArticle && slides.length > 1 && (
          <div style={{ display: "flex", justifyContent: "center", gap: 5, padding: "8px 0 2px" }}>
            {slides.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)} style={{
                width: i === idx ? 18 : 6, height: 6,
                borderRadius: 100, border: "none", cursor: "pointer",
                background: i === idx ? "#1C1C1C" : "rgba(0,0,0,0.15)",
                transition: "all 0.22s ease", padding: 0,
              }} />
            ))}
          </div>
        )}

        {/* ── Legenda (carrossel) / Hashtags (artigo) ── */}
        <div style={{ padding: isArticle ? "2px 18px 4px" : "12px 16px 2px" }}>
          {/* Título + excerpt: apenas para carrossel (artigo já tem layout acima) */}
          {!isArticle && (
            <>
              <p style={{
                fontFamily: "Libre Baskerville, serif",
                fontSize: "0.92rem", fontWeight: 700,
                color: "#1C1C1C", margin: "0 0 5px", lineHeight: 1.35,
              }}>
                {post.title}
              </p>
              {excerpt && (
                <p style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.8rem", color: "#555",
                  margin: 0, lineHeight: 1.68,
                }}>
                  {shown}
                  {isLong && !expanded && (
                    <button onClick={() => setExpanded(true)} style={{
                      background: "none", border: "none",
                      color: "#aaa", cursor: "pointer",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.8rem", padding: "0 0 0 4px",
                    }}>
                      ver mais
                    </button>
                  )}
                </p>
              )}
            </>
          )}

          {/* Hashtags — sempre visíveis */}
          <p style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "0.74rem", color: "#3d6aa6",
            margin: isArticle ? "0 0 4px" : "8px 0 0",
            lineHeight: 1.7, letterSpacing: "0.01em",
          }}>
            {hashtags}
          </p>
        </div>

        {/* ── Barra de ações ── */}
        <div style={{
          display: "flex", alignItems: "center",
          padding: "10px 16px 16px", gap: 8,
        }}>
          {/* Deferir — burst no ícone + abre Instagram */}
          <div style={{ position: "relative" }}>
            <button
              onClick={handleHeartClick}
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                borderRadius: 100,
                border: liked ? "1.5px solid #c8a96e" : "1.5px solid rgba(0,0,0,0.14)",
                padding: "6px 15px",
                background: liked ? "rgba(200,169,110,0.08)" : "transparent",
                color: liked ? "#c8a96e" : "#555",
                cursor: liked ? "default" : "pointer",
                fontFamily: "Inter, sans-serif",
                fontSize: "0.68rem", fontWeight: 700,
                letterSpacing: "0.08em",
                animation: liked ? "heartPop 0.45s ease forwards" : undefined,
                transition: "border-color 0.2s, color 0.2s, background 0.2s",
              }}
            >
              <Heart size={13} strokeWidth={2.2} fill={liked ? "#c8a96e" : "none"} />
              {liked ? "DEFERIDO" : "DEFERIR"}
            </button>
            {showBurst && <HeartBurst onDone={() => setShowBurst(false)} />}
          </div>

          <div style={{ flex: 1 }} />

          {/* Consultar → WhatsApp */}
          <a href={waHello} target="_blank" rel="noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "#1C1C1C", color: "#fff",
              borderRadius: 100, padding: "7px 16px",
              textDecoration: "none",
              fontFamily: "Inter, sans-serif",
              fontSize: "0.68rem", fontWeight: 700,
              letterSpacing: "0.06em",
            }}
          >
            Consultar →
          </a>
        </div>
      </article>

      {fullscreen && slides.length > 0 && (
        <FullscreenModal post={post} startIdx={idx} onClose={() => setFullscreen(false)} />
      )}
    </>
  );
}

// ── Main page ─────────────────────────────────────────────────────
type ViewMode = "slides" | "artigos";

export function PostsPage() {
  const mobile = typeof window !== "undefined" && window.innerWidth < 640;
  const [viewMode, setViewMode]   = useState<ViewMode>("slides");
  const [allPosts,  setAllPosts]  = useState<Post[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [loadError, setLoadError] = useState(false);

  // Busca os posts do banco via API Vercel (/api/posts) em produção,
  // ou do CMS local via proxy Vite em desenvolvimento.
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setLoadError(false);

    fetch('/api/posts')
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data: Post[]) => {
        if (!cancelled) setAllPosts(sortByDate(data));
      })
      .catch(() => {
        if (!cancelled) setLoadError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, []);

  const filteredPosts = allPosts.filter(p =>
    viewMode === "slides"
      ? p.type !== "article"
      : p.type === "article"
  );

  useEffect(() => {
    return () => { document.body.style.overflow = ""; };
  }, []);

  // ── Estados de loading e erro ─────────────────────────────────
  if (loading) {
    return (
      <div style={{
        minHeight: "100dvh", backgroundColor: "#f0f0f0",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexDirection: "column", gap: 12,
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: "50%",
          border: "2.5px solid rgba(200,169,110,0.25)",
          borderTopColor: "#c8a96e",
          animation: "spin 0.8s linear infinite",
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <span style={{
          fontFamily: "Inter, sans-serif", fontSize: "0.75rem",
          color: "#bbb", letterSpacing: "0.08em",
        }}>
          Carregando publicações…
        </span>
      </div>
    );
  }

  if (loadError) {
    return (
      <div style={{
        minHeight: "100dvh", backgroundColor: "#f0f0f0",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexDirection: "column", gap: 10,
      }}>
        <p style={{
          fontFamily: "Libre Baskerville, serif",
          fontSize: "1rem", fontWeight: 700, color: "#1C1C1C",
        }}>
          Não foi possível carregar os posts.
        </p>
        <button
          onClick={() => { setLoadError(false); setLoading(true); fetch('/api/posts').then(r => r.json()).then(d => setAllPosts(sortByDate(d))).catch(() => setLoadError(true)).finally(() => setLoading(false)); }}
          style={{
            background: "#1C1C1C", color: "#c8a96e",
            border: "none", borderRadius: 100,
            padding: "8px 20px", cursor: "pointer",
            fontFamily: "Inter, sans-serif", fontSize: "0.75rem", fontWeight: 700,
          }}
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100dvh",
      backgroundColor: "#f0f0f0",
      display: "flex",
      flexDirection: "column",
    }}>
      <GavelStyleInjector />

      {/* ── Top bar ── */}
      <div style={{
        position: "sticky", top: 0, zIndex: 50,
        backgroundColor: "rgba(255,255,255,0.96)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
      }}>
        {/* Linha 1: logo + toggle (desktop) / só logo (mobile) */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 20px",
          height: 56,
          /* no mobile deixa espaço para o hambúrguer fixo (40px botão + 24px margem) */
          paddingRight: mobile ? 76 : 20,
        }}>
          <span style={{
            fontFamily: "Libre Baskerville, serif",
            fontSize: "1rem", fontWeight: 700,
            color: "#1C1C1C", letterSpacing: "-0.01em",
          }}>
            drmarlon.adv
          </span>

          {/* Toggle pill — só aparece em telas ≥ 640 px */}
          {!mobile && (
            <div style={{
              display: "flex", gap: 3,
              background: "#e6e6e6", borderRadius: 100, padding: 3,
            }}>
              {(["slides", "artigos"] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  style={{
                    borderRadius: 100, padding: "5px 16px",
                    background: viewMode === mode ? "#1C1C1C" : "transparent",
                    color: viewMode === mode ? "#c8a96e" : "#999",
                    border: "none", cursor: "pointer",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em",
                    transition: "background 0.22s, color 0.22s",
                  }}
                >
                  {mode === "slides" ? "SLIDES" : "ARTIGOS"}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Linha 2: tabs de navegação — só no mobile */}
        {mobile && (
          <div style={{
            display: "flex",
            borderTop: "1px solid rgba(0,0,0,0.07)",
          }}>
            {(["slides", "artigos"] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                style={{
                  flex: 1, padding: "10px 0",
                  background: "none", border: "none",
                  borderBottom: viewMode === mode
                    ? "2.5px solid #1C1C1C"
                    : "2.5px solid transparent",
                  color: viewMode === mode ? "#1C1C1C" : "#aaa",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.14em",
                  cursor: "pointer",
                  transition: "color 0.2s, border-color 0.2s",
                }}
              >
                {mode === "slides" ? "SLIDES" : "ARTIGOS"}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Feed column ── */}
      <div style={{
        flex: 1,
        width: "100%",
        maxWidth: mobile ? "100%" : 500,
        margin: "0 auto",
        padding: "20px 14px 0",
      }}>
        {filteredPosts.length === 0 ? (
          <div style={{
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            minHeight: 280, gap: 10,
          }}>
            <p style={{
              fontFamily: "Libre Baskerville, serif",
              fontSize: "1.1rem", fontWeight: 700,
              color: "#1C1C1C", margin: 0,
            }}>
              Em breve.
            </p>
            <p style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "0.8rem", color: "#999", margin: 0,
            }}>
              {viewMode === "artigos"
                ? "Artigos jurídicos em preparação."
                : "Conteúdo em preparação."}
            </p>
          </div>
        ) : (
          filteredPosts.map(post => <FeedPost key={post.slug} post={post} />)
        )}

        {/* ── Footer do feed ── */}
        {filteredPosts.length > 0 && (
          <div style={{
            padding: "28px 20px 56px",
            textAlign: "center",
          }}>
            <img
              src="/favicon.png"
              alt="Dr. Marlon Silva"
              style={{
                width: 44, height: 44,
                borderRadius: "50%", objectFit: "cover",
                marginBottom: 10,
                border: "2px solid rgba(200,169,110,0.5)",
              }}
            />
            <div style={{
              fontFamily: "Libre Baskerville, serif",
              fontSize: "0.9rem", fontWeight: 700,
              color: "#1C1C1C", marginBottom: 3,
            }}>
              Dr. Marlon Silva
            </div>
            <div style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "0.68rem", color: "#999",
              marginBottom: 16,
            }}>
              Advogado · OAB/DF 87.696 · Brasília
            </div>
            <a
              href="https://wa.me/5561999138905?text=Olá%2C%20Dr.%20Marlon!%20Preciso%20de%20orientação%20jurídica."
              target="_blank" rel="noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                backgroundColor: "#25D366", color: "#fff",
                borderRadius: 100, padding: "10px 22px",
                textDecoration: "none",
                fontFamily: "Inter, sans-serif",
                fontSize: "0.78rem", fontWeight: 700,
                cursor: "pointer",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Solicitar consulta
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
