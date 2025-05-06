interface Props {
  homeValue: number;
  awayValue: number;
  onChangeHome: (val: string) => void;
  onChangeAway: (val: string) => void;
  disabled?: boolean;
}

const MatchScoreInput: React.FC<Props> = ({
  homeValue,
  awayValue,
  onChangeHome,
  onChangeAway,
  disabled,
}) => {
  const handleHomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 2);
    onChangeHome(
      value && !isNaN(Number(value)) ? parseInt(value, 10).toString() : "0"
    );
  };

  const handleAwayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 2);
    onChangeAway(
      value && !isNaN(Number(value)) ? parseInt(value, 10).toString() : "0"
    );
  };

  return (
    <div className="flex gap-1 items-center">
      <input
        type="text"
        inputMode="numeric"
        value={homeValue}
        onChange={handleHomeChange}
        className="w-8 h-7 rounded border border-white/20 text-center bg-transparent text-sm text-white appearance-none leading-tight focus:ring-1 focus:ring-soccer-yellow focus:outline-none disabled:opacity-40"
        disabled={disabled}
        maxLength={2}
      />
      <span className="mx-1 text-xs text-white/80 font-semibold">x</span>
      <input
        type="text"
        inputMode="numeric"
        value={awayValue}
        onChange={handleAwayChange}
        className="w-8 h-7 rounded border border-white/20 text-center bg-transparent text-sm text-white appearance-none leading-tight focus:ring-1 focus:ring-soccer-yellow focus:outline-none disabled:opacity-40"
        disabled={disabled}
        maxLength={2}
      />
    </div>
  );
};

export default MatchScoreInput;
