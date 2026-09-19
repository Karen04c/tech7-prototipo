import { DifficultyTag, Tag } from "@/components/ui/Tag";
import { GarantiaBadge } from "@/components/ui/GarantiaBadge";
import { getInitials } from "@/lib/initials";
import { formatarReais } from "@/lib/rewards";
import type { Opportunity } from "@/lib/types";

interface OpportunityCardProps {
  oportunidade: Opportunity;
  onAceitar: (oportunidade: Opportunity) => void;
}

export function OpportunityCard({ oportunidade, onAceitar }: OpportunityCardProps) {
  const concluida = oportunidade.status === "concluida";

  return (
    <div
      className={`flex flex-col gap-3 rounded-xl border bg-surface p-4 shadow-sm transition-shadow ${
        concluida ? "border-border opacity-70" : "border-border hover:shadow-md"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-accent">
            {getInitials(oportunidade.empresaNome)}
          </div>
          <div>
            <p className="font-semibold text-foreground">{oportunidade.titulo}</p>
            <p className="text-xs text-muted">{oportunidade.empresaNome}</p>
          </div>
        </div>
      </div>

      <p className="text-sm text-muted">{oportunidade.descricao}</p>

      <div className="flex flex-wrap items-center gap-2">
        <DifficultyTag dificuldade={oportunidade.dificuldade} />
        <Tag>Prioridade {oportunidade.prioridade}</Tag>
        <Tag>{oportunidade.criadaEm}</Tag>
        {oportunidade.talentoConvidado && <Tag>Convite direto</Tag>}
      </div>

      <div className="flex flex-wrap items-center gap-2 rounded-lg border border-emerald-200 bg-brand-soft px-3 py-2">
        <span className="text-sm font-bold text-brand-strong">
          Recompensa: {formatarReais(oportunidade.recompensaReais)} + {oportunidade.xpRecompensa} XP
        </span>
        <GarantiaBadge />
      </div>

      {concluida ? (
        <div className="mt-1 flex items-center gap-1.5 text-sm font-medium text-brand-strong">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Relatório enviado
        </div>
      ) : (
        <button
          onClick={() => onAceitar(oportunidade)}
          className="mt-1 cursor-pointer self-start rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-strong"
        >
          Aceitar desafio
        </button>
      )}
    </div>
  );
}
