import { useEffect, useRef, useState } from "react";

/**
 * Revela um elemento quando ele entra na viewport (uma única vez).
 * Sóbrio de propósito — fade + subida curta. Respeita prefers-reduced-motion via CSS.
 * Tem rede de segurança: nada permanece invisível se o observer não disparar.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    // Já visível (ou acima) no carregamento? revela sem esperar.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      setVisible(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -60px 0px" }
    );
    obs.observe(el);

    // Rede de segurança
    const t = window.setTimeout(() => setVisible(true), 1600);

    return () => {
      obs.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  return { ref, className: `reveal${visible ? " is-visible" : ""}` };
}
