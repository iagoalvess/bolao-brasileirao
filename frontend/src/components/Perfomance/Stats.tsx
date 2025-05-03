import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { statsService } from "@/services/statsService";
import { FaTrophy, FaClock, FaUserAlt } from "react-icons/fa";

const Stats = () => {
  const { user } = useAuth();
  const [summary, setSummary] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        if (!user || !user.id) {
          console.warn("User ainda não disponível, aguardando...");
          return;
        }

        const summaryRes = await statsService.getSummary();
        const userRes = await statsService.getUserSummary(Number(user.id));
        setSummary(summaryRes);
        setUserData(userRes);
      } catch (error) {
        console.error("Erro ao buscar dados do dashboard:", error);
      }
    };

    fetchUserStats();
  }, [user]);

  if (!summary || !userData) {
    return <p className="text-white text-center">Carregando informações...</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Card Geral */}
      <div className="bg-soccer-black/50 p-6 rounded-xl border border-soccer-yellow/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-soccer-yellow/20 rounded-lg">
            <FaTrophy className="text-soccer-yellow" />
          </div>
          <h3 className="text-xl font-semibold text-white">Competição</h3>
        </div>

        <div className="space-y-4 text-white/80">
          <div className="flex justify-between items-center">
            <span>Rodada Atual</span>
            <span className="font-bold text-soccer-yellow">
              {summary.current_round}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span>Total de Palpites</span>
            <span className="font-bold text-soccer-yellow">
              {summary.total_predictions}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span>Líder Atual</span>
            <div className="text-right">
              <p className="font-bold">{summary.top_scorer.username}</p>
              <p className="text-sm">{summary.top_scorer.points} pontos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Card Usuário */}
      <div className="bg-soccer-black/50 p-6 rounded-xl border border-soccer-green/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-soccer-green/20 rounded-lg">
            <FaUserAlt className="text-soccer-green" />
          </div>
          <h3 className="text-xl font-semibold text-white">Seu Desempenho</h3>
        </div>

        <div className="space-y-4 text-white/80">
          <div className="flex justify-between items-center">
            <span>Pontuação Total</span>
            <span className="font-bold text-soccer-green">
              {userData.total_points}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span>Posição no Ranking</span>
            <span className="font-bold text-soccer-green">
              #{userData.current_rank}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span>Situação dos Palpites</span>
            <span
              className={`font-bold ${
                userData.has_pending_predictions
                  ? "text-red-400"
                  : "text-soccer-green"
              }`}
            >
              {userData.has_pending_predictions ? "Pendentes" : "Todos feitos"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
