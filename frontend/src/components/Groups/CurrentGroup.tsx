import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { groupService } from "@/services/groupService";
import { authService, User } from "@/services/userService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <div className="min-h-screen bg-gradient-to-br from-soccer-field via-soccer-green to-soccer-yellow p-6">
      <div className="max-w-6xl mx-auto">
        <Card className="bg-soccer-black/70 backdrop-blur-md border border-white/10 shadow-xl rounded-2xl mt-6">
          <CardHeader className="pb-4 border-b border-white/10">
            <CardTitle className="text-2xl font-semibold text-white drop-shadow">
              Você está no grupo:{" "}
              <span className="text-soccer-yellow/80 text-xg font-bold">{groupName}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center text-white py-4">
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Membros</h3>
              {isLoadingMembers ? (
                <Loader2 className="h-5 w-5 animate-spin mx-auto text-gray-500" />
              ) : members.length === 0 ? (
                <p className="text-gray-500">Nenhum membro no grupo.</p>
              ) : (
                <ul className="text-soccer-yellow/80 space-y-1">
                  {members.map((user) => (
                    <li key={user.id}>{user.username}</li>
                  ))}
                </ul>
              )}
            </div>

            <Button
              variant="destructive"
              onClick={onLeave}
              className="mt-4 bg-red-600 hover:bg-red-700"
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CurrentGroup;
