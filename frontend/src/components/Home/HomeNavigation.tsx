import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { LayoutGrid, LayoutList } from "lucide-react";

const HomePageNavigation = () => (
  <div className="flex justify-center my-10">
    <NavigationMenu>
      <NavigationMenuList className="bg-white/90 rounded-xl shadow-lg px-6 py-4 space-x-6">
        <NavigationMenuItem>
          <Link to="/matches">
            <NavigationMenuLink className="flex items-center gap-3 p-4 rounded-lg transition-transform transform hover:scale-105 hover:bg-soccer-yellow/80 hover:text-soccer-black text-soccer-black bg-white shadow-md hover:shadow-xl font-medium text-lg">
              <LayoutGrid
                size={22}
                className="text-soccer-yellow group-hover:text-soccer-black transition-all"
              />
              <span className="tracking-wide">Partidas</span>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/ranking">
            <NavigationMenuLink className="flex items-center gap-3 p-4 rounded-lg transition-transform transform hover:scale-105 hover:bg-soccer-yellow/80 hover:text-soccer-black text-soccer-black bg-white shadow-md hover:shadow-xl font-medium text-lg">
              <LayoutList
                size={22}
                className="text-soccer-yellow group-hover:text-soccer-black transition-all"
              />
              <span className="tracking-wide">Ranking</span>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </div>
);

export default HomePageNavigation;
