import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  LayoutGrid,
  LayoutList,
  Users,
  CalendarCheck,
  BarChart,
  Activity,
} from "lucide-react";

const HomePageNavigation = () => (
  <div className="grid grid-cols-1 gap-4 group/navigation">
    {/* Matches */}
    <Link
      to="/matches"
      className="relative overflow-hidden flex items-center gap-4 p-6 bg-gradient-to-br from-soccer-black/80 to-soccer-green/20 rounded-2xl border border-white/10 hover:border-soccer-yellow transition-all hover:scale-[1.02] shadow-lg hover:shadow-soccer-yellow/20"
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
    </Link>

    {/* Ranking */}
    <Link
      to="/ranking"
      className="relative overflow-hidden flex items-center gap-4 p-6 bg-gradient-to-br from-soccer-black/80 to-soccer-green/20 rounded-2xl border border-white/10 hover:border-soccer-yellow transition-all hover:scale-[1.02] shadow-lg hover:shadow-soccer-yellow/20"
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
    </Link>

    {/* Performance */}
    <Link
      to="/performance"
      className="relative overflow-hidden flex items-center gap-4 p-6 bg-gradient-to-br from-soccer-black/80 to-soccer-green/20 rounded-2xl border border-white/10 hover:border-soccer-yellow transition-all hover:scale-[1.02] shadow-lg hover:shadow-soccer-yellow/20"
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
    </Link>

    {/* Group */}
    <Link
      to="/group"
      className="relative overflow-hidden flex items-center gap-4 p-6 bg-gradient-to-br from-soccer-black/80 to-soccer-green/20 rounded-2xl border border-white/10 hover:border-soccer-yellow transition-all hover:scale-[1.02] shadow-lg hover:shadow-soccer-yellow/20"
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
    </Link>
  </div>
);

export default HomePageNavigation;
