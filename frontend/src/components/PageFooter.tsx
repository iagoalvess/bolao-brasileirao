const PageFooter = () => {
  return (
    <footer className="mt-12 pt-6 border-t border-white/10 text-white/70 text-sm flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="flex items-center gap-2">
        <img
          src="/BrasileiraoLogo.png"
          alt="Brasileirão Serie A"
          className="w-8 h-8 rounded-full border border-white/10 shadow"
        />
        <span className="text-white/60">Bolão do Futebol</span>
      </div>

      <div className="text-center">
        <p className="text-xs sm:text-sm">
          © {new Date().getFullYear()} Bolão do Futebol. Todos os direitos
          reservados.
        </p>
        <p className="text-xs sm:text-sm text-white/40">
          Desenvolvido com ⚽ e paixão pelo futebol.
        </p>
      </div>

      <div className="flex gap-3">
        <a
          href="/privacidade"
          className="hover:text-white transition-colors text-xs"
        >
          Política de Privacidade
        </a>
        <a
          href="/termos"
          className="hover:text-white transition-colors text-xs"
        >
          Termos de Uso
        </a>
      </div>
    </footer>
  );
};

export default PageFooter;
