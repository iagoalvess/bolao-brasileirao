import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, ArrowLeft } from "lucide-react";

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
    <div className="flex justify-between items-center mb-8 flex-wrap gap-4 border-b border-white/20 pb-4">
      <div>
        <div className="flex items-center gap-3">
          <img
            src="/BrasileiraoLogo.png"
            alt="Brasileirão Serie A"
            className="w-12 h-12 rounded-full object-cover shadow-lg"
          />
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow-lg">
            Bolão do Futebol
          </h1>
        </div>
        <p className="text-xl text-white/90 font-medium drop-shadow-sm mt-2">
          Seu espaço para palpites no Brasileirão
        </p>
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        {showBackButton && (
          <Button
            onClick={onBackClick}
            variant="outline"
            className="border-soccer-yellow text-soccer-yellow hover:bg-soccer-yellow hover:text-soccer-black flex items-center gap-2"
          >
            <ArrowLeft size={18} />
            {backButtonLabel}
          </Button>
        )}
        <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
          <span className="text-sm text-white/70">Bem-vindo(a)</span>
          <span className="text-base font-bold text-white">
            {user?.username}
          </span>
        </div>
        <Button
          onClick={signOut}
          className="bg-red-500 hover:bg-red-600 text-white flex items-center gap-2"
        >
          <LogOut size={18} />
          Sair
        </Button>
      </div>
    </div>
  );
};

export default PageHeader;
