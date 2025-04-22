import React from "react";
import { useQuery } from "@tanstack/react-query";
import { matchService } from "@/services/matchService";
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

const Ranking = () => {
  const navigate = useNavigate();

  const {
    data: users,
    isLoading: loadingUsers,
    error: errorUsers,
  } = useQuery({
    queryKey: ["all-users"],
    queryFn: matchService.getAllUsers,
    retry: false,
  });

  const ranking = React.useMemo(() => {
    if (!users) return [];

    return users
      .map((user) => ({
        id: user.id,
        username: user.username,
        pontos: user.total_points,
      }))
      .sort((a, b) => b.pontos - a.pontos);
  }, [users]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-soccer-field to-soccer-green p-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="shadow-lg border-2 border-soccer-yellow mb-8">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="text-2xl">Ranking de Pontuadores</CardTitle>
              <Button
                variant="default"
                className="sm:items-right border-soccer-yellow hover:bg-soccer-green hover:text-yellow-400"
                onClick={() => navigate("/home")}
              >
                Voltar
              </Button>
            </CardHeader>
            <CardContent>
              {loadingUsers ? (
                <div className="text-center py-6">Carregando ranking...</div>
              ) : errorUsers ? (
                <div className="text-center text-red-600 py-6">
                  {(errorUsers as any)?.response?.data?.detail ||
                    "Erro ao carregar dados."}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Posição</TableHead>
                      <TableHead>Usuário</TableHead>
                      <TableHead>Pontos</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ranking.map((user, idx) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-bold">{idx + 1}º</TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.pontos}</TableCell>
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
