import type { ReactNode } from "react";
import type { Difficulty } from "@/lib/types";

const DIFFICULTY_STYLES: Record<Difficulty, string> = {
  Fácil: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Médio: "bg-amber-50 text-amber-700 border-amber-200",
  Difícil: "bg-red-50 text-red-700 border-red-200",
};

export function DifficultyTag({ dificuldade }: { dificuldade: Difficulty }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${DIFFICULTY_STYLES[dificuldade]}`}
    >
      {dificuldade}
    </span>
  );
}

export function Tag({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-border bg-field px-2.5 py-0.5 text-xs font-medium text-muted ${className}`}
    >
      {children}
    </span>
  );
}
