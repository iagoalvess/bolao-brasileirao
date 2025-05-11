import axios from "axios";
import { api } from "./apiService";
import { Match } from "../types/match";

export const matchService = {
  getTodayMatches: async () => {
    const res = await api.get("/matches/today");
    return res.data as Match[];
  },
  getMatchesByRound: async (round: number): Promise<Match[]> => {
    const res = await api.get(`/matches/round/${round}`);
    return res.data;
  },
  getNextMatch: async (): Promise<Match> => {
    const res = await api.get("/matches/next");
    return res.data;
  },
};