"use client";

import { useAppData } from "@/contexts/app-data-context";
import { calcularPrioridade } from "@/lib/gut";
import type { Threat } from "@/lib/types";

const CAMPOS: Array<{ key: "gravidade" | "urgencia" | "tendencia"; label: string; help: string }> = [
  { key: "gravidade", label: "G", help: "Gravidade" },
  { key: "urgencia", label: "U", help: "Urgência" },
  { key: "tendencia", label: "T", help: "Tendência" },
];

function prioridadeCor(p: number) {
  if (p >= 60) return "text-red-700 border-red-200 bg-red-50";
  if (p >= 25) return "text-amber-700 border-amber-200 bg-amber-50";
  return "text-emerald-700 border-emerald-200 bg-emerald-50";
}

interface ThreatRowProps {
  ameaca: Threat;
  onSolicitarAjuda: (ameaca: Threat) => void;
}

export function ThreatRow({ ameaca, onSolicitarAjuda }: ThreatRowProps) {
  const { atualizarAmeaca, alternarAmeaca } = useAppData();
  const prioridade = calcularPrioridade(ameaca);

  return (
    <div
      className={`rounded-xl border bg-surface p-4 shadow-sm transition-shadow hover:shadow-md ${
        ameaca.selecionada ? "border-brand/30 ring-1 ring-brand/10" : "border-border"
      }`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <label className="flex flex-1 cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={ameaca.selecionada}
            onChange={() => alternarAmeaca(ameaca.id)}
            className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-emerald-600"
          />
          <div>
            <p className="font-medium text-foreground">{ameaca.label}</p>
            <p className="text-sm text-muted">{ameaca.descricao}</p>
          </div>
        </label>

        <div className="flex items-center gap-3 sm:pl-4">
          <span className={`rounded-full border px-3 py-1 text-sm font-bold ${prioridadeCor(prioridade)}`}>
            P = {prioridade}
          </span>
          {ameaca.selecionada && prioridade >= 25 && (
            <button
              onClick={() => onSolicitarAjuda(ameaca)}
              className="cursor-pointer whitespace-nowrap rounded-lg bg-brand px-3 py-1 text-sm font-medium text-white transition hover:bg-brand-strong"
            >
              Pedir ajuda
            </button>
          )}
        </div>
      </div>

      {ameaca.selecionada && (
        <div className="mt-4 grid grid-cols-1 gap-4 border-t border-border pt-4 sm:grid-cols-3">
          {CAMPOS.map((campo) => (
            <div key={campo.key}>
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="font-semibold text-foreground">
                  {campo.label} · {campo.help}
                </span>
                <span className="font-mono text-brand-strong">{ameaca[campo.key]}</span>
              </div>
              <input
                type="range"
                min={1}
                max={5}
                step={1}
                value={ameaca[campo.key]}
                onChange={(e) => atualizarAmeaca(ameaca.id, campo.key, Number(e.target.value))}
                className="w-full cursor-pointer accent-emerald-600"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
