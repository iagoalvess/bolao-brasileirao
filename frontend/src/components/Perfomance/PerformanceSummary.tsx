import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PersonalStats } from "@/services/statsService";

interface Props {
  stats: PersonalStats;
}

const PerformanceSummary = ({ stats }: Props) => (
  <Card className="border-2 bg-soccer-black/50 rounded-xl border-soccer-yellow/30">
    <CardHeader>
      <CardTitle className="text-2xl font-bold text-soccer-yellow drop-shadow-[0_2px_2px_rgba(0,0,0,0.4)]">
        Resumo de Desempenho
      </CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center text-white text-sm sm:text-base">
        <li>
          <p className="text-2xl font-extrabold text-soccer-green">
            {stats.exact_hits}
          </p>
          <p>Placar Exato</p>
        </li>
        <li>
          <p className="text-2xl font-extrabold text-soccer-green">
            {stats.winner_hits}
          </p>
          <p>Acertos de Vencedor</p>
        </li>
        <li>
          <p className="text-2xl font-extrabold text-red-400">{stats.errors}</p>
          <p>Erros</p>
        </li>
        <li>
          <p className="text-2xl font-extrabold text-soccer-yellow">
            {stats.avg_points_per_round}
          </p>
          <p>Média por Rodada</p>
        </li>
      </ul>
    </CardContent>
  </Card>
);

export default PerformanceSummary;
