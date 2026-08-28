import { DEV } from "../lib/site";

/**
 * Apresentação impressa no console do navegador (F12 → Console).
 * Cores da marca: verde-tinta + latão.
 */
export function showConsoleSignature() {
  const banner = [
    "%c  MI  %c  Marlon Inácio · Advocacia  ",
    "background:#1E4D3B;color:#F6F5F1;font-weight:700;padding:6px 8px;border-radius:3px 0 0 3px;font-family:Georgia,serif;",
    "background:#14352a;color:#B9975A;padding:6px 10px;border-radius:0 3px 3px 0;letter-spacing:0.04em;",
  ];

  const line = (label: string, value: string) => [
    `%c${label}%c${value}`,
    "color:#8c6d34;font-weight:600;",
    "color:#33352f;",
  ];

  try {
    console.log(...banner);
    console.log(
      "%cSite desenvolvido por %c" + DEV.name,
      "color:#6a6c63;",
      "color:#1E4D3B;font-weight:700;"
    );
    console.log(...line("GitHub   ", DEV.github));
    console.log(
      "%c— Front-end (React + Vite), identidade visual e integração com o CMS.",
      "color:#8f9186;font-style:italic;"
    );
  } catch {
    /* console indisponível — ignora */
  }
}
