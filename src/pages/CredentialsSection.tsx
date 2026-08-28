import { CheckCircle, ExternalLink } from "lucide-react";
import { useReveal } from "../hooks/useReveal";
import { SITE } from "../lib/site";

// ⚙️  AJUSTE OS PERÍODOS E DESCRIÇÕES REAIS DOS ESTÁGIOS ANTES DE PUBLICAR.
//    Estão rotulados como "Estágio" de propósito — não devem ser descritos
//    como atuação de advogado (ver diagnóstico, mudança nº 1).
const TRAJETORIA = [
  {
    period: "2024 – 2025",
    role: "Estágio de Direito",
    org: "Ministério da Justiça e Segurança Pública",
    desc: "Apoio em análise de processos administrativos e pesquisa normativa, sob supervisão.",
  },
  {
    period: "2023 – 2024",
    role: "Estágio de Direito",
    org: "Detran-DF",
    desc: "Acompanhamento de procedimentos administrativos e defesas em autos de infração, sob supervisão.",
  },
  {
    period: "2022 – 2023",
    role: "Prática jurídica",
    org: "Núcleo de Prática Jurídica · UCB",
    desc: "Atendimento assistido à comunidade e elaboração de peças em Família e Cível.",
  },
];

export function CredentialsSection() {
  const r = useReveal<HTMLDivElement>();

  return (
    <section
      id="formacao"
      className="site-section"
      style={{
        background: "var(--ink)",
        color: "#fff",
        padding: "clamp(64px, 10vw, 120px) clamp(1.25rem, 6vw, 5rem)",
      }}
    >
      <div ref={r.ref} className={r.className} style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <p className="eyebrow" style={{ color: "var(--brass-soft)", marginBottom: "14px" }}>
          Formação & registro
        </p>
        <h2
          style={{
            fontFamily: "'Libre Baskerville', serif",
            fontSize: "clamp(1.7rem, 4vw, 2.4rem)",
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            margin: "0 0 40px",
            textWrap: "balance",
          }}
        >
          Trajetória verificável
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,1fr)",
            gap: "clamp(28px, 5vw, 56px)",
          }}
          className="cred-grid"
        >
          {/* Registro */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "20px",
              }}
            >
              <img
                src="/oab-seal.png"
                alt="Selo da Ordem dos Advogados do Brasil"
                className="oab-seal"
                style={{ width: "64px", height: "64px", objectFit: "cover", flexShrink: 0 }}
              />
              <div
                className="badge-ativa"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  borderRadius: "100px",
                  padding: "7px 14px",
                }}
              >
                <CheckCircle size={13} color="var(--green-ink)" />
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.66rem",
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    color: "#fff",
                  }}
                >
                  INSCRIÇÃO ATIVA
                </span>
              </div>
            </div>

            <div style={{ borderLeft: "3px solid var(--brass-soft)", paddingLeft: "18px" }}>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.66rem",
                  fontWeight: 600,
                  letterSpacing: "0.16em",
                  color: "rgba(255,255,255,0.5)",
                  margin: "0 0 6px",
                }}
              >
                ADVOGADO INSCRITO
              </p>
              <h3
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  lineHeight: 1.25,
                  margin: 0,
                }}
              >
                Marlon Luiz Inácio da Silva
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.88rem",
                  color: "rgba(255,255,255,0.62)",
                  margin: "8px 0 0",
                }}
              >
                {SITE.oab} · {SITE.oabSubsecao}
              </p>
              <a
                className="cna-link"
                href={SITE.cnaUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  marginTop: "12px",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  color: "var(--green-ink)",
                  textDecoration: "none",
                  border: "1px solid rgba(127,183,156,0.4)",
                  borderRadius: "100px",
                  padding: "8px 14px",
                }}
              >
                Verificar no Cadastro Nacional (CNA)
                <ExternalLink size={11} />
              </a>
            </div>

            <div style={{ marginTop: "28px" }}>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.66rem",
                  fontWeight: 600,
                  letterSpacing: "0.16em",
                  color: "rgba(255,255,255,0.5)",
                  margin: "0 0 6px",
                }}
              >
                FORMAÇÃO
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  margin: 0,
                }}
              >
                Bacharel em Direito
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.85rem",
                  color: "rgba(255,255,255,0.6)",
                  margin: "2px 0 0",
                }}
              >
                Universidade Católica de Brasília · Conclusão em 2025
              </p>
            </div>
          </div>

          {/* Trajetória */}
          <div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.66rem",
                fontWeight: 600,
                letterSpacing: "0.16em",
                color: "rgba(255,255,255,0.5)",
                margin: "0 0 18px",
              }}
            >
              ESTÁGIOS E PRÁTICA JURÍDICA
            </p>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {TRAJETORIA.map((t, i) => (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "88px 1fr",
                    gap: "16px",
                    padding: "16px 0",
                    borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      color: "var(--brass-soft)",
                      letterSpacing: "0.03em",
                      paddingTop: "2px",
                    }}
                  >
                    {t.period}
                  </span>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        color: "#fff",
                      }}
                    >
                      {t.role} · <span style={{ fontWeight: 400, color: "rgba(255,255,255,0.7)" }}>{t.org}</span>
                    </div>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.82rem",
                        lineHeight: 1.6,
                        color: "rgba(255,255,255,0.55)",
                        margin: "4px 0 0",
                      }}
                    >
                      {t.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 760px) {
          .cred-grid { grid-template-columns: 320px 1fr !important; }
        }
      `}</style>
    </section>
  );
}
