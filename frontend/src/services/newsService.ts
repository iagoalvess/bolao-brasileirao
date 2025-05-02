// src/services/newsService.ts
import { api } from "./apiService";

export interface NewsItem {
 title: string;
 link: string;
 date: string;
 author?: string;
}

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