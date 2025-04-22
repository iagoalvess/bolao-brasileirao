import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

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
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center mb-10 flex-wrap gap-6">
      <div>
        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg mb-2">
          Bolão do Futebol
        </h1>
        <p className="text-xl text-white/90 font-medium drop-shadow-sm">
          Seu espaço para palpites e apostas no Brasileirão
        </p>
      </div>
      <div className="flex items-center gap-6">
        {showBackButton && (
          <Button
            onClick={onBackClick}
            className="bg-soccer-yellow hover:bg-soccer-green text-soccer-black hover:text-white font-semibold px-4 py-2 rounded-lg shadow-md"
          >
            {backButtonLabel}
          </Button>
        )}
        <div className="text-right">
          <p className="text-sm text-white/80 font-medium">Bem-vindo(a)</p>
          <span className="text-2xl font-bold text-white">
            {user?.username}
          </span>
        </div>
        <Button
          onClick={signOut}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2"
        >
          <LogOut size={18} />
          Sair
        </Button>
      </div>
    </div>
  );
};

export default PageHeader;
