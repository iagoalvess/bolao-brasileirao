import React from "react";
import { useQuery } from "@tanstack/react-query";
import { authService, User } from "@/services/userService";
import { useNavigate } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import PageHeader from "@/components/PageHeader";
import PageFooter from "@/components/PageFooter";
import RankingCard from "@/components/Ranking/RankingCard";
import { useGroups } from "@/hooks/useGroups";
import { groupService } from "@/services/groupService";

const RankingPage = () => {
  const navigate = useNavigate();
  const { currentGroup } = useGroups();

  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["group-users", currentGroup?.id],
    queryFn: async () => {
      if (!currentGroup) return [];
      const memberIds = await groupService.getMemberIds(currentGroup.id);
      const memberPromises = memberIds.map((id) => authService.getUserById(id));
      return Promise.all(memberPromises);
    },
    retry: false,
    enabled: !!currentGroup?.id,
  });

  const ranking = React.useMemo(() => {
    if (!users) return [];
    return users
      .map((user: User) => ({
        id: user.id,
        username: user.username,
        total_points: user.total_points,
        team: user.team,
      }))
      .sort((a, b) => b.total_points - a.total_points);
  }, [users]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-soccer-field via-soccer-green to-soccer-yellow p-6">
        <div className="w-full mx-auto flex-grow flex flex-col">
          <PageHeader showBackButton onBackClick={() => navigate("/home")} />
          <RankingCard ranking={ranking} isLoading={isLoading} error={error} />
        </div>

        <PageFooter />
      </div>
    </ProtectedRoute>
  );
};

export default RankingPage;
