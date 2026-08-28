import { ChevronDown } from "lucide-react";
import { SITE, WA_DEFAULT } from "../lib/site";

export function HeroSection() {
  return (
    <section
      id="topo"
      className="site-section"
      style={{
        minHeight: "100svh",
        background: "var(--ink)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "calc(var(--nav-h) + 40px) clamp(1.25rem, 6vw, 5rem) 64px",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "760px" }}>
        <p
          className="eyebrow"
          style={{ color: "var(--brass-soft)", marginBottom: "22px" }}
        >
          {SITE.role} · {SITE.oab} · Brasília/DF
        </p>

        <h1
          style={{
            fontFamily: "'Libre Baskerville', serif",
            fontSize: "clamp(2.2rem, 6vw, 3.9rem)",
            fontWeight: 700,
            lineHeight: 1.12,
            letterSpacing: "-0.02em",
            margin: 0,
            textWrap: "balance",
          }}
        >
          {SITE.name}
        </h1>

        <div
          style={{
            width: "56px",
            height: "2px",
            background: "var(--brass-soft)",
            margin: "26px 0",
          }}
        />

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(1rem, 2.4vw, 1.18rem)",
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.82)",
            fontWeight: 300,
            maxWidth: "60ch",
            margin: 0,
          }}
        >
          Advogado inscrito na OAB/DF em {SITE.oabYear}. Atuação em Direito Penal,
          Administrativo e Civil, com dedicação integral a cada caso, comunicação
          clara e uso de tecnologia para dar agilidade ao acompanhamento processual.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            marginTop: "34px",
          }}
        >
          <a href={WA_DEFAULT} target="_blank" rel="noreferrer" className="btn-brand">
            Falar comigo
          </a>
          <a
            href="#sobre"
            className="btn-ghost"
            style={{ color: "#fff", borderColor: "rgba(255,255,255,0.28)" }}
          >
            Conhecer o trabalho
          </a>
        </div>
      </div>

      <a
        href="#sobre"
        aria-label="Ir para a seção Sobre"
        style={{
          position: "absolute",
          bottom: "24px",
          left: "50%",
          transform: "translateX(-50%)",
          color: "rgba(255,255,255,0.4)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4px",
          textDecoration: "none",
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.6rem",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
        }}
      >
        Continuar
        <ChevronDown size={16} />
      </a>
    </section>
  );
}
