import React from "react";

interface RoundSelectorProps {
  selectedRound: number;
  onChange: (round: number) => void;
}

const RoundSelector: React.FC<RoundSelectorProps> = ({
  selectedRound,
  onChange,
}) => {
  return (
    <div className="mb-6 flex items-center gap-4">
      <label className="font-semibold text-xl text-soccer-black">Rodada:</label>
      <select
        value={selectedRound}
        onChange={(e) => onChange(Number(e.target.value))}
        className="bg-white border-2 border-soccer-yellow text-lg rounded-lg py-2 px-4 shadow-md hover:bg-soccer-yellow/20 focus:outline-none focus:ring-2 focus:ring-soccer-yellow transition"
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
