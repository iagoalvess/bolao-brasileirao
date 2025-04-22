import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from "react-router-dom";

const Home = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-soccer-field to-soccer-green p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Bolão de Futebol</h1>
          <div className="flex items-center gap-4">
            <span className="text-white font-medium">
              Olá, {user?.username}
            </span>
            <Button 
              onClick={signOut}
              variant="outline"
              className="bg-white hover:bg-gray-100"
            >
              Sair
            </Button>
          </div>
        </div>
        <div className="mb-8 flex justify-center gap-1">
          <Link to="/matches">
            <Button className="bg-soccer-yellow text-soccer-black font-bold hover:bg-yellow-200 transition-colors">
              Partidas do dia
            </Button>
          </Link>
          <Link to="/historico">
            <Button className="bg-soccer-yellow text-soccer-black font-bold hover:bg-yellow-200 transition-colors">
              Histórico de partidas
            </Button>
          </Link>
          <Link to="/ranking">
            <Button className="bg-soccer-yellow text-soccer-black font-bold hover:bg-yellow-200 transition-colors">
              Ranking de jogadores
            </Button>
          </Link>
        </div>
        <Card className="shadow-lg border-2 border-soccer-yellow">
          <CardHeader>
            <CardTitle className="text-2xl">Bem-vindo ao Bolão!</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Sistema desenvolvido durante a disciplina de Engenharia de Software II</p>
          </CardContent>
          <CardContent>
            <p>O bolão do futebol busca permitir que amantes do futebol se reunam para palpitar no Brasileirão</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
