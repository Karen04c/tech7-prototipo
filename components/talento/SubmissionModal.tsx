"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { GarantiaBadge } from "@/components/ui/GarantiaBadge";
import { useAppData, type LevelUpEvent } from "@/contexts/app-data-context";
import { formatarReais } from "@/lib/rewards";
import type { Opportunity } from "@/lib/types";

interface SubmissionModalProps {
  oportunidade: Opportunity | null;
  onClose: () => void;
  onEnviado: (xpGanho: number, levelUpEvent: LevelUpEvent | null) => void;
}

export function SubmissionModal({ oportunidade, onClose, onEnviado }: SubmissionModalProps) {
  const { enviarRelatorio } = useAppData();
  const [falha, setFalha] = useState("");
  const [correcao, setCorrecao] = useState("");

  if (!oportunidade) return null;

  const podeEnviar = falha.trim().length > 0 && correcao.trim().length > 0;

  function handleClose() {
    setFalha("");
    setCorrecao("");
    onClose();
  }

  function handleEnviar() {
    if (!podeEnviar || !oportunidade) return;
    const levelUpEvent = enviarRelatorio(oportunidade.id, {
      falhaEncontrada: falha,
      correcaoSugerida: correcao,
    });
    onEnviado(oportunidade.xpRecompensa, levelUpEvent);
    setFalha("");
    setCorrecao("");
  }

  return (
    <Modal
      open={!!oportunidade}
      onClose={handleClose}
      title="Enviar relatório"
      subtitle={`${oportunidade.titulo} · ${oportunidade.empresaNome}`}
    >
      <div className="flex flex-col gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Falha encontrada
          </label>
          <textarea
            value={falha}
            onChange={(e) => setFalha(e.target.value)}
            rows={3}
            placeholder="Descreva a vulnerabilidade ou problema identificado..."
            className="w-full resize-none rounded-lg border border-border bg-field px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted/60 focus:border-brand focus:ring-1 focus:ring-brand"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Correção sugerida
          </label>
          <textarea
            value={correcao}
            onChange={(e) => setCorrecao(e.target.value)}
            rows={3}
            placeholder="Explique como resolver ou mitigar o problema..."
            className="w-full resize-none rounded-lg border border-border bg-field px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted/60 focus:border-brand focus:ring-1 focus:ring-brand"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-emerald-200 bg-brand-soft px-3 py-2 text-sm">
          <span className="text-muted">Recompensa ao enviar</span>
          <span className="flex items-center gap-2">
            <span className="font-bold text-brand-strong">
              {formatarReais(oportunidade.recompensaReais)} + {oportunidade.xpRecompensa} XP
            </span>
            <GarantiaBadge />
          </span>
        </div>

        <button
          onClick={handleEnviar}
          disabled={!podeEnviar}
          className="cursor-pointer rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-strong disabled:cursor-not-allowed disabled:bg-field disabled:text-muted"
        >
          Enviar relatório
        </button>
      </div>
    </Modal>
  );
}
