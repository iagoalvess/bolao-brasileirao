import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageHeader from "@/components/PageHeader";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { List, LayoutList, LayoutGrid, LogOut } from "lucide-react";

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
              Partidas do dia
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/historico">
            <NavigationMenuLink className="flex items-center gap-3 p-4 rounded-lg hover:bg-soccer-yellow hover:text-soccer-black transition-all duration-200 font-semibold text-soccer-black bg-white shadow-sm hover:shadow-md">
              <List
                size={20}
                className="text-soccer-yellow group-hover:text-soccer-black transition"
              />
              Histórico de partidas
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
              Ranking de jogadores
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </div>
);

const HomePage = () => {
  const { signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-soccer-field via-soccer-green to-soccer-yellow p-6">
      <div className="max-w-6xl mx-auto">
        <PageHeader />
        <HomePageNavigation />
        <Card className="shadow-2xl border-2 border-soccer-yellow bg-white/95 rounded-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-semibold text-soccer-black">
              Bem-vindo ao Bolão!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-lg text-gray-800">
            <p>
              Sistema desenvolvido durante a disciplina de Engenharia de
              Software II.
            </p>
            <p>
              O bolão do futebol busca permitir que amantes do futebol se reúnam
              para palpitar no Brasileirão.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
