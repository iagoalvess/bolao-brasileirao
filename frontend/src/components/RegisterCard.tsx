import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import RegisterForm from "./RegisterForm";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

interface RegisterCardProps {
  onRegister: (
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => void;
  loading: boolean;
}

const RegisterCard = ({ onRegister, loading }: RegisterCardProps) => {
  return (
    <Card className="shadow-xl border-2 border-soccer-yellow">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-soccer-black flex justify-center items-center gap-2">
          <UserPlus size={28} />
          Crie sua conta
        </CardTitle>
        <CardDescription className="text-lg">
          Cadastre-se no Bolão de Futebol
        </CardDescription>
      </CardHeader>

      <CardContent>
        <RegisterForm onSubmit={onRegister} loading={loading} />
      </CardContent>

      <CardFooter className="flex justify-center border-t p-4">
        <p className="text-sm text-muted-foreground">
          Já tem uma conta?{" "}
          <Link
            to="/login"
            className="font-medium text-soccer-blue hover:underline"
          >
            Faça login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default RegisterCard;
