import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { teams } from "@/data/teams";

interface RegisterFormProps {
  onSubmit: (
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    team: string
  ) => void;
  loading: boolean;
}

const RegisterForm = ({ onSubmit, loading }: RegisterFormProps) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [team, setTeam] = useState("");
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validações
    if (!username || !email || !password || !confirmPassword) {
      toast({
        title: "Campos incompletos",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    if (!validateEmail(email)) {
      toast({
        title: "Email inválido",
        description: "Por favor, insira um email válido.",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Senhas não conferem",
        description: "A confirmação de senha não confere com a senha digitada.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Senha muito curta",
        description: "A senha deve ter pelo menos 6 caracteres.",
        variant: "destructive",
      });
      return;
    }

    onSubmit(username, email, password, confirmPassword, team);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username" className="text-sm font-medium">
          Nome de usuário
        </Label>
        <div className="relative">
          <User
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Escolha um nome de usuário"
            className="border-gray-300 pl-10"
            disabled={loading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">
          Email
        </Label>
        <div className="relative">
          <Mail
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu melhor email"
            className="border-gray-300 pl-10"
            disabled={loading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Escolha seu time</Label>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-5">
          {teams.map((t) => (
            <button
              key={t.name}
              type="button"
              onClick={() => setTeam(t.name)}
              className={`border rounded p-1 text-xs hover:bg-gray-100 ${team === t.name ? "border-blue-500 bg-blue-50" : "border-gray-200"
                }`}
            >
              <img src={t.icon} alt={t.name} className="h-8 mx-auto" />
              <span className="block text-center truncate mt-1">{t.name}</span>
            </button>
          ))}
        </div>
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
            placeholder="Crie uma senha segura"
            className="border-gray-300 pr-10"
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

      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-sm font-medium">
          Confirme sua senha
        </Label>
        <Input
          id="confirmPassword"
          type={showPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Digite a senha novamente"
          className="border-gray-300"
          disabled={loading}
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-soccer-blue hover:bg-blue-700 text-white transition-colors mt-6"
        disabled={loading}
      >
        {loading ? "Cadastrando..." : "Cadastrar"}
      </Button>
    </form>
  );
};

export default RegisterForm;
