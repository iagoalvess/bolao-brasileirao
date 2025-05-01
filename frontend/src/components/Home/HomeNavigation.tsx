import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { LayoutGrid, LayoutList } from "lucide-react";

const HomePageNavigation = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <Link
      to="/matches"
      className="group flex items-center gap-4 p-6 bg-soccer-black/50 rounded-xl border border-white/10 hover:border-soccer-yellow transition-all"
    >
      <div className="p-3 bg-soccer-yellow/20 rounded-lg">
        <LayoutGrid size={24} className="text-soccer-yellow" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white">Partidas</h3>
        <p className="text-sm text-white/60">Faça seus palpites</p>
      </div>
    </Link>

    <Link
      to="/ranking"
      className="group flex items-center gap-4 p-6 bg-soccer-black/50 rounded-xl border border-white/10 hover:border-soccer-green transition-all"
    >
      <div className="p-3 bg-soccer-green/20 rounded-lg">
        <LayoutList size={24} className="text-soccer-green" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white">Ranking</h3>
        <p className="text-sm text-white/60">Ver classificação</p>
      </div>
    </Link>
  </div>
);

export default HomePageNavigation;
