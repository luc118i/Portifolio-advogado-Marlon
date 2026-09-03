// ═══════════════════════════════════════════════════════════════
// PublicationsSection — feed de conteúdo jurídico, layout editorial.
// Sem gamificação: sem "DEFERIR", sem partículas, sem curtida.
// Ações: Compartilhar + Falar sobre o tema (WhatsApp).
// ═══════════════════════════════════════════════════════════════

import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, X, Share2, MessageCircle, Check, ExternalLink } from "lucide-react";
import { SITE, wa } from "../lib/site";
import { useReveal } from "../hooks/useReveal";

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

function sortByDate(posts: Post[]): Post[] {
  return [...posts].sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

const IMG_FILTERS: Record<string, string> = {
  none: "",
  dramatico: "contrast(145%) brightness(86%) saturate(112%)",
  sepia: "sepia(80%) brightness(106%)",
  fade: "saturate(50%) brightness(115%) contrast(86%)",
  noir: "grayscale(100%) contrast(128%) brightness(90%)",
  dourado: "sepia(48%) saturate(155%) brightness(110%)",
  frio: "hue-rotate(195deg) saturate(78%) brightness(106%)",
  vibrante: "saturate(190%) brightness(107%) contrast(114%)",
};

const LAYOUT_LABELS: Record<string, string> = {
  "dica-semana": "DICA DA SEMANA",
  "mito-verdade": "MITO OU VERDADE",
  "caso-real": "CASO REAL",
  "voce-sabia": "VOCÊ SABIA?",
};

const CATEGORY_COLORS: Record<string, { bg: string; color: string }> = {
  "Direito Penal": { bg: "#7f1d1d", color: "#fca5a5" },
  "Direito Civil": { bg: "#1e3a5f", color: "#93c5fd" },
  "Direito Administrativo": { bg: "#3b0764", color: "#d8b4fe" },
  "Consultoria Jurídica": { bg: "#064e3b", color: "#6ee7b7" },
  "Tecnologia e IA Jurídica": { bg: "#0c4a6e", color: "#7dd3fc" },
  "Direito do Trabalho": { bg: "#78350f", color: "#fcd34d" },
  "Direito de Família": { bg: "#831843", color: "#f9a8d4" },
};
const DEFAULT_CAT_COLOR = { bg: "#1e4d3b", color: "#7fb79c" };

// ── Hashtags — acentuação corrigida (ver diagnóstico) ────────────
const KEYWORD_TAGS: Array<[RegExp, string[]]> = [
  [/abandon/i, ["#AbandonoAfetivo", "#DireitoDeFamília", "#ResponsabilidadeCivil"]],
  [/divórc|separaç/i, ["#Divórcio", "#DireitoDeFamília", "#GuardaDosFilhos"]],
  [/herança|inventário|herdeiro/i, ["#Herança", "#DireitoSucessório", "#Inventário"]],
  [/alimentos|pensão/i, ["#PensãoAlimentícia", "#DireitoDeFamília", "#AlimentosFilhos"]],
  [/acidente|trânsito/i, ["#AcidenteDeTrânsito", "#IndenizaçãoDeTrânsito", "#SeguroVeicular"]],
  [/trabalh|emprego|demiss/i, ["#DireitoTrabalhista", "#ReclamatóriaTrabalhista", "#FGTS"]],
  [/consumi/i, ["#DireitoDoConsumidor", "#ProteçãoDoConsumidor", "#Procon"]],
  [/empresa|societár|sócio/i, ["#DireitoEmpresarial", "#EmpresaEDireito", "#DireitoSocietário"]],
  [/imóv|locaç|aluguel/i, ["#DireitoImobiliário", "#ContratoDeLocação", "#AluguelDF"]],
  [/indeniz/i, ["#Indenização", "#DanosMorais", "#ResponsabilidadeCivil"]],
  [/contrat/i, ["#ContratosJurídicos", "#DireitoContratual", "#RevisãoContratual"]],
  [/preso|prisão|flagrante|habeas/i, ["#HabeasCorpus", "#DefesaCriminal", "#LiberdadeProvisória"]],
  [/licitaç/i, ["#LicitaçõesPúblicas", "#ContratosAdministrativos", "#ComprasGoverno"]],
  [/ia|inteligência artificial/i, ["#IAJurídica", "#LegalTech", "#InovaçãoJurídica"]],
  [/servidor|concurso/i, ["#ServidorPúblico", "#EstabilidadeFuncional", "#DireitoPúblico"]],
  [/fraude|estelionato|crime/i, ["#CrimesFinanceiros", "#DireitoPenal", "#DefesaCriminal"]],
  [/usucap/i, ["#Usucapião", "#DireitoImobiliário", "#PropriedadeUrbana"]],
  [/guarda|custódia|filho/i, ["#GuardaDosFilhos", "#DireitoDeFamília", "#BemEstarInfantil"]],
  [/multa|infração|trânsito/i, ["#MultaDeTrânsito", "#Habilitação", "#DefesaDeMulta"]],
  [/aposentador/i, ["#Aposentadoria", "#PrevidênciaSocial", "#DireitosDoIdoso"]],
];

const AREA_TAGS: Record<string, string[]> = {
  "Direito Penal": ["#DireitoPenal", "#AdvogadoCriminalista"],
  "Direito Civil": ["#DireitoCivil", "#DireitosDoCidadão"],
  "Direito Administrativo": ["#DireitoAdministrativo", "#DireitoPúblico"],
  "Consultoria Jurídica": ["#ConsultoriaJurídica", "#OrientaçãoJurídica"],
  "Tecnologia e IA Jurídica": ["#DireitoDigital", "#LegalTech"],
  "Direito do Trabalho": ["#DireitoTrabalhista", "#CLT"],
  "Direito de Família": ["#DireitoDeFamília"],
};

function generateHashtags(post: Post): string {
  const keywordTags: string[] = [];
  for (const [pattern, tags] of KEYWORD_TAGS) {
    if (pattern.test(post.title)) {
      keywordTags.push(...tags);
      break;
    }
  }
  const areaTags = AREA_TAGS[post.category ?? ""] ?? ["#Direito"];
  const base = ["#AdvogadoBrasília", "#OABDF"];
  const all = [...new Set([...keywordTags, ...areaTags, ...base])];
  return all.slice(0, 6).join(" ");
}

const IG_PROFILE_URL = SITE.instagram;

function buildImgFilter(s: Slide): string {
  const parts: string[] = [];
  const preset = IMG_FILTERS[s.imageFilter ?? "none"];
  if (preset) parts.push(preset);
  if ((s.imageBrightness ?? 100) !== 100) parts.push(`brightness(${(s.imageBrightness ?? 100) / 100})`);
  if ((s.imageContrast ?? 100) !== 100) parts.push(`contrast(${(s.imageContrast ?? 100) / 100})`);
  if ((s.imageSaturation ?? 100) !== 100) parts.push(`saturate(${(s.imageSaturation ?? 100) / 100})`);
  if ((s.imageBlur ?? 0) > 0) parts.push(`blur(${s.imageBlur}px)`);
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
  if (diff < 7) return `${diff} dias atrás`;
  return d.toLocaleDateString("pt-BR", { day: "numeric", month: "long" });
}

// ── Slide renderer (300×480) ─────────────────────────────────────
function SlideInner({ slide }: { slide: Slide }) {
  const label = LAYOUT_LABELS[slide.layout ?? ""];
  const hasText = slide.headline || slide.body;
  return (
    <div style={{ width: 300, height: 480, backgroundColor: "#1a1a1a", position: "relative", overflow: "hidden", fontFamily: "Inter, sans-serif" }}>
      {slide.imagePath && (
        <img
          src={slide.imagePath}
          alt=""
          draggable={false}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) ${buildImgTransform(slide)}`,
            filter: buildImgFilter(slide),
            maxWidth: "none",
            pointerEvents: "none",
            userSelect: "none",
          }}
        />
      )}
      {label && (
        <div style={{ position: "absolute", top: 18, left: 18, fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", color: "#b9975a" }}>
          {label}
        </div>
      )}
      {hasText && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "56px 20px 28px",
            background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)",
          }}
        >
          {slide.headline && (
            <p style={{ fontFamily: slide.headlineFont ? `'${slide.headlineFont}', serif` : "Libre Baskerville, serif", fontSize: 20, fontWeight: 700, color: "#fff", margin: 0, marginBottom: slide.body ? 8 : 0, lineHeight: 1.25 }}>
              {slide.headline}
            </p>
          )}
          {slide.body && (
            <p style={{ fontFamily: slide.bodyFont ? `'${slide.bodyFont}', sans-serif` : "Inter, sans-serif", fontSize: 11, color: "rgba(255,255,255,0.82)", margin: 0, lineHeight: 1.6 }}>
              {slide.body}
            </p>
          )}
        </div>
      )}
      <div style={{ position: "absolute", bottom: 12, right: 14, fontSize: 7.5, fontWeight: 600, letterSpacing: "0.1em", color: "rgba(255,255,255,0.28)" }}>
        DR. MARLON INÁCIO
      </div>
    </div>
  );
}

function ScaledSlide({ slide, width }: { slide: Slide; width: number }) {
  const scale = width / 300;
  const height = Math.round(480 * scale);
  return (
    <div style={{ width, height, overflow: "hidden", position: "relative", flexShrink: 0 }}>
      <div style={{ width: 300, height: 480, transform: `scale(${scale})`, transformOrigin: "top left", position: "absolute" }}>
        <SlideInner slide={slide} />
      </div>
    </div>
  );
}

function FullscreenModal({ post, startIdx, onClose }: { post: Post; startIdx: number; onClose: () => void }) {
  const [idx, setIdx] = useState(startIdx);
  const slides = post.slides ?? [];
  const total = slides.length;
  const prev = useCallback(() => setIdx((i) => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setIdx((i) => (i + 1) % total), [total]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose, prev, next]);

  const vw = typeof window !== "undefined" ? window.innerWidth : 400;
  const slideW = Math.min(300, vw - 80);

  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(0,0,0,0.95)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20, padding: "20px 12px" }}
    >
      <button onClick={onClose} aria-label="Fechar" style={{ position: "fixed", top: 16, right: 16, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "50%", width: 42, height: 42, color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <X size={18} />
      </button>
      <div onClick={(e) => e.stopPropagation()} style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.4)", fontSize: "0.62rem", letterSpacing: "0.18em", fontWeight: 600 }}>
        {post.category?.toUpperCase()} · {idx + 1} / {total}
      </div>
      <div onClick={(e) => e.stopPropagation()} style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {total > 1 && (
          <button onClick={prev} aria-label="Anterior" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "50%", width: 40, height: 40, color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <ChevronLeft size={20} />
          </button>
        )}
        <ScaledSlide slide={slides[idx]} width={slideW} />
        {total > 1 && (
          <button onClick={next} aria-label="Próximo" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "50%", width: 40, height: 40, color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <ChevronRight size={20} />
          </button>
        )}
      </div>
      {total > 1 && (
        <div onClick={(e) => e.stopPropagation()} style={{ display: "flex", gap: 6 }}>
          {slides.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} aria-label={`Slide ${i + 1}`} style={{ width: i === idx ? 22 : 6, height: 6, borderRadius: 100, border: "none", cursor: "pointer", background: i === idx ? "#b9975a" : "rgba(255,255,255,0.22)", transition: "all 0.2s ease", padding: 0 }} />
          ))}
        </div>
      )}
      {post.ig_permalink && (
        <a onClick={(e) => e.stopPropagation()} href={post.ig_permalink} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontFamily: "Inter, sans-serif", fontSize: "0.62rem", color: "rgba(255,255,255,0.32)", textDecoration: "none", letterSpacing: "0.12em", fontWeight: 600 }}>
          VER NO INSTAGRAM
          <ExternalLink size={11} />
        </a>
      )}
    </div>
  );
}

// ── Card de publicação ───────────────────────────────────────────
function FeedPost({ post }: { post: Post }) {
  const slides = post.slides ?? [];
  const isArticle = post.type === "article";
  const [idx, setIdx] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(470);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver(([e]) => setWidth(Math.round(e.contentRect.width)));
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const shareUrl = post.ig_permalink || IG_PROFILE_URL;

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: post.title, url: shareUrl });
        return;
      } catch {
        /* usuário cancelou */
      }
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.open(shareUrl, "_blank", "noreferrer");
    }
  };

  const excerpt = post.excerpt?.trim() ?? "";
  const isLong = excerpt.length > 160;
  const shown = expanded || !isLong ? excerpt : excerpt.slice(0, 160) + "…";
  const hashtags = generateHashtags(post);
  const contentParagraphs = (post.content ?? "").split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
  const visibleParagraphs = expanded ? contentParagraphs : contentParagraphs.slice(0, 3);
  const waHello = wa(`Olá, Dr. Marlon! Li sua publicação "${post.title}" e gostaria de saber mais.`);

  return (
    <>
      <article style={{ backgroundColor: "#fff", borderRadius: 8, border: "1px solid var(--line)", overflow: "hidden", marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 16px", borderBottom: "1px solid var(--line)" }}>
          {post.category ? (
            <span style={{ display: "inline-block", ...(CATEGORY_COLORS[post.category] ?? DEFAULT_CAT_COLOR), borderRadius: 100, padding: "3px 11px", fontFamily: "Inter, sans-serif", fontSize: "0.56rem", fontWeight: 700, letterSpacing: "0.14em" }}>
              {post.category.toUpperCase()}
            </span>
          ) : (
            <span />
          )}
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6rem", color: "var(--text-faint)" }}>{formatDate(post.date)}</span>
        </div>

        {isArticle ? (
          <div>
            {post.coverImage && (
              <div style={{ overflow: "hidden", maxHeight: 210 }}>
                <img src={post.coverImage} alt={post.title} style={{ width: "100%", objectFit: "cover", display: "block" }} />
              </div>
            )}
            <div style={{ padding: "16px 18px 4px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 14 }}>
                <img src="/favicon.svg" alt="" width={28} height={28} style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, border: "1.5px solid var(--line)" }} />
                <div style={{ lineHeight: 1.4 }}>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", fontWeight: 700, color: "var(--ink)" }}>Dr. Marlon Inácio</span>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", color: "var(--text-faint)", marginLeft: 6 }}>
                    {SITE.oab}
                    {post.readTime && ` · ${post.readTime} de leitura`}
                  </span>
                </div>
              </div>
              <h3 style={{ fontFamily: "Libre Baskerville, serif", fontSize: "1.12rem", fontWeight: 700, color: "var(--ink)", margin: "0 0 10px", lineHeight: 1.4 }}>{post.title}</h3>
              {excerpt && (
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.84rem", fontStyle: "italic", color: "var(--text-soft)", margin: 0, lineHeight: 1.7, paddingBottom: 14, borderBottom: "1px solid var(--line)", marginBottom: 14 }}>
                  {excerpt}
                </p>
              )}
              {contentParagraphs.length > 0 && (
                <div>
                  {visibleParagraphs.map((para, i) => (
                    <p key={i} style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", color: "var(--text)", margin: "0 0 14px", lineHeight: 1.85 }}>
                      {para}
                    </p>
                  ))}
                  {!expanded && contentParagraphs.length > 3 && (
                    <button onClick={() => setExpanded(true)} style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: "none", border: "none", color: "var(--green-soft)", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: "0.78rem", fontWeight: 600, padding: "0 0 14px" }}>
                      Ler artigo completo
                      <ChevronDown size={14} />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          slides.length > 0 && (
            <div ref={containerRef} style={{ position: "relative", overflow: "hidden" }}>
              <div style={{ display: "flex", transform: `translateX(-${idx * 100}%)`, transition: "transform 0.32s cubic-bezier(0.4,0,0.2,1)" }}>
                {slides.map((slide, i) => (
                  <div key={i} style={{ flexShrink: 0, width: "100%", cursor: "zoom-in" }} onClick={() => setFullscreen(true)}>
                    <ScaledSlide slide={slide} width={width} />
                  </div>
                ))}
              </div>
              {slides.length > 1 && (
                <div style={{ position: "absolute", top: 10, right: 10, background: "rgba(0,0,0,0.52)", backdropFilter: "blur(6px)", color: "#fff", borderRadius: 100, padding: "2px 9px", fontFamily: "Inter, sans-serif", fontSize: "0.58rem", fontWeight: 600 }}>
                  {idx + 1} / {slides.length}
                </div>
              )}
              {slides.length > 1 && idx > 0 && (
                <button onClick={(e) => { e.stopPropagation(); setIdx((i) => i - 1); }} aria-label="Slide anterior" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.92)", border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.18)", color: "var(--ink)" }}>
                  <ChevronLeft size={16} />
                </button>
              )}
              {slides.length > 1 && idx < slides.length - 1 && (
                <button onClick={(e) => { e.stopPropagation(); setIdx((i) => i + 1); }} aria-label="Próximo slide" style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.92)", border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.18)", color: "var(--ink)" }}>
                  <ChevronRight size={16} />
                </button>
              )}
            </div>
          )
        )}

        {!isArticle && slides.length > 1 && (
          <div style={{ display: "flex", justifyContent: "center", gap: 5, padding: "8px 0 2px" }}>
            {slides.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)} aria-label={`Slide ${i + 1}`} style={{ width: i === idx ? 18 : 6, height: 6, borderRadius: 100, border: "none", cursor: "pointer", background: i === idx ? "var(--green)" : "rgba(0,0,0,0.15)", transition: "all 0.22s ease", padding: 0 }} />
            ))}
          </div>
        )}

        <div style={{ padding: isArticle ? "2px 18px 4px" : "12px 16px 2px" }}>
          {!isArticle && (
            <>
              <p style={{ fontFamily: "Libre Baskerville, serif", fontSize: "0.92rem", fontWeight: 700, color: "var(--ink)", margin: "0 0 5px", lineHeight: 1.35 }}>{post.title}</p>
              {excerpt && (
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", color: "var(--text-soft)", margin: 0, lineHeight: 1.68 }}>
                  {shown}
                  {isLong && !expanded && (
                    <button onClick={() => setExpanded(true)} style={{ background: "none", border: "none", color: "var(--text-faint)", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: "0.8rem", padding: "0 0 0 4px" }}>
                      ver mais
                    </button>
                  )}
                </p>
              )}
            </>
          )}
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.74rem", color: "var(--green-soft)", margin: isArticle ? "0 0 4px" : "8px 0 0", lineHeight: 1.7 }}>{hashtags}</p>
        </div>

        {/* Ações — sem gamificação */}
        <div style={{ display: "flex", alignItems: "center", padding: "10px 16px 16px", gap: 8 }}>
          <button
            onClick={handleShare}
            style={{ display: "inline-flex", alignItems: "center", gap: 6, borderRadius: 3, border: "1px solid var(--line)", padding: "7px 14px", background: "transparent", color: "var(--text-soft)", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: "0.72rem", fontWeight: 600 }}
          >
            {copied ? <Check size={13} /> : <Share2 size={13} />}
            {copied ? "Link copiado" : "Compartilhar"}
          </button>
          <div style={{ flex: 1 }} />
          <a href={waHello} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "var(--green)", color: "#fff", borderRadius: 3, padding: "8px 15px", textDecoration: "none", fontFamily: "Inter, sans-serif", fontSize: "0.72rem", fontWeight: 700 }}>
            <MessageCircle size={13} />
            Falar sobre este tema
          </a>
        </div>
      </article>

      {fullscreen && slides.length > 0 && <FullscreenModal post={post} startIdx={idx} onClose={() => setFullscreen(false)} />}
    </>
  );
}

// ── Seção ────────────────────────────────────────────────────────
type ViewMode = "slides" | "artigos";

export function PublicationsSection() {
  const [viewMode, setViewMode] = useState<ViewMode>("slides");
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const r = useReveal<HTMLDivElement>();

  const load = useCallback(() => {
    setLoading(true);
    setLoadError(false);
    fetch("/api/posts")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: Post[]) => setAllPosts(sortByDate(data)))
      .catch(() => setLoadError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filteredPosts = allPosts.filter((p) => (viewMode === "slides" ? p.type !== "article" : p.type === "article"));

  return (
    <section
      id="publicacoes"
      className="site-section"
      style={{ background: "var(--paper-2)", padding: "clamp(64px, 10vw, 120px) clamp(1.25rem, 6vw, 5rem)", borderTop: "1px solid var(--line)" }}
    >
      <div ref={r.ref} className={r.className} style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <p className="eyebrow" style={{ marginBottom: "14px" }}>
          Publicações
        </p>
        <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(1.7rem, 4vw, 2.4rem)", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.01em", color: "var(--ink)", margin: "0 0 12px", textWrap: "balance" }}>
          Conteúdo jurídico em linguagem acessível
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", lineHeight: 1.7, color: "var(--text-soft)", maxWidth: "60ch", margin: "0 0 28px" }}>
          Notas curtas e artigos sobre situações do dia a dia — o que a lei diz, quando procurar
          um advogado e como se organizar. Conteúdo informativo, não substitui uma consulta.
        </p>

        {/* Alternador */}
        <div style={{ display: "inline-flex", gap: 3, background: "var(--paper)", border: "1px solid var(--line)", borderRadius: 100, padding: 3, marginBottom: 28 }}>
          {(["slides", "artigos"] as const).map((mode) => (
            <button
              key={mode}
              className="pub-toggle-btn"
              onClick={() => setViewMode(mode)}
              style={{
                borderRadius: 100,
                padding: "8px 18px",
                background: viewMode === mode ? "var(--green)" : "transparent",
                color: viewMode === mode ? "#fff" : "var(--text-soft)",
                border: "none",
                cursor: "pointer",
                fontFamily: "Inter, sans-serif",
                fontSize: "0.62rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
              }}
            >
              {mode === "slides" ? "SLIDES" : "ARTIGOS"}
            </button>
          ))}
        </div>

        {/* Coluna do feed */}
        <div style={{ maxWidth: 500 }}>
          {loading ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12, minHeight: 200 }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", border: "2.5px solid var(--line)", borderTopColor: "var(--green)", animation: "pubspin 0.8s linear infinite" }} />
              <style>{`@keyframes pubspin { to { transform: rotate(360deg); } }`}</style>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "var(--text-faint)" }}>Carregando publicações…</span>
            </div>
          ) : loadError ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 10, minHeight: 200 }}>
              <p style={{ fontFamily: "Libre Baskerville, serif", fontSize: "1rem", fontWeight: 700, color: "var(--ink)", margin: 0 }}>Não foi possível carregar as publicações.</p>
              <button onClick={load} style={{ background: "var(--green)", color: "#fff", border: "none", borderRadius: 3, padding: "8px 20px", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: "0.75rem", fontWeight: 700 }}>
                Tentar novamente
              </button>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 200, gap: 8 }}>
              <p style={{ fontFamily: "Libre Baskerville, serif", fontSize: "1.1rem", fontWeight: 700, color: "var(--ink)", margin: 0 }}>Em breve.</p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", color: "var(--text-faint)", margin: 0 }}>
                {viewMode === "artigos" ? "Artigos jurídicos em preparação." : "Conteúdo em preparação."}
              </p>
            </div>
          ) : (
            filteredPosts.map((post) => <FeedPost key={post.slug} post={post} />)
          )}
        </div>
      </div>
    </section>
  );
}
