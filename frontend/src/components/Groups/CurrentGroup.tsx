import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { groupService } from "@/services/groupService";
import { authService, User } from "@/services/userService";

interface CurrentGroupProps {
  groupName: string;
  groupId: number;
  onLeave: () => void;
  isLeaving: boolean;
}

const CurrentGroup: React.FC<CurrentGroupProps> = ({
  groupName,
  groupId,
  onLeave,
  isLeaving,
}) => {
  const [members, setMembers] = useState<User[]>([]);
  const [isLoadingMembers, setIsLoadingMembers] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const memberIds = await groupService.getMemberIds(groupId);
        const memberPromises = memberIds.map((id) =>
          authService.getUserById(id)
        );
        const users = await Promise.all(memberPromises);
        setMembers(users);
      } catch (error) {
        console.error("Erro ao buscar membros:", error);
      } finally {
        setIsLoadingMembers(false);
      }
    };

    fetchMembers();
  }, [groupId]);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 text-center">
      <h2 className="text-2xl font-semibold mb-4">
        Você está no grupo:{" "}
        <span className="text-soccer-green">{groupName}</span>
      </h2>

      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Membros</h3>
        {isLoadingMembers ? (
          <Loader2 className="h-5 w-5 animate-spin mx-auto text-gray-500" />
        ) : members.length === 0 ? (
          <p className="text-gray-500">Nenhum membro no grupo.</p>
        ) : (
          <ul className="text-gray-700 space-y-1">
            {members.map((user) => (
              <li key={user.id}>{user.username}</li>
            ))}
          </ul>
        )}
      </div>

      <Button
        variant="destructive"
        onClick={onLeave}
        className="mt-4"
        disabled={isLeaving}
      >
        {isLeaving ? (
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Saindo...</span>
          </div>
        ) : (
          "Sair do grupo"
        )}
      </Button>
    </div>
  );
};

export default CurrentGroup;
