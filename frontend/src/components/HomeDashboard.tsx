import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { dashboardService } from "@/services/dashboardService";

const HomeDashboard = () => {
  const { user } = useAuth();
  const [summary, setSummary] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        if (!user || !user.id) {
          console.warn("User ainda não disponível, aguardando...");
          return;
        }

        const summaryRes = await dashboardService.getSummary();
        console.log("user no contexto:", user);
        const userRes = await dashboardService.getUserSummary(Number(user.id));
        setSummary(summaryRes);
        setUserData(userRes);
      } catch (error) {
        console.error("Erro ao buscar dados do dashboard:", error);
      }
    };

    fetchDashboardData();
  }, [user]);

  if (!summary || !userData) {
    return <p className="text-white text-center">Carregando informações...</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
      <Card className="bg-white/95 shadow-lg border-l-4 border-soccer-yellow">
        <CardHeader>
          <CardTitle className="text-2xl text-soccer-black">
            Resumo Geral
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-800 space-y-2">
          <p>
            Rodada Atual: <strong>{summary.current_round}</strong>
          </p>
          <p>
            Total de Palpites: <strong>{summary.total_predictions}</strong>
          </p>
          <p>
            Maior Pontuador: <strong>{summary.top_scorer.username}</strong> (
            {summary.top_scorer.points} pontos)
          </p>
        </CardContent>
      </Card>

      <Card className="bg-white/95 shadow-lg border-l-4 border-soccer-green">
        <CardHeader>
          <CardTitle className="text-2xl text-soccer-black">
            Seu Desempenho
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-800 space-y-2">
          <p>
            Pontuação Total: <strong>{userData.total_points}</strong>
          </p>
          <p>
            Ranking Atual: <strong>{userData.current_rank}</strong>
          </p>
          <p>
            Palpites Pendentes:{" "}
            <strong
              className={
                userData.has_pending_predictions
                  ? "text-red-600"
                  : "text-green-600"
              }
            >
              {userData.has_pending_predictions ? "Sim" : "Não"}
            </strong>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomeDashboard;
