
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { matchService } from "@/services/matchService";
import { predictionService } from "@/services/predictionService";
import { Prediction } from "@/types/prediction";
import { useToast } from "@/components/ui/use-toast";

export const useMatches = () => {
  const [selectedRound, setSelectedRound] = useState(1);
  const [predictions, setPredictions] = useState<
    Record<number, { home_team_score: string; away_team_score: string }>
  >({});
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const {
    data: matches = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["matches", selectedRound],
    queryFn: () => matchService.getMatchesByRound(selectedRound),
    enabled: !!selectedRound,
  });

  const {
    data: myPredictions = [],
    isLoading: isPredictionsLoading,
    error: predictionsError,
  } = useQuery({
    queryKey: ["my-predictions", selectedRound],
    queryFn: () => predictionService.getMyPredictionsByRound(selectedRound),
    enabled: !!selectedRound,
  });

  useEffect(() => {
    if (!matches.length) return;

    const initialPredictions = matches.reduce((acc, match) => {
      acc[match.id] = {
        home_team_score: "0",
        away_team_score: "0",
      };
      return acc;
    }, {} as typeof predictions);

    const mergedPredictions = myPredictions.reduce((acc, prediction) => {
      acc[prediction.match_id] = {
        home_team_score: String(prediction.home_team_score ?? 0),
        away_team_score: String(prediction.away_team_score ?? 0),
      };
      return acc;
    }, initialPredictions);

    if (!isEqual(predictions, mergedPredictions)) {
      setPredictions(mergedPredictions);
    }
  }, [myPredictions, matches]);

  const mutation = useMutation({
    mutationFn: predictionService.createPrediction,
    onSuccess: () => {
      toast({
        title: "Palpite enviado!",
        description: "Seu palpite foi registrado com sucesso.",
      });
      queryClient.invalidateQueries({ queryKey: ["matches", selectedRound] });
      queryClient.invalidateQueries({
        queryKey: ["my-predictions", selectedRound],
      });
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
        ...(prev[matchId] || { home_team_score: "", away_team_score: "" }),
        [field]: value,
      },
    }));
  };

  const alreadyPredicted = (matchId: number) =>
    myPredictions.some((p) => p.match_id === matchId);

  const getPredictionForMatch = (matchId: number): Prediction | undefined =>
    myPredictions.find((p) => p.match_id === matchId);

  const handlePalpite = (match: any) => {
    if (alreadyPredicted(match.id)) {
      toast({
        title: "Palpite já realizado",
        description: "Você já fez um palpite para essa partida.",
        variant: "destructive",
      });
      return;
    }

    const input = predictions[match.id];
    if (!input.home_team_score.trim() || !input.away_team_score.trim()) {
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

  return {
    selectedRound,
    setSelectedRound,
    matches,
    isLoading,
    error,
    predictions,
    handleChange,
    handlePalpite,
    alreadyPredicted,
    getPredictionForMatch,
    mutation,
  };
};

function isEqual(
  predictions: Record<
    number,
    { home_team_score: string; away_team_score: string }
  >,
  mergedPredictions: Record<
    number,
    { home_team_score: string; away_team_score: string }
  >
): boolean {
  return JSON.stringify(predictions) === JSON.stringify(mergedPredictions);
}
