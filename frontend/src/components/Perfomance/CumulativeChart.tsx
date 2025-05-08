import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  data: { round: string; points: number }[];
}

const CumulativeChart = ({ data }: Props) => {
  const cumulativeData = data.reduce((acc, curr, index) => {
    const previousTotal = index > 0 ? acc[index - 1].total : 0;
    return [...acc, { ...curr, total: previousTotal + curr.points }];
  }, [] as Array<{ round: string; points: number; total: number }>);

  return (
    <Card className="border-2 bg-soccer-black/50 rounded-xl border-soccer-yellow/30">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-soccer-yellow drop-shadow-[0_2px_2px_rgba(0,0,0,0.4)]">
          Progressão Acumulada
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={cumulativeData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
            <XAxis
              dataKey="round"
              tick={{ fill: "#fff" }}
              label={{
                value: "Rodada",
                position: "insideBottom",
                offset: -5,
                fill: "#fff",
              }}
            />
            <YAxis tick={{ fill: "#fff" }} />
            <Tooltip
              contentStyle={{ backgroundColor: "#222", border: "none" }}
              labelStyle={{ color: "#fff" }}
              itemStyle={{ color: "#34D399" }}
            />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#34D399"
              strokeWidth={2}
              dot={{ fill: "#34D399", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CumulativeChart;
