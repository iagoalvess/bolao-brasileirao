import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { matchService, Match } from "@/services/matchService";
import { predictionService, Prediction } from "@/services/predictionService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

function calcularPontuacao(
  resultado: { home: number; away: number },
  palpite: { home: number; away: number }
) {
  if (resultado.home === palpite.home && resultado.away === palpite.away)
    return 10;
  if (resultado.home - resultado.away === palpite.home - palpite.away) return 5;
  if (
    (resultado.home > resultado.away && palpite.home > palpite.away) ||
    (resultado.home < resultado.away && palpite.home < palpite.away) ||
    (resultado.home === resultado.away && palpite.home === palpite.away)
  )
    return 3;
  return 0;
}

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
      <div className="min-h-screen bg-gradient-to-b from-soccer-field to-soccer-green p-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="shadow-lg border-2 border-soccer-yellow mb-8">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="text-2xl">Histórico de Partidas</CardTitle>
              <Button
                variant="default"
                className="sm:items-right border-soccer-yellow hover:bg-soccer-green hover:text-yellow-400"
                onClick={() => navigate("/home")}
              >
                Voltar
              </Button>
            </CardHeader>
            <CardContent>
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
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Casa</TableHead>
                      <TableHead>Fora</TableHead>
                      <TableHead>Resultado</TableHead>
                      <TableHead>Seu palpite</TableHead>
                      <TableHead>Pontuação</TableHead>
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
                        return (
                          <TableRow key={match.id}>
                            <TableCell>
                              {new Date(match.match_date).toLocaleDateString(
                                "pt-BR"
                              )}
                            </TableCell>
                            <TableCell>{match.home_team}</TableCell>
                            <TableCell>{match.away_team}</TableCell>
                            <TableCell>
                              {resultadoFinalizado && match.scoreboard ? (
                                `${match.home_team} ${match.scoreboard.home} x ${match.scoreboard.visitor} ${match.away_team}`
                              ) : (
                                <span className="text-xs text-gray-500">
                                  Não finalizado
                                </span>
                              )}
                            </TableCell>
                            <TableCell>
                              {palpite ? (
                                `${palpite.home_team_score} x ${palpite.away_team_score}`
                              ) : (
                                <span className="text-xs text-gray-500">
                                  Nenhum
                                </span>
                              )}
                            </TableCell>
                            <TableCell>
                              {palpite &&
                              resultadoFinalizado &&
                              match.scoreboard
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
                                : "--"}
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
