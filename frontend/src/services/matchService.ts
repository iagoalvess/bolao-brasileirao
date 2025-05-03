import axios from "axios";
import { api } from "./apiService";

export interface Match {
  id: number;
  round: number;
  match_id: string;
  match_date: string;
  home_team: string;
  away_team: string;
  status: string;
  home_score: number | null;
  away_score: number | null;
  stadium?: string | null;
  city?: string | null;
  state?: string | null;
  broadcasters?: string | null;
}

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