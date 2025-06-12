import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/services/userService";
import { Loader2, Medal } from "lucide-react";
import { useGroups } from "@/hooks/useGroups";
import { useEffect } from "react";
import { teams } from "@/data/teams";

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

const RankingTable = ({ ranking }: RankingTableProps) => {
  const { currentGroup, refetchMyGroup, isMyGroupFetching } = useGroups();

  useEffect(() => {
    refetchMyGroup();
  }, []);

  if (isMyGroupFetching) {
    return (
      <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-md rounded-lg p-4 text-center shadow-md">
        <Loader2 className="h-5 w-5 text-white animate-spin mb-2" />
        <span className="text-white text-sm font-medium">
          Carregando pontuação do grupo...
        </span>
      </div>
    );
  }

  if (!currentGroup) {
    return (
      <div className="text-center mt-10 bg-white/20 rounded-xl p-8 text-white text-lg shadow-lg">
        <p className="mb-4 font-semibold">
          Você não está em nenhum grupo no momento.
        </p>
        <p className="text-sm text-white/70">
          Entre em um grupo para visualizar o ranking dos seus colegas.
        </p>
      </div>
    );
  }

  const getTeamIcon = (teamName?: string) => {
    if (!teamName) return null;
    const team = teams.find(
      (t) => t.name.toLowerCase() === teamName.toLowerCase()
    );
    return team?.icon || null;
  };

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">
        Ranking do grupo{" "}
        <span className="text-soccer-yellow">{currentGroup.name}</span>
      </h2>
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
                <div className="flex items-center gap-2">
                  {getTeamIcon(user.team) && (
                    <img
                      src={getTeamIcon(user.team)}
                      alt={`Ícone do ${user.team}`}
                      className="w-8 h-8 object-contain"
                    />
                  )}
                  <span>{user.username}</span>
                </div>
              </TableCell>

              <TableCell className="px-6 py-4 text-lg font-bold text-soccer-yellow">
                {user.total_points}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RankingTable;
