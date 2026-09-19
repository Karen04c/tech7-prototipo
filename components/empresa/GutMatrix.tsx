"use client";

import { useMemo } from "react";
import { useAppData } from "@/contexts/app-data-context";
import { calcularPrioridade } from "@/lib/gut";
import type { Threat } from "@/lib/types";
import { Tag } from "@/components/ui/Tag";
import { ThreatRow } from "./ThreatRow";

interface GutMatrixProps {
  onSolicitarAjuda: (ameaca: Threat) => void;
}

export function GutMatrix({ onSolicitarAjuda }: GutMatrixProps) {
  const { ameacas } = useAppData();

  const ordenadas = useMemo(
    () => [...ameacas].sort((a, b) => calcularPrioridade(b) - calcularPrioridade(a)),
    [ameacas]
  );

  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="mb-1 flex items-center gap-2">
          <h2 className="text-lg font-semibold text-foreground">Diagnóstico Rápido</h2>
          <Tag className="border-accent-soft bg-accent-soft text-accent">Matriz GUT</Tag>
        </div>
        <p className="text-sm text-muted">
          Marque as ameaças que se aplicam ao seu negócio e avalie Gravidade, Urgência e
          Tendência (1 a 5). A Prioridade é calculada automaticamente (G × U × T).
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {ordenadas.map((ameaca) => (
          <ThreatRow key={ameaca.id} ameaca={ameaca} onSolicitarAjuda={onSolicitarAjuda} />
        ))}
      </div>
    </div>
  );
}
