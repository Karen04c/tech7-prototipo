"use client";

import { useAppData } from "@/contexts/app-data-context";
import { TALENTOS_RECOMENDADOS } from "@/lib/mock-data";

export function Banner() {
  const { ameacas, oportunidades } = useAppData();

  const especialidades = new Set(ameacas.map((a) => a.especialidade)).size;

  return (
    <div className="mb-6 rounded-2xl border border-border bg-surface p-6 shadow-sm">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-strong">
            Tech7 · Marketplace de Cibersegurança
          </p>
          <h2 className="mt-1 text-xl font-bold text-foreground">
            Conectando microempresas a talentos de TI
          </h2>
          <p className="mt-2 text-sm text-muted">
            Microempresas diagnosticam riscos digitais e pedem ajuda direta a estudantes de TI,
            que resolvem desafios reais, ganham XP e constroem portfólio.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium">
            <span className="rounded-full border border-emerald-200 bg-brand-soft px-3 py-1 text-brand-strong">
              🏢 Microempresa: diagnostique e peça ajuda
            </span>
            <span className="rounded-full border border-accent-soft bg-accent-soft px-3 py-1 text-accent">
              🎓 Talento: resolva desafios e suba de nível
            </span>
          </div>
        </div>

        <div className="flex gap-4 rounded-xl border border-border bg-field px-5 py-4 sm:gap-6 lg:flex-col lg:gap-3">
          <div className="text-center lg:text-left">
            <p className="text-2xl font-bold text-foreground">{especialidades}</p>
            <p className="text-xs text-muted">especialidades cobertas</p>
          </div>
          <div className="text-center lg:text-left">
            <p className="text-2xl font-bold text-foreground">{TALENTOS_RECOMENDADOS.length}</p>
            <p className="text-xs text-muted">talentos na rede</p>
          </div>
          <div className="text-center lg:text-left">
            <p className="text-2xl font-bold text-foreground">{oportunidades.length}</p>
            <p className="text-xs text-muted">oportunidades no mural</p>
          </div>
        </div>
      </div>
      <p className="mt-4 text-[11px] text-muted">
        * Indicadores demonstrativos calculados a partir dos dados simulados deste protótipo.
      </p>
    </div>
  );
}
