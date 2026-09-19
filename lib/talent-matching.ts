import { TALENTOS_RECOMENDADOS } from "./mock-data";
import type { RecommendedTalent } from "./types";

export function recomendarTalentos(especialidade: string, quantidade = 3): RecommendedTalent[] {
  return [...TALENTOS_RECOMENDADOS]
    .sort((a, b) => {
      const aCombina = a.especialidades.includes(especialidade) ? 1 : 0;
      const bCombina = b.especialidades.includes(especialidade) ? 1 : 0;
      if (aCombina !== bCombina) return bCombina - aCombina;
      if (b.avaliacao !== a.avaliacao) return b.avaliacao - a.avaliacao;
      return b.nivel - a.nivel;
    })
    .slice(0, quantidade);
}
