const TITULOS_NIVEL: Record<number, string> = {
  1: "Estagiário",
  2: "Aprendiz",
  3: "Analista Júnior",
  4: "Analista Pleno",
  5: "Analista Sênior",
  6: "Especialista",
  7: "Mestre em Segurança",
};

export function tituloParaNivel(nivel: number) {
  return TITULOS_NIVEL[nivel] ?? "Lenda da Cibersegurança";
}

export const XP_INCREMENTO_POR_NIVEL = 500;
