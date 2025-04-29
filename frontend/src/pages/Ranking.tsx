import React from "react";
import { useQuery } from "@tanstack/react-query";
import { authService, User } from "@/services/userService";
import { useNavigate } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import PageHeader from "@/components/PageHeader";
import RankingCard from "@/components/RankingCard";

const RankingPage = () => {
  const navigate = useNavigate();

  const { data: users, isLoading, error } = useQuery({
    queryKey: ["all-users"],
    queryFn: authService.getUsers,
    retry: false,
  });

  const ranking = React.useMemo(() => {
    if (!users) return [];
    return users
      .map((user: User) => ({
        id: user.id,
        username: user.username,
        pontos: user.total_points,
      }))
      .sort((a, b) => b.pontos - a.pontos);
  }, [users]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-soccer-field via-soccer-green to-soccer-yellow p-6">
        <div className="max-w-6xl mx-auto">
          <PageHeader showBackButton onBackClick={() => navigate("/home")} />
          <RankingCard ranking={ranking} isLoading={isLoading} error={error} />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default RankingPage;
