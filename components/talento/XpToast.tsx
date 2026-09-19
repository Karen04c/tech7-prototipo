"use client";

export interface XpToastData {
  id: number;
  xpGanho: number;
  levelUp?: { novoNivel: number; tituloNivel: string };
  novaBadge?: { nome: string; icone: string };
}

export function XpToast({ toast }: { toast: XpToastData }) {
  return (
    <div className="pointer-events-auto w-80 rounded-xl border border-emerald-200 bg-surface p-4 shadow-lg animate-in">
      <div className="flex items-center gap-2">
        <span className="text-xl">⚡</span>
        <p className="font-semibold text-brand-strong">+{toast.xpGanho} XP conquistados!</p>
      </div>
      {toast.levelUp && (
        <p className="mt-2 text-sm text-foreground">
          🎉 Subiu para <span className="font-bold text-accent">Nível {toast.levelUp.novoNivel} · {toast.levelUp.tituloNivel}</span>
        </p>
      )}
      {toast.novaBadge && (
        <p className="mt-2 text-sm text-foreground">
          Nova medalha: <span className="font-semibold">{toast.novaBadge.icone} {toast.novaBadge.nome}</span>
        </p>
      )}
    </div>
  );
}
