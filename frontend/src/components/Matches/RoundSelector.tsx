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
    <div className="mb-4">
      <label className="font-semibold mr-2">Selecione a rodada:</label>
      <select
        value={selectedRound}
        onChange={(e) => onChange(Number(e.target.value))}
        className="border border-gray-300 rounded px-2 py-1"
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
