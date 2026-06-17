/**
 * Mock data for the Partner Dashboard. Every figure is a placeholder —
 * in production these come from the EarnIT partner API. See the design
 * handoff README "Data Fetching / Integration Points".
 */

import type { LucideIcon } from "lucide-react";
import {
  Building,
  DollarSign,
  LineChart,
  Users,
} from "lucide-react";

export type DashboardPage =
  | "overview"
  | "keys"
  | "earnings"
  | "integrations"
  | "webhooks"
  | "settings";

export type Env = "test" | "live";

/** Sidebar nav entries (icons are wired up in the shell). */
export const PAGE_TITLES: Record<DashboardPage, string> = {
  overview: "Overview",
  keys: "API Keys",
  earnings: "Earnings",
  integrations: "Integrations",
  webhooks: "Webhooks",
  settings: "Settings",
};

// --- Overview ---------------------------------------------------------------

export interface StatCard {
  label: string;
  value: string;
  delta: string;
  icon: LucideIcon;
}

export const STATS: StatCard[] = [
  { label: "Assets routed", value: "$26.7M", delta: "+12.4% MoM", icon: LineChart },
  { label: "Yield generated", value: "$1.84M", delta: "+8.1% MoM", icon: DollarSign },
  { label: "Your fee earnings", value: "$312K", delta: "+9.6% MoM", icon: Building },
  { label: "Active users", value: "18,420", delta: "+1,204 MoM", icon: Users },
];

export type ActivityKind = "deposit" | "yield" | "withdraw" | "meta";

export interface ActivityItem {
  text: string;
  time: string;
  amount: string;
  kind: ActivityKind;
}

export const ACTIVITY: ActivityItem[] = [
  { text: "Deposit settled · usr_8f2a", time: "2 min ago", amount: "+$500", kind: "deposit" },
  { text: "Yield accrued", time: "18 min ago", amount: "+$1,204", kind: "yield" },
  { text: "Withdraw settled · usr_3k1b", time: "1 hr ago", amount: "-$320", kind: "withdraw" },
  { text: "API key created · CI pipeline", time: "3 days ago", amount: "", kind: "meta" },
];

/** Dot color per activity kind. */
export const ACTIVITY_DOT: Record<ActivityKind, string> = {
  deposit: "#0A5C44",
  yield: "#C6F24E",
  withdraw: "#C0492B",
  meta: "#9AA8A0",
};

/** Amount text color per activity kind. */
export const ACTIVITY_AMOUNT: Record<ActivityKind, string> = {
  deposit: "#0A5C44",
  yield: "#0A5C44",
  withdraw: "#C0492B",
  meta: "#5B6B63",
};

/** Trailing 12-month axis labels for the dashboard charts. */
export const CHART_MONTHS = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"];

/** 12-month "Assets routed" area chart, as an SVG path point list (0–600 / 0–200). */
export const ASSETS_AREA_POINTS: Array<[number, number]> = [
  [0, 170],
  [50, 162],
  [100, 150],
  [150, 154],
  [200, 134],
  [250, 120],
  [300, 124],
  [350, 100],
  [400, 86],
  [450, 90],
  [500, 62],
  [550, 52],
  [600, 38],
];

// --- API Keys ---------------------------------------------------------------

export interface ApiKey {
  name: string;
  env: Env;
  full: string;
  created: string;
  lastUsed: string;
}

export const API_KEYS: ApiKey[] = [
  {
    name: "Production",
    env: "live",
    full: "ek_live_8f2a4b7c9d1e3f5a6b8c0d2e4f6a8b0c",
    created: "Jan 4, 2026",
    lastUsed: "2 min ago",
  },
  {
    name: "Server",
    env: "test",
    full: "ek_test_2b4d6f8a0c2e4f6a8b0c2d4e6f8a0b2c",
    created: "Jan 4, 2026",
    lastUsed: "1 hr ago",
  },
  {
    name: "CI pipeline",
    env: "test",
    full: "ek_test_9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d",
    created: "Feb 18, 2026",
    lastUsed: "3 days ago",
  },
];

