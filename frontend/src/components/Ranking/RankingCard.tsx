import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RankingTable from "./RankingTable";

interface RankingCardProps {
  ranking: any[];
  isLoading: boolean;
  error: any;
}

const RankingCard = ({ ranking, isLoading, error }: RankingCardProps) => (
  <Card className="border-2 bg-soccer-black/50 p-6 rounded-xl border-soccer-yellow/30">
    <CardHeader>
      <CardTitle className="text-3xl font-bold text-soccer-yellow drop-shadow-[0_2px_2px_rgba(0,0,0,0.4)]">
        Ranking de Pontuadores
      </CardTitle>
    </CardHeader>
    <CardContent className="p-0 overflow-hidden">
      {isLoading ? (
        <div className="text-center py-8 text-lg text-soccer-yellow/80">
          Carregando ranking...
        </div>
      ) : error ? (
        <div className="text-center text-red-300 py-8 text-lg">
          {(error as any)?.response?.data?.detail || "Erro ao carregar dados."}
        </div>
      ) : (
        <RankingTable ranking={ranking} />
      )}
    </CardContent>
  </Card>
);

export default RankingCard;
