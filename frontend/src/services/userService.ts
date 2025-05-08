import { api } from "./apiService";

export interface User {
  id: number;
  username: string;
  email: string;
  total_points: number;
}

export const authService = {
  login: async (username: string, password: string) => {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);

    const response = await api.post('/users/login', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data;
  },

  register: async (username: string, email: string, password: string, team?: string) => {
    const response = await api.post('/users/', {
      username,
      email,
      password,
      team,
    });
    return response.data;
  },

  getUsers: async () => {
    const response = await api.get('/users/');
    return response.data as User[];
  },

  getMe: async (token: string) => {
    const response = await api.get('/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  getUserById: async (userId: number): Promise<User> => {
    const res = await api.get(`/users/${userId}`);
    return res.data;
  },
};