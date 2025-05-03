import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, ArrowLeft, User } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 border-b border-white/10 pb-4">
      <div className="flex items-center gap-4">
        {showBackButton && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={onBackClick}
                  size="icon"
                  className="rounded-full bg-soccer-yellow/20 hover:bg-soccer-yellow/30 text-soccer-yellow border border-soccer-yellow shadow-md"
                >
                  <ArrowLeft size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{backButtonLabel}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        <div className="flex items-center gap-3">
          <img
            src="/BrasileiraoLogo.png"
            alt="Brasileirão Serie A"
            className="w-12 h-12 rounded-full object-cover shadow-xl border border-white/10"
          />
          <div>
            <h1 className="text-2xl sm:text-4xl font-bold text-white drop-shadow">
              Bolão do Futebol
            </h1>
            <p className="text-sm sm:text-base text-white/70">
              Seu espaço para palpites no Brasileirão
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 group">
        <div className="flex items-center gap-2">
          <User
            size={20}
            className="text-white/80 hover:text-white transition-colors"
          />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white/90 truncate max-w-[160px]">
              {user?.username}
            </span>
          </div>
        </div>

        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={signOut}
                size="icon"
                variant="ghost"
                className="text-white/50 hover:text-red-300 hover:bg-transparent transition-all"
              >
                <LogOut
                  size={18}
                  className="transform group-hover:translate-x-0.5 transition-transform"
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-white/90 text-emerald-700 border-0 shadow-sm">
              <p>Sair da conta</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </header>
  );
};

export default PageHeader;
