
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { authService } from '@/services/api';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signUp: (username: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('@bolao:token');
    const storedUser = localStorage.getItem('@bolao:user');

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  async function signIn(username: string, password: string) {
    try {
      setLoading(true);
      const response = await authService.login(username, password);
      
      const { access_token } = response;
      
      // Idealmente, você buscaria as informações completas do usuário aqui
      // Como estamos simplificando, vamos criar um usuário básico
      const userData = {
        id: 'user-id', // Na implementação real, você teria o ID do usuário
        username,
        email: '', // Na implementação real, você teria o email do usuário
      };
      
      localStorage.setItem('@bolao:token', access_token);
      localStorage.setItem('@bolao:user', JSON.stringify(userData));
      
      setUser(userData);
      navigate('/dashboard');
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function signUp(username: string, email: string, password: string) {
    try {
      setLoading(true);
      await authService.register(username, email, password);
      // Após o registro, redirecionar para login
      navigate('/login');
    } catch (error) {
      console.error("Erro ao criar conta:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  function signOut() {
    localStorage.removeItem('@bolao:token');
    localStorage.removeItem('@bolao:user');
    setUser(null);
    navigate('/login');
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user,
      loading,
      signIn,
      signUp,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
