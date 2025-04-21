import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from "react-router-dom";

const Dashboard = () => {
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
        <div className="mb-8 flex justify-center">
          <Link to="/matches">
            <Button className="bg-soccer-yellow text-soccer-black font-bold hover:bg-yellow-200 transition-colors">
              Ver partidas de hoje
            </Button>
          </Link>
        </div>
        <Card className="shadow-lg border-2 border-soccer-yellow">
          <CardHeader>
            <CardTitle className="text-2xl">Bem-vindo ao Bolão!</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Painel em construção. Logo você poderá participar de bolões e fazer seus palpites!</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
