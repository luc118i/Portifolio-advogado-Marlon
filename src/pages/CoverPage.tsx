import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function CoverPage() {
  return (
    <div className="h-screen w-full bg-[#0A0F24] flex items-center justify-center px-6 md:px-12 lg:px-16 relative overflow-hidden">
      {/* Elemento decorativo dourado - responsivo */}
      <div className="absolute top-6 left-6 md:top-12 md:left-12 lg:top-16 lg:left-16 w-16 md:w-20 lg:w-24 h-0.5 bg-[#C2A14D]"></div>
      <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 lg:bottom-16 lg:right-16 w-20 md:w-24 lg:w-32 h-0.5 bg-[#C2A14D]"></div>

      <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 lg:gap-16">
        {/* Lado esquerdo - Informações */}
        <div className="flex-1 w-full text-center lg:text-left">
          <div className="space-y-6 md:space-y-8">
            <div>
              <h1
                className="text-white mb-3 md:mb-4"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
                  lineHeight: "1.1",
                  fontWeight: "600",
                  letterSpacing: "-0.02em",
                }}
              >
                Dr. Marlon inacio
              </h1>

              <div
                className="text-[#C2A14D] mb-6 md:mb-8"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(1rem, 3vw, 1.25rem)",
                  letterSpacing: "0.05em",
                  fontWeight: "400",
                }}
              >
                OAB/DF 123.456
              </div>
            </div>

            <div className="w-16 md:w-20 h-px bg-[#C2A14D] my-6 md:my-8 mx-auto lg:mx-0"></div>

            <p
              className="text-[#F2F2F2] max-w-xl mx-auto lg:mx-0"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(1rem, 2.5vw, 1.1rem)",
                lineHeight: "1.6",
                fontWeight: "300",
                fontStyle: "italic",
              }}
            >
              "Compromisso com ética, clareza e resultados."
            </p>
          </div>
        </div>

        {/* Lado direito - Foto */}
        <div className="flex-shrink-0 w-full lg:w-auto flex justify-center">
          <div className="relative w-full max-w-sm md:max-w-md lg:max-w-none">
            {/* Moldura dourada */}
            <div className="absolute -inset-2 md:-inset-3 border-2 border-[#C2A14D] rounded-sm"></div>

            {/* Foto */}
            <div className="relative w-full aspect-[3/4] lg:w-96 lg:h-[500px] overflow-hidden rounded-sm">
              <ImageWithFallback
                src="https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcQCGXUeymylpExgQGeXsLBr3NU3UtWwQnXtGoOP1sKGfelAVcMlMu6uSXFKPldjq-_TiqMsU2B7-76_qo-hIkT86NViAv9JXl6-bZ5tfGelEgZhdAs"
                alt="Foto profissional do advogado"
                className="w-full h-full object-cover grayscale-[30%] opacity-95"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
