import { Gavel, Landmark, Scale, FileText, ArrowRight } from "lucide-react";
import { useReveal } from "../hooks/useReveal";
import { wa } from "../lib/site";

const AREAS = [
  {
    icon: Gavel,
    name: "Direito Penal",
    desc: "Acompanhamento e defesa técnica da fase de investigação ao julgamento: inquéritos policiais, audiências de custódia, respostas à acusação, recursos e execução penal.",
    when: "Quando você é investigado, indiciado, réu ou testemunha em processo criminal.",
  },
  {
    icon: Landmark,
    name: "Direito Administrativo",
    desc: "Processos administrativos disciplinares e sancionadores, recursos perante órgãos públicos, análise de editais e contratos de licitação, defesas em autos de infração.",
    when: "Quando você ou sua empresa respondem a um processo, recurso ou penalidade da Administração.",
  },
  {
    icon: Scale,
    name: "Direito Civil",
    desc: "Família e sucessões (divórcio, guarda, alimentos, inventário), contratos, cobranças, responsabilidade civil e indenizações — na via judicial e por acordo.",
    when: "Quando envolve patrimônio, família, contrato ou reparação de dano.",
  },
  {
    icon: FileText,
    name: "Consultoria preventiva",
    desc: "Revisão de contratos antes da assinatura, análise de risco jurídico de uma decisão de negócio e orientação pontual para evitar litígio.",
    when: "Quando ainda dá tempo de decidir com segurança em vez de remediar depois.",
  },
];

export function PracticeAreasSection() {
  const r = useReveal<HTMLDivElement>();

  return (
    <section
      id="atuacao"
      className="site-section"
      style={{
        background: "var(--white)",
        padding: "clamp(64px, 10vw, 120px) clamp(1.25rem, 6vw, 5rem)",
        borderTop: "1px solid var(--line)",
      }}
    >
      <div ref={r.ref} className={r.className} style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <p className="eyebrow" style={{ marginBottom: "14px" }}>
          Atuação
        </p>
        <h2
          style={{
            fontFamily: "'Libre Baskerville', serif",
            fontSize: "clamp(1.7rem, 4vw, 2.4rem)",
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            color: "var(--ink)",
            margin: "0 0 12px",
            textWrap: "balance",
          }}
        >
          Áreas em que atuo
        </h2>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1rem",
            lineHeight: 1.7,
            color: "var(--text-soft)",
            maxWidth: "60ch",
            margin: "0 0 40px",
          }}
        >
          Concentro a prática em quatro frentes para dar profundidade a cada caso.
          A primeira conversa é sem compromisso e serve para entender a situação e
          apontar os caminhos possíveis.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "16px",
          }}
        >
          {AREAS.map((area) => {
            const Icon = area.icon;
            return (
              <div
                key={area.name}
                style={{
                  background: "var(--paper)",
                  border: "1px solid var(--line)",
                  borderRadius: "4px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "50%",
                      background: "var(--green)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={17} color="#fff" />
                  </span>
                  <h3
                    style={{
                      fontFamily: "'Libre Baskerville', serif",
                      fontSize: "1.05rem",
                      fontWeight: 700,
                      color: "var(--ink)",
                      margin: 0,
                    }}
                  >
                    {area.name}
                  </h3>
                </div>

                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.86rem",
                    lineHeight: 1.65,
                    color: "var(--text)",
                    margin: 0,
                  }}
                >
                  {area.desc}
                </p>

                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.78rem",
                    lineHeight: 1.55,
                    color: "var(--text-faint)",
                    margin: 0,
                    paddingTop: "10px",
                    borderTop: "1px solid var(--line)",
                  }}
                >
                  {area.when}
                </p>

                <a
                  className="area-cta"
                  href={wa(`Olá, Dr. Marlon! Gostaria de conversar sobre uma questão de ${area.name}.`)}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "var(--green-soft)",
                    textDecoration: "none",
                    marginTop: "2px",
                  }}
                >
                  Conversar sobre {area.name}
                  <ArrowRight size={13} />
                </a>
              </div>
            );
          })}
        </div>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.82rem",
            lineHeight: 1.7,
            color: "var(--text-faint)",
            marginTop: "28px",
            maxWidth: "60ch",
          }}
        >
          Não vê a sua situação na lista? Descreva o caso pelo WhatsApp — se não for a
          minha área, oriento sobre o profissional adequado.
        </p>
      </div>
    </section>
  );
}
