"use client";

import { useMemo, useState } from "react";
import { useAppData, type LevelUpEvent } from "@/contexts/app-data-context";
import type { Opportunity } from "@/lib/types";
import { OpportunityCard } from "./OpportunityCard";
import { SubmissionModal } from "./SubmissionModal";

interface OpportunityFeedProps {
  onEnviado: (xpGanho: number, levelUpEvent: LevelUpEvent | null) => void;
}

export function OpportunityFeed({ onEnviado }: OpportunityFeedProps) {
  const { oportunidades } = useAppData();
  const [oportunidadeAtiva, setOportunidadeAtiva] = useState<Opportunity | null>(null);

  const { abertas, concluidas } = useMemo(() => {
    const abertas = oportunidades
      .filter((o) => o.status !== "concluida")
      .sort((a, b) => b.prioridade - a.prioridade);
    const concluidas = oportunidades.filter((o) => o.status === "concluida");
    return { abertas, concluidas };
  }, [oportunidades]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="mb-1 flex items-center gap-2">
          <h2 className="text-lg font-semibold text-foreground">Feed de Oportunidades</h2>
          <span className="rounded-full border border-emerald-200 bg-brand-soft px-2 py-0.5 text-xs font-medium text-brand-strong">
            {abertas.length} abertas
          </span>
        </div>
        <p className="text-sm text-muted">
          Escolha um desafio de uma microempresa, resolva o problema e envie seu relatório para
          ganhar XP.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {abertas.map((op) => (
          <OpportunityCard key={op.id} oportunidade={op} onAceitar={setOportunidadeAtiva} />
        ))}
        {abertas.length === 0 && (
          <p className="rounded-xl border border-dashed border-border bg-surface p-4 text-center text-sm text-muted">
            Nenhuma oportunidade em aberto no momento.
          </p>
        )}
      </div>

      {concluidas.length > 0 && (
        <div className="mt-2 border-t border-border pt-4">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted">
            Concluídas
          </p>
          <div className="flex flex-col gap-3">
            {concluidas.map((op) => (
              <OpportunityCard key={op.id} oportunidade={op} onAceitar={setOportunidadeAtiva} />
            ))}
          </div>
        </div>
      )}

      <SubmissionModal
        oportunidade={oportunidadeAtiva}
        onClose={() => setOportunidadeAtiva(null)}
        onEnviado={(xp, levelUpEvent) => {
          setOportunidadeAtiva(null);
          onEnviado(xp, levelUpEvent);
        }}
      />
    </div>
  );
}
