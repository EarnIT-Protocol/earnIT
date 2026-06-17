/** Mock content for the Security page. */
import type { LucideIcon } from "lucide-react";
import {
  Landmark,
  ShieldCheck,
  Boxes,
  Clock,
  GitFork,
  Globe,
  User,
  Circle,
} from "lucide-react";

export interface SecurityBlock {
  title: string;
  body: string;
  icon: LucideIcon;
}

export const SECURITY_BLOCKS: SecurityBlock[] = [
  {
    title: "RWA backing",
    body: "Vault assets are allocated into Circle USYC — a tokenized fund holding short-dated US treasuries.",
    icon: Landmark,
  },
  {
    title: "Regulated issuance",
    body: "USYC is issued under a regulated framework with qualified custody of the underlying treasuries.",
    icon: ShieldCheck,
  },
  {
    title: "Non-custodial vaults",
    body: "Funds sit in standard ERC-4626 contracts. Users hold shares; EarnIT never takes custody.",
    icon: Boxes,
  },
  {
    title: "Profit-unlock window",
    body: "Newly-earned yield streams into the share price over time, blocking flash-loan APY manipulation.",
    icon: Clock,
  },
  {
    title: "No upgradeable proxies",
    body: "The core vault is immutable. There is no admin proxy that can rewrite its logic after deployment.",
    icon: GitFork,
  },
  {
    title: "Settlement on Arc",
    body: "Deposits and redemptions settle on Arc with T+0 finality and an on-chain price oracle.",
    icon: Globe,
  },
];

export interface ChainNode {
  title: string;
  sub: string;
  icon: LucideIcon;
}

export const BACKING_CHAIN: ChainNode[] = [
  { title: "Your user", sub: "Deposits USDC", icon: User },
  { title: "EarnIT vault", sub: "ERC-4626", icon: Boxes },
  { title: "Circle USYC", sub: "Tokenized fund", icon: Circle },
  { title: "US treasuries", sub: "Short-dated", icon: Landmark },
];

export interface SecurityFaq {
  q: string;
  a: string;
}

export const SECURITY_FAQS: SecurityFaq[] = [
  {
    q: "Who holds the underlying treasuries?",
    a: "The treasuries backing USYC are held by Circle’s regulated issuance and custody partners. EarnIT vaults hold USYC tokens, not the treasuries directly, and never take custody of user funds.",
  },
  {
    q: "Can EarnIT change the vault logic after I integrate?",
    a: "No. The core vault contract is non-upgradeable. There is no admin proxy that can alter deposit, withdraw, or accounting logic once deployed. Peripheral routing contracts are versioned and opt-in.",
  },
  {
    q: "How does the profit-unlock window protect APY?",
    a: "When yield is harvested, it is not added to the share price instantly. It unlocks linearly over a fixed window, so an attacker cannot deposit, capture a spike, and withdraw within the same block.",
  },
  {
    q: "Is there an audit report?",
    a: "A formal audit is in progress ahead of mainnet. The contracts currently run on Arc testnet. We will publish the complete report on this page when it is finalized.",
  },
];
