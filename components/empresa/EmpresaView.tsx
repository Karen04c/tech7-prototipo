"use client";

import { useState } from "react";
import type { Threat } from "@/lib/types";
import { RiskDashboard } from "./RiskDashboard";
import { GutMatrix } from "./GutMatrix";
import { TalentListModal } from "./TalentListModal";

export function EmpresaView() {
  const [modalAberto, setModalAberto] = useState(false);
  const [ameacaPreSelecionada, setAmeacaPreSelecionada] = useState<Threat | null>(null);

  function abrirModalComAmeaca(ameaca: Threat) {
    setAmeacaPreSelecionada(ameaca);
    setModalAberto(true);
  }

  function abrirModalGeral() {
    setAmeacaPreSelecionada(null);
    setModalAberto(true);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-foreground">Painel de Segurança</h1>
        <p className="text-sm text-muted">
          Acompanhe seu risco digital e encontre talentos para resolver suas vulnerabilidades.
        </p>
      </div>

      <RiskDashboard />
      <GutMatrix onSolicitarAjuda={abrirModalComAmeaca} />

      <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface p-6 text-center shadow-sm sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-semibold text-foreground">Precisa de ajuda especializada?</p>
          <p className="text-sm text-muted">
            Veja talentos recomendados da rede Tech7 e fale diretamente com quem pode resolver
            sua vulnerabilidade.
          </p>
        </div>
        <button
          onClick={abrirModalGeral}
          className="cursor-pointer whitespace-nowrap rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-strong"
        >
          Procurar Talento
        </button>
      </div>

      <TalentListModal
        open={modalAberto}
        ameacaPreSelecionada={ameacaPreSelecionada}
        onClose={() => setModalAberto(false)}
      />
    </div>
  );
}
