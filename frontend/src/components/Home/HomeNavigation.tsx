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
      <NavigationMenuList className="bg-white/95 rounded-xl shadow-2xl px-6 py-4 space-x-4">
        <NavigationMenuItem>
          <Link to="/matches">
            <NavigationMenuLink className="flex items-center gap-3 p-4 rounded-lg hover:bg-soccer-yellow hover:text-soccer-black transition-all duration-200 font-semibold text-soccer-black bg-white shadow-sm hover:shadow-md">
              <LayoutGrid
                size={20}
                className="text-soccer-yellow group-hover:text-soccer-black transition"
              />
              Partidas
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/ranking">
            <NavigationMenuLink className="flex items-center gap-3 p-4 rounded-lg hover:bg-soccer-yellow hover:text-soccer-black transition-all duration-200 font-semibold text-soccer-black bg-white shadow-sm hover:shadow-md">
              <LayoutList
                size={20}
                className="text-soccer-yellow group-hover:text-soccer-black transition"
              />
              Ranking
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </div>
);

export default HomePageNavigation;
