import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaFutbol } from "react-icons/fa";

const WelcomeCard = () => (
  <Card className="shadow-xl border-2 border-soccer-yellow bg-white/90 rounded-3xl transition-all hover:shadow-2xl">
    <CardHeader className="flex items-center space-x-4">
      <FaFutbol size={32} className="text-soccer-yellow" />
      <CardTitle className="text-3xl font-semibold text-soccer-black">
        Bem-vindo ao Bolão!
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4 text-lg text-gray-700">
      <p>
        O bolão do futebol busca permitir que amantes do futebol se reúnam para
        palpitar no Brasileirão.
      </p>
    </CardContent>
  </Card>
);

export default WelcomeCard;
