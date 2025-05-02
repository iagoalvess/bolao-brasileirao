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
    <Card className="bg-soccer-black/50 border border-soccer-blue/30">
      <CardHeader className="flex flex-row items-center space-y-0 space-x-4">
        <div className="p-2 bg-soccer-blue/20 rounded-lg">
          <FaNewspaper className="text-soccer-blue text-xl" />
        </div>
        <CardTitle className="text-white text-xl">Últimas Notícias</CardTitle>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse space-y-2">
                <div className="h-4 bg-soccer-gray/20 rounded w-3/4" />
                <div className="h-3 bg-soccer-gray/20 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center space-y-4 text-red-400">
            <p>{error}</p>
            <Button
              variant="outline"
              onClick={fetchNews}
              className="border-soccer-blue text-soccer-blue hover:bg-soccer-blue/10"
            >
              Tentar novamente
            </Button>
          </div>
        ) : (
          <div className="space-y-4 text-white/80">
            {news.map((item, index) => (
              <div key={item.link} className="group">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-soccer-blue transition-colors block"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium flex-1 pr-4">
                      {item.title}
                    </span>
                    <FaExternalLinkAlt className="text-sm opacity-70 mt-1" />
                  </div>

                  <div className="flex items-center gap-3 text-sm flex-wrap">
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt className="opacity-60" />
                      <span>{item.date}</span>
                    </div>

                    {item.author && (
                      <div className="flex items-center gap-1">
                        <FaUser className="opacity-60" />
                        <span>{item.author}</span>
                      </div>
                    )}
                  </div>
                </a>

                {index !== news.length - 1 && (
                  <div className="border-t border-soccer-blue/20 my-4" />
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NewsDashboard;
