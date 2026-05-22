import { CheckCircle, User, Camera, ExternalLink } from "lucide-react";


const HAS_PHOTO = true;
const PROFILE_PHOTO_SRC = "/foto-marlon.jpg";

export function CredentialsPage() {
  const mobile = typeof window !== "undefined" && window.innerWidth < 640;

  const photoSize  = mobile ? 144 : 180;
  const sealSize   = mobile ? 76  : 100;
  const sealOffset = mobile ? -12 : -18;

  return (
    <div
      className="min-h-screen w-full bg-white flex items-center justify-center px-6 md:px-12 lg:px-20"
      style={{
        paddingTop:    mobile ? "36px" : "64px",
        paddingBottom: mobile ? "36px" : "64px",
      }}
    >
      <div style={{ maxWidth: "860px", width: "100%" }}>

        {/* Título */}
        <div className="text-center" style={{ marginBottom: mobile ? "28px" : "52px" }}>
          <h2
            className="text-[#1C1C1C]"
            style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: mobile ? "1.75rem" : "clamp(1.875rem, 5vw, 2.75rem)",
              fontWeight: "700",
              letterSpacing: "-0.01em",
            }}
          >
            Registro Profissional
          </h2>
          <div
            className="bg-[#888888] mx-auto"
            style={{ width: "48px", height: "1px", marginTop: "12px" }}
          />
        </div>

        {/* Layout: foto + selo  |  credenciais */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: mobile ? "24px" : "52px",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          {/* ── Coluna esquerda ── */}
          <div
            style={{
              display: "flex",
              flexDirection: mobile ? "row" : "column",
              alignItems: "center",
              gap: mobile ? "16px" : "18px",
              flexShrink: 0,
              width: mobile ? "100%" : "auto",
              justifyContent: mobile ? "center" : "flex-start",
            }}
          >
            {/* Foto + Selo */}
            <div style={{ position: "relative", display: "inline-block" }}>
              <div
                className="rounded-full overflow-hidden"
                style={{
                  width:  `${photoSize}px`,
                  height: `${photoSize}px`,
                  backgroundColor: HAS_PHOTO ? "transparent" : "#F5F5F5",
                  border: HAS_PHOTO
                    ? "2px solid rgba(136,136,136,0.35)"
                    : "2px dashed rgba(136,136,136,0.4)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  cursor: "default",
                }}
              >
                {HAS_PHOTO ? (
                  <img
                    src={PROFILE_PHOTO_SRC}
                    alt="Foto do Dr. Marlon Inácio"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center 15%",
                    }}
                  />
                ) : (
                  <>
                    <User style={{ width: "52px", height: "52px", color: "#C8C8C8" }} />
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <Camera style={{ width: "10px", height: "10px", color: "#AAAAAA" }} />
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", color: "#AAAAAA", letterSpacing: "0.08em" }}>
                        FOTO
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Selo OAB */}
              <div
                className="seal-breathe"
                style={{
                  position: "absolute",
                  width:  `${sealSize}px`,
                  height: `${sealSize}px`,
                  bottom: `${sealOffset}px`,
                  right:  `${sealOffset}px`,
                  zIndex: 10,
                  borderRadius: "50%",
                  overflow: "hidden",
                }}
              >
                <img
                  src="/oab-seal.png"
                  alt="Selo holográfico OAB"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>

            {/* Badge inscrição ativa */}
            <div
              className="flex items-center gap-2 rounded-full"
              style={{ backgroundColor: "#1C1C1C", padding: "8px 18px" }}
            >
              <CheckCircle style={{ width: "13px", height: "13px", color: "#888888" }} />
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.68rem",
                  fontWeight: "600",
                  color: "#FFFFFF",
                  letterSpacing: "0.14em",
                  whiteSpace: "nowrap",
                }}
              >
                INSCRIÇÃO ATIVA
              </span>
            </div>
          </div>

          {/* ── Coluna direita: credenciais ── */}
          <div
            style={{
              flex: 1,
              minWidth: mobile ? "100%" : "260px",
              display: "flex",
              flexDirection: "column",
              gap: mobile ? "20px" : "28px",
            }}
          >
            {/* Nome + OAB */}
            <div
              className="border-l-4 border-[#888888]"
              style={{ paddingLeft: "20px" }}
            >
              <p
                className="text-[#888888]"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.68rem",
                  fontWeight: "600",
                  letterSpacing: "0.16em",
                  marginBottom: "6px",
                }}
              >
                ADVOGADO INSCRITO
              </p>
              <h3
                className="text-[#1C1C1C]"
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: mobile ? "1.3rem" : "clamp(1.2rem, 3vw, 1.65rem)",
                  fontWeight: "700",
                  lineHeight: "1.25",
                }}
              >
                Marlon Luiz Inácio da Silva
              </h3>

              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "8px", flexWrap: "wrap" }}>
                <p
                  className="text-[#888888]"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", margin: 0 }}
                >
                  OAB/DF 87.696 · Subseção São Sebastião
                </p>
                <a
                  href="https://cna.oab.org.br/"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.68rem",
                    fontWeight: "600",
                    color: "#888888",
                    textDecoration: "none",
                    letterSpacing: "0.08em",
                    padding: mobile ? "6px 12px" : "3px 8px",
                    border: "1px solid rgba(136,136,136,0.35)",
                    borderRadius: "100px",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "#1C1C1C";
                    e.currentTarget.style.color = "#1C1C1C";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "rgba(136,136,136,0.35)";
                    e.currentTarget.style.color = "#888888";
                  }}
                >
                  verificar
                  <ExternalLink style={{ width: "9px", height: "9px" }} />
                </a>
              </div>
            </div>

            {/* Formação */}
            <div>
              <p
                className="text-[#888888]"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.68rem",
                  fontWeight: "600",
                  letterSpacing: "0.16em",
                  marginBottom: "6px",
                }}
              >
                FORMAÇÃO
              </p>
              <p
                className="text-[#1C1C1C]"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", fontWeight: "500" }}
              >
                Bacharel em Direito
              </p>
              <p
                className="text-[#888888]"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", marginTop: "2px" }}
              >
                Universidade Católica de Brasília · Conclusão 2025
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
