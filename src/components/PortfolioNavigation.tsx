import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface PortfolioNavigationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PortfolioNavigation({ currentPage, totalPages, onPageChange }: PortfolioNavigationProps) {
  return (
    <div className="fixed bottom-8 right-8 flex items-center gap-3 z-50">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className="rounded-full bg-white shadow-lg border-[#C2A14D]/30 hover:bg-[#F2F2F2] disabled:opacity-30"
      >
        <ChevronLeft className="w-5 h-5 text-[#0A0F24]" />
      </Button>
      
      <div className="flex gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === currentPage
                ? 'bg-[#C2A14D] w-8'
                : 'bg-[#0A0F24]/20 hover:bg-[#0A0F24]/40'
            }`}
            aria-label={`Ir para página ${i + 1}`}
          />
        ))}
      </div>
      
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        className="rounded-full bg-white shadow-lg border-[#C2A14D]/30 hover:bg-[#F2F2F2] disabled:opacity-30"
      >
        <ChevronRight className="w-5 h-5 text-[#0A0F24]" />
      </Button>
    </div>
  );
}
