import { Gavel, Landmark, Scale, FileText, Cpu } from "lucide-react";

const areas = [
  {
    icon: Gavel,
    name: "Direito Penal",
    desc: "Defesa criminal, consultoria e monitoria em matéria penal.",
  },
  {
    icon: Landmark,
    name: "Direito Administrativo",
    desc: "Análise de licitação e compras públicas. Defesa em processo administrativo.",
  },
  {
    icon: Scale,
    name: "Direito Civil",
    desc: "Direito de Família · Direito das Sucessões · Direito das Obrigações · Responsabilidade Civil.",
  },
  {
    icon: FileText,
    name: "Consultoria Jurídica",
    desc: "Orientação jurídica personalizada para pessoas físicas e empresas.",
  },
  {
    icon: Cpu,
    name: "Tecnologia e IA Jurídica",
    desc: "Diferencial em inteligência artificial aplicada ao Direito.",
  },
];

export function PracticeAreasPage() {
  return (
    <div className="min-h-screen w-full bg-[#F2F2F2] flex items-center justify-center px-6 md:px-12 lg:px-20 py-12 md:py-20">
      <div className="max-w-5xl w-full space-y-12 md:space-y-16">
        {/* Título */}
        <div className="text-center">
          <h2
            className="text-[#1C1C1C]"
            style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: "clamp(2rem, 6vw, 3rem)",
              fontWeight: "700",
              letterSpacing: "-0.01em",
            }}
          >
            Áreas de Atuação
          </h2>
          <div className="w-20 md:w-24 h-0.5 bg-[#888888] mx-auto mt-4 md:mt-6"></div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {areas.map((area, index) => {
            const Icon = area.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 md:p-8 rounded-sm border border-[#888888]/20 hover:border-[#888888]/50 transition-all hover:shadow-lg group"
                style={{ cursor: "pointer" }}
              >
                <div className="flex items-start gap-4 md:gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#1C1C1C] flex items-center justify-center group-hover:bg-[#888888] transition-colors">
                    <Icon className="w-6 h-6 text-[#888888] group-hover:text-[#1C1C1C]" />
                  </div>
                  <div>
                    <h3
                      className="text-[#1C1C1C]"
                      style={{
                        fontFamily: "'Libre Baskerville', serif",
                        fontSize: "clamp(1rem, 2.5vw, 1.125rem)",
                        fontWeight: "700",
                        marginBottom: "6px",
                      }}
                    >
                      {area.name}
                    </h3>
                    <p
                      className="text-[#888888]"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "clamp(0.8125rem, 2vw, 0.875rem)",
                        lineHeight: "1.6",
                      }}
                    >
                      {area.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
