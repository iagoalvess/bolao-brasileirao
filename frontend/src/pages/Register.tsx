import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import RegisterCard from "@/components/Register/RegisterCard";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const { toast } = useToast();

  const handleRegister = async (
    username: string,
    email: string,
    password: string,
    team: string,
    confirmPassword: string
  ) => {
    try {
      setLoading(true);
      await signUp(username, email, password, team);
      toast({
        title: "Conta criada com sucesso!",
        description: "Você já pode fazer login com suas credenciais.",
      });
    } catch (error: any) {
      let errorMessage = "Erro ao criar a conta. Tente novamente.";

      if (error.response && error.response.data) {
        if (error.response.data.detail === "Email já registrado") {
          errorMessage = "Este email já está sendo usado.";
        } else if (error.response.data.detail === "Usuário já registrado") {
          errorMessage = "Este nome de usuário já está sendo usado.";
        }
      }

      toast({
        title: "Erro no cadastro",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-soccer-field via-soccer-green to-soccer-yellow p-6">
      <div className="w-full max-w-md">
        <RegisterCard onRegister={handleRegister} loading={loading} />
      </div>
    </div>
  );
};

export default RegisterPage;
