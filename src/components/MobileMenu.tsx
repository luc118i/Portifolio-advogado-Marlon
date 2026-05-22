import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

interface MobileMenuProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const pageNames = [
  "Início",
  "Áreas de Atuação",
  "Credenciais",
  "Solicitar Consulta",
  "Contato",
];

export function MobileMenu({ currentPage, totalPages, onPageChange }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handlePageChange = (page: number) => {
    onPageChange(page);
    setIsOpen(false);
  };

  return (
    <>
      {/* Botão hambúrguer */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-[100] lg:hidden rounded-full bg-white shadow-lg border-[#888888]/30 hover:bg-[#F2F2F2]"
        style={{ cursor: "pointer" }}
      >
        {isOpen ? (
          <X className="w-5 h-5 text-[#1C1C1C]" />
        ) : (
          <Menu className="w-5 h-5 text-[#1C1C1C]" />
        )}
      </Button>

      {/* Menu overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-[#1C1C1C]/80 backdrop-blur-sm z-[90] lg:hidden"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu panel */}
          <div className="fixed top-0 right-0 bottom-0 w-80 bg-white z-[95] lg:hidden shadow-2xl">
            <div className="flex flex-col h-full pt-24 px-8 pb-8">
              {/* Header */}
              <div className="mb-8">
                <div 
                  className="text-[#1C1C1C] mb-2"
                  style={{
                    fontFamily: "'Libre Baskerville', serif",
                    fontSize: '1.5rem',
                    fontWeight: '600'
                  }}
                >
                  Navegação
                </div>
                <div className="w-16 h-0.5 bg-[#888888]"></div>
              </div>

              {/* Menu items */}
              <nav className="flex-1 overflow-y-auto">
                <ul className="space-y-3">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <li key={i}>
                      <button
                        onClick={() => handlePageChange(i)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                          i === currentPage
                            ? 'bg-[#1C1C1C] text-white'
                            : 'text-[#1C1C1C] hover:bg-[#F2F2F2]'
                        }`}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="flex items-center gap-3">
                          <span 
                            className={`${
                              i === currentPage ? 'text-[#888888]' : 'text-[#1C1C1C]/40'
                            }`}
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: '0.875rem',
                              fontWeight: '600',
                              letterSpacing: '0.1em'
                            }}
                          >
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: '1rem',
                              fontWeight: i === currentPage ? '500' : '400'
                            }}
                          >
                            {pageNames[i]}
                          </span>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Footer */}
              <div className="mt-6 pt-6 border-t border-[#1C1C1C]/10">
                <p 
                  className="text-[#1C1C1C]/60 text-center"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.75rem'
                  }}
                >
                  Use as setas do teclado para navegar
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
