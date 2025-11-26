import { useState, useEffect } from "react";

// Páginas
import { CoverPage } from "./pages/CoverPage";
import { PresentationLetterPage } from "./pages/PresentationLetterPage";
import { PracticeAreasPage } from "./pages/PracticeAreasPage";
import { EducationPage } from "./pages/EducationPage";
import { ExperiencePage } from "./pages/ExperiencePage";
import { SkillsPage } from "./pages/SkillsPage";
import { DifferentialsPage } from "./pages/DifferentialsPage";
import { ContactPage } from "./pages/ContactPage";

import { useSwipeNavigation } from "./hooks/useSwipeNavigation";

// Componentes UI
import { PortfolioNavigation } from "./components/PortfolioNavigation";
import { MobileMenu } from "./components/MobileMenu";
import { Footer } from "./components/Footer";

const pages = [
  CoverPage,
  PresentationLetterPage,
  PracticeAreasPage,
  EducationPage,
  ExperiencePage,
  SkillsPage,
  DifferentialsPage,
  ContactPage,
];

export default function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < pages.length && newPage !== currentPage) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPage(newPage);
        setIsTransitioning(false);
      }, 300);
    }
  };

  // Navegação por teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        handlePageChange(currentPage + 1);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        handlePageChange(currentPage - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage]);

  const CurrentPageComponent = pages[currentPage];

  useSwipeNavigation(
    () => handlePageChange(currentPage + 1),
    () => handlePageChange(currentPage - 1),
    { minDistance: 50 } // pode ajustar se quiser mais sensível
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Conteúdo principal */}
      <div className="relative w-full flex-1 overflow-hidden">
        {/* Página atual com transição */}
        <div
          className={`transition-opacity duration-300 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          <CurrentPageComponent />
        </div>

        {/* Navegação Desktop - oculta no mobile */}
        <div className="hidden lg:block">
          <PortfolioNavigation
            currentPage={currentPage}
            totalPages={pages.length}
            onPageChange={handlePageChange}
          />
        </div>

        {/* Menu Mobile - visível apenas no mobile e tablet */}
        <MobileMenu
          currentPage={currentPage}
          totalPages={pages.length}
          onPageChange={handlePageChange}
        />

        {/* Indicador de página no canto superior esquerdo - responsivo */}
        <div className="fixed top-4 left-4 md:top-6 md:left-6 lg:top-8 lg:left-8 z-50">
          <div
            className="text-[#C2A14D]"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(0.75rem, 2vw, 0.875rem)",
              fontWeight: 600,
              letterSpacing: "0.1em",
            }}
          >
            {String(currentPage + 1).padStart(2, "0")} /{" "}
            {String(pages.length).padStart(2, "0")}
          </div>
        </div>
      </div>

      {/* Rodapé com sua identificação */}
      <Footer />
    </div>
  );
}
