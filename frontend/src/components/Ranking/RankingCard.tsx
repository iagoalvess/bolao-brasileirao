import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RankingTable from "./RankingTable";

interface RankingCardProps {
  ranking: any[];
  isLoading: boolean;
  error: any;
}

const RankingCard = ({ ranking, isLoading, error }: RankingCardProps) => (
  <Card className="shadow-2xl border-2 border-soccer-yellow bg-white/95 rounded-xl">
    <CardHeader>
      <CardTitle className="text-3xl font-semibold text-soccer-black drop-shadow-sm">
        Ranking de Pontuadores
      </CardTitle>
    </CardHeader>
    <CardContent className="overflow-x-auto">
      {isLoading ? (
        <div className="text-center py-8 text-lg text-gray-600">
          Carregando ranking...
        </div>
      ) : error ? (
        <div className="text-center text-red-600 py-8 text-lg">
          {(error as any)?.response?.data?.detail || "Erro ao carregar dados."}
        </div>
      ) : (
        <RankingTable ranking={ranking} />
      )}
    </CardContent>
  </Card>
);

export default RankingCard;
