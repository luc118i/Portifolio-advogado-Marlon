import { Shield, MessageCircle, FolderKanban, Zap, Clock, Eye } from "lucide-react";

const differentials = [
  { icon: Shield, name: "Ética" },
  { icon: MessageCircle, name: "Comunicação" },
  { icon: FolderKanban, name: "Organização" },
  { icon: Zap, name: "Proatividade" },
  { icon: Clock, name: "Pontualidade" },
  { icon: Eye, name: "Atenção a detalhes" },
];

export function DifferentialsPage() {
  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center px-6 md:px-12 lg:px-20 py-12 md:py-20">
      <div className="max-w-6xl w-full space-y-12 md:space-y-16">
        {/* Título */}
        <div className="text-center">
          <h2 
            className="text-[#0A0F24]"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 6vw, 3rem)',
              fontWeight: '600',
              letterSpacing: '-0.01em'
            }}
          >
            Diferenciais Profissionais
          </h2>
          <div className="w-20 md:w-24 h-0.5 bg-[#C2A14D] mx-auto mt-4 md:mt-6"></div>
        </div>
        
        {/* Grid de diferenciais - 1 coluna no mobile, 2 no tablet, 3 no desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {differentials.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className="bg-[#F2F2F2] p-8 md:p-10 rounded-sm border-l-4 border-[#C2A14D] hover:shadow-xl transition-all hover:-translate-y-1 group"
              >
                <div className="flex flex-col items-center text-center gap-4 md:gap-5">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-sm bg-white flex items-center justify-center shadow-md group-hover:bg-[#0A0F24] transition-colors">
                    <Icon className="w-8 h-8 md:w-10 md:h-10 text-[#C2A14D] group-hover:text-white" />
                  </div>
                  <h3 
                    className="text-[#0A0F24]"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                      fontWeight: '600'
                    }}
                  >
                    {item.name}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Mensagem adicional */}
        <div className="text-center pt-6 md:pt-8">
          <p 
            className="text-[#0A0F24]/70 max-w-2xl mx-auto"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(0.9375rem, 2vw, 1rem)',
              lineHeight: '1.6',
              fontStyle: 'italic'
            }}
          >
            Esses valores norteiam minha atuação profissional e refletem meu compromisso 
            com a excelência no exercício da advocacia.
          </p>
        </div>
      </div>
    </div>
  );
}