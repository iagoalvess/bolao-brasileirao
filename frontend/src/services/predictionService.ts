
import { api } from "./apiService";
import { Prediction } from "@/types/prediction";

export const predictionService = {
 createPrediction: async (data: {
  match_id: number;
  home_team_score: number;
  away_team_score: number;
 }): Promise<Prediction> => {
  const res = await api.post("/predictions", data);
  return res.data;
 },

 getMyPredictionsByRound: async (round: number): Promise<Prediction[]> => {
  const res = await api.get(`/predictions/by-round?round=${round}`);
  return res.data;
 },

 getMyPredictions: async (): Promise<Prediction[]> => {
  const res = await api.get("/predictions/me");
  return res.data;
 },
};
