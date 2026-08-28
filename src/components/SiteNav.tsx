import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { SITE, NAV_SECTIONS, WA_DEFAULT } from "../lib/site";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  // Sombra/contraste da navbar só depois de rolar um pouco
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy — marca a seção visível
  useEffect(() => {
    const ids = NAV_SECTIONS.map((s) => s.id);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Trava o scroll do body com o menu mobile aberto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Sobre o hero escuro (topo, sem rolar e sem menu aberto) a navbar usa cor clara
  const onDark = !scrolled && !open;

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: "var(--nav-h)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 clamp(1rem, 4vw, 2.5rem)",
        background: scrolled ? "rgba(246,245,241,0.92)" : "rgba(246,245,241,0)",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: `1px solid ${scrolled ? "var(--line)" : "transparent"}`,
        transition: "background 0.25s ease, border-color 0.25s ease",
      }}
    >
      {/* Marca */}
      <a
        href="#topo"
        style={{ textDecoration: "none", display: "flex", flexDirection: "column", lineHeight: 1.15 }}
        aria-label={`${SITE.name} — início`}
      >
        <span
          style={{
            fontFamily: "'Libre Baskerville', serif",
            fontSize: "1.02rem",
            fontWeight: 700,
            color: onDark ? "#fff" : "var(--ink)",
            letterSpacing: "-0.01em",
            transition: "color 0.25s ease",
          }}
        >
          {SITE.name}
        </span>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.62rem",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: onDark ? "rgba(255,255,255,0.55)" : "var(--text-faint)",
            marginTop: "2px",
            transition: "color 0.25s ease",
          }}
        >
          {SITE.role} · {SITE.oab}
        </span>
      </a>

      {/* Links — desktop */}
      <nav
        className="site-nav-desktop"
        style={{ display: "none", alignItems: "center", gap: "1.8rem" }}
      >
        {NAV_SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="nav-link"
            style={{
              color: onDark
                ? active === s.id
                  ? "#fff"
                  : "rgba(255,255,255,0.7)"
                : active === s.id
                ? "var(--ink)"
                : undefined,
            }}
          >
            {s.label}
          </a>
        ))}
        <a href={WA_DEFAULT} target="_blank" rel="noreferrer" className="btn-brand" style={{ padding: "9px 18px" }}>
          Falar comigo
        </a>
      </nav>

      {/* Hambúrguer — mobile */}
      <button
        type="button"
        className="site-nav-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        aria-expanded={open}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 40,
          height: 40,
          borderRadius: 3,
          border: `1px solid ${onDark ? "rgba(255,255,255,0.28)" : "var(--line)"}`,
          background: onDark ? "rgba(255,255,255,0.06)" : "var(--white)",
          color: onDark ? "#fff" : "var(--ink)",
          cursor: "pointer",
          transition: "color 0.25s ease, background 0.25s ease, border-color 0.25s ease",
        }}
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Painel mobile */}
      {open && (
        <>
          <div
            onClick={() => setOpen(false)}
            style={{ position: "fixed", inset: 0, top: "var(--nav-h)", background: "rgba(27,28,26,0.35)", zIndex: 90 }}
          />
          <nav
            style={{
              position: "fixed",
              top: "var(--nav-h)",
              left: 0,
              right: 0,
              zIndex: 95,
              background: "var(--paper)",
              borderBottom: "1px solid var(--line)",
              padding: "12px clamp(1rem, 4vw, 2.5rem) 20px",
              display: "flex",
              flexDirection: "column",
              gap: "2px",
            }}
          >
            {NAV_SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setOpen(false)}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "1rem",
                  fontWeight: 500,
                  color: active === s.id ? "var(--green-soft)" : "var(--text)",
                  textDecoration: "none",
                  padding: "13px 4px",
                  borderBottom: "1px solid var(--line)",
                }}
              >
                {s.label}
              </a>
            ))}
            <a
              href={WA_DEFAULT}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="btn-brand"
              style={{ marginTop: "14px", justifyContent: "center" }}
            >
              Falar comigo
            </a>
          </nav>
        </>
      )}

      <style>{`
        @media (min-width: 880px) {
          .site-nav-desktop { display: flex !important; }
          .site-nav-toggle { display: none !important; }
        }
      `}</style>
    </header>
  );
}
