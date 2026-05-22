export function CoverPage() {
  return (
    <div
      className="h-screen w-full bg-[#1C1C1C] flex flex-col relative overflow-hidden"
      style={{ minHeight: "-webkit-fill-available" }}
    >
      {/* Linhas decorativas — escondidas no mobile */}
      <div className="hidden md:block absolute top-12 left-12 lg:top-16 lg:left-16 w-20 lg:w-24 h-0.5 bg-[#888888]"></div>
      <div className="hidden md:block absolute bottom-12 right-12 lg:bottom-16 lg:right-16 w-24 lg:w-32 h-0.5 bg-[#888888]"></div>

      {/* Conteúdo central — ocupa o espaço disponível */}
      <div className="flex-1 flex items-center justify-center px-6 md:px-12 lg:px-16">
        <div className="max-w-3xl w-full flex flex-col items-center text-center gap-8 md:gap-10">
        <div>
          <h1
            className="text-white mb-3 md:mb-4"
            style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
              lineHeight: "1.1",
              fontWeight: "700",
              letterSpacing: "-0.02em",
            }}
          >
            Adv. Marlon Silva
          </h1>
          <div
            className="text-[#888888]"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)",
              letterSpacing: "0.08em",
              fontWeight: "400",
            }}
          >
            OAB/DF 87.696 · Advogado
          </div>
        </div>

        <div className="w-16 md:w-20 h-px bg-[#888888]"></div>

        <p
          className="text-[#F2F2F2]"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(1rem, 2.5vw, 1.1rem)",
            lineHeight: "1.8",
            fontWeight: "300",
            maxWidth: "600px",
          }}
        >
          Advogado com experiência em processos administrativos e licitações,
          atuando em instituições governamentais. Forte conhecimento nas áreas
          penal e civil, com diferencial em tecnologias aplicadas ao Direito.
        </p>
        </div>
      </div>

      {/* Hint de swipe — fluxo natural no rodapé, só mobile */}
      <div
        className="lg:hidden flex flex-col items-center gap-2 pb-8"
        style={{ pointerEvents: "none" }}
      >
        {/* Chevrons em cascata */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "6px" }}>
          {[0, 1, 2].map(i => (
            <span
              key={i}
              className="swipe-chevron"
              style={{
                fontSize: "1.4rem",
                lineHeight: 1,
                color: "#888888",
                opacity: 0,
                animationDelay: `${i * 0.18}s`,
              }}
            >
              ›
            </span>
          ))}
        </div>

        {/* Dots indicadores */}
        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          {[0,1,2,3,4,5].map(i => (
            <div
              key={i}
              style={{
                width:  i === 0 ? "18px" : "5px",
                height: "5px",
                borderRadius: "100px",
                backgroundColor: i === 0 ? "#888888" : "rgba(136,136,136,0.28)",
              }}
            />
          ))}
        </div>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.62rem",
            color: "rgba(136,136,136,0.45)",
            letterSpacing: "0.14em",
            fontWeight: "500",
            marginTop: "2px",
          }}
        >
          DESLIZE PARA NAVEGAR
        </p>
      </div>
    </div>
  );
}
