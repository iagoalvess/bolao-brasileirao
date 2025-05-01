import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaFutbol } from "react-icons/fa";

const WelcomeCard = () => (
  <div className="relative overflow-hidden bg-soccer-black/50 rounded-2xl p-6 md:p-8 border-2 border-soccer-yellow/30 shadow-xl">
    <div className="flex flex-col md:flex-row items-center gap-6">
      <div className="p-4 bg-soccer-yellow/20 rounded-full animate-pulse">
        <FaFutbol size={40} className="text-soccer-yellow" />
      </div>

      <div className="text-center md:text-left">
        <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-soccer-yellow to-soccer-green">
          Bem-vindo ao Bolão!
        </h1>
        <p className="mt-2 text-white/80 leading-relaxed max-w-2xl">
          O ponto de encontro dos verdadeiros apaixonados por futebol! Palpite
          no Brasileirão, acompanhe resultados e dispute a liderança do ranking.
        </p>
      </div>
    </div>
  </div>
);

export default WelcomeCard;
