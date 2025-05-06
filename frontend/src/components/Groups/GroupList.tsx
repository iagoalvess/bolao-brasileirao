import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface GroupListProps {
  groups: { id: number; name: string }[];
  isLoading: boolean;
  onJoin: (groupId: number) => void;
  joiningGroupId: number | null;
}

const GroupList: React.FC<GroupListProps> = ({
  groups,
  isLoading,
  onJoin,
  joiningGroupId,
}) => (
  <div className="bg-soccer-black/70 backdrop-blur-md border border-white/10 shadow-xl rounded-2xl p-6 text-white">
    <h2 className="text-xl mb-4 text-soccer-yellow/90 drop-shadow font-bold">
      Grupos existentes
    </h2>
    {isLoading ? (
      <p className="text-gray-300">Carregando grupos...</p>
    ) : groups.length === 0 ? (
      <p className="text-gray-300">Nenhum grupo disponível.</p>
    ) : (
      <ul className="space-y-2">
        {groups.map((group) => (
          <li
            key={group.id}
            className="flex justify-between items-center border-b border-white/10 pb-2"
          >
            <span className="text-white font-medium">
              {group.name}
            </span>
            <Button
              onClick={() => onJoin(group.id)}
              variant="default"
              size="sm"
              className="bg-soccer-yellow/80 hover:bg-soccer-yellow/90 text-white shadow-sm transition-all duration-200 active:scale-95"
              disabled={joiningGroupId === group.id}
            >
              {joiningGroupId === group.id ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-black" />
                  <span>Entrando...</span>
                </div>
              ) : (
                "Entrar"
              )}
            </Button>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default GroupList;
