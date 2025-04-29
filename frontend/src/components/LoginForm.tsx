import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface LoginFormProps {
  onSubmit: (username: string, password: string) => void;
  loading: boolean;
}

const LoginForm = ({ onSubmit, loading }: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      toast({
        title: "Campos incompletos",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    onSubmit(username, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="username" className="text-sm font-medium">
          Usuário
        </Label>
        <Input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Digite seu nome de usuário"
          className="border-gray-300"
          autoComplete="username"
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium">
          Senha
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            className="border-gray-300 pr-10"
            autoComplete="current-password"
            disabled={loading}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-soccer-blue hover:bg-blue-700 text-white transition-colors"
        disabled={loading}
      >
        {loading ? "Entrando..." : "Entrar"}
      </Button>
    </form>
  );
};

export default LoginForm;
