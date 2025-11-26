import {
  Scale,
  ShoppingCart,
  Briefcase,
  Gavel,
  FileText,
  Landmark,
} from "lucide-react";

const areas = [
  { icon: Scale, name: "Direito Civil" },
  { icon: ShoppingCart, name: "Direito do Consumidor" },
  { icon: Briefcase, name: "Direito do Trabalho" },
  { icon: Gavel, name: "Direito Penal" },
  { icon: FileText, name: "Consultivo Jurídico" },
  { icon: Landmark, name: "Direito Administrativo" },
];

export function PracticeAreasPage() {
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
            Áreas de Interesse
          </h2>
          <div className="w-20 md:w-24 h-0.5 bg-[#C2A14D] mx-auto mt-4 md:mt-6"></div>
        </div>

        {/* Grid de áreas - 1 coluna no mobile, 2 no tablet e desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {areas.map((area, index) => {
            const Icon = area.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 md:p-8 rounded-sm border border-[#C2A14D]/20 hover:border-[#C2A14D]/50 transition-all hover:shadow-lg group"
              >
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#0A0F24] flex items-center justify-center group-hover:bg-[#C2A14D] transition-colors">
                    <Icon className="w-7 h-7 md:w-8 md:h-8 text-[#C2A14D] group-hover:text-[#0A0F24]" />
                  </div>
                  <h3
                    className="text-[#0A0F24]"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "clamp(1.125rem, 2.5vw, 1.25rem)",
                      fontWeight: "500",
                    }}
                  >
                    {area.name}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
