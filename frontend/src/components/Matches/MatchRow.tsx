import { Match } from "@/types/match";
import { Prediction } from "@/types/prediction";
import { TableRow, TableCell } from "@/components/ui/table";
import MatchScoreInput from "./MatchScoreInput";
import { Button } from "@/components/ui/button";

interface MatchRowProps {
  match: Match;
  predicted: boolean;
  savedPrediction?: Prediction;
  predictionInput?: { home_team_score: string; away_team_score: string };
  isPending: boolean;
  onChange: (
    matchId: number,
    field: "home_team_score" | "away_team_score",
    value: string
  ) => void;
  onPalpite: () => void;
}

const MatchRow: React.FC<MatchRowProps> = ({
  match,
  predicted,
  savedPrediction,
  predictionInput,
  isPending,
  onChange,
  onPalpite,
}) => {
  const isFinished = match.status === "FINISHED";

  return (
    <TableRow>
      <TableCell>
        {new Date(match.match_date).toLocaleString("pt-BR", {
          weekday: "long",
          day: "2-digit",
          month: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </TableCell>

      <TableCell>{match.home_team}</TableCell>
      <TableCell>{match.away_team}</TableCell>

      <TableCell>
        {isFinished ? (
          <div className="font-semibold">
            {match.home_score} x {match.away_score}
          </div>
        ) : (
          <span className="text-xs text-gray-500 italic">Aguardando</span>
        )}
      </TableCell>

      <TableCell>
        {isFinished ? (
          savedPrediction ? (
            <div className="text-sm text-gray-800">
              {savedPrediction.home_team_score} x{" "}
              {savedPrediction.away_team_score}
            </div>
          ) : (
            <span className="text-xs text-gray-500 italic">Sem palpite</span>
          )
        ) : (
          <MatchScoreInput
            disabled={predicted || isPending}
            homeValue={
              predicted
                ? String(savedPrediction?.home_team_score ?? "")
                : predictionInput?.home_team_score || ""
            }
            awayValue={
              predicted
                ? String(savedPrediction?.away_team_score ?? "")
                : String(predictionInput?.away_team_score ?? "")
            }
            onChangeHome={(value) =>
              onChange(match.id, "home_team_score", value)
            }
            onChangeAway={(value) =>
              onChange(match.id, "away_team_score", value)
            }
          />
        )}
      </TableCell>

      <TableCell>
        {!isFinished ? (
          <Button
            onClick={onPalpite}
            disabled={predicted || isPending}
            className="bg-soccer-blue text-white"
          >
            {predicted ? "Palpite enviado" : "Palpitar"}
          </Button>
        ) : (
          <span className="ml-2 text-xs text-gray-500">Finalizado</span>
        )}
      </TableCell>
    </TableRow>
  );
};

export default MatchRow;
