interface Props {
  homeValue: string;
  awayValue: string;
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
  return (
    <div className="flex gap-1 items-center">
      <input
        type="text"
        inputMode="numeric"
        value={homeValue}
        onChange={(e) => onChangeHome(e.target.value.replace(/[^0-9]/g, ""))}
        className="w-10 rounded-md border border-gray-300 text-center"
        maxLength={2}
        disabled={disabled}
      />
      <span className="mx-1 font-bold">x</span>
      <input
        type="text"
        inputMode="numeric"
        value={awayValue}
        onChange={(e) => onChangeAway(e.target.value.replace(/[^0-9]/g, ""))}
        className="w-10 rounded-md border border-gray-300 text-center"
        maxLength={2}
        disabled={disabled}
      />
    </div>
  );
};

export default MatchScoreInput;
