import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { dashboardService } from "@/services/dashboardService";
import { FaTrophy, FaClock, FaUserAlt } from "react-icons/fa";

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
      <Card className="bg-white/90 shadow-xl border-l-4 border-soccer-yellow rounded-xl hover:shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl text-soccer-black flex items-center space-x-2">
            <FaClock size={24} className="text-soccer-yellow" />
            <span>Resumo Geral</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-800 space-y-3">
          <p>
            <strong>Rodada Atual:</strong> <span>{summary.current_round}</span>
          </p>
          <p>
            <strong>Total de Palpites:</strong>{" "}
            <span>{summary.total_predictions}</span>
          </p>
          <p>
            <strong>Maior Pontuador:</strong>{" "}
            <span>{summary.top_scorer.username}</span> (
            {summary.top_scorer.points} pontos)
          </p>
        </CardContent>
      </Card>

      <Card className="bg-white/90 shadow-xl border-l-4 border-soccer-green rounded-xl hover:shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl text-soccer-black flex items-center space-x-2">
            <FaUserAlt size={24} className="text-soccer-green" />
            <span>Seu Desempenho</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-800 space-y-3">
          <p>
            <strong>Pontuação Total:</strong>{" "}
            <span>{userData.total_points}</span>
          </p>
          <p>
            <strong>Ranking Atual:</strong> <span>{userData.current_rank}</span>
          </p>
          <p>
            <strong>Palpites Pendentes:</strong>{" "}
            <span
              className={
                userData.has_pending_predictions
                  ? "text-red-600"
                  : "text-green-600"
              }
            >
              {userData.has_pending_predictions ? "Sim" : "Não"}
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomeDashboard;
