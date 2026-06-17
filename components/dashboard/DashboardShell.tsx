"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  Bell,
  ChevronsUpDown,
  KeyRound,
  Layers,
  LogOut,
  Menu,
  Plus,
  Repeat,
  Settings as SettingsIcon,
  TrendingUp,
  UserRound,
  Webhook,
  X,
  type LucideIcon,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { DEFAULT_EVENT_STATE, PAGE_TITLES, type DashboardPage, type Env, type WebhookEvent } from "@/lib/mock/dashboard";
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

const menuItem =
  "flex cursor-pointer select-none items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13.5px] text-ink outline-none data-[highlighted]:bg-[rgba(10,92,68,0.07)] data-[highlighted]:text-forest";

/** Sidebar body — shared by the desktop rail and the mobile drawer. */
function SidebarContent({
  page,
  setPage,
  onNavigate,
}: {
  page: DashboardPage;
  setPage: (p: DashboardPage) => void;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-[18px] px-2 py-1.5">
        <Logo size={32} href="/" />
      </div>

      {/* Org switcher */}
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            type="button"
            className="mb-[18px] flex w-full cursor-pointer items-center gap-2.5 rounded-[11px] border border-hairline bg-white p-2.5 text-left outline-none transition-colors hover:border-forest data-[state=open]:border-forest"
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
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            align="start"
            sideOffset={6}
            className="z-[400] w-[var(--radix-dropdown-menu-trigger-width)] min-w-[220px] rounded-xl border border-hairline bg-white p-1 shadow-[0_18px_36px_-18px_rgba(11,20,16,0.28)]"
          >
            <DropdownMenu.Label className="px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.05em] text-muted-2">
              Organizations
            </DropdownMenu.Label>
            <DropdownMenu.Item className={menuItem}>
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-forest font-mono text-[10px] font-semibold text-citron">
                L
              </span>
              Lumen Pay
            </DropdownMenu.Item>
            <DropdownMenu.Item className={menuItem}>
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-muted font-mono text-[10px] font-semibold text-white">
                N
              </span>
              Northwind
            </DropdownMenu.Item>
            <DropdownMenu.Separator className="my-1 h-px bg-hairline" />
            <DropdownMenu.Item className={menuItem}>
              <Plus size={15} className="text-muted" />
              Create organization
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-0.5">
        {NAV.map(({ page: p, label, icon: Icon }) => {
          const active = page === p;
          return (
            <button
              key={p}
              type="button"
              onClick={() => {
                setPage(p);
                onNavigate?.();
              }}
              className={`flex w-full cursor-pointer items-center gap-[11px] rounded-[10px] px-2.5 py-2.5 text-left text-[14px] transition-all ${
                active ? "bg-[rgba(10,92,68,0.08)] font-semibold text-forest" : "font-medium text-muted hover:bg-hairline-2 hover:text-ink"
              }`}
            >
              <Icon size={18} className="shrink-0" />
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
          <span className="truncate text-[11px] text-muted-2">ada@lumenpay.co</span>
        </div>
      </div>
    </div>
  );
}

/** The partner dashboard: responsive sidebar/drawer + main column. */
export function DashboardShell() {
  const [page, setPage] = useState<DashboardPage>("overview");
  const [env, setEnv] = useState<Env>("test");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [events, setEvents] = useState<Record<WebhookEvent, boolean>>(DEFAULT_EVENT_STATE);

  const toggleEvent = (e: WebhookEvent) => setEvents((prev) => ({ ...prev, [e]: !prev[e] }));

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
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-[248px] flex-col border-r border-hairline bg-card px-3.5 py-[18px] lg:flex">
        <SidebarContent page={page} setPage={setPage} />
      </aside>

      {/* Mobile drawer */}
      <Dialog.Root open={drawerOpen} onOpenChange={setDrawerOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[300] bg-ink/40 backdrop-blur-sm data-[state=open]:animate-[ew-rise_0.2s_ease] lg:hidden" />
          <Dialog.Content className="fixed inset-y-0 left-0 z-[300] flex w-[280px] flex-col border-r border-hairline bg-card px-3.5 py-[18px] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.5)] focus:outline-none lg:hidden">
            <Dialog.Title className="sr-only">Dashboard navigation</Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close menu"
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg border border-hairline bg-white text-muted"
              >
                <X size={16} />
              </button>
            </Dialog.Close>
            <SidebarContent page={page} setPage={setPage} onNavigate={() => setDrawerOpen(false)} />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Main column */}
      <div className="flex min-h-screen flex-col lg:ml-[248px]">
        {/* Topbar */}
        <header className="sticky top-0 z-[15] flex items-center justify-between gap-3 border-b border-hairline bg-[rgba(247,246,241,0.86)] px-4 py-3 backdrop-blur-[12px] sm:px-6 lg:px-7">
          <div className="flex min-w-0 items-center gap-2.5">
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setDrawerOpen(true)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-hairline bg-white text-ink lg:hidden"
            >
              <Menu size={18} />
            </button>
            <h1 className="truncate font-display text-[18px] font-semibold tracking-[-0.01em] sm:text-[20px]">
              {PAGE_TITLES[page]}
            </h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Env toggle */}
            <div className="flex gap-0.5 rounded-[10px] border border-hairline bg-hairline-2 p-[3px]">
              {(["test", "live"] as const).map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setEnv(e)}
                  className={`cursor-pointer rounded-lg px-3 py-1.5 text-[12.5px] font-semibold capitalize transition-all ${
                    env === e
                      ? e === "live"
                        ? "bg-forest text-paper"
                        : "bg-white text-ink shadow-[0_1px_2px_rgba(11,20,16,0.1)]"
                      : "text-muted-2"
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
            <button
              type="button"
              aria-label="Notifications"
              className="hidden h-[38px] w-[38px] items-center justify-center rounded-[10px] border border-hairline bg-white text-muted transition-colors hover:border-forest sm:flex"
            >
              <Bell size={18} />
            </button>

            {/* User menu */}
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button
                  type="button"
                  aria-label="Account"
                  className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[linear-gradient(135deg,#C6F24E,#7FBF52)] text-[13px] font-semibold text-ink outline-none"
                >
                  AK
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  align="end"
                  sideOffset={8}
                  className="z-[400] min-w-[200px] rounded-xl border border-hairline bg-white p-1 shadow-[0_18px_36px_-18px_rgba(11,20,16,0.28)]"
                >
                  <div className="px-2.5 py-2">
                    <div className="text-[13px] font-semibold text-ink">Ada Okoye</div>
                    <div className="truncate text-[11.5px] text-muted-2">ada@lumenpay.co</div>
                  </div>
                  <DropdownMenu.Separator className="my-1 h-px bg-hairline" />
                  <DropdownMenu.Item className={menuItem}>
                    <UserRound size={15} className="text-muted" />
                    Profile
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className={menuItem} onSelect={() => setPage("settings")}>
                    <SettingsIcon size={15} className="text-muted" />
                    Settings
                  </DropdownMenu.Item>
                  <DropdownMenu.Separator className="my-1 h-px bg-hairline" />
                  <DropdownMenu.Item className={`${menuItem} text-danger data-[highlighted]:bg-[rgba(192,73,43,0.08)] data-[highlighted]:text-danger`}>
                    <LogOut size={15} />
                    Sign out
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
        </header>

        {/* Page body */}
        <main className="mx-auto w-full max-w-[1180px] flex-1 p-4 sm:p-6 lg:p-7">
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
