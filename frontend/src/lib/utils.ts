import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calcularPontuacao(
  resultado: { home: number; away: number },
  palpite: { home: number; away: number }
) {
  if (resultado.home === palpite.home && resultado.away === palpite.away)
    return 10;
  if (resultado.home - resultado.away === palpite.home - palpite.away) return 5;
  if (
    (resultado.home > resultado.away && palpite.home > palpite.away) ||
    (resultado.home < resultado.away && palpite.home < palpite.away) ||
    (resultado.home === resultado.away && palpite.home === palpite.away)
  )
    return 3;
  return 0;
}