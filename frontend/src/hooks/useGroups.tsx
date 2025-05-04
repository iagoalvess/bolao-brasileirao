import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { groupService, Group } from "@/services/groupService";
import { useToast } from "@/components/ui/use-toast";

export const useGroups = () => {
  const [currentGroup, setCurrentGroup] = useState<Group | null>(null);
  const [joiningGroupId, setJoiningGroupId] = useState<number | null>(null);
  const [isLeavingGroup, setIsLeavingGroup] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const {
    data: groups = [],
    isLoading: isGroupsLoading,
    error: groupsError,
  } = useQuery({
    queryKey: ["groups"],
    queryFn: groupService.getAllGroups,
  });

  const {
    data: myGroup,
    isLoading: isMyGroupLoading,
    isFetching: isMyGroupFetching,
    error: myGroupError,
    refetch: refetchMyGroup,
  } = useQuery({
    queryKey: ["my-group"],
    queryFn: groupService.getMyGroup,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  useEffect(() => {
    setCurrentGroup(myGroup ?? null);
  }, [myGroup]);

  const resetGroup = () => {
    setCurrentGroup(null);
    queryClient.removeQueries({ queryKey: ["my-group"] });
  };

  const createGroupMutation = useMutation({
    mutationFn: (name: string) => groupService.createGroup(name),
    onSuccess: (newGroup) => {
      setCurrentGroup(newGroup);
      toast({
        title: "Grupo criado!",
        description: `Você criou o grupo "${newGroup.name}" com sucesso.`,
      });
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
    onError: (err: any) => {
      toast({
        title: "Erro",
        description:
          err?.response?.data?.detail || "Não foi possível criar o grupo.",
        variant: "destructive",
      });
    },
  });

  const joinGroupMutation = useMutation({
    mutationFn: (groupId: number) => groupService.joinGroup(groupId),
    onSuccess: (group) => {
      setCurrentGroup(group);
      toast({
        title: "Entrou no grupo!",
        description: `Agora você faz parte do grupo "${group.name}".`,
      });
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      setJoiningGroupId(null);
    },
    onError: (err: any) => {
      toast({
        title: "Erro",
        description:
          err?.response?.data?.detail || "Não foi possível entrar no grupo.",
        variant: "destructive",
      });
      setJoiningGroupId(null);
    },
    onMutate: (groupId: number) => {
      setJoiningGroupId(groupId);
    },
  });

  const joinGroup = (groupId: number) => {
    joinGroupMutation.mutate(groupId);
  };

  const leaveGroupMutation = useMutation({
    mutationFn: () =>
      currentGroup
        ? groupService.leaveGroup(currentGroup.id)
        : Promise.reject(),
    onMutate: () => {
      setIsLeavingGroup(true);
    },
    onSuccess: () => {
      setCurrentGroup(null);
      toast({
        title: "Saiu do grupo",
        description: "Você saiu do grupo com sucesso.",
      });
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      setIsLeavingGroup(false);
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível sair do grupo.",
        variant: "destructive",
      });
      setIsLeavingGroup(false);
    },
  });

  return {
    groups,
    isGroupsLoading,
    currentGroup,
    createGroup: createGroupMutation.mutate,
    joinGroup,
    leaveGroup: leaveGroupMutation.mutate,
    isMyGroupLoading,
    isMyGroupFetching,
    joiningGroupId,
    resetGroup,
    refetchMyGroup,
    isLeavingGroup,
    groupsError,
    myGroupError,
  };
};