/** Masked rendering of a key (first 11 chars then bullets). */
export function maskKey(full: string): string {
  return full.slice(0, 11) + "••••••••••••••••••••";
}

// --- Earnings ---------------------------------------------------------------

/** 12 monthly fee-share bars; last one is the current (citron) month. */
export const EARNINGS_BARS: number[] = [40, 55, 48, 70, 62, 85, 78, 96, 110, 102, 128, 140];

export interface Payout {
  date: string;
  amount: string;
  tx: string;
  status: "Paid";
}

export const PAYOUTS: Payout[] = [
  { date: "Jun 1, 2026", amount: "$44,180", tx: "0x7a2f…9c1d", status: "Paid" },
  { date: "May 1, 2026", amount: "$41,920", tx: "0x3b8e…2f4a", status: "Paid" },
  { date: "Apr 1, 2026", amount: "$38,640", tx: "0x9d1c…7b3e", status: "Paid" },
  { date: "Mar 1, 2026", amount: "$35,210", tx: "0x2e6a…4d8f", status: "Paid" },
];

export const PAYOUT_ADDRESS = "0x9f2a…4Bd1";
export const NEXT_PAYOUT_AMOUNT = "$48,210";
export const NEXT_PAYOUT_DATE = "Jul 1, 2026";
export const FEE_EARNINGS_TOTAL = "$312,480";

// --- Webhooks ---------------------------------------------------------------

export const WEBHOOK_EVENTS = [
  "deposit.settled",
  "withdraw.settled",
  "yield.accrued",
  "payout.sent",
] as const;

export type WebhookEvent = (typeof WEBHOOK_EVENTS)[number];

export const DEFAULT_EVENT_STATE: Record<WebhookEvent, boolean> = {
  "deposit.settled": true,
  "withdraw.settled": true,
  "yield.accrued": true,
  "payout.sent": false,
};

export const WEBHOOK_ENDPOINT = "https://api.lumenpay.co/webhooks/earnit";

export interface Delivery {
  event: string;
  id: string;
  time: string;
  status: "200" | "500";
}

export const DELIVERIES: Delivery[] = [
  { event: "yield.accrued", id: "evt_9f2a", time: "2 min ago", status: "200" },
  { event: "deposit.settled", id: "evt_8b1c", time: "12 min ago", status: "200" },
  { event: "deposit.settled", id: "evt_7d4e", time: "1 hr ago", status: "500" },
  { event: "withdraw.settled", id: "evt_6a3f", time: "3 hr ago", status: "200" },
];

// --- Settings ---------------------------------------------------------------

export const ORG = {
  name: "Lumen Pay",
  meta: "org_8f2a · Partner · Pro",
  payoutAddress: "0x9f2a8B4cE1d77Ab02fE3c4Dd9A1b6E5f0c4Bd1",
};

export interface TeamMember {
  name: string;
  email: string;
  role: string;
  initials: string;
  avatarBg: string;
}

export const TEAM: TeamMember[] = [
  {
    name: "Ada Okoye",
    email: "ada@lumenpay.co",
    role: "Owner",
    initials: "AK",
    avatarBg: "linear-gradient(135deg,#C6F24E,#7FBF52)",
  },
  {
    name: "Tobi Eze",
    email: "tobi@lumenpay.co",
    role: "Admin",
    initials: "TE",
    avatarBg: "linear-gradient(135deg,#9DB6F5,#5B82E0)",
  },
  {
    name: "Mara Diallo",
    email: "mara@lumenpay.co",
    role: "Developer",
    initials: "MD",
    avatarBg: "linear-gradient(135deg,#F5C99D,#E0975B)",
  },
];

// --- Integrations embed snippet ---------------------------------------------

/** Build the embed snippet for a given env. Used by the CodeBlock. */
export function embedSnippet(env: Env): string {
  return [
    '<div id="earnit"></div>',
    '<script src="https://cdn.earnit.xyz/widget.js"></script>',
    "<script>",
    `  EarnIT.mount('#earnit', { apiKey: 'ek_pub_${env}_8f2a' });`,
    "</script>",
  ].join("\n");
}
