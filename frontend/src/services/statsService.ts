import { api } from "./apiService";

export interface PersonalStats {
 exact_hits: number;
 winner_hits: number;
 errors: number;
 avg_points_per_round: number;
}

export const statisticsService = {
 getPersonalStats: async (userId: number): Promise<PersonalStats> => {
  const res = await api.get(`/statistics/personal/${userId}`);
  return res.data;
 },

 getPointsByRound: async (userId: number): Promise<Record<string, number>> => {
  const res = await api.get(`/statistics/personal/${userId}/points-by-round`);
  return res.data;
 },
};
