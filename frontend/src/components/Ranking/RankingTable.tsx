import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/services/userService";
import { Medal } from "lucide-react";

interface RankingTableProps {
  ranking: User[];
}

const getPositionStyle = (index: number) => {
  switch (index) {
    case 0:
      return "text-soccer-yellow bg-yellow-900/20";
    case 1:
      return "text-gray-300 bg-gray-800/20";
    case 2:
      return "text-orange-400 bg-orange-900/20";
    default:
      return "text-gray-300";
  }
};

const RankingTable = ({ ranking }: RankingTableProps) => (
  <Table className="min-w-full bg-transparent">
    <TableHeader>
      <TableRow className="bg-gradient-to-r from-soccer-green to-soccer-yellow">
        <TableHead className="px-6 py-5 text-white text-lg font-bold text-shadow-sm">
          Posição
        </TableHead>
        <TableHead className="px-6 py-5 text-white text-lg font-bold text-shadow-sm">
          Usuário
        </TableHead>
        <TableHead className="px-6 py-5 text-white text-lg font-bold text-shadow-sm">
          Pontos
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {ranking.map((user, idx) => (
        <TableRow
          key={user.id}
          className={`border-b border-soccer-yellow/10 ${getPositionStyle(
            idx
          )} hover:bg-white/5 transition-all`}
        >
          <TableCell className="px-6 py-4 font-bold flex items-center gap-2">
            <div className="flex items-center gap-3">
              {idx < 3 && (
                <Medal
                  size={24}
                  className="drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]"
                  strokeWidth={2.5}
                />
              )}
              <span className="text-xl font-black">{idx + 1}º</span>
            </div>
          </TableCell>
          <TableCell className="px-6 py-4 text-lg font-medium text-gray-100">
            {user.username}
          </TableCell>
          <TableCell className="px-6 py-4 text-lg font-bold text-soccer-yellow">
            {user.total_points}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default RankingTable;
