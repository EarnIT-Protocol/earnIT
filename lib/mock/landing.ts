/**
 * Mock content for the landing page. Copy is final per the design handoff;
 * keep it verbatim. Icons are referenced by lucide-react name and resolved in
 * the section components so this file stays free of JSX.
 */

export type HowStep = {
  n: number;
  icon: "code" | "dollar-sign" | "trending-up" | "sprout";
  title: string;
  body: string;
};

export const HOW_STEPS: HowStep[] = [
  {
    n: 1,
    icon: "code",
    title: "Install the SDK",
    body: "Add @earnit/sdk and drop in your API key. No chain config, no wallet setup.",
  },
  {
    n: 2,
    icon: "dollar-sign",
    title: "Users deposit",
    body: "Your users deposit a stablecoin from your existing balance UI.",
  },
  {
    n: 3,
    icon: "trending-up",
    title: "We route to USYC",
    body: "EarnIT allocates into Circle USYC treasury yield on Arc, automatically.",
  },
  {
    n: 4,
    icon: "sprout",
    title: "Yield accrues",
    body: "Returns compound into their balance — and you earn a fee share on all of it.",
  },
];

export type ArchLayer = {
  title: string;
  sub: string;
  tag: string;
  owned: boolean;
  icon: "users" | "layout-panel-left" | "code" | "boxes" | "globe";
};

export const ARCH_LAYERS: ArchLayer[] = [
  { title: "End Users", sub: "Depositors inside partner apps", tag: "Audience", owned: false, icon: "users" },
  { title: "Partner Apps", sub: "Neobanks, wallets, fintechs", tag: "SDK consumers", owned: false, icon: "layout-panel-left" },
  { title: "EarnIT SDK / API", sub: "Typed client, REST, webhooks", tag: "EarnIT", owned: true, icon: "code" },
  { title: "EarnIT Protocol", sub: "ERC-4626 vaults · FX swap · allocator", tag: "EarnIT", owned: true, icon: "boxes" },
  { title: "Arc Network", sub: "USYC · CCTP · price oracle", tag: "Settlement", owned: false, icon: "globe" },
];

export type Feature = {
  title: string;
  body: string;
  icon: "boxes" | "layout-template" | "repeat" | "dollar-sign" | "scan" | "webhook" | "split" | "shield";
};

export const FEATURES: Feature[] = [
  { title: "ERC-4626 yield vaults", body: "Standard, composable vault shares your users actually own.", icon: "boxes" },
  { title: "White-label widget", body: "One embeddable component, themed to your brand in minutes.", icon: "layout-template" },
  { title: "cNGN ⇄ USDC FX swap", body: "Local-currency deposits routed into dollar yield seamlessly.", icon: "repeat" },
  { title: "Self-repaying borrow", body: "Let users borrow against positions; yield pays it down.", icon: "dollar-sign" },
  { title: "CCTP cross-chain", body: "Accept deposits from any supported chain via Circle CCTP.", icon: "scan" },
  { title: "Webhooks", body: "Real-time deposit, yield, and payout events to your backend.", icon: "webhook" },
  { title: "Revenue share", body: "Earn a configurable share of the yield your users generate.", icon: "split" },
  { title: "Regulated custody", body: "Compliance, KYB and custody handled — so you don’t build it.", icon: "shield" },
];

export type Stat = { value: string; label: string };

export const STATS: Stat[] = [
  { value: "9–12%", label: "Target net APY" },
  { value: "$26.7M", label: "Stablecoins routed" },
  { value: "Sub-sec", label: "Settlement on Arc" },
  { value: "T+0", label: "Treasury redemptions" },
];

export type UseCase = {
  title: string;
  body: string;
  icon: "building-2" | "wallet" | "repeat" | "briefcase";
};

export const USE_CASES: UseCase[] = [
  { title: "Neobanks", body: "Turn idle balances into a headline savings rate.", icon: "building-2" },
  { title: "Fintech wallets", body: "Add earn without building a treasury desk.", icon: "wallet" },
  { title: "DEXes & DeFi", body: "Composable ERC-4626 shares as collateral or LP.", icon: "repeat" },
  { title: "Payroll & treasury", body: "Park operating cash in T+0 treasury yield.", icon: "briefcase" },
];

/** Believable @earnit/sdk snippets for the code teaser (React / Node / REST). */
export const CODE_TABS = [
  {
    label: "React",
    code: `$ npm install @earnit/sdk

import { EarnIT } from '@earnit/sdk';

const earnit = new EarnIT({ apiKey: process.env.EARNIT_KEY });

// Deposit on behalf of your user
const { shares } = await earnit.deposit({
  user: 'usr_8f2a',
  asset: 'USDC',
  amount: 500,
});`,
  },
  {
    label: "Node",
    code: `$ npm install @earnit/sdk

const { EarnIT } = require('@earnit/sdk');
const earnit = new EarnIT({ apiKey: process.env.EARNIT_KEY });

// Read a user position, then withdraw
const pos = await earnit.getPosition('usr_8f2a');
await earnit.withdraw({
  user: 'usr_8f2a',
  shares: pos.shares,
});`,
  },
  {
    label: "REST",
    code: `$ curl https://api.earnit.xyz/v1/deposits \\
    -H "Authorization: Bearer $EARNIT_KEY" \\
    -d user=usr_8f2a \\
    -d asset=USDC \\
    -d amount=500

# => { "id": "dep_4k2", "shares": "479.12",
#      "status": "settled" }`,
  },
];
