import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Match } from "@/services/matchService";
import { Prediction } from "@/services/predictionService";

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
                <TableHead>Meus palpites</TableHead>
                <TableHead>Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {matches.map((match) => {
                const predicted = alreadyPredicted(match.id);
                const savedPrediction = getPredictionForMatch(match.id);
                const isFinished = match.status === "FINISHED";

                return (
                  <TableRow key={match.id}>
                    <TableCell>
                      {new Date(match.match_date).toLocaleString("pt-BR", {
                        weekday: "long",
                        day: "2-digit",
                        month: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </TableCell>
                    <TableCell>{match.home_team}</TableCell>
                    <TableCell>{match.away_team}</TableCell>
                    <TableCell>
                      {isFinished ? (
                        <div className="font-semibold">
                          {match.home_score} x {match.away_score}
                        </div>
                      ) : (
                        <div className="flex gap-1 items-center">
                          <input
                            type="text"
                            inputMode="numeric"
                            value={
                              predicted
                                ? savedPrediction?.home_team_score
                                : predictions[match.id]?.home_team_score || ""
                            }
                            onChange={(e) =>
                              onChange(
                                match.id,
                                "home_team_score",
                                e.target.value
                              )
                            }
                            className="w-10 rounded-md border border-gray-300 text-center"
                            maxLength={2}
                            disabled={predicted || mutation.isPending}
                          />
                          <span className="mx-1 font-bold">x</span>
                          <input
                            type="text"
                            inputMode="numeric"
                            value={
                              predicted
                                ? savedPrediction?.away_team_score
                                : predictions[match.id]?.away_team_score || ""
                            }
                            onChange={(e) =>
                              onChange(
                                match.id,
                                "away_team_score",
                                e.target.value
                              )
                            }
                            className="w-10 rounded-md border border-gray-300 text-center"
                            maxLength={2}
                            disabled={predicted || mutation.isPending}
                          />
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {!isFinished && (
                        <Button
                          onClick={() => onPalpite(match)}
                          disabled={predicted || mutation.isPending}
                          className="bg-soccer-blue text-white"
                        >
                          {predicted ? "Palpite enviado" : "Palpitar"}
                        </Button>
                      )}
                      {isFinished && (
                        <span className="ml-2 text-xs text-gray-500">
                          Finalizado
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
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
