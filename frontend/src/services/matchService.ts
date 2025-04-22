
import { api } from "./api";

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

export interface User {
  id: number;
  username: string;
  email: string;
  total_points: number;
}

export interface UserPrediction {
  match_id: number;
  home_team_score: number;
  away_team_score: number;
}

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

export const matchService = {
  getTodayMatches: async () => {
    const res = await api.get("/matches/today");
    return res.data as Match[];
  },
  createPrediction: async (data: PredictionPayload) => {
    const res = await api.post("/predictions/", data);
    return res.data;
  },
  getMyPredictions: async () => {
    const res = await api.get("/predictions/me");
    return res.data as Prediction[];
  },
  getAllMatches: async () => {
    const res = await api.get("/matches/");
    return res.data as Match[];
  },
  getAllPredictions: async () => {
    const res = await api.get("/predictions/");
    return res.data as Prediction[];
  },
  getAllUsers: async () => {
    const res = await api.get("/users/");
    return res.data as User[];
  }
};
