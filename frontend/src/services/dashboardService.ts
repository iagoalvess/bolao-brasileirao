import { api } from "./apiService";

export interface TopScorer {
 user_id: number;
 username: string;
 points: number;
}

export interface DashboardSummary {
 current_round: number;
 total_predictions: number;
 top_scorer: TopScorer;
}

export interface UserDashboard {
 user_id: number;
 username: string;
 total_points: number;
 current_rank: number;
 has_pending_predictions: boolean;
}

export const dashboardService = {
 getSummary: async (): Promise<DashboardSummary> => {
  const res = await api.get("/dashboard/summary");
  return res.data;
 },

 getUserSummary: async (userId: number): Promise<UserDashboard> => {
  const res = await api.get(`/dashboard/user/${userId}`);
  return res.data;
 },
};
