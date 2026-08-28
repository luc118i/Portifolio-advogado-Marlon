import { SITE, DEV } from "../lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer
      style={{
        background: "var(--ink)",
        color: "rgba(255,255,255,0.6)",
        padding: "40px clamp(1rem, 5vw, 3rem) 28px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          gap: "16px 40px",
          alignItems: "baseline",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: "1rem",
              fontWeight: 700,
              color: "#fff",
              marginBottom: "4px",
            }}
          >
            {SITE.name}
          </div>
          <div style={{ fontSize: "0.78rem" }}>
            {SITE.role} · {SITE.oab} · {SITE.oabSubsecao}
          </div>
          <div style={{ fontSize: "0.78rem", marginTop: "2px" }}>{SITE.city}</div>
        </div>

        <div style={{ fontSize: "0.72rem", textAlign: "right", lineHeight: 1.7 }}>
          <div>
            © {year} {SITE.name}
          </div>
          <div>Todos os direitos reservados</div>
          <div style={{ marginTop: "6px", color: "rgba(255,255,255,0.4)" }}>
            Conteúdo informativo — não constitui consulta jurídica.
          </div>
        </div>
      </div>

      {/* Assinatura de desenvolvimento */}
      <div
        style={{
          maxWidth: "1000px",
          margin: "26px auto 0",
          paddingTop: "16px",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          fontSize: "0.68rem",
          color: "rgba(255,255,255,0.38)",
          letterSpacing: "0.02em",
        }}
      >
        Construído por{" "}
        <a
          href={DEV.github}
          target="_blank"
          rel="noreferrer"
          style={{ color: "var(--brass-soft)", textDecoration: "none", fontWeight: 500 }}
        >
          {DEV.name}
        </a>{" "}
        · <a
          href={DEV.github}
          target="_blank"
          rel="noreferrer"
          style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}
        >
          github.com/luc118i
        </a>
      </div>
    </footer>
  );
}
