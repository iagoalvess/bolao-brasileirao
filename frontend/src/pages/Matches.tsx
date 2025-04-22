import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { matchService, Match } from "@/services/matchService";
import { predictionService, Prediction, PredictionPayload } from "@/services/predictionService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useNavigate } from "react-router-dom";

const Matches = () => {
  const navigate = useNavigate();
  const {
    data: matches,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["today-matches"],
    queryFn: matchService.getTodayMatches,
    retry: false,
  });

  // Busca os palpites do usuário logado
  const { data: myPredictions } = useQuery({
    queryKey: ["my-predictions"],
    queryFn: predictionService.getMyPredictions,
    retry: false,
  });

  const [predictions, setPredictions] = useState<{
    [key: number]: { home_team_score: string; away_team_score: string };
  }>({});
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Preenche automaticamente os campos de input dos jogos já palpittados
  useEffect(() => {
    if (myPredictions && Array.isArray(myPredictions)) {
      const mapped: {
        [key: number]: { home_team_score: string; away_team_score: string };
      } = {};
      myPredictions.forEach((p: Prediction) => {
        mapped[p.match_id] = {
          home_team_score: String(p.home_team_score),
          away_team_score: String(p.away_team_score),
        };
      });
      setPredictions(mapped);
    }
  }, [myPredictions]);

  const mutation = useMutation({
    mutationFn: predictionService.createPrediction,
    onSuccess: () => {
      toast({
        title: "Palpite enviado!",
        description: "Seu palpite foi registrado com sucesso.",
      });
      queryClient.invalidateQueries({ queryKey: ["today-matches"] });
      queryClient.invalidateQueries({ queryKey: ["my-predictions"] });
    },
    onError: (err: any) => {
      let description = "Erro ao enviar palpite.";
      if (err.response && err.response.data && err.response.data.detail) {
        description = err.response.data.detail;
      }
      toast({
        title: "Erro",
        description,
        variant: "destructive",
      });
    },
  });

  const handleChange = (
    matchId: number,
    field: "home_team_score" | "away_team_score",
    value: string
  ) => {
    setPredictions((prev) => ({
      ...prev,
      [matchId]: {
        ...prev[matchId],
        [field]: value.replace(/[^0-9]/g, ""),
      },
    }));
  };

  // Verifica se o usuário já fez palpite para determinada partida
  const alreadyPredicted = (matchId: number) => {
    if (!myPredictions) return false;
    return myPredictions.some((p: Prediction) => p.match_id === matchId);
  };

  const getPredictionForMatch = (matchId: number) => {
    if (!myPredictions) return undefined;
    return myPredictions.find((p: Prediction) => p.match_id === matchId);
  };

  const handlePalpite = (match: Match) => {
    if (alreadyPredicted(match.id)) {
      toast({
        title: "Palpite já realizado",
        description: "Você já fez um palpite para essa partida.",
        variant: "destructive",
      });
      return;
    }
    const input = predictions[match.id];
    if (
      !input ||
      input.home_team_score === "" ||
      input.away_team_score === ""
    ) {
      toast({
        title: "Dados incompletos",
        description: "Preencha o placar dos dois times.",
        variant: "destructive",
      });
      return;
    }

    mutation.mutate({
      match_id: match.id,
      home_team_score: parseInt(input.home_team_score),
      away_team_score: parseInt(input.away_team_score),
    });
  };

  return (
    <ProtectedRoute>
    <div className="min-h-screen bg-gradient-to-b from-soccer-field to-soccer-green p-4">
      <div className="container mx-auto max-w-3xl">
        <Card className="shadow-lg border-2 border-soccer-yellow mb-8">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="text-2xl">Partidas do dia</CardTitle>
            <div className="flex items-end gap-1">
              <Button
                variant="default"
                className="sm:items-right border-soccer-yellow hover:bg-soccer-green hover:text-yellow-400"
                onClick={() => navigate("/home")}
              >
                Voltar
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            {isLoading ? (
              <div className="text-center py-6">Carregando partidas...</div>
            ) : error ? (
              <div className="text-center text-red-600 py-6">
                {(error as any).response?.data?.detail ||
                  "Erro ao carregar partidas."}
              </div>
            ) : matches && matches.length > 0 ? (
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
                  {matches.map((match: Match) => {
                    const predicted = alreadyPredicted(match.id);
                    const savedPrediction = getPredictionForMatch(match.id);
                    // inputs disabled se palpite já foi feito
                    return (
                      <TableRow key={match.id}>
                        <TableCell>
                          {new Date(match.match_date).toLocaleTimeString(
                            "pt-BR",
                            { hour: "2-digit", minute: "2-digit" }
                          )}
                        </TableCell>
                        <TableCell>{match.home_team}</TableCell>
                        <TableCell>{match.away_team}</TableCell>
                        <TableCell>
                          <div className="flex gap-1 items-center">
                            <input
                              type="text"
                              inputMode="numeric"
                              pattern="[0-9]*"
                              value={
                                predicted
                                  ? savedPrediction?.home_team_score
                                  : predictions[match.id]?.home_team_score || ""
                              }
                              onChange={(e) =>
                                handleChange(
                                  match.id,
                                  "home_team_score",
                                  e.target.value
                                )
                              }
                              className="w-10 rounded-md border border-gray-300 text-center"
                              maxLength={2}
                              disabled={
                                match.status === "FINISHED" ||
                                mutation.isPending ||
                                predicted
                              }
                            />
                            <span className="mx-1 font-bold">x</span>
                            <input
                              type="text"
                              inputMode="numeric"
                              pattern="[0-9]*"
                              value={
                                predicted
                                  ? savedPrediction?.away_team_score
                                  : predictions[match.id]?.away_team_score || ""
                              }
                              onChange={(e) =>
                                handleChange(
                                  match.id,
                                  "away_team_score",
                                  e.target.value
                                )
                              }
                              className="w-10 rounded-md border border-gray-300 text-center"
                              maxLength={2}
                              disabled={
                                match.status === "FINISHED" ||
                                mutation.isPending ||
                                predicted
                              }
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() => handlePalpite(match)}
                            disabled={
                              match.status === "FINISHED" ||
                              mutation.isPending ||
                              predicted
                            }
                            className="bg-soccer-blue text-white"
                          >
                            {predicted ? "Palpite enviado" : "Palpitar"}
                          </Button>
                          {match.status === "FINISHED" && (
                            <span className="inline-block ml-2 text-xs text-gray-500">
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
              <div className="text-center py-6">Nenhuma partida para hoje.</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
    </ProtectedRoute>
  );
};

export default Matches;
