export function Footer() {
  return (
    <footer className="w-full py-1 border-t border-zinc-800 text-[0.50rem] md:text-[0.55rem] text-zinc-600 flex items-center justify-between px-4 md:px-8">
      <span>
        Desenvolvido por{" "}
        <a
          href="https://github.com/luc118i"
          target="_blank"
          rel="noreferrer"
          className="text-[#C2A14D] hover:underline"
        >
          Lucas Inácio
        </a>
      </span>

      <span>© {new Date().getFullYear()} — Todos os direitos reservados</span>
    </footer>
  );
}
