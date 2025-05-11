import { api } from "./apiService";
import { Group } from "../types/group";

export const groupService = {
 getAllGroups: async (): Promise<Group[]> => {
  const res = await api.get("/groups/");
  return res.data;
 },

 getGroupById: async (groupId: number): Promise<Group> => {
  const res = await api.get(`/groups/${groupId}`);
  return res.data;
 },

 createGroup: async (name: string): Promise<Group> => {
  const res = await api.post("/groups/", { name });
  return res.data;
 },

 joinGroup: async (groupId: number): Promise<Group> => {
  const res = await api.post(`/groups/${groupId}/join`);
  return res.data;
 },

 leaveGroup: async (groupId: number): Promise<Group> => {
  const res = await api.post(`/groups/${groupId}/leave`);
  return res.data;
 },

 getMemberIds: async (groupId: number): Promise<number[]> => {
  const res = await api.get(`/groups/${groupId}/members`);
  return res.data;
 },

 getMyGroup: async (): Promise<Group | null> => {
  const response = await api.get("/groups/my-group");
  return response.data;
 },
};
