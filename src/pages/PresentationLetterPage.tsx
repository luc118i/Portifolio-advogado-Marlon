export function PresentationLetterPage() {
  return (
    <div className="h-screen w-full bg-white flex items-center justify-center px-6 md:px-12 lg:px-20">
      <div className="max-w-4xl w-full space-y-8 md:space-y-10 lg:space-y-12">
        {/* Detalhe decorativo dourado */}
        <div className="w-20 md:w-24 lg:w-32 h-0.5 bg-[#888888]"></div>
        
        {/* Título */}
        <h2 
          className="text-[#1C1C1C]"
          style={{
            fontFamily: "'Libre Baskerville', serif",
            fontSize: 'clamp(2rem, 6vw, 3rem)',
            fontWeight: '600',
            letterSpacing: '-0.01em'
          }}
        >
          Carta de Apresentação
        </h2>
        
        {/* Conteúdo da carta */}
        <div className="space-y-6 md:space-y-8">
          <p 
            className="text-[#1C1C1C]"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
              lineHeight: '1.8',
              fontWeight: '400'
            }}
          >
            Sou advogado recém-inscrito na OAB, comprometido com a prática jurídica 
            <span className="text-[#888888]"> ética</span>, 
            <span className="text-[#888888]"> responsável </span>
            e orientada a 
            <span className="text-[#888888]"> resultados</span>.
          </p>
          
          <p 
            className="text-[#1C1C1C]"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
              lineHeight: '1.8',
              fontWeight: '400'
            }}
          >
            Tenho como princípios a transparência, a seriedade e o respeito às necessidades 
            de cada cliente. Acredito que o exercício da advocacia exige não apenas domínio 
            técnico, mas também sensibilidade para compreender as particularidades de cada caso 
            e oferecer soluções jurídicas eficazes e personalizadas.
          </p>
          
          <p 
            className="text-[#1C1C1C]"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
              lineHeight: '1.8',
              fontWeight: '400'
            }}
          >
            Busco oportunidades para contribuir com escritórios e equipes jurídicas, 
            oferecendo profissionalismo, organização, capacidade analítica e disposição 
            constante para evoluir. Estou preparado para aplicar meu conhecimento acadêmico 
            e minha experiência prática em prol de um trabalho de excelência.
          </p>
          
          <div className="pt-6 md:pt-8">
            <p 
              className="text-[#888888] italic"
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: 'clamp(1.125rem, 3vw, 1.25rem)',
                fontWeight: '500'
              }}
            >
              À disposição para novos desafios.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}