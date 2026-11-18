"use client";

import { useState } from "react";
import { AppDataProvider } from "@/contexts/app-data-context";
import type { ProfileMode } from "@/lib/types";
import { Banner } from "./Banner";
import { Header } from "./Header";
import { EmpresaView } from "./empresa/EmpresaView";
import { TalentoView } from "./talento/TalentoView";

export function AppShell() {
  const [mode, setMode] = useState<ProfileMode>("empresa");

  return (
    <AppDataProvider>
      <div className="flex min-h-screen flex-col">
        <Header mode={mode} onChangeMode={setMode} />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
          <Banner />
          {mode === "empresa" ? <EmpresaView /> : <TalentoView />}
        </main>
        <footer className="border-t border-border px-4 py-6 text-center text-xs text-muted sm:px-6">
          Tech7 · Protótipo interativo com dados simulados
        </footer>
      </div>
    </AppDataProvider>
  );
}
