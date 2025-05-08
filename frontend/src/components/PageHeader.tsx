import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, ArrowLeft, User } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { authService } from "@/services/userService";

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

  const { data: userDetails } = useQuery({
    queryKey: ["user-details", user?.id],
    queryFn: () => (user ? authService.getUserById(user.id) : null),
    enabled: !!user,
  });

  const getInitials = (username: string) => {
    return username
      .split(" ")
      .map((name) => name[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

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
        <Popover>
          <PopoverTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer hover:bg-emerald-50/10 p-2 rounded-lg transition-colors duration-200">
              <Avatar className="h-10 w-10 bg-emerald-600 border-2 border-yellow-300 shadow-md hover:border-emerald-600 transition-all">
                <AvatarFallback className="text-white text-xl font-bold tracking-wider bg-emerald-500">
                  {user && getInitials(user.username)}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col">
                <span className="text-sm font-medium text-emerald-50 truncate max-w-[160px]">
                  {user?.username}
                </span>
                <span className="text-xs text-emerald-200/80">Ver perfil</span>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0 bg-emerald-50 backdrop-blur-lg border border-emerald-200 shadow-2xl rounded-xl overflow-hidden">
            <div className="flex flex-col p-4">
              <div className="flex items-center gap-4 pb-4 border-b border-emerald-100">
                <Avatar className="h-12 w-12 bg-emerald-600 border-2 border-emerald-700">
                  <AvatarFallback className="text-white text-lg font-bold bg-emerald-500">
                    {user && getInitials(user.username)}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h3 className="text-lg font-bold text-emerald-900">
                    {user?.username}
                  </h3>
                  <p className="text-sm text-emerald-700/80 truncate">
                    {user?.email}
                  </p>
                </div>
              </div>

              <div className="pt-4 space-y-2">
                <Button
                  onClick={signOut}
                  variant="ghost"
                  className="w-full justify-start text-red-600 hover:bg-red-50"
                >
                  <LogOut size={16} className="mr-2" />
                  Sair da conta
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
};

export default PageHeader;
