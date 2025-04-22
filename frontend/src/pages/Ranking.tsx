import React from "react";
import { useQuery } from "@tanstack/react-query";
import { authService, User } from "@/services/userService";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ProtectedRoute from "@/components/ProtectedRoute";
import PageHeader from "@/components/PageHeader";

const Ranking = () => {
  const navigate = useNavigate();

  const {
    data: users,
    isLoading: loadingUsers,
    error: errorUsers,
  } = useQuery({
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
          <Card className="shadow-2xl border-2 border-soccer-yellow bg-white/95 rounded-xl">
            <CardHeader>
              <CardTitle className="text-3xl font-semibold text-soccer-black drop-shadow-sm">
                Ranking de Pontuadores
              </CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              {loadingUsers ? (
                <div className="text-center py-8 text-lg text-gray-600">
                  Carregando ranking...
                </div>
              ) : errorUsers ? (
                <div className="text-center text-red-600 py-8 text-lg">
                  {(errorUsers as any)?.response?.data?.detail ||
                    "Erro ao carregar dados."}
                </div>
              ) : (
                <Table className="min-w-full bg-white rounded-lg shadow-inner text-gray-800">
                  <TableHeader>
                    <TableRow className="bg-soccer-yellow">
                      <TableHead className="px-4 py-3 text-white">
                        Posição
                      </TableHead>
                      <TableHead className="px-4 py-3 text-white">
                        Usuário
                      </TableHead>
                      <TableHead className="px-4 py-3 text-white">
                        Pontos
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ranking.map((user, idx) => (
                      <TableRow
                        key={user.id}
                        className="hover:bg-soccer-green/10"
                      >
                        <TableCell className="px-4 py-3 font-bold">
                          {idx + 1}º
                        </TableCell>
                        <TableCell className="px-4 py-3">
                          {user.username}
                        </TableCell>
                        <TableCell className="px-4 py-3">
                          {user.pontos}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Ranking;
