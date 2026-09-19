import type { Difficulty } from "./types";

export function xpFromDifficulty(dificuldade: Difficulty): number {
  switch (dificuldade) {
    case "Fácil":
      return 150;
    case "Médio":
      return 300;
    case "Difícil":
      return 450;
  }
}

export function reaisFromDifficulty(dificuldade: Difficulty): number {
  switch (dificuldade) {
    case "Fácil":
      return 50;
    case "Médio":
      return 100;
    case "Difícil":
      return 180;
  }
}

export function formatarReais(valor: number) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
