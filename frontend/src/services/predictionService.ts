import { api } from "./apiService";

export interface PredictionPayload {
 match_id: number;
 home_team_score: number;
 away_team_score: number;
}

export interface Prediction {
 id: number;
 match_id: number;
 user_id: number;
 home_team_score: number;
 away_team_score: number;
}

export interface UserPrediction {
 match_id: number;
 home_team_score: number;
 away_team_score: number;
}

export const predictionService = {
 createPrediction: async (data: PredictionPayload) => {
  const res = await api.post("/predictions/", data);
  return res.data;
 },
 getMyPredictions: async () => {
  const res = await api.get("/predictions/me");
  return res.data as Prediction[];
 },
 getAllPredictions: async () => {
  const res = await api.get("/predictions/");
  return res.data as Prediction[];
 }
};