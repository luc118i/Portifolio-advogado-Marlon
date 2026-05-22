import { useState, useEffect } from "react";

import { CoverPage } from "./pages/CoverPage";
import { CredentialsPage } from "./pages/CredentialsPage";
import { PracticeAreasPage } from "./pages/PracticeAreasPage";
import { ConsultationPage } from "./pages/ConsultationPage";
import { ContactPage } from "./pages/ContactPage";

import { useSwipeNavigation } from "./hooks/useSwipeNavigation";

import { PortfolioNavigation } from "./components/PortfolioNavigation";
import { MobileMenu } from "./components/MobileMenu";
import { Footer } from "./components/Footer";
import { WhatsAppCTA } from "./components/WhatsAppCTA";

const pages = [
  CoverPage,
  PracticeAreasPage,
  CredentialsPage,
  ConsultationPage,
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
    { minDistance: 50 }
  );

  return (
    <div className="min-h-screen flex flex-col" style={{ minHeight: "-webkit-fill-available" }}>
      <div className="relative w-full flex-1" style={{ overflow: "hidden" }}>
        <div
          className={`transition-opacity duration-300 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          <CurrentPageComponent />
        </div>

        <div className="hidden lg:block">
          <PortfolioNavigation
            currentPage={currentPage}
            totalPages={pages.length}
            onPageChange={handlePageChange}
          />
        </div>

        <MobileMenu
          currentPage={currentPage}
          totalPages={pages.length}
          onPageChange={handlePageChange}
        />

        <WhatsAppCTA />

        <div className="fixed top-4 left-4 md:top-6 md:left-6 lg:top-8 lg:left-8 z-50">
          <div
            className="text-[#888888]"
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

      <Footer />
    </div>
  );
}
