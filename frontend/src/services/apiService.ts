import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('@bolao:token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });