import { Tag } from "@/components/ui/Tag";
import type { RecommendedTalent } from "@/lib/types";

interface TalentCardProps {
  talento: RecommendedTalent;
  especialidadeAlvo: string;
  onContatar: (talento: RecommendedTalent) => void;
}

export function TalentCard({ talento, especialidadeAlvo, onContatar }: TalentCardProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-2xl shadow-sm ring-2 ring-white">
          {talento.avatarEmoji}
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-1.5">
            <p className="font-semibold text-foreground">{talento.nome}</p>
            <span className="rounded-full border border-emerald-200 bg-brand-soft px-2 py-0.5 text-[11px] font-semibold text-brand-strong">
              Nível {talento.nivel}
            </span>
          </div>
          <p className="text-xs text-muted">{talento.tituloNivel}</p>

          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            {talento.especialidades.map((esp) => (
              <Tag
                key={esp}
                className={
                  esp === especialidadeAlvo
                    ? "border-accent-soft bg-accent-soft text-accent"
                    : undefined
                }
              >
                {esp}
              </Tag>
            ))}
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted">
            <span className="flex items-center gap-1 text-amber-500">
              {"★".repeat(Math.round(talento.avaliacao))}
              <span className="text-muted">{talento.avaliacao.toFixed(1)}</span>
            </span>
            <span>Responde em ~{talento.tempoRespostaHoras}h</span>
          </div>

          {talento.badges.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {talento.badges.map((b) => (
                <span key={b.id} title={b.descricao} className="text-sm">
                  {b.icone}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => onContatar(talento)}
        className="cursor-pointer whitespace-nowrap self-start rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-strong sm:self-center"
      >
        Entrar em Contato
      </button>
    </div>
  );
}
