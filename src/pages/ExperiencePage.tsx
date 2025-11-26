const experiences = [
  {
    period: "2023 - 2024",
    title: "Estagiário Jurídico",
    company: "Escritório Silva & Advogados Associados",
    activities: [
      "Elaboração de petições iniciais, contestações e recursos",
      "Acompanhamento de audiências e diligências processuais",
      "Pesquisa jurisprudencial e doutrinária para fundamentação de teses",
      "Atendimento a clientes sob supervisão"
    ]
  },
  {
    period: "2022 - 2023",
    title: "Núcleo de Prática Jurídica (NPJ)",
    company: "Universidade de São Paulo",
    activities: [
      "Atendimento jurídico gratuito à comunidade carente",
      "Redação de mais de 30 peças processuais (petições, recursos, pareceres)",
      "Participação em audiências de conciliação",
      "Orientação jurídica em demandas de família, consumidor e cível"
    ]
  },
  {
    period: "2021 - 2022",
    title: "Pesquisador Voluntário",
    company: "Centro de Estudos Jurídicos da USP",
    activities: [
      "Pesquisa acadêmica sobre Direito Civil Contemporâneo",
      "Participação em seminários e grupos de discussão",
      "Colaboração em publicações científicas"
    ]
  }
];

export function ExperiencePage() {
  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center px-6 md:px-12 lg:px-20 py-12 md:py-16 overflow-y-auto">
      <div className="max-w-4xl w-full space-y-10 md:space-y-12">
        {/* Título */}
        <div>
          <h2 
            className="text-[#0A0F24]"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 6vw, 3rem)',
              fontWeight: '600',
              letterSpacing: '-0.01em'
            }}
          >
            Experiência Jurídica
          </h2>
          <div className="w-24 md:w-32 h-0.5 bg-[#C2A14D] mt-4 md:mt-6"></div>
        </div>
        
        {/* Timeline */}
        <div className="relative">
          {/* Linha vertical - oculta no mobile para economizar espaço */}
          <div className="hidden md:block absolute left-6 lg:left-8 top-0 bottom-0 w-0.5 bg-[#C2A14D]/30"></div>
          
          {/* Experiências */}
          <div className="space-y-10 md:space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="relative md:pl-16 lg:pl-20">
                {/* Ponto dourado na timeline - ajustado para mobile */}
                <div className="hidden md:block absolute left-3.5 lg:left-5 top-0 w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-[#C2A14D] border-4 border-white shadow-md"></div>
                
                <div className="space-y-4">
                  <div>
                    <p 
                      className="text-[#C2A14D] mb-2"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 'clamp(0.875rem, 2vw, 0.95rem)',
                        fontWeight: '600',
                        letterSpacing: '0.05em'
                      }}
                    >
                      {exp.period}
                    </p>
                    <h3 
                      className="text-[#0A0F24] mb-1"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                        fontWeight: '600'
                      }}
                    >
                      {exp.title}
                    </h3>
                    <p 
                      className="text-[#0A0F24]/70"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 'clamp(0.9375rem, 2vw, 1rem)',
                        fontWeight: '500'
                      }}
                    >
                      {exp.company}
                    </p>
                  </div>
                  
                  <ul className="space-y-2">
                    {exp.activities.map((activity, actIndex) => (
                      <li 
                        key={actIndex}
                        className="flex items-start gap-2 md:gap-3 text-[#0A0F24]"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: 'clamp(0.875rem, 2vw, 0.95rem)',
                          lineHeight: '1.6'
                        }}
                      >
                        <span className="text-[#C2A14D] mt-1.5 text-xs">▸</span>
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}