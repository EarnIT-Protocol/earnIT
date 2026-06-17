"use client";

import { createContext, useContext, useState } from "react";
import type { Env } from "@/lib/mock/dashboard";

type EnvContextValue = { env: Env; setEnv: (e: Env) => void };

const EnvContext = createContext<EnvContextValue | null>(null);

/** Shares the Test/Live environment between the topbar toggle and pages. */
export function DashboardEnvProvider({ children }: { children: React.ReactNode }) {
  const [env, setEnv] = useState<Env>("test");
  return <EnvContext.Provider value={{ env, setEnv }}>{children}</EnvContext.Provider>;
}

export function useDashboardEnv(): EnvContextValue {
  const ctx = useContext(EnvContext);
  if (!ctx) throw new Error("useDashboardEnv must be used within DashboardEnvProvider");
  return ctx;
}
