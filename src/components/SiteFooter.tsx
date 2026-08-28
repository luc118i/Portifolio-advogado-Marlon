import { SITE } from "../lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer
      style={{
        background: "var(--ink)",
        color: "rgba(255,255,255,0.6)",
        padding: "40px clamp(1rem, 5vw, 3rem)",
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
    </footer>
  );
}
