"use client";

import { useMemo, useState } from "react";
import { useAppData } from "@/contexts/app-data-context";
import { calcularPrioridade, difficultyFromScore } from "@/lib/gut";
import { formatarReais, reaisFromDifficulty, xpFromDifficulty } from "@/lib/rewards";
import { recomendarTalentos } from "@/lib/talent-matching";
import { Modal } from "@/components/ui/Modal";
import type { RecommendedTalent, Threat } from "@/lib/types";
import { TalentCard } from "./TalentCard";

interface TalentListModalProps {
  open: boolean;
  ameacaPreSelecionada: Threat | null;
  onClose: () => void;
}

type Etapa = "lista" | "contato" | "sucesso";

const NOME_EMPRESA_PADRAO = "Minha Microempresa";

function mensagemPadrao(talento: RecommendedTalent, ameaca: Threat) {
  return `Olá, ${talento.nome.split(" ")[0]}! Vi seu perfil na Tech7 e gostaria de contratar sua ajuda para resolver: "${ameaca.label}". Pode me ajudar?`;
}

export function TalentListModal({ open, ameacaPreSelecionada, onClose }: TalentListModalProps) {
  const { ameacas, solicitarAjuda } = useAppData();
  const [ameacaId, setAmeacaId] = useState("");
  const [etapa, setEtapa] = useState<Etapa>("lista");
  const [talentoSelecionado, setTalentoSelecionado] = useState<RecommendedTalent | null>(null);
  const [mensagem, setMensagem] = useState("");
  const [openAnterior, setOpenAnterior] = useState(open);

  const candidatas = useMemo(
    () =>
      [...ameacas.filter((a) => a.selecionada)].sort(
        (a, b) => calcularPrioridade(b) - calcularPrioridade(a)
      ),
    [ameacas]
  );

  // Reseta o fluxo sempre que o modal é (re)aberto, sem depender de um Effect.
  if (open !== openAnterior) {
    setOpenAnterior(open);
    if (open) {
      setAmeacaId(ameacaPreSelecionada?.id ?? candidatas[0]?.id ?? "");
      setEtapa("lista");
      setTalentoSelecionado(null);
      setMensagem("");
    }
  }

  const ameacaSelecionada = ameacas.find((a) => a.id === ameacaId) ?? null;
  const prioridade = ameacaSelecionada ? calcularPrioridade(ameacaSelecionada) : 0;
  const dificuldade = difficultyFromScore(prioridade);
  const xp = xpFromDifficulty(dificuldade);
  const reais = reaisFromDifficulty(dificuldade);

  const talentosRecomendados = ameacaSelecionada
    ? recomendarTalentos(ameacaSelecionada.especialidade, 3)
    : [];

  function handleContatar(talento: RecommendedTalent) {
    if (!ameacaSelecionada) return;
    setTalentoSelecionado(talento);
    setMensagem(mensagemPadrao(talento, ameacaSelecionada));
    setEtapa("contato");
  }

  function handleEnviarMensagem() {
    if (!ameacaSelecionada || !talentoSelecionado || !mensagem.trim()) return;
    solicitarAjuda({
      ameaca: ameacaSelecionada,
      empresaNome: NOME_EMPRESA_PADRAO,
      talentoConvidado: talentoSelecionado.nome,
    });
    setEtapa("sucesso");
  }

  const titulo =
    etapa === "contato" && talentoSelecionado
      ? `Mensagem para ${talentoSelecionado.nome}`
      : "Procurar Talento";

  return (
    <Modal open={open} onClose={onClose} title={titulo}>
      {etapa === "sucesso" && talentoSelecionado ? (
        <div className="flex flex-col items-center gap-3 py-4 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-soft text-brand-strong">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="text-lg font-semibold text-foreground">Mensagem enviada!</p>
          <p className="max-w-sm text-sm text-muted">
            Sua solicitação para &ldquo;{ameacaSelecionada?.label}&rdquo; foi enviada a{" "}
            <span className="font-semibold text-foreground">{talentoSelecionado.nome}</span> e
            publicada com{" "}
            <span className="font-semibold text-brand-strong">
              {formatarReais(reais)} + {xp} XP
            </span>
            . Tempo médio de resposta: ~{talentoSelecionado.tempoRespostaHoras}h.
          </p>
          <button
            onClick={onClose}
            className="mt-2 cursor-pointer rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-strong"
          >
            Fechar
          </button>
        </div>
      ) : etapa === "contato" && talentoSelecionado && ameacaSelecionada ? (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 rounded-lg border border-border bg-field p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-lg">
              {talentoSelecionado.avatarEmoji}
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{talentoSelecionado.nome}</p>
              <p className="text-xs text-muted">
                Responde em ~{talentoSelecionado.tempoRespostaHoras}h · {talentoSelecionado.tituloNivel}
              </p>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Sua mensagem
            </label>
            <textarea
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              rows={5}
              className="w-full resize-none rounded-lg border border-border bg-field px-3 py-2 text-sm text-foreground outline-none focus:border-brand focus:ring-1 focus:ring-brand"
            />
          </div>

          <div className="flex items-center justify-between rounded-lg border border-emerald-200 bg-brand-soft px-3 py-2 text-sm">
            <span className="text-muted">Recompensa da solicitação</span>
            <span className="font-bold text-brand-strong">
              {formatarReais(reais)} + {xp} XP
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setEtapa("lista")}
              className="cursor-pointer rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted transition hover:text-foreground"
            >
              Voltar
            </button>
            <button
              onClick={handleEnviarMensagem}
              disabled={!mensagem.trim()}
              className="flex-1 cursor-pointer rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-strong disabled:cursor-not-allowed disabled:bg-field disabled:text-muted"
            >
              Enviar Mensagem
            </button>
          </div>
        </div>
      ) : candidatas.length === 0 ? (
        <div className="py-4 text-sm text-muted">
          Marque ao menos uma ameaça na Matriz GUT para ver talentos recomendados.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Qual ameaça você quer resolver?
            </label>
            <select
              value={ameacaId}
              onChange={(e) => setAmeacaId(e.target.value)}
              className="w-full cursor-pointer rounded-lg border border-border bg-field px-3 py-2 text-sm text-foreground outline-none focus:border-brand focus:ring-1 focus:ring-brand"
            >
              {candidatas.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.label} (P = {calcularPrioridade(a)})
                </option>
              ))}
            </select>
          </div>

          {ameacaSelecionada && (
            <div className="flex items-center justify-between rounded-lg border border-emerald-200 bg-brand-soft px-3 py-2 text-sm">
              <span className="text-muted">Recompensa estimada</span>
              <span className="font-bold text-brand-strong">
                {formatarReais(reais)} + {xp} XP
              </span>
            </div>
          )}

          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted">
              Talentos recomendados para {ameacaSelecionada?.especialidade}
            </p>
            <div className="flex flex-col gap-3">
              {talentosRecomendados.map((talento) => (
                <TalentCard
                  key={talento.id}
                  talento={talento}
                  especialidadeAlvo={ameacaSelecionada?.especialidade ?? ""}
                  onContatar={handleContatar}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
