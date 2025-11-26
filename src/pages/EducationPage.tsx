import { GraduationCap } from "lucide-react";

export function EducationPage() {
  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center px-6 md:px-12 lg:px-20 py-12 md:py-20">
      <div className="max-w-4xl w-full space-y-10 md:space-y-12">
        {/* Título */}
        <div className="flex items-center gap-4 md:gap-6">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#C2A14D] flex items-center justify-center flex-shrink-0">
            <GraduationCap className="w-6 h-6 md:w-8 md:h-8 text-[#0A0F24]" />
          </div>
          <h2 
            className="text-[#0A0F24]"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 6vw, 3rem)',
              fontWeight: '600',
              letterSpacing: '-0.01em'
            }}
          >
            Formação Acadêmica
          </h2>
        </div>
        
        {/* Caixa de formação */}
        <div className="border-2 border-[#C2A14D] rounded-sm p-6 md:p-10 lg:p-12 bg-[#F2F2F2]/30">
          <div className="space-y-6 md:space-y-8">
            {/* Graduação */}
            <div>
              <h3 
                className="text-[#0A0F24] mb-3 md:mb-4"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(1.5rem, 4vw, 1.75rem)',
                  fontWeight: '600'
                }}
              >
                Bacharel em Direito
              </h3>
              <p 
                className="text-[#0A0F24] mb-2"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                  fontWeight: '500'
                }}
              >
                Universidade de São Paulo – USP
              </p>
              <p 
                className="text-[#C2A14D]"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 'clamp(0.9375rem, 2vw, 1rem)',
                  fontWeight: '400'
                }}
              >
                Conclusão: 2024
              </p>
            </div>
            
            <div className="w-full h-px bg-[#C2A14D]/30"></div>
            
            {/* Atividades relevantes */}
            <div>
              <h4 
                className="text-[#0A0F24] mb-4"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 'clamp(1.125rem, 2.5vw, 1.25rem)',
                  fontWeight: '600'
                }}
              >
                Atividades Acadêmicas Relevantes
              </h4>
              <ul className="space-y-3">
                <li 
                  className="flex items-start gap-3 text-[#0A0F24]"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 'clamp(0.9375rem, 2vw, 1rem)',
                    lineHeight: '1.6'
                  }}
                >
                  <span className="text-[#C2A14D] mt-1">•</span>
                  <span>Membro do Núcleo de Prática Jurídica (NPJ) – atendimento à comunidade</span>
                </li>
                <li 
                  className="flex items-start gap-3 text-[#0A0F24]"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 'clamp(0.9375rem, 2vw, 1rem)',
                    lineHeight: '1.6'
                  }}
                >
                  <span className="text-[#C2A14D] mt-1">•</span>
                  <span>Participação em grupos de estudo em Direito Civil e Processo Civil</span>
                </li>
                <li 
                  className="flex items-start gap-3 text-[#0A0F24]"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 'clamp(0.9375rem, 2vw, 1rem)',
                    lineHeight: '1.6'
                  }}
                >
                  <span className="text-[#C2A14D] mt-1">•</span>
                  <span>Apresentação de artigos em eventos científicos e congressos jurídicos</span>
                </li>
                <li 
                  className="flex items-start gap-3 text-[#0A0F24]"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 'clamp(0.9375rem, 2vw, 1rem)',
                    lineHeight: '1.6'
                  }}
                >
                  <span className="text-[#C2A14D] mt-1">•</span>
                  <span>Monitor de Direito Constitucional durante 2 semestres</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}