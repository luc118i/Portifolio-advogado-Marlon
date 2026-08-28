import { Mail, Instagram, Linkedin, Clock, MapPin, MessageCircle } from "lucide-react";
import { useReveal } from "../hooks/useReveal";
import { SITE, wa } from "../lib/site";

const HOURS = [
  { day: "Segunda a sexta", time: "9h às 18h" },
  { day: "Sábado", time: "9h às 12h" },
];

const CHANNELS = [
  { icon: Mail, label: SITE.email, href: `mailto:${SITE.email}` },
  { icon: Instagram, label: SITE.instagramHandle, href: SITE.instagram },
  { icon: Linkedin, label: SITE.linkedinDisplay, href: SITE.linkedin },
];

const FAQ = [
  {
    q: "Como funciona a primeira conversa?",
    a: "É um contato inicial sem compromisso, pelo WhatsApp ou presencial, para entender a situação, esclarecer dúvidas e apontar os caminhos possíveis. Não há cobrança para esse primeiro alinhamento.",
  },
  {
    q: "Quais são os honorários?",
    a: "Dependem da complexidade e do tipo de trabalho. Combino tudo de forma clara antes de iniciar, por escrito, seguindo a tabela de honorários da OAB/DF como referência.",
  },
  {
    q: "Atende fora de Brasília ou on-line?",
    a: "Sim. Boa parte do acompanhamento é feita à distância, com reuniões por vídeo. Atos presenciais ficam concentrados no Distrito Federal.",
  },
];

export function ContactSection() {
  const r = useReveal<HTMLDivElement>();

  return (
    <section
      id="contato"
      className="site-section"
      style={{
        background: "var(--ink)",
        color: "#fff",
        padding: "clamp(64px, 10vw, 120px) clamp(1.25rem, 6vw, 5rem)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div ref={r.ref} className={r.className} style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <p className="eyebrow" style={{ color: "var(--brass-soft)", marginBottom: "14px" }}>
          Contato
        </p>
        <h2
          style={{
            fontFamily: "'Libre Baskerville', serif",
            fontSize: "clamp(1.8rem, 4.5vw, 2.6rem)",
            fontWeight: 700,
            lineHeight: 1.18,
            letterSpacing: "-0.01em",
            margin: "0 0 14px",
            textWrap: "balance",
          }}
        >
          Vamos conversar sobre o seu caso
        </h2>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1rem",
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.6)",
            maxWidth: "56ch",
            margin: "0 0 32px",
          }}
        >
          O primeiro contato é sem compromisso e sigiloso. Me conte o que está acontecendo
          e retorno o quanto antes.
        </p>

        <div className="contact-cta">
          <a
            href={wa("Olá, Dr. Marlon! Gostaria de agendar uma conversa inicial sobre um caso.")}
            target="_blank"
            rel="noreferrer"
            className="btn-brand"
            style={{ padding: "15px 28px", fontSize: "0.95rem" }}
          >
            <MessageCircle size={17} />
            Falar pelo WhatsApp
          </a>
          <span className="phone">
            {SITE.phoneDisplay} · seg a sex, 9h–18h
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "14px 28px",
            margin: "40px 0",
          }}
        >
          {CHANNELS.map((c) => {
            const Icon = c.icon;
            return (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.85rem",
                  color: "rgba(255,255,255,0.7)",
                  textDecoration: "none",
                  padding: "12px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <Icon size={15} color="var(--brass-soft)" />
                {c.label}
              </a>
            );
          })}
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "24px 48px",
            marginBottom: "48px",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "0.66rem",
                fontWeight: 600,
                letterSpacing: "0.14em",
                color: "rgba(255,255,255,0.5)",
                marginBottom: "10px",
              }}
            >
              <Clock size={13} /> HORÁRIO DE ATENDIMENTO
            </div>
            {HOURS.map((h) => (
              <div
                key={h.day}
                style={{
                  display: "flex",
                  gap: "16px",
                  fontSize: "0.85rem",
                  color: "rgba(255,255,255,0.75)",
                  marginBottom: "4px",
                }}
              >
                <span style={{ minWidth: "130px" }}>{h.day}</span>
                <span style={{ fontWeight: 600 }}>{h.time}</span>
              </div>
            ))}
          </div>
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "0.66rem",
                fontWeight: 600,
                letterSpacing: "0.14em",
                color: "rgba(255,255,255,0.5)",
                marginBottom: "10px",
              }}
            >
              <MapPin size={13} /> LOCALIZAÇÃO
            </div>
            <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.75)" }}>
              {SITE.city}
              <br />
              {SITE.oabSubsecao}
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div style={{ maxWidth: "680px" }}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.66rem",
              fontWeight: 600,
              letterSpacing: "0.16em",
              color: "rgba(255,255,255,0.5)",
              margin: "0 0 12px",
            }}
          >
            PERGUNTAS FREQUENTES
          </p>
          {FAQ.map((item) => (
            <details
              key={item.q}
              style={{
                borderTop: "1px solid rgba(255,255,255,0.1)",
                padding: "14px 0",
              }}
            >
              <summary
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.92rem",
                  fontWeight: 600,
                  color: "#fff",
                  cursor: "pointer",
                  listStyle: "none",
                }}
              >
                {item.q}
              </summary>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.85rem",
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.6)",
                  margin: "10px 0 0",
                }}
              >
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
