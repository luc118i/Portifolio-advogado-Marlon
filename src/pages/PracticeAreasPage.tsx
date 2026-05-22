import { Gavel, Landmark, Scale, FileText, Cpu, ArrowRight } from "lucide-react";

const areas = [
  {
    icon: Gavel,
    trigger: "Está sendo investigado, preso ou processado?",
    name: "Direito Penal",
    desc: "Você tem direito a uma defesa qualificada. Atuo em defesa criminal, crimes comuns e de colarinho branco, com atuação desde a fase policial até o julgamento.",
    cta: "Quero minha defesa",
  },
  {
    icon: Landmark,
    trigger: "Sua empresa ou você enfrenta a máquina pública?",
    name: "Direito Administrativo",
    desc: "Processos administrativos, recursos, defesas em órgãos públicos, análise de licitações e compras públicas. Conheço o funcionamento por dentro — já atuei no Detran-DF e no Ministério da Justiça.",
    cta: "Preciso de orientação",
  },
  {
    icon: Scale,
    trigger: "Divórcio, herança, dívida ou contrato problemático?",
    name: "Direito Civil",
    desc: "Direito de Família, Sucessões, Obrigações e Responsabilidade Civil. Se envolve dinheiro, relacionamento ou patrimônio, existe um caminho jurídico — e eu encontro ele com você.",
    cta: "Quero resolver isso",
  },
  {
    icon: FileText,
    trigger: "Vai assinar algo importante ou já está em duvida?",
    name: "Consultoria Jurídica",
    desc: "Antes de assinar um contrato, fechar um negócio ou tomar uma decisão com risco legal, uma consulta preventiva vale muito mais do que remediar depois.",
    cta: "Agendar consulta",
  },
  {
    icon: Cpu,
    trigger: "Precisa de um advogado que entende de tecnologia?",
    name: "Tecnologia e IA Jurídica",
    desc: "Diferencial em inteligência artificial aplicada ao Direito: contratos digitais, proteção de dados, crimes cibernéticos e soluções jurídicas mais ágeis e modernas.",
    cta: "Saiba mais",
  },
];

const WA_URL =
  "https://wa.me/5561999138905?text=Olá%2C%20Dr.%20Marlon!%20Preciso%20de%20orientação%20jurídica.";

export function PracticeAreasPage() {
  const mobile = typeof window !== "undefined" && window.innerWidth < 640;

  return (
    <div
      className="min-h-screen w-full bg-[#F2F2F2] flex flex-col"
      style={{ paddingTop: mobile ? "52px" : "72px" }}
    >
      <div className="flex-1 w-full max-w-5xl mx-auto px-6 md:px-12 lg:px-0">

        {/* Cabeçalho orientado ao cliente */}
        <div className="text-center" style={{ marginBottom: mobile ? "32px" : "48px" }}>
          <p
            className="text-[#888888]"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.68rem",
              fontWeight: "600",
              letterSpacing: "0.2em",
              marginBottom: "12px",
            }}
          >
            COMO POSSO AJUDAR
          </p>
          <h2
            className="text-[#1C1C1C]"
            style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: mobile ? "1.8rem" : "clamp(2rem, 5vw, 2.75rem)",
              fontWeight: "700",
              letterSpacing: "-0.02em",
              lineHeight: "1.2",
              marginBottom: "14px",
            }}
          >
            Seu problema tem solução.
          </h2>
          <p
            className="text-[#888888]"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: mobile ? "0.9rem" : "1rem",
              lineHeight: "1.7",
              maxWidth: "480px",
              margin: "0 auto",
            }}
          >
            Identifique abaixo a sua situação e dê o primeiro passo.
            A primeira conversa é sem compromisso.
          </p>
        </div>

        {/* Grid de áreas */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: mobile ? "1fr" : "repeat(2, 1fr)",
            gap: mobile ? "12px" : "16px",
            marginBottom: mobile ? "32px" : "48px",
          }}
        >
          {areas.map((area, index) => {
            const Icon = area.icon;
            return (
              <a
                key={index}
                href={`${WA_URL}%20Área%3A%20${encodeURIComponent(area.name)}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "4px",
                  border: "1px solid rgba(136,136,136,0.18)",
                  padding: mobile ? "20px" : "24px 28px",
                  textDecoration: "none",
                  cursor: "pointer",
                  transition: "border-color 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "rgba(28,28,28,0.5)";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "rgba(136,136,136,0.18)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* Trigger — pergunta-gatilho */}
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.72rem",
                    fontWeight: "600",
                    color: "#888888",
                    letterSpacing: "0.04em",
                    lineHeight: "1.4",
                  }}
                >
                  {area.trigger}
                </p>

                {/* Ícone + Nome */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      backgroundColor: "#1C1C1C",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon style={{ width: "16px", height: "16px", color: "#888888" }} />
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Libre Baskerville', serif",
                      fontSize: "1rem",
                      fontWeight: "700",
                      color: "#1C1C1C",
                      margin: 0,
                    }}
                  >
                    {area.name}
                  </h3>
                </div>

                {/* Descrição orientada ao cliente */}
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.85rem",
                    color: "#555555",
                    lineHeight: "1.65",
                    margin: 0,
                  }}
                >
                  {area.desc}
                </p>

                {/* CTA inline */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    marginTop: "4px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.78rem",
                      fontWeight: "600",
                      color: "#1C1C1C",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {area.cta}
                  </span>
                  <ArrowRight style={{ width: "13px", height: "13px", color: "#1C1C1C" }} />
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* CTA rodapé — faixa escura */}
      <div
        style={{
          backgroundColor: "#1C1C1C",
          padding: mobile ? "24px 24px" : "28px 48px",
          display: "flex",
          flexDirection: mobile ? "column" : "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: mobile ? "0.875rem" : "0.95rem",
            color: "rgba(255,255,255,0.75)",
            lineHeight: "1.5",
            margin: 0,
            textAlign: mobile ? "center" : "left",
          }}
        >
          Não encontrou sua situação?{" "}
          <span style={{ color: "#FFFFFF", fontWeight: "500" }}>
            Me conta o que está acontecendo.
          </span>
        </p>
        <a
          href={WA_URL}
          target="_blank"
          rel="noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "#25D366",
            color: "#FFFFFF",
            borderRadius: "100px",
            padding: "12px 22px",
            textDecoration: "none",
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.875rem",
            fontWeight: "700",
            whiteSpace: "nowrap",
            flexShrink: 0,
            cursor: "pointer",
            transition: "opacity 0.15s ease",
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Falar com o Dr. Marlon
        </a>
      </div>
    </div>
  );
}
