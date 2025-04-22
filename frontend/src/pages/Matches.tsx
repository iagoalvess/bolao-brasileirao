import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { matchService, Match } from "@/services/matchService";
import { predictionService, Prediction } from "@/services/predictionService";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/PageHeader";

const Matches = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const {
    data: matches,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["today-matches"],
    queryFn: matchService.getTodayMatches,
    retry: false,
  });

  const { data: myPredictions } = useQuery({
    queryKey: ["my-predictions"],
    queryFn: predictionService.getMyPredictions,
    retry: false,
  });

  const [predictions, setPredictions] = useState<
    Record<number, { home_team_score: string; away_team_score: string }>
  >({});

  useEffect(() => {
    if (myPredictions) {
      const mapped: typeof predictions = {};
      myPredictions.forEach((p) => {
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
      toast({
        title: "Erro",
        description: err?.response?.data?.detail || "Erro ao enviar palpite.",
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

  const alreadyPredicted = (matchId: number) =>
    myPredictions?.some((p) => p.match_id === matchId) ?? false;

  const getPredictionForMatch = (matchId: number) =>
    myPredictions?.find((p) => p.match_id === matchId);

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
    if (!input?.home_team_score || !input.away_team_score) {
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
      <div className="min-h-screen bg-gradient-to-br from-soccer-field via-soccer-green to-soccer-yellow p-6">
        <div className="max-w-5xl mx-auto">
          <PageHeader showBackButton onBackClick={() => navigate("/home")} />
          <Card className="shadow-2xl border-2 border-soccer-yellow bg-white/95 rounded-xl mt-6">
            <CardContent className="p-6">
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
                    {matches.map((match) => {
                      const predicted = alreadyPredicted(match.id);
                      const savedPrediction = getPredictionForMatch(match.id);

                      return (
                        <TableRow key={match.id}>
                          <TableCell>
                            {new Date(match.match_date).toLocaleTimeString(
                              "pt-BR",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </TableCell>
                          <TableCell>{match.home_team}</TableCell>
                          <TableCell>{match.away_team}</TableCell>
                          <TableCell>
                            <div className="flex gap-1 items-center">
                              <input
                                type="text"
                                inputMode="numeric"
                                value={
                                  predicted
                                    ? savedPrediction?.home_team_score
                                    : predictions[match.id]?.home_team_score ||
                                      ""
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
                                  predicted ||
                                  match.status === "FINISHED" ||
                                  mutation.isPending
                                }
                              />
                              <span className="mx-1 font-bold">x</span>
                              <input
                                type="text"
                                inputMode="numeric"
                                value={
                                  predicted
                                    ? savedPrediction?.away_team_score
                                    : predictions[match.id]?.away_team_score ||
                                      ""
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
                                  predicted ||
                                  match.status === "FINISHED" ||
                                  mutation.isPending
                                }
                              />
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button
                              onClick={() => handlePalpite(match)}
                              disabled={
                                predicted ||
                                match.status === "FINISHED" ||
                                mutation.isPending
                              }
                              className="bg-soccer-blue text-white"
                            >
                              {predicted ? "Palpite enviado" : "Palpitar"}
                            </Button>
                            {match.status === "FINISHED" && (
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
                  Nenhuma partida para hoje.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Matches;
