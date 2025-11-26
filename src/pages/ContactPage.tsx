import { Phone, Mail, Linkedin, MapPin } from "lucide-react";

export function ContactPage() {
  return (
    <div className="min-h-screen w-full bg-[#F2F2F2] flex items-center justify-center px-6 md:px-12 lg:px-20 py-12 md:py-20">
      <div className="max-w-5xl w-full space-y-12 md:space-y-16">
        {/* Título */}
        <div className="text-center">
          <h2
            className="text-[#0A0F24]"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 6vw, 3rem)",
              fontWeight: "600",
              letterSpacing: "-0.01em",
            }}
          >
            Contato Profissional
          </h2>
          <div className="w-20 md:w-24 h-0.5 bg-[#C2A14D] mx-auto mt-4 md:mt-6"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Lado esquerdo - Informações de contato */}
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-5 md:space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#0A0F24] flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 md:w-6 md:h-6 text-[#C2A14D]" />
                </div>
                <div>
                  <p
                    className="text-[#0A0F24]/70 mb-1"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "clamp(0.8125rem, 2vw, 0.875rem)",
                      fontWeight: "600",
                      letterSpacing: "0.05em",
                    }}
                  >
                    WHATSAPP
                  </p>
                  <p
                    className="text-[#0A0F24]"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "clamp(1rem, 2.5vw, 1.125rem)",
                      fontWeight: "500",
                    }}
                  >
                    (61) 99138905
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#0A0F24] flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 md:w-6 md:h-6 text-[#C2A14D]" />
                </div>
                <div>
                  <p
                    className="text-[#0A0F24]/70 mb-1"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "clamp(0.8125rem, 2vw, 0.875rem)",
                      fontWeight: "600",
                      letterSpacing: "0.05em",
                    }}
                  >
                    E-MAIL
                  </p>
                  <p
                    className="text-[#0A0F24] break-all"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "clamp(0.9375rem, 2.5vw, 1.125rem)",
                      fontWeight: "500",
                    }}
                  >
                    email Profissional@adv.oab.br
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#0A0F24] flex items-center justify-center flex-shrink-0">
                  <Linkedin className="w-5 h-5 md:w-6 md:h-6 text-[#C2A14D]" />
                </div>
                <div>
                  <p
                    className="text-[#0A0F24]/70 mb-1"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "clamp(0.8125rem, 2vw, 0.875rem)",
                      fontWeight: "600",
                      letterSpacing: "0.05em",
                    }}
                  >
                    LINKEDIN
                  </p>
                  <p
                    className="text-[#0A0F24]"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "clamp(1rem, 2.5vw, 1.125rem)",
                      fontWeight: "500",
                    }}
                  >
                    /in/marlon-luiz
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#0A0F24] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 md:w-6 md:h-6 text-[#C2A14D]" />
                </div>
                <div>
                  <p
                    className="text-[#0A0F24]/70 mb-1"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "clamp(0.8125rem, 2vw, 0.875rem)",
                      fontWeight: "600",
                      letterSpacing: "0.05em",
                    }}
                  >
                    LOCALIZAÇÃO
                  </p>
                  <p
                    className="text-[#0A0F24]"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "clamp(1rem, 2.5vw, 1.125rem)",
                      fontWeight: "500",
                    }}
                  >
                    Brasilia, DF
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Lado direito - QR Code */}
          <div className="flex flex-col items-center justify-center gap-5 md:gap-6">
            <div className="bg-white p-6 md:p-8 rounded-sm border-2 border-[#C2A14D] shadow-lg">
              <div className="w-40 h-40 md:w-48 md:h-48 bg-[#F2F2F2] flex items-center justify-center">
                <div className="text-center p-6">
                  <p
                    className="text-[#0A0F24] mb-2"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "clamp(0.8125rem, 2vw, 0.875rem)",
                    }}
                  >
                    <img src="/qrCodeImg.png" alt="QR Code" />
                  </p>
                  <p
                    className="text-[#0A0F24]/60"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "clamp(0.6875rem, 1.5vw, 0.75rem)",
                    }}
                  >
                    Meu Whatsapp
                  </p>
                </div>
              </div>
            </div>
            <p
              className="text-[#0A0F24]/70 text-center"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(0.8125rem, 2vw, 0.875rem)",
              }}
            >
              Escaneie para iniciar uma conversa
              <br />e tirar dúvidas jurídicas.
            </p>
          </div>
        </div>

        {/* Rodapé decorativo */}
        <div className="flex items-center justify-center pt-6 md:pt-8">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-12 md:w-16 h-0.5 bg-[#C2A14D]"></div>
            <p
              className="text-[#C2A14D] text-center whitespace-nowrap"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(0.9375rem, 2vw, 1rem)",
                fontWeight: "500",
                fontStyle: "italic",
              }}
            >
              Disponível para novos desafios
            </p>
            <div className="w-12 md:w-16 h-0.5 bg-[#C2A14D]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
