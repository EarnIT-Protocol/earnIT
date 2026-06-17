"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  ChevronsUpDown,
  KeyRound,
  Layers,
  Repeat,
  Settings as SettingsIcon,
  TrendingUp,
  Webhook,
  type LucideIcon,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import {
  DEFAULT_EVENT_STATE,
  PAGE_TITLES,
  type DashboardPage,
  type Env,
  type WebhookEvent,
} from "@/lib/mock/dashboard";
import { Overview } from "./Overview";
import { ApiKeys } from "./ApiKeys";
import { Earnings } from "./Earnings";
import { Integrations } from "./Integrations";
import { Webhooks } from "./Webhooks";
import { Settings } from "./Settings";

const NAV: Array<{ page: DashboardPage; label: string; icon: LucideIcon }> = [
  { page: "overview", label: "Overview", icon: Layers },
  { page: "keys", label: "API Keys", icon: KeyRound },
  { page: "earnings", label: "Earnings", icon: TrendingUp },
  { page: "integrations", label: "Integrations", icon: Repeat },
  { page: "webhooks", label: "Webhooks", icon: Webhook },
  { page: "settings", label: "Settings", icon: SettingsIcon },
];

/** The partner dashboard: fixed sidebar + main column with its own chrome. */
export function DashboardShell() {
  const [page, setPage] = useState<DashboardPage>("overview");
  const [env, setEnv] = useState<Env>("test");
  const [events, setEvents] =
    useState<Record<WebhookEvent, boolean>>(DEFAULT_EVENT_STATE);

  const toggleEvent = (e: WebhookEvent) =>
    setEvents((prev) => ({ ...prev, [e]: !prev[e] }));

  const renderPage = () => {
    switch (page) {
      case "overview":
        return <Overview />;
      case "keys":
        return <ApiKeys />;
      case "earnings":
        return <Earnings />;
      case "integrations":
        return <Integrations env={env} />;
      case "webhooks":
        return <Webhooks events={events} onToggle={toggleEvent} />;
      case "settings":
        return <Settings />;
    }
  };

  return (
    <div className="min-h-screen bg-paper font-sans text-ink">
      {/* SIDEBAR */}
      <aside className="ew-db-side fixed inset-y-0 left-0 z-20 flex w-[240px] flex-col border-r border-hairline bg-card px-3.5 py-[18px] max-[820px]:hidden">
        <div className="mb-[18px] px-2 py-1.5">
          <Logo size={32} href="/" />
        </div>

        {/* Org switcher */}
        <button
          type="button"
          className="mb-[18px] flex w-full cursor-pointer items-center gap-2.5 rounded-[11px] border border-hairline bg-white p-2.5 transition-colors hover:border-forest"
        >
          <span className="flex h-[26px] w-[26px] items-center justify-center rounded-[7px] bg-forest font-mono text-[12px] font-semibold text-citron">
            L
          </span>
          <div className="flex min-w-0 flex-1 flex-col items-start leading-[1.1]">
            <span className="text-[13.5px] font-semibold text-ink">Lumen Pay</span>
            <span className="text-[11px] text-muted-2">Partner · Pro</span>
          </div>
          <ChevronsUpDown size={15} className="text-muted-2" />
        </button>

        {/* Nav */}
        <nav className="flex flex-1 flex-col gap-0.5">
          {NAV.map(({ page: p, label, icon: Icon }) => {
            const active = page === p;
            return (
              <button
                key={p}
                type="button"
                onClick={() => setPage(p)}
                className={`flex w-full cursor-pointer items-center gap-[11px] rounded-[10px] border-none px-2.5 py-2.5 text-left text-[14px] transition-all ${
                  active
                    ? "bg-[rgba(10,92,68,0.08)] font-semibold text-forest"
                    : "bg-transparent font-medium text-muted"
                }`}
              >
                <span className="flex shrink-0">
                  <Icon size={18} />
                </span>
                {label}
              </button>
            );
          })}
        </nav>

        {/* User chip */}
        <div className="mt-2 flex items-center gap-2.5 border-t border-hairline p-2.5">
          <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[linear-gradient(135deg,#C6F24E,#7FBF52)] text-[12px] font-semibold text-ink">
            AK
          </span>
          <div className="flex min-w-0 flex-1 flex-col leading-[1.15]">
            <span className="text-[13px] font-semibold">Ada Okoye</span>
            <span className="overflow-hidden text-ellipsis whitespace-nowrap text-[11px] text-muted-2">
              ada@lumenpay.co
            </span>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <div className="ew-db-main flex min-h-screen flex-col max-[820px]:ml-0 ml-[240px]">
        {/* TOPBAR */}
        <div className="sticky top-0 z-[15] flex items-center justify-between gap-4 border-b border-hairline bg-[rgba(247,246,241,0.86)] px-7 py-3.5 backdrop-blur-[12px]">
          <span className="font-display text-[20px] font-semibold tracking-[-0.01em]">
            {PAGE_TITLES[page]}
          </span>
          <div className="flex items-center gap-3">
            {/* Env toggle */}
            <div className="flex gap-0.5 rounded-[10px] border border-hairline bg-hairline-2 p-[3px]">
              <button
                type="button"
                onClick={() => setEnv("test")}
                className={`cursor-pointer rounded-lg border-none px-3.5 py-1.5 text-[12.5px] font-semibold transition-all ${
                  env === "test"
                    ? "bg-white text-ink shadow-[0_1px_2px_rgba(11,20,16,0.1)]"
                    : "bg-transparent text-muted-2"
                }`}
              >
                Test
              </button>
              <button
                type="button"
                onClick={() => setEnv("live")}
                className={`cursor-pointer rounded-lg border-none px-3.5 py-1.5 text-[12.5px] font-semibold transition-all ${
                  env === "live"
                    ? "bg-forest text-paper"
                    : "bg-transparent text-muted-2"
                }`}
              >
                Live
              </button>
            </div>
            <button
              type="button"
              className="flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-[10px] border border-hairline bg-white text-muted transition-colors hover:border-forest"
            >
              <Bell size={18} />
            </button>
            <span className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[linear-gradient(135deg,#C6F24E,#7FBF52)] text-[13px] font-semibold text-ink">
              AK
            </span>
          </div>
        </div>

        {/* PAGE BODY — ew-rise on swap */}
        <main className="mx-auto w-full max-w-[1180px] flex-1 p-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
