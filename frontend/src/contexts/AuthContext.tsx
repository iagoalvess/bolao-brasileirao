import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { authService } from "@/services/userService";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
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
    const token = localStorage.getItem("@bolao:token");
    const storedUser = localStorage.getItem("@bolao:user");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  async function signIn(username: string, password: string) {
    try {
      setLoading(true);
      const { access_token, refresh_token } = await authService.login(
        username,
        password
      );

      if (!access_token || !refresh_token) {
        throw new Error("Tokens não recebidos");
      }

      localStorage.setItem("@bolao:token", access_token);
      localStorage.setItem("@bolao:refresh_token", refresh_token);

      const userResponse = await authService.getMe(access_token);

      const userData = {
        id: userResponse.id,
        username: userResponse.username,
        email: userResponse.email,
      };

      localStorage.setItem("@bolao:user", JSON.stringify(userData));

      setUser(userData);
      navigate("/home");
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
      navigate("/login");
    } catch (error) {
      console.error("Erro ao criar conta:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  function signOut() {
    localStorage.removeItem("@bolao:token");
    localStorage.removeItem("@bolao:user");
    setUser(null);
    navigate("/login");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
