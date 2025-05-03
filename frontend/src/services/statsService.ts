import { api } from "./apiService";

export interface TopScorer {
 user_id: number;
 username: string;
 points: number;
}

export interface StatsSummanry {
 current_round: number;
 total_predictions: number;
 top_scorer: TopScorer;
}

export interface UserStats {
 user_id: number;
 username: string;
 total_points: number;
 current_rank: number;
 has_pending_predictions: boolean;
}

export const statsService = {
 getSummary: async (): Promise<StatsSummanry> => {
  const res = await api.get("/dashboard/summary");
  return res.data;
 },

 getUserSummary: async (userId: number): Promise<UserStats> => {
  const res = await api.get(`/dashboard/user/${userId}`);
  return res.data;
 },
};
