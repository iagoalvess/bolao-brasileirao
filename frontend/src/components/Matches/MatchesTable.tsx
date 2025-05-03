import MatchRow from "./MatchRow";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Match } from "@/types/match";
import { Prediction } from "@/types/prediction";
import { CalendarCheck } from "lucide-react";

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
    <Card className="bg-soccer-black/70 backdrop-blur-md border border-white/10 shadow-xl rounded-2xl mt-6">
      <CardHeader className="flex items-center gap-3 pb-2 border-b border-white/10">
        <CalendarCheck className="text-soccer-yellow" size={28} />
        <CardTitle className="text-2xl font-semibold text-white drop-shadow">
          Partidas da Rodada
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        {isLoading ? (
          <div className="text-center py-6 text-lg text-white/70">
            Carregando partidas...
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-6 text-lg">
            {error?.response?.data?.detail || "Erro ao carregar partidas."}
          </div>
        ) : Array.isArray(matches) && matches.length > 0 ? (
          <Table className="rounded-b-2xl overflow-hidden text-white">
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-soccer-yellow to-soccer-green font-bold">
                <TableHead className="px-4 py-3 text-white text-center">Horário</TableHead>
                <TableHead className="px-4 py-3 text-white text-left">Casa</TableHead>
                <TableHead className="px-4 py-3 text-white text-left">Fora</TableHead>
                <TableHead className="px-4 py-3 text-white text-center">Resultado</TableHead>
                <TableHead className="px-4 py-3 text-white text-left">Palpite</TableHead>
                <TableHead className="px-4 py-3 text-white text-center">Situação</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="bg-soccer-black/50">
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
          <div className="text-center py-6 text-lg text-white/70">
            Nenhuma partida para essa rodada.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MatchesTable;
