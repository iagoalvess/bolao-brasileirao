import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const WelcomeCard = () => (
  <Card className="shadow-2xl border-2 border-soccer-yellow bg-white/95 rounded-xl">
    <CardHeader>
      <CardTitle className="text-3xl font-semibold text-soccer-black">
        Bem-vindo ao Bolão!
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4 text-lg text-gray-800">
      <p>
        Sistema desenvolvido durante a disciplina de Engenharia de Software II.
      </p>
      <p>
        O bolão do futebol busca permitir que amantes do futebol se reúnam para
        palpitar no Brasileirão.
      </p>
    </CardContent>
  </Card>
);

export default WelcomeCard;
