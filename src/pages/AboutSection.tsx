import { useReveal } from "../hooks/useReveal";
import { SITE } from "../lib/site";

const PRINCIPLES = [
  {
    title: "Transparência desde o início",
    desc: "Na primeira conversa explico o cenário, os caminhos possíveis, os prazos realistas e como funcionam os honorários — sem promessa de resultado.",
  },
  {
    title: "Resposta rápida",
    desc: "Dedicação integral à advocacia. Você acompanha o andamento do caso e recebe retorno em linguagem clara, sem juridiquês desnecessário.",
  },
  {
    title: "Tecnologia a favor do caso",
    desc: "Uso ferramentas de organização processual e pesquisa para ganhar tempo e reduzir erro — o método, não um serviço à parte.",
  },
];

export function AboutSection() {
  const r = useReveal<HTMLDivElement>();

  return (
    <section
      id="sobre"
      className="site-section"
      style={{
        background: "var(--paper)",
        padding: "clamp(64px, 10vw, 120px) clamp(1.25rem, 6vw, 5rem)",
      }}
    >
      <div ref={r.ref} className={r.className} style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <p className="eyebrow" style={{ marginBottom: "14px" }}>
          Sobre
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr)",
            gap: "clamp(28px, 5vw, 56px)",
            alignItems: "start",
          }}
          className="about-grid"
        >
          {/* Retrato + registro */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "300px" }}>
            <img
              src="/foto-marlon.jpg"
              alt={`${SITE.name}, advogado inscrito na ${SITE.oab}`}
              style={{
                width: "100%",
                aspectRatio: "4 / 5",
                objectFit: "cover",
                objectPosition: "center 15%",
                borderRadius: "4px",
                border: "1px solid var(--line)",
              }}
            />
            <div
              style={{
                borderLeft: "3px solid var(--green)",
                paddingLeft: "14px",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--ink)" }}>
                {SITE.name}
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-soft)", marginTop: "2px" }}>
                {SITE.oab} · {SITE.oabSubsecao}
              </div>
              <a
                className="cna-link"
                href={SITE.cnaUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-block",
                  marginTop: "8px",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  color: "var(--green-soft)",
                }}
              >
                Verificar inscrição no CNA ↗
              </a>
            </div>
          </div>

          {/* Texto em primeira pessoa */}
          <div>
            <h2
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: "clamp(1.7rem, 4vw, 2.4rem)",
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
                color: "var(--ink)",
                margin: "0 0 20px",
                textWrap: "balance",
              }}
            >
              Estou no início da minha trajetória — e trato isso como uma vantagem para quem me procura.
            </h2>

            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "1rem",
                lineHeight: 1.8,
                color: "var(--text)",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <p style={{ margin: 0 }}>
                Concluí o Bacharelado em Direito na Universidade Católica de Brasília em 2025 e me
                inscrevi na Ordem no mesmo ano. Durante a graduação, estagiei em órgãos públicos —
                onde acompanhei processos administrativos, análise de licitações e a rotina de defesa
                em procedimentos internos — e em atividade de prática jurídica.
              </p>
              <p style={{ margin: 0 }}>
                Escolhi o Direito pela combinação de técnica e impacto concreto na vida das pessoas:
                uma defesa bem construída, um contrato revisado a tempo ou uma orientação preventiva
                mudam desfechos. É esse cuidado que ofereço em cada atendimento.
              </p>
              <p style={{ margin: 0 }}>
                Como advogado em começo de carreira, dedico tempo e atenção que uma agenda saturada
                nem sempre permite: leio cada caso a fundo, estudo a jurisprudência aplicável e mantenho
                você informado do começo ao fim. Quando um caso exige experiência específica que ainda
                não tenho, digo com franqueza e indico o caminho.
              </p>
            </div>
          </div>
        </div>

        {/* Princípios */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "16px",
            marginTop: "clamp(36px, 6vw, 64px)",
          }}
        >
          {PRINCIPLES.map((p) => (
            <div
              key={p.title}
              style={{
                background: "var(--white)",
                border: "1px solid var(--line)",
                borderTop: "3px solid var(--brass)",
                borderRadius: "4px",
                padding: "20px 22px",
              }}
            >
              <h3
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "var(--ink)",
                  margin: "0 0 8px",
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.86rem",
                  lineHeight: 1.65,
                  color: "var(--text-soft)",
                  margin: 0,
                }}
              >
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 720px) {
          .about-grid { grid-template-columns: 280px 1fr !important; }
        }
      `}</style>
    </section>
  );
}
