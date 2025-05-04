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
  <div className="bg-white shadow-md rounded-lg p-6">
    <h2 className="text-xl font-semibold mb-4">Grupos existentes</h2>
    {isLoading ? (
      <p>Carregando grupos...</p>
    ) : groups.length === 0 ? (
      <p>Nenhum grupo disponível.</p>
    ) : (
      <ul className="space-y-2">
        {groups.map((group) => (
          <li
            key={group.id}
            className="flex justify-between items-center border-b pb-2"
          >
            <span className="font-medium text-gray-700">{group.name}</span>
            <Button
              onClick={() => onJoin(group.id)}
              variant="default"
              size="sm"
              className="transition-all duration-200 hover:bg-primary/90 active:scale-95 shadow-sm"
              disabled={joiningGroupId === group.id}
            >
              {joiningGroupId === group.id ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-white" />
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
