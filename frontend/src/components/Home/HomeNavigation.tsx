
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";
import {
  Users,
  CalendarCheck,
  BarChart,
  Activity,
} from "lucide-react";

const HomePageNavigation = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Acesso restrito",
        description: "Faça login para acessar esta funcionalidade.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    navigate(path);
  };

  return (
    <div className="grid grid-cols-1 gap-4 group/navigation">
      {/* Matches */}
      <div
        onClick={() => handleNavigation("/matches")}
        className="relative overflow-hidden flex items-center gap-4 p-6 bg-gradient-to-br from-soccer-black/80 to-soccer-green/20 rounded-2xl border border-white/10 hover:border-soccer-yellow transition-all hover:scale-[1.02] shadow-lg hover:shadow-soccer-yellow/20 cursor-pointer"
      >
        <div className="absolute inset-0 bg-[url('/texture.png')] opacity-10" />
        <div className="p-3 bg-soccer-yellow/20 rounded-lg backdrop-blur-sm">
          <CalendarCheck className="text-soccer-yellow w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white">Partidas ao Vivo</h3>
          <p className="text-sm text-white/60 mt-1">Palpite nos próximos jogos</p>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-30 group-hover/navigation:opacity-100 transition-opacity">
            →
          </div>
        </div>
      </div>

      {/* Ranking */}
      <div
        onClick={() => handleNavigation("/ranking")}
        className="relative overflow-hidden flex items-center gap-4 p-6 bg-gradient-to-br from-soccer-black/80 to-soccer-green/20 rounded-2xl border border-white/10 hover:border-soccer-yellow transition-all hover:scale-[1.02] shadow-lg hover:shadow-soccer-yellow/20 cursor-pointer"
      >
        <div className="absolute inset-0 bg-[url('/texture.png')] opacity-10" />
        <div className="p-3 bg-soccer-yellow/20 rounded-lg backdrop-blur-sm">
          <BarChart className="text-soccer-yellow w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white">Ranking</h3>
          <p className="text-sm text-white/60 mt-1">Ver classificação</p>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-30 group-hover/navigation:opacity-100 transition-opacity">
            →
          </div>
        </div>
      </div>

      {/* Performance */}
      <div
        onClick={() => handleNavigation("/performance")}
        className="relative overflow-hidden flex items-center gap-4 p-6 bg-gradient-to-br from-soccer-black/80 to-soccer-green/20 rounded-2xl border border-white/10 hover:border-soccer-yellow transition-all hover:scale-[1.02] shadow-lg hover:shadow-soccer-yellow/20 cursor-pointer"
      >
        <div className="absolute inset-0 bg-[url('/texture.png')] opacity-10" />
        <div className="p-3 bg-soccer-yellow/20 rounded-lg backdrop-blur-sm">
          <Activity className="text-soccer-yellow w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white">Performance</h3>
          <p className="text-sm text-white/60 mt-1">Ver desempenho</p>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-30 group-hover/navigation:opacity-100 transition-opacity">
            →
          </div>
        </div>
      </div>

      {/* Group */}
      <div
        onClick={() => handleNavigation("/group")}
        className="relative overflow-hidden flex items-center gap-4 p-6 bg-gradient-to-br from-soccer-black/80 to-soccer-green/20 rounded-2xl border border-white/10 hover:border-soccer-yellow transition-all hover:scale-[1.02] shadow-lg hover:shadow-soccer-yellow/20 cursor-pointer"
      >
        <div className="absolute inset-0 bg-[url('/texture.png')] opacity-10" />
        <div className="p-3 bg-soccer-yellow/20 rounded-lg backdrop-blur-sm">
          <Users className="text-soccer-yellow w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white">Grupos</h3>
          <p className="text-sm text-white/60 mt-1">Ver grupo</p>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-30 group-hover/navigation:opacity-100 transition-opacity">
            →
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageNavigation;