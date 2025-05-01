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
      return "text-yellow-500";
    case 1:
      return "text-gray-400";
    case 2:
      return "text-orange-500";
    default:
      return "text-gray-700";
  }
};

const RankingTable = ({ ranking }: RankingTableProps) => (
  <Table className="min-w-full bg-white rounded-2xl shadow-lg text-gray-800 overflow-hidden">
    <TableHeader>
      <TableRow className="bg-gradient-to-r from-soccer-yellow to-soccer-green">
        <TableHead className="px-6 py-4 text-white text-lg">Posição</TableHead>
        <TableHead className="px-6 py-4 text-white text-lg">Usuário</TableHead>
        <TableHead className="px-6 py-4 text-white text-lg">Pontos</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {ranking.map((user, idx) => (
        <TableRow
          key={user.id}
          className="hover:bg-soccer-green/10 transition-colors duration-200"
        >
          <TableCell
            className={`px-6 py-4 font-bold flex items-center gap-2 ${getPositionStyle(
              idx
            )}`}
          >
            {idx < 3 && <Medal size={20} className={getPositionStyle(idx)} />}
            {idx + 1}º
          </TableCell>
          <TableCell className="px-6 py-4 text-lg font-medium">
            {user.username}
          </TableCell>
          <TableCell className="px-6 py-4 text-lg">
            {user.total_points}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default RankingTable;
