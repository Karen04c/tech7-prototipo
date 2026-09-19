import type { Difficulty, Threat } from "./types";

export function calcularPrioridade(t: Pick<Threat, "gravidade" | "urgencia" | "tendencia">) {
  return t.gravidade * t.urgencia * t.tendencia;
}

export function difficultyFromScore(score: number): Difficulty {
  if (score >= 60) return "Difícil";
  if (score >= 25) return "Médio";
  return "Fácil";
}

export type NivelRisco = {
  label: string;
  corTexto: string;
  corBadge: string;
  descricao: string;
};

export function classificarRisco(pontuacao: number): NivelRisco {
  if (pontuacao >= 80) {
    return {
      label: "Crítico",
      corTexto: "text-red-600",
      corBadge: "bg-red-50 text-red-700 border-red-200",
      descricao: "Ação imediata recomendada. Vulnerabilidades graves em aberto.",
    };
  }
  if (pontuacao >= 45) {
    return {
      label: "Alto",
      corTexto: "text-orange-600",
      corBadge: "bg-orange-50 text-orange-700 border-orange-200",
      descricao: "Riscos relevantes identificados. Priorize as correções.",
    };
  }
  if (pontuacao >= 20) {
    return {
      label: "Moderado",
      corTexto: "text-amber-600",
      corBadge: "bg-amber-50 text-amber-700 border-amber-200",
      descricao: "Alguns pontos de atenção. Monitore e planeje ajustes.",
    };
  }
  if (pontuacao > 0) {
    return {
      label: "Baixo",
      corTexto: "text-emerald-600",
      corBadge: "bg-emerald-50 text-emerald-700 border-emerald-200",
      descricao: "Boa postura de segurança. Continue monitorando.",
    };
  }
  return {
    label: "Sem dados",
    corTexto: "text-slate-400",
    corBadge: "bg-slate-100 text-slate-500 border-slate-200",
    descricao: "Marque as ameaças aplicáveis para gerar seu diagnóstico.",
  };
}

export function pontuacaoRiscoGeral(ameacas: Threat[]) {
  const selecionadas = ameacas.filter((a) => a.selecionada);
  if (selecionadas.length === 0) return 0;
  const maiorPrioridade = Math.max(...selecionadas.map(calcularPrioridade));
  return maiorPrioridade;
}
