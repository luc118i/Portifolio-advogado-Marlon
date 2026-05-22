import { Clock, Mail, Instagram, MessageCircle } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/5561999138905?text=Olá%2C%20Dr.%20Marlon!%20Gostaria%20de%20solicitar%20uma%20consulta%20jurídica.";

const availability = [
  { day: "Segunda — Sexta", hours: "09h às 18h" },
  { day: "Sábado",          hours: "09h às 12h" },
];

const secondaryContacts = [
  {
    icon: Mail,
    label: "marloninacio.adv@outlook.com",
    href: "mailto:marloninacio.adv@outlook.com",
  },
  {
    icon: Instagram,
    label: "@marloninacio.adv",
    href: "https://instagram.com/marloninacio.adv",
  },
];

export function ConsultationPage() {
  const mobile = typeof window !== "undefined" && window.innerWidth < 640;

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-6 md:px-12 lg:px-20"
      style={{
        backgroundColor: "#1C1C1C",
        paddingTop:    mobile ? "40px" : "64px",
        paddingBottom: mobile ? "40px" : "64px",
      }}
    >
      <div style={{ maxWidth: "680px", width: "100%", textAlign: "center" }}>

        {/* Eyebrow */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.68rem",
            fontWeight: "600",
            letterSpacing: "0.22em",
            color: "#888888",
            marginBottom: "20px",
          }}
        >
          ATENDIMENTO PERSONALIZADO
        </p>

        {/* Título principal */}
        <h2
          style={{
            fontFamily: "'Libre Baskerville', serif",
            fontSize: "clamp(2rem, 6vw, 3.25rem)",
            fontWeight: "700",
            color: "#FFFFFF",
            lineHeight: "1.15",
            letterSpacing: "-0.02em",
            marginBottom: "20px",
          }}
        >
          Solicite uma<br />
          <span style={{ color: "#888888" }}>Consulta Jurídica</span>
        </h2>

        {/* Subtítulo */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(0.9rem, 2.5vw, 1.05rem)",
            color: "rgba(255,255,255,0.55)",
            lineHeight: "1.7",
            marginBottom: mobile ? "32px" : "48px",
            maxWidth: "480px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Entre em contato diretamente pelo WhatsApp para agendar uma conversa
          inicial sem compromisso. Atendimento ágil e sigiloso.
        </p>

        {/* Botão WhatsApp principal */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            backgroundColor: "#25D366",
            color: "#FFFFFF",
            borderRadius: "100px",
            padding: mobile ? "16px 28px" : "18px 36px",
            textDecoration: "none",
            fontFamily: "'Inter', sans-serif",
            fontSize: mobile ? "0.95rem" : "1rem",
            fontWeight: "700",
            letterSpacing: "0.02em",
            marginBottom: mobile ? "32px" : "52px",
            width: mobile ? "100%" : "auto",
            justifyContent: mobile ? "center" : "flex-start",
            transition: "transform 0.15s ease, box-shadow 0.15s ease",
            boxShadow: "0 8px 32px rgba(37,211,102,0.3)",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "scale(1.04)";
            e.currentTarget.style.boxShadow = "0 12px 40px rgba(37,211,102,0.45)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 8px 32px rgba(37,211,102,0.3)";
          }}
        >
          {/* Ícone WhatsApp */}
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ flexShrink: 0 }}
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Agendar pelo WhatsApp
        </a>

        {/* Divisor */}
        <div
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "rgba(136,136,136,0.2)",
            marginBottom: "40px",
          }}
        />

        {/* Horários de atendimento */}
        <div style={{ marginBottom: "40px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              marginBottom: "20px",
            }}
          >
            <Clock style={{ width: "14px", height: "14px", color: "#888888" }} />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.68rem",
                fontWeight: "600",
                letterSpacing: "0.18em",
                color: "#888888",
              }}
            >
              HORÁRIO DE ATENDIMENTO
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: mobile ? "column" : "row",
              gap: mobile ? "10px" : "16px",
              justifyContent: "center",
              alignItems: mobile ? "stretch" : "center",
            }}
          >
            {availability.map((slot, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(136,136,136,0.15)",
                  borderRadius: "12px",
                  padding: mobile ? "14px 20px" : "16px 24px",
                  textAlign: "center",
                  minWidth: mobile ? "0" : "180px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: mobile ? "row" : "column",
                  gap: mobile ? "8px" : "0",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.78rem",
                    fontWeight: "600",
                    color: "rgba(255,255,255,0.5)",
                    letterSpacing: "0.06em",
                    marginBottom: "4px",
                  }}
                >
                  {slot.day}
                </p>
                <p
                  style={{
                    fontFamily: "'Libre Baskerville', serif",
                    fontSize: "1.05rem",
                    fontWeight: "700",
                    color: "#FFFFFF",
                  }}
                >
                  {slot.hours}
                </p>
              </div>
            ))}
          </div>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.72rem",
              color: "rgba(136,136,136,0.6)",
              marginTop: "12px",
              letterSpacing: "0.04em",
            }}
          >
            Brasília, DF · Horário de Brasília (UTC−3)
          </p>
        </div>

        {/* Contatos secundários */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {secondaryContacts.map((contact, i) => {
            const Icon = contact.icon;
            return (
              <a
                key={i}
                href={contact.href}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.8rem",
                  fontWeight: "500",
                  color: "rgba(255,255,255,0.45)",
                  textDecoration: "none",
                  padding: "10px 16px",
                  border: "1px solid rgba(136,136,136,0.2)",
                  borderRadius: "100px",
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = "#FFFFFF";
                  e.currentTarget.style.borderColor = "rgba(136,136,136,0.5)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.45)";
                  e.currentTarget.style.borderColor = "rgba(136,136,136,0.2)";
                }}
              >
                <Icon style={{ width: "14px", height: "14px" }} />
                {contact.label}
              </a>
            );
          })}
        </div>

      </div>
    </div>
  );
}
