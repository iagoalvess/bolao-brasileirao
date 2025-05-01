import MatchRow from "./MatchRow";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Match } from "@/types/match";
import { Prediction } from "@/types/prediction";

interface MatchesTableProps {
  matches: Match[];
  isLoading: boolean;
  error: any;
  predictions: Record<
    number,
    { home_team_score: string; away_team_score: string }
  >;
  mutation: any;
  onChange: (
    matchId: number,
    field: "home_team_score" | "away_team_score",
    value: string
  ) => void;
  onPalpite: (match: Match) => void;
  alreadyPredicted: (matchId: number) => boolean;
  getPredictionForMatch: (matchId: number) => Prediction | undefined;
}

const MatchesTable: React.FC<MatchesTableProps> = ({
  matches,
  isLoading,
  error,
  predictions,
  mutation,
  onChange,
  onPalpite,
  alreadyPredicted,
  getPredictionForMatch,
}) => {
  return (
    <Card className="shadow-2xl border-2 border-soccer-yellow bg-white/95 rounded-xl mt-6">
      <CardContent className="p-6">
        {isLoading ? (
          <div className="text-center py-6">Carregando partidas...</div>
        ) : error ? (
          <div className="text-center text-red-600 py-6">
            {error?.response?.data?.detail || "Erro ao carregar partidas."}
          </div>
        ) : Array.isArray(matches) && matches.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Horário</TableHead>
                <TableHead>Casa</TableHead>
                <TableHead>Fora</TableHead>
                <TableHead>Resultado</TableHead>
                <TableHead>Meu palpite</TableHead>
                <TableHead>Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {matches.map((match) => (
                <MatchRow
                  key={match.id}
                  match={match}
                  predicted={alreadyPredicted(match.id)}
                  savedPrediction={getPredictionForMatch(match.id)}
                  predictionInput={predictions[match.id]}
                  isPending={mutation.isPending}
                  onChange={onChange}
                  onPalpite={() => onPalpite(match)}
                />
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-6">
            Nenhuma partida para essa rodada.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MatchesTable;
