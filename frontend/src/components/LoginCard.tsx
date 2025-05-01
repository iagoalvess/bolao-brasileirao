import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import LoginForm from "./LoginForm";
import { Link } from "react-router-dom";

interface LoginCardProps {
  onLogin: (username: string, password: string) => void;
  loading: boolean;
}

const LoginCard = ({ onLogin, loading }: LoginCardProps) => {
  return (
    <Card className="shadow-xl border-2 border-soccer-yellow">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-soccer-black">
          Bolão de Futebol
        </CardTitle>
        <CardDescription className="text-lg">Acesse sua conta</CardDescription>
      </CardHeader>

      <CardContent>
        <LoginForm onSubmit={onLogin} loading={loading} />
      </CardContent>

      <CardFooter className="flex justify-center border-t p-4">
        <p className="text-sm text-muted-foreground">
          Não tem uma conta?{" "}
          <Link
            to="/register"
            className="font-medium text-soccer-blue hover:underline"
          >
            Cadastre-se
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginCard;
