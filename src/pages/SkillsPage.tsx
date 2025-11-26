import { FileEdit, Search, Users, Headphones, Laptop, Package } from "lucide-react";

const skills = [
  { icon: FileEdit, name: "Redação Jurídica" },
  { icon: Search, name: "Pesquisa e análise jurídica" },
  { icon: Users, name: "Atendimento jurídico supervisionado" },
  { icon: Headphones, name: "Audiências acompanhadas" },
  { icon: Laptop, name: "ProJudi, PJe, E-SAJ, JusBrasil" },
  { icon: Package, name: "Pacote Office" },
];

export function SkillsPage() {
  return (
    <div className="min-h-screen w-full bg-[#0A0F24] flex items-center justify-center px-6 md:px-12 lg:px-20 py-12 md:py-20">
      <div className="max-w-5xl w-full space-y-12 md:space-y-16">
        {/* Título */}
        <div className="text-center">
          <h2 
            className="text-white"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 6vw, 3rem)',
              fontWeight: '600',
              letterSpacing: '-0.01em'
            }}
          >
            Competências Técnicas
          </h2>
          <div className="w-20 md:w-24 h-0.5 bg-[#C2A14D] mx-auto mt-4 md:mt-6"></div>
        </div>
        
        {/* Grid de competências - 1 coluna no mobile, 2 no tablet, 3 no desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-sm p-6 md:p-8 rounded-sm border border-[#C2A14D]/30 hover:border-[#C2A14D] transition-all hover:bg-white/10 group"
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#C2A14D]/20 flex items-center justify-center group-hover:bg-[#C2A14D] transition-colors">
                    <Icon className="w-7 h-7 md:w-8 md:h-8 text-[#C2A14D] group-hover:text-[#0A0F24]" />
                  </div>
                  <h3 
                    className="text-white"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 'clamp(0.9375rem, 2vw, 1rem)',
                      fontWeight: '500',
                      lineHeight: '1.4'
                    }}
                  >
                    {skill.name}
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