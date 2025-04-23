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

  register: async (username: string, email: string, password: string) => {
    const response = await api.post('/users/', {
      username,
      email,
      password,
    });
    return response.data;
  },

  getUsers: async () => {
    const response = await api.get('/users/');
    return response.data as User[];
  },
};