"use client";

import type { ProfileMode } from "@/lib/types";

interface ProfileSwitchProps {
  mode: ProfileMode;
  onChange: (mode: ProfileMode) => void;
}

export function ProfileSwitch({ mode, onChange }: ProfileSwitchProps) {
  return (
    <div className="inline-flex items-center rounded-full border border-border bg-field p-1 text-sm">
      <button
        onClick={() => onChange("empresa")}
        className={`cursor-pointer rounded-full px-4 py-1.5 font-medium transition-all ${
          mode === "empresa"
            ? "bg-white text-brand-strong shadow-sm"
            : "text-muted hover:text-foreground"
        }`}
      >
        Modo Microempresa
      </button>
      <button
        onClick={() => onChange("talento")}
        className={`cursor-pointer rounded-full px-4 py-1.5 font-medium transition-all ${
          mode === "talento"
            ? "bg-white text-brand-strong shadow-sm"
            : "text-muted hover:text-foreground"
        }`}
      >
        Modo Talento/Estudante
      </button>
    </div>
  );
}
