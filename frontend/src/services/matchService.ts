
import { api } from "./userService";

export interface Match {
  id: number;
  home_team: string;
  away_team: string;
  match_date: string;
  status: string;
  scoreboard: {
    home: number;
    visitor: number;
  } | null;
}

export const matchService = {
  getTodayMatches: async () => {
    const res = await api.get("/matches/today");
    return res.data as Match[];
  },
  getAllMatches: async () => {
    const res = await api.get("/matches/");
    return res.data as Match[];
  }
};