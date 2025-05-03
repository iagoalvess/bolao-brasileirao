import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { newsService, NewsItem } from "@/services/newsService";
import {
  FaNewspaper,
  FaCalendarAlt,
  FaUser,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";

const NewsDashboard = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await newsService.getFeaturedNews(5);
      setNews(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Falha ao carregar notícias"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="bg-soccer-black/70 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-soccer-yellow/30 rounded-xl shadow-md">
          <FaNewspaper className="text-soccer-yellow text-2xl" />
        </div>
        <h2 className="text-2xl font-bold text-white drop-shadow-sm">
          Destaques do Momento
        </h2>
      </div>

      <div className="space-y-4">
        {news.map((item) => (
          <a
            key={item.link}
            href={item.link}
            className="group block rounded-xl bg-soccer-black/60 hover:bg-soccer-green/5 transition-all p-5 border border-white/10 hover:border-soccer-yellow/30"
          >
            <div className="flex items-start gap-4">
              <div className="p-2 bg-soccer-yellow/10 rounded-lg">
                <FaNewspaper className="text-soccer-yellow text-xl" />
              </div>

              <div className="flex-1">
                <h3 className="text-white text-lg font-semibold group-hover:text-soccer-yellow transition-colors">
                  {item.title}
                </h3>

                <div className="flex flex-wrap items-center gap-4 mt-1 text-sm text-white/60">
                  <div className="flex items-center gap-1">
                    <FaCalendarAlt className="opacity-70" />
                    <span>{item.date}</span>
                  </div>

                  {item.author && (
                    <div className="flex items-center gap-1">
                      <FaUser className="opacity-70" />
                      <span>{item.author}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 mt-3 text-soccer-blue group-hover:text-soccer-blue/80 transition-colors text-sm font-medium">
                  <span>Leia na íntegra</span>
                  <FaExternalLinkAlt className="text-soccer-yellow" />
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
export default NewsDashboard;
