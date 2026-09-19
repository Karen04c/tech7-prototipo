"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  AMEACAS_INICIAIS,
  BADGE_POOL,
  OPORTUNIDADES_INICIAIS,
  TALENTO_INICIAL,
} from "@/lib/mock-data";
import { calcularPrioridade, difficultyFromScore } from "@/lib/gut";
import { tituloParaNivel, XP_INCREMENTO_POR_NIVEL } from "@/lib/leveling";
import { reaisFromDifficulty, xpFromDifficulty } from "@/lib/rewards";
import type {
  Badge,
  Opportunity,
  ReportSubmission,
  TalentProfile,
  Threat,
} from "@/lib/types";

export interface LevelUpEvent {
  novoNivel: number;
  tituloNivel: string;
  novaBadge?: Badge;
}

interface AppDataContextValue {
  ameacas: Threat[];
  atualizarAmeaca: (id: string, campo: "gravidade" | "urgencia" | "tendencia", valor: number) => void;
  alternarAmeaca: (id: string) => void;

  oportunidades: Opportunity[];
  solicitarAjuda: (params: {
    ameaca: Threat;
    empresaNome: string;
    talentoConvidado?: string;
  }) => Opportunity;
  enviarRelatorio: (oportunidadeId: string, relatorio: Omit<ReportSubmission, "enviadoEm">) => LevelUpEvent | null;

  talento: TalentProfile;
}

const AppDataContext = createContext<AppDataContextValue | null>(null);

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [ameacas, setAmeacas] = useState<Threat[]>(AMEACAS_INICIAIS);
  const [oportunidades, setOportunidades] = useState<Opportunity[]>(OPORTUNIDADES_INICIAIS);
  const [talento, setTalento] = useState<TalentProfile>(TALENTO_INICIAL);
  const [badgesConquistadas, setBadgesConquistadas] = useState<Set<string>>(new Set());
  const [relatoriosEnviados, setRelatoriosEnviados] = useState(0);

  const atualizarAmeaca = useCallback(
    (id: string, campo: "gravidade" | "urgencia" | "tendencia", valor: number) => {
      setAmeacas((prev) =>
        prev.map((a) => (a.id === id ? { ...a, [campo]: valor } : a))
      );
    },
    []
  );

  const alternarAmeaca = useCallback((id: string) => {
    setAmeacas((prev) =>
      prev.map((a) => (a.id === id ? { ...a, selecionada: !a.selecionada } : a))
    );
  }, []);

  const solicitarAjuda = useCallback(
    ({
      ameaca,
      empresaNome,
      talentoConvidado,
    }: {
      ameaca: Threat;
      empresaNome: string;
      talentoConvidado?: string;
    }) => {
      const prioridade = calcularPrioridade(ameaca);
      const dificuldade = difficultyFromScore(prioridade);
      const nova: Opportunity = {
        id: `op-${Date.now()}`,
        titulo: ameaca.label,
        empresaNome,
        descricao: ameaca.descricao,
        dificuldade,
        xpRecompensa: xpFromDifficulty(dificuldade),
        recompensaReais: reaisFromDifficulty(dificuldade),
        prioridade,
        status: "aberta",
        criadaEm: new Date().toISOString().slice(0, 10),
        talentoConvidado,
      };
      setOportunidades((prev) => [nova, ...prev]);
      return nova;
    },
    []
  );

  const enviarRelatorio = useCallback(
    (oportunidadeId: string, relatorio: Omit<ReportSubmission, "enviadoEm">): LevelUpEvent | null => {
      const oportunidade = oportunidades.find((o) => o.id === oportunidadeId);
      if (!oportunidade) return null;

      setOportunidades((prev) =>
        prev.map((o) =>
          o.id === oportunidadeId
            ? {
                ...o,
                status: "concluida",
                relatorio: { ...relatorio, enviadoEm: new Date().toISOString().slice(0, 10) },
              }
            : o
        )
      );

      const proximoTotalRelatorios = relatoriosEnviados + 1;
      setRelatoriosEnviados(proximoTotalRelatorios);

      let levelUpEvent: LevelUpEvent | null = null;

      setTalento((prev) => {
        let xp = prev.xp + oportunidade.xpRecompensa;
        let nivel = prev.nivel;
        let xpParaProximoNivel = prev.xpParaProximoNivel;

        while (xp >= xpParaProximoNivel) {
          xp -= xpParaProximoNivel;
          nivel += 1;
          xpParaProximoNivel += XP_INCREMENTO_POR_NIVEL;
          levelUpEvent = { novoNivel: nivel, tituloNivel: tituloParaNivel(nivel) };
        }

        let badges = prev.badges;
        if (proximoTotalRelatorios === 1 && !badgesConquistadas.has("resposta-rapida")) {
          const novaBadge = BADGE_POOL.find((b) => b.id === "resposta-rapida");
          if (novaBadge) {
            badges = [...badges, novaBadge];
            setBadgesConquistadas((prevSet) => new Set(prevSet).add(novaBadge.id));
            levelUpEvent = { ...(levelUpEvent ?? { novoNivel: nivel, tituloNivel: tituloParaNivel(nivel) }), novaBadge };
          }
        }

        return {
          ...prev,
          xp,
          nivel,
          tituloNivel: tituloParaNivel(nivel),
          xpParaProximoNivel,
          badges,
        };
      });

      return levelUpEvent;
    },
    [oportunidades, relatoriosEnviados, badgesConquistadas]
  );

  const value = useMemo(
    () => ({
      ameacas,
      atualizarAmeaca,
      alternarAmeaca,
      oportunidades,
      solicitarAjuda,
      enviarRelatorio,
      talento,
    }),
    [ameacas, atualizarAmeaca, alternarAmeaca, oportunidades, solicitarAjuda, enviarRelatorio, talento]
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error("useAppData deve ser usado dentro de AppDataProvider");
  return ctx;
}
