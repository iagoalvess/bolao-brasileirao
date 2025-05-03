import React, { useEffect, useState } from "react";
import { FaFutbol } from "react-icons/fa";
import { matchService, Match } from "@/services/matchService";

const WelcomeCard = () => {
  const [nextMatch, setNextMatch] = useState<Match | null>(null);

  useEffect(() => {
    const fetchNextMatch = async () => {
      try {
        const match = await matchService.getNextMatch();
        setNextMatch(match);
      } catch (error) {
        console.error("Erro ao buscar próxima partida:", error);
      }
    };

    fetchNextMatch();
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl p-8 border border-white/10 shadow-xl bg-[url('/stadium-pattern.svg')] bg-cover">
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-soccer-green/20 backdrop-blur-sm" />
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
        <div className="p-4 bg-soccer-yellow/30 rounded-2xl shadow-lg animate-float">
          <FaFutbol size={48} className="text-soccer-yellow" />
        </div>

        <div className="text-center md:text-left flex-1">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Bem-vindo ao{" "}
            <span className="text-soccer-yellow">Bolão do Futebol</span>
          </h1>
          <div className="max-w-2xl mx-auto md:mx-0">
            <p className="text-lg text-white/90 leading-relaxed">
              Junte-se à comunidade mais animada do futebol brasileiro!
              <span className="block mt-2 text-soccer-yellow font-semibold">
                Próximo jogo:{" "}
                {nextMatch
                  ? `${nextMatch.home_team} vs. ${
                      nextMatch.away_team
                    } - ${new Date(
                      nextMatch.match_date
                    ).toLocaleDateString()} ${new Date(
                      nextMatch.match_date
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}`
                  : "Carregando..."}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;
