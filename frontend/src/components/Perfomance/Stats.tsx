import { useEffect, useState } from "react";
import { statisticsService, PersonalStats } from "@/services/statsService";
import { useAuth } from "@/contexts/AuthContext";
import PerformanceSummary from "./PerformanceSummary";
import PointsChart from "./PointsChart";

const Stats = () => {
  const [stats, setStats] = useState<PersonalStats | null>(null);
  const [pointsData, setPointsData] = useState<
    { round: string; points: number }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;
      setLoading(true);
      try {
        const [personal, points] = await Promise.all([
          statisticsService.getPersonalStats(user.id),
          statisticsService.getPointsByRound(user.id),
        ]);
        setStats(personal);
        const formattedPoints = Object.entries(points).map(
          ([round, points]) => ({ round, points })
        );
        setPointsData(formattedPoints);
      } catch (error) {
        console.error("Erro ao buscar estatísticas:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  if (loading)
    return (
      <div className="text-center text-lg text-soccer-yellow/80 py-6">
        Carregando estatísticas...
      </div>
    );
  if (!stats)
    return (
      <div className="text-center text-red-300 py-6 text-lg">
        Erro ao carregar dados.
      </div>
    );

  return (
    <div className="mt-6 space-y-6">
      <PerformanceSummary stats={stats} />
      <PointsChart data={pointsData} />
    </div>
  );
};

export default Stats;
