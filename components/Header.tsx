"use client";

import type { ProfileMode } from "@/lib/types";
import { ProfileSwitch } from "./ProfileSwitch";

interface HeaderProps {
  mode: ProfileMode;
  onChangeMode: (mode: ProfileMode) => void;
}

export function Header({ mode, onChangeMode }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-white shadow-sm">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M12 3 4 6.5V11c0 5 3.4 8.9 8 10 4.6-1.1 8-5 8-10V6.5L12 3Z" strokeLinejoin="round" />
              <path d="m9.5 12 1.8 1.8L15 10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <p className="text-lg font-bold leading-tight tracking-tight text-foreground">
              Tech<span className="text-brand">7</span>
            </p>
            <p className="text-xs leading-tight text-muted">Conectando Talentos e Soluções</p>
          </div>
        </div>
        <ProfileSwitch mode={mode} onChange={onChangeMode} />
      </div>
    </header>
  );
}
