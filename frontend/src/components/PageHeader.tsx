import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, ArrowLeft, User } from "lucide-react";

interface PageHeaderProps {
  showBackButton?: boolean;
  backButtonLabel?: string;
  onBackClick?: () => void;
}

const PageHeader = ({
  showBackButton = false,
  backButtonLabel = "Voltar",
  onBackClick,
}: PageHeaderProps) => {
  const { user, signOut } = useAuth();

  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-white/20 pb-4">
      <div className="flex items-center gap-4">
        {showBackButton && (
          <Button
            onClick={onBackClick}
            variant="outline"
            className="border-soccer-yellow text-soccer-yellow hover:bg-soccer-yellow/10 flex items-center gap-2 order-1"
          >
            <ArrowLeft size={18} />
            {backButtonLabel}
          </Button>
        )}

        <div className="flex items-center gap-3 order-2">
          <img
            src="/BrasileiraoLogo.png"
            alt="Brasileirão Serie A"
            className="w-12 h-12 rounded-full object-cover shadow-lg"
          />
          <div>
            <h1 className="text-2xl sm:text-4xl font-bold text-white drop-shadow-lg">
              Bolão do Futebol
            </h1>
            <p className="text-sm sm:text-base text-white/80 mt-1">
              Seu espaço para palpites no Brasileirão
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 order-3 ml-auto sm:ml-0">
        <div className="flex items-center gap-3 bg-white/5 rounded-lg px-4 py-2 border border-white/10">
          <div className="bg-soccer-yellow/20 p-2 rounded-full">
            <User size={20} className="text-soccer-yellow" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-white/60">Bem-vindo(a)</span>
            <span className="text-sm font-medium text-white truncate max-w-[120px]">
              {user?.username}
            </span>
          </div>
          <Button
            onClick={signOut}
            variant="ghost"
            size="icon"
            className="hover:bg-red-500/20 text-red-400 hover:text-red-300"
            title="Sair"
          >
            <LogOut size={18} />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
