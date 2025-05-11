import { api } from "./apiService";
import { PersonalStats } from "../types/stats";

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
