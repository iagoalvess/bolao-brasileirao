
import { statisticsService } from "@/services/statsService";
import React from "react";
import { FaFlagCheckered } from "react-icons/fa";

interface RoundSelectorProps {
  selectedRound: number;
  onChange: (round: number) => void;
}

const RoundSelector: React.FC<RoundSelectorProps> = ({
  selectedRound,
  onChange,
}) => {
  return (
    <div className="mb-6 flex items-center gap-4 bg-soccer-black/60 border border-white/10 backdrop-blur-md px-4 py-3 rounded-xl shadow-md">
      <div className="flex items-center gap-2">
        <FaFlagCheckered className="text-soccer-yellow text-xl" />
        <label className="font-semibold text-white text-lg">Rodada:</label>
      </div>

      <select
        value={selectedRound}
        onChange={(e) => onChange(Number(e.target.value))}
        className="bg-soccer-black border border-soccer-yellow/50 text-white text-base rounded-lg py-2 px-4 hover:border-soccer-yellow focus:outline-none focus:ring-2 focus:ring-soccer-yellow transition w-40"
      >
        {Array.from({ length: 38 }, (_, i) => i + 1).map((round) => (
          <option key={round} value={round}>
            Rodada {round}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RoundSelector;
