import { api } from "./apiService";

export interface Prediction {
 id: number;
 match_id: number;
 user_id: number;
 home_team_score: number;
 away_team_score: number;
 points: number;
}

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
};
