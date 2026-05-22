import { Phone, Mail, Linkedin, Instagram, MapPin } from "lucide-react";

const contacts = [
  {
    Icon: Phone,
    label: "WHATSAPP",
    value: "(61) 9 9913-8905",
    href: "https://wa.me/5561999138905",
  },
  {
    Icon: Mail,
    label: "E-MAIL",
    value: "marloninacio.adv@outlook.com",
    href: "mailto:marloninacio.adv@outlook.com",
  },
  {
    Icon: Instagram,
    label: "INSTAGRAM",
    value: "@marloninacio.adv",
    href: "https://instagram.com/marloninacio.adv",
  },
  {
    Icon: Linkedin,
    label: "LINKEDIN",
    value: "Marlon Silva",
    href: "https://linkedin.com/in/marlon-silva-082b811a4",
  },
];

export function ContactPage() {
  return (
    <div className="min-h-screen w-full bg-[#1C1C1C] flex items-center justify-center px-6 md:px-12 lg:px-20 py-12 md:py-20">
      <div className="max-w-4xl w-full space-y-10 md:space-y-12">
        {/* Título */}
        <div className="text-center">
          <h2
            className="text-white"
            style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: "clamp(2rem, 6vw, 3rem)",
              fontWeight: "700",
              letterSpacing: "-0.01em",
            }}
          >
            Contato
          </h2>
          <div className="w-20 md:w-24 h-0.5 bg-[#888888] mx-auto mt-4 md:mt-6"></div>
        </div>

        {/* Grid de contatos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {contacts.map(({ Icon, label, value, href }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="flex items-start gap-4 rounded-sm border border-[#888888]/30 hover:border-[#888888] transition-all hover:bg-white/10 group"
              style={{ padding: "24px", backgroundColor: "rgba(255,255,255,0.05)" }}
            >
              <div
                className="flex-shrink-0 rounded-full flex items-center justify-center group-hover:bg-[#888888] transition-colors"
                style={{
                  width: "44px",
                  height: "44px",
                  backgroundColor: "rgba(136,136,136,0.15)",
                }}
              >
                <Icon
                  style={{ width: "20px", height: "20px", color: "#888888" }}
                  className="group-hover:text-[#1C1C1C]"
                />
              </div>
              <div>
                <p
                  className="text-[#888888]"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.72rem",
                    fontWeight: "600",
                    letterSpacing: "0.14em",
                    marginBottom: "5px",
                  }}
                >
                  {label}
                </p>
                <p
                  className="text-white break-all"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "clamp(0.875rem, 2vw, 1rem)",
                    fontWeight: "500",
                  }}
                >
                  {value}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Localização */}
        <div
          className="flex items-center justify-center gap-3"
          style={{ paddingTop: "8px" }}
        >
          <MapPin style={{ width: "14px", height: "14px", color: "#888888" }} />
          <p
            className="text-[#888888]"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.875rem",
            }}
          >
            Brasília, DF · Subseção OAB São Sebastião
          </p>
        </div>
      </div>
    </div>
  );
}
