import { useEffect } from "react";

interface UseSwipeNavigationOptions {
  minDistance?: number; // distância mínima do swipe em px
}

export function useSwipeNavigation(
  onSwipeLeft: () => void,
  onSwipeRight: () => void,
  { minDistance = 50 }: UseSwipeNavigationOptions = {}
) {
  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;

    function handleTouchStart(e: TouchEvent) {
      touchStartX = e.changedTouches[0].screenX;
    }

    function handleTouchEnd(e: TouchEvent) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }

    function handleSwipe() {
      const distance = touchStartX - touchEndX;

      if (Math.abs(distance) < minDistance) return; // ignora toques curtos

      if (distance > 0) {
        // 👉 swipe pra esquerda = próxima página
        onSwipeLeft();
      } else {
        // 👈 swipe pra direita = página anterior
        onSwipeRight();
      }
    }

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [onSwipeLeft, onSwipeRight, minDistance]);
}
