"use client";

import { useMemo } from "react";
import { useAppData } from "@/contexts/app-data-context";
import { calcularPrioridade, classificarRisco, pontuacaoRiscoGeral } from "@/lib/gut";

export function RiskDashboard() {
  const { ameacas } = useAppData();
  const pontuacao = useMemo(() => pontuacaoRiscoGeral(ameacas), [ameacas]);
  const risco = useMemo(() => classificarRisco(pontuacao), [pontuacao]);
  const selecionadas = ameacas.filter((a) => a.selecionada).length;

  const topAmeacas = useMemo(
    () =>
      [...ameacas]
        .filter((a) => a.selecionada)
        .sort((a, b) => calcularPrioridade(b) - calcularPrioridade(a))
        .slice(0, 3),
    [ameacas]
  );

  const circunferencia = 2 * Math.PI * 54;
  const progresso = Math.min(100, (pontuacao / 100) * 100);
  const offset = circunferencia - (progresso / 100) * circunferencia;

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-6">
          <div className="relative h-32 w-32 shrink-0">
            <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
              <circle cx="60" cy="60" r="54" fill="none" stroke="var(--color-field)" strokeWidth="10" />
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circunferencia}
                strokeDashoffset={offset}
                className={risco.corTexto}
                style={{ transition: "stroke-dashoffset 0.6s ease-out" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-foreground">{pontuacao}</span>
              <span className="text-[10px] uppercase tracking-wide text-muted">de 125</span>
            </div>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted">
              Nível de Risco Digital
            </p>
            <span
              className={`mt-1 inline-flex items-center rounded-full border px-3 py-1 text-lg font-bold ${risco.corBadge}`}
            >
              {risco.label}
            </span>
            <p className="mt-2 max-w-xs text-sm text-muted">{risco.descricao}</p>
          </div>
        </div>

        <div className="flex gap-6 sm:flex-col sm:items-end sm:text-right">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted">Ameaças mapeadas</p>
            <p className="text-xl font-semibold text-foreground">{selecionadas} / {ameacas.length}</p>
          </div>
        </div>
      </div>

      {topAmeacas.length > 0 && (
        <div className="mt-5 border-t border-border pt-4">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted">
            Top {topAmeacas.length} riscos prioritários
          </p>
          <ol className="flex flex-col gap-2">
            {topAmeacas.map((ameaca, index) => (
              <li
                key={ameaca.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-border bg-field px-3 py-2 text-sm"
              >
                <span className="flex items-center gap-2 text-foreground">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-soft text-[11px] font-bold text-brand-strong">
                    {index + 1}
                  </span>
                  {ameaca.label}
                </span>
                <span className="font-mono text-xs font-bold text-muted">
                  P = {calcularPrioridade(ameaca)}
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
