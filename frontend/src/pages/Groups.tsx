import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGroups } from "@/hooks/useGroups";
import PageHeader from "@/components/PageHeader";
import ProtectedRoute from "@/components/ProtectedRoute";
import CurrentGroup from "@/components/Groups/CurrentGroup";
import CreateGroup from "@/components/Groups/CreateGroup";
import GroupList from "@/components/Groups/GroupList";
import { Loader2 } from "lucide-react";

const GroupsPage = () => {
  const navigate = useNavigate();
  const {
    groups,
    isGroupsLoading,
    isMyGroupFetching,
    refetchMyGroup,
    currentGroup,
    createGroup,
    joinGroup,
    leaveGroup,
    joiningGroupId,
    isLeavingGroup,
  } = useGroups();

  const [newGroupName, setNewGroupName] = useState("");

  useEffect(() => {
    refetchMyGroup();
  }, []);

  if (isMyGroupFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-soccer-green via-soccer-field to-soccer-yellow">
        <div className="flex flex-col items-center bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-xl">
          <Loader2 className="h-8 w-8 text-white animate-spin mb-4" />
          <span className="text-white text-lg font-semibold">
            Carregando grupo...
          </span>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-soccer-field via-soccer-green to-soccer-yellow p-6">
        <div className="max-w-3xl mx-auto">
          <PageHeader showBackButton onBackClick={() => navigate("/home")} />

          {currentGroup ? (
            <CurrentGroup groupName={currentGroup.name} groupId={currentGroup.id} onLeave={leaveGroup} isLeaving={isLeavingGroup} />
          ) : (
            <>
              <CreateGroup
                newGroupName={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                onCreate={() => {
                  if (newGroupName.trim()) {
                    createGroup(newGroupName.trim());
                    setNewGroupName("");
                  }
                }}
              />

              <GroupList
                groups={groups}
                isLoading={isGroupsLoading}
                onJoin={joinGroup}
                joiningGroupId={joiningGroupId}
              />
            </>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default GroupsPage;
