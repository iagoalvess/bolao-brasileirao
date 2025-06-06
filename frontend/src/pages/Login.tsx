import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import LoginCard from '@/components/Login/LoginCard';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const { toast } = useToast();

  const handleLogin = async (username: string, password: string) => {
    try {
      setLoading(true);
      await signIn(username, password);
    } catch (error) {
      toast({
        title: "Erro no login",
        description: "Usuário ou senha incorretos. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-soccer-field via-soccer-green to-soccer-yellow p-6">
      <div className="w-full max-w-md">
        <LoginCard onLogin={handleLogin} loading={loading} />
      </div>
    </div>
  );
};

export default LoginPage;
