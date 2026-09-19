"use client";

import { useCallback, useRef, useState } from "react";
import type { LevelUpEvent } from "@/contexts/app-data-context";
import { TalentProfileCard } from "./TalentProfileCard";
import { OpportunityFeed } from "./OpportunityFeed";
import { XpToast, type XpToastData } from "./XpToast";

export function TalentoView() {
  const [toasts, setToasts] = useState<XpToastData[]>([]);
  const proximoId = useRef(0);

  const adicionarToast = useCallback((xpGanho: number, levelUpEvent: LevelUpEvent | null) => {
    const id = proximoId.current++;
    const toast: XpToastData = {
      id,
      xpGanho,
      levelUp: levelUpEvent ? { novoNivel: levelUpEvent.novoNivel, tituloNivel: levelUpEvent.tituloNivel } : undefined,
      novaBadge: levelUpEvent?.novaBadge
        ? { nome: levelUpEvent.novaBadge.nome, icone: levelUpEvent.novaBadge.icone }
        : undefined,
    };
    setToasts((prev) => [...prev, toast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-foreground">Meu Perfil</h1>
        <p className="text-sm text-muted">
          Evolua de nível, colecione medalhas e ajude microempresas a se protegerem.
        </p>
      </div>

      <TalentProfileCard />
      <OpportunityFeed onEnviado={adicionarToast} />

      <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col gap-3">
        {toasts.map((toast) => (
          <XpToast key={toast.id} toast={toast} />
        ))}
      </div>
    </div>
  );
}
