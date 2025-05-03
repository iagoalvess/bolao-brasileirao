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
    onChangeHome(value && !isNaN(Number(value)) ? parseInt(value, 10).toString() : "0");
  };
  
  const handleAwayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 2);
    onChangeAway(value && !isNaN(Number(value)) ? parseInt(value, 10).toString() : "0");
  };
  

  return (
    <div className="flex gap-2 items-center">
      <input
        type="integer"
        inputMode="numeric"
        value={homeValue}
        onChange={handleHomeChange}
        className="w-12 h-10 rounded-md border border-gray-300 text-center bg-transparent text-white focus:ring-2 focus:ring-soccer-yellow focus:border-transparent"
        disabled={disabled}
        maxLength={2}
      />
      <span className="mx-1 font-bold text-white">x</span>
      <input
        type="integer"
        inputMode="numeric"
        value={awayValue}
        onChange={handleAwayChange}
        className="w-12 h-10 rounded-md border border-gray-300 text-center bg-transparent text-white focus:ring-2 focus:ring-soccer-yellow focus:border-transparent"
        disabled={disabled}
        maxLength={2}
      />
    </div>
  );
};

export default MatchScoreInput;
