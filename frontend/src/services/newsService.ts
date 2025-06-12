// src/services/newsService.ts
import { api } from "./apiService";
import { NewsItem } from "../types/news";

export const newsService = {
 getFootballNews: async (): Promise<NewsItem[]> => {
  const res = await api.get("/news");
  return res.data;
 },

 getFeaturedNews: async (limit: number = 5): Promise<NewsItem[]> => {
  const res = await api.get(`/news/?limit=${limit}`);
  return res.data;
 },
};