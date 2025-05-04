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
  const now = new Date();
  const matchDate = new Date(match.match_date);
  const hasStarted = matchDate <= now;
  const isFinished = match.status === "FINISHED";
  const isUnavailable = isFinished || hasStarted;

  const renderTeamLogo = (team: string) => {
    const formattedTeamName = team
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "_")
      .replace(/[^\w\s]/g, "");

    const teamLogoPath = `/icons/${formattedTeamName}.png`;

    return (
      <img src={teamLogoPath} alt={team} className="w-8 h-8 object-contain" />
    );
  };

  return (
    <TableRow className="hover:bg-white/5 transition-colors">
      <TableCell className="text-white/90 text-sm whitespace-nowrap text-center">
        {matchDate.toLocaleString("pt-BR", {
          weekday: "short",
          day: "2-digit",
          month: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </TableCell>

      <TableCell className="text-white/90 text-sm">
        <div className="flex items-center gap-2">
          {renderTeamLogo(match.home_team)}
          <span className="truncate">{match.home_team}</span>
        </div>
      </TableCell>

      <TableCell className="text-white/90 text-sm">
        <div className="flex items-center gap-2">
          {renderTeamLogo(match.away_team)}
          <span className="truncate">{match.away_team}</span>
        </div>
      </TableCell>

      <TableCell className="text-white text-center font-medium">
        {isFinished ? (
          <span className="text-green-400">
            {match.home_score} x {match.away_score}
          </span>
        ) : (
          <span className="text-xs italic text-white/60">Aguardando</span>
        )}
      </TableCell>

      <TableCell className="text-white text-left">
        {isUnavailable ? (
          savedPrediction ? (
            <span className="text-sm text-white/80">
              {savedPrediction.home_team_score} x{" "}
              {savedPrediction.away_team_score}
            </span>
          ) : (
            <span className="text-sm italic text-white/50">Sem palpite</span>
          )
        ) : (
          <MatchScoreInput
            disabled={predicted || isPending || isUnavailable}
            homeValue={
              predicted
                ? savedPrediction?.home_team_score || 0
                : Number(predictionInput?.home_team_score) || 0
            }
            awayValue={
              predicted
                ? savedPrediction?.away_team_score || 0
                : Number(predictionInput?.away_team_score) || 0
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

      <TableCell className="text-center">
        {!isUnavailable ? (
          <Button
            onClick={onPalpite}
            disabled={predicted || isPending}
            className={`text-white px-3 py-1 text-sm font-medium ${
              predicted
                ? "bg-soccer-blue/20 cursor-default"
                : "bg-soccer-blue hover:bg-soccer-blue/80"
            }`}
          >
            {predicted ? "Palpite enviado" : "Palpitar"}
          </Button>
        ) : (
          <span className="text-xs text-white/50 italic">
            {isFinished ? "Finalizado" : "Em andamento"}
          </span>
        )}
      </TableCell>
    </TableRow>
  );
};

export default MatchRow;
