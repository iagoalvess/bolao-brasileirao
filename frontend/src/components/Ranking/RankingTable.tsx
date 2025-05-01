import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/services/userService";

interface RankingTableProps {
  ranking: User[];
}

const RankingTable = ({ ranking }: RankingTableProps) => (
  <Table className="min-w-full bg-white rounded-lg shadow-inner text-gray-800">
    <TableHeader>
      <TableRow className="bg-soccer-yellow">
        <TableHead className="px-4 py-3 text-white">Posição</TableHead>
        <TableHead className="px-4 py-3 text-white">Usuário</TableHead>
        <TableHead className="px-4 py-3 text-white">Pontos</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {ranking.map((user, idx) => (
        <TableRow key={user.id} className="hover:bg-soccer-green/10">
          <TableCell className="px-4 py-3 font-bold">{idx + 1}º</TableCell>
          <TableCell className="px-4 py-3">{user.username}</TableCell>
          <TableCell className="px-4 py-3">{user.total_points}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default RankingTable;
