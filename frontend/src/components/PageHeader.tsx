
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, ArrowLeft, User, LogIn, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
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
  const { user, signOut, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Buscar informações detalhadas do usuário
  const { data: userDetails } = useQuery({
    queryKey: ["user-details", user?.id],
    queryFn: () => (user ? authService.getUserById(user.id) : null),
    enabled: !!user,
  });

  const getInitials = (username: string) => {
    return username
      .split(' ')
      .map(name => name[0])
      .join('')
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
        {isAuthenticated ? (
          <Popover>
            <PopoverTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer hover:bg-white/10 p-2 rounded-lg transition-colors">
                <Avatar className="h-8 w-8 bg-soccer-yellow/20 border border-soccer-yellow/40">
                  <AvatarFallback className="text-white text-sm">
                    {user && getInitials(user.username)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white/90 truncate max-w-[160px]">
                    {user?.username}
                  </span>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0 bg-white/90 backdrop-blur-md border border-white/20 shadow-xl">
              <div className="flex flex-col p-4">
                <div className="flex items-center gap-4 pb-4 border-b border-gray-200/20">
                  <Avatar className="h-12 w-12 bg-soccer-yellow/20 border-2 border-soccer-yellow/40">
                    <AvatarFallback className="text-soccer-yellow text-lg font-bold">
                      {user && getInitials(user.username)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-bold text-emerald-800">{user?.username}</h3>
                    <p className="text-sm text-emerald-700/80">{user?.email}</p>
                  </div>
                </div>
                
                {userDetails && (
                  <div className="py-4 border-b border-gray-200/20">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-emerald-700">Pontos Totais:</span>
                      <span className="text-lg font-bold text-emerald-800">{userDetails.total_points || 0}</span>
                    </div>
                  </div>
                )}
                
                <div className="pt-4">
                  <Button 
                    onClick={signOut}
                    variant="destructive" 
                    className="w-full bg-red-500 hover:bg-red-600 text-white"
                  >
                    <LogOut size={16} className="mr-2" />
                    Sair da conta
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <div className="flex items-center gap-3">
            <Button 
              onClick={() => navigate("/login")} 
              variant="outline"
              className="border-soccer-yellow text-soccer-yellow hover:bg-soccer-yellow hover:text-black"
            >
              <LogIn size={16} className="mr-2" />
              Entrar
            </Button>
            <Button 
              onClick={() => navigate("/register")} 
              className="bg-soccer-yellow text-black hover:bg-soccer-yellow/80"
            >
              <UserPlus size={16} className="mr-2" />
              Cadastrar
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default PageHeader;