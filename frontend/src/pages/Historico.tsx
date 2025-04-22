import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { matchService, Match } from "@/services/matchService";
import { predictionService, Prediction } from "@/services/predictionService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageHeader from "@/components/PageHeader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { calcularPontuacao } from "@/lib/utils";

const Historico = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    data: matches,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["all-matches"],
    queryFn: matchService.getAllMatches,
    retry: false,
  });

  const { data: myPredictions } = useQuery({
    queryKey: ["my-predictions"],
    queryFn: predictionService.getMyPredictions,
    retry: false,
  });

  const predictionsMap = React.useMemo(() => {
    const obj: Record<number, Prediction> = {};
    if (myPredictions) {
      myPredictions.forEach((p: Prediction) => {
        obj[p.match_id] = p;
      });
    }
    return obj;
  }, [myPredictions]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-soccer-field via-soccer-green to-soccer-yellow p-6">
        <div className="max-w-6xl mx-auto">
          <PageHeader showBackButton onBackClick={() => navigate("/home")} />
          <Card className="shadow-2xl border-2 border-soccer-yellow bg-white/95 rounded-xl mt-6">
            <CardContent className="p-6">
              {isLoading ? (
                <div className="text-center py-6">Carregando histórico...</div>
              ) : error ? (
                <div className="text-center text-red-600 py-6">
                  {(error as any).response?.data?.detail ||
                    "Erro ao carregar histórico."}
                </div>
              ) : matches && matches.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow className="bg-soccer-yellow text-white">
                      <TableHead className="text-white">Data</TableHead>
                      <TableHead className="text-white">Casa</TableHead>
                      <TableHead className="text-white">Fora</TableHead>
                      <TableHead className="text-white">Resultado</TableHead>
                      <TableHead className="text-white">Seu palpite</TableHead>
                      <TableHead className="text-white text-center">
                        Pontuação
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {matches
                      .sort(
                        (a, b) =>
                          new Date(b.match_date).getTime() -
                          new Date(a.match_date).getTime()
                      )
                      .map((match: Match) => {
                        const palpite = predictionsMap[match.id];
                        const resultadoFinalizado = match.status === "FINISHED";

                        const pontuacao =
                          palpite && resultadoFinalizado && match.scoreboard
                            ? calcularPontuacao(
                                {
                                  home: match.scoreboard.home,
                                  away: match.scoreboard.visitor,
                                },
                                {
                                  home: palpite.home_team_score,
                                  away: palpite.away_team_score,
                                }
                              )
                            : null;

                        const getBadge = (pts: number | null) => {
                          if (pts === 10) return "bg-green-500 text-white";
                          if (pts === 5) return "bg-yellow-500 text-black";
                          if (pts === 3) return "bg-orange-400 text-white";
                          if (pts === 0) return "bg-red-400 text-white";
                          return "bg-gray-300 text-black";
                        };

                        return (
                          <TableRow
                            key={match.id}
                            className="odd:bg-muted/40 transition-colors hover:bg-muted"
                          >
                            <TableCell>
                              {new Date(match.match_date).toLocaleDateString(
                                "pt-BR"
                              )}
                            </TableCell>
                            <TableCell className="font-semibold">
                              {match.home_team}
                            </TableCell>
                            <TableCell className="font-semibold">
                              {match.away_team}
                            </TableCell>
                            <TableCell>
                              {resultadoFinalizado && match.scoreboard ? (
                                <span className="text-sm font-medium">
                                  {match.scoreboard.home} x{" "}
                                  {match.scoreboard.visitor}
                                </span>
                              ) : (
                                <span className="text-xs text-gray-500">
                                  Não finalizado
                                </span>
                              )}
                            </TableCell>
                            <TableCell>
                              {palpite ? (
                                <span className="text-sm">
                                  {palpite.home_team_score} x{" "}
                                  {palpite.away_team_score}
                                </span>
                              ) : (
                                <span className="text-xs text-gray-500">
                                  Nenhum
                                </span>
                              )}
                            </TableCell>
                            <TableCell className="text-center">
                              {pontuacao !== null ? (
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-bold ${getBadge(
                                    pontuacao
                                  )}`}
                                >
                                  {pontuacao} pts
                                </span>
                              ) : (
                                <span className="text-xs text-gray-500">
                                  --
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
                  Nenhum histórico de partidas encontrado.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Historico;
