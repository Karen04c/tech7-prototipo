"use client";

import { useAppData } from "@/contexts/app-data-context";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { getInitials } from "@/lib/initials";

export function TalentProfileCard() {
  const { talento } = useAppData();
  const iniciais = getInitials(talento.nome);

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-2xl font-bold text-white shadow-md ring-4 ring-white">
          {iniciais}
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-lg font-bold text-foreground">{talento.nome}</p>
            <span className="rounded-full border border-emerald-200 bg-brand-soft px-2.5 py-0.5 text-xs font-semibold text-brand-strong">
              Nível {talento.nivel} · {talento.tituloNivel}
            </span>
          </div>

          <div className="mt-3">
            <div className="mb-1 flex items-center justify-between text-xs text-muted">
              <span>XP</span>
              <span className="font-mono">
                {talento.xp.toLocaleString("pt-BR")} / {talento.xpParaProximoNivel.toLocaleString("pt-BR")}
              </span>
            </div>
            <ProgressBar value={talento.xp} max={talento.xpParaProximoNivel} />
          </div>
        </div>
      </div>

      <div className="mt-5 border-t border-border pt-4">
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted">
          Medalhas &amp; Selos
        </p>
        <div className="flex flex-wrap gap-2">
          {talento.badges.map((badge) => (
            <div
              key={badge.id}
              title={badge.descricao}
              className="flex cursor-default items-center gap-1.5 rounded-full border border-border bg-field px-3 py-1.5 text-sm text-foreground transition hover:border-brand/40"
            >
              <span>{badge.icone}</span>
              <span>{badge.nome}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
