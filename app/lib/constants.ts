import { parseUnits, formatUnits } from "viem";

// ─── Replace these with your deployed addresses ──────────────────────────────
export const ADDRESSES = {
  strategy: (process.env.NEXT_PUBLIC_STRATEGY_ADDRESS || "0x2F6470599C0Ee4E29C337C2C26f235a4EBBd6474") as `0x${string}`,
  usdc: (process.env.NEXT_PUBLIC_USDC_ADDRESS || "0x491c9634670214E08208A607F8cA08adD3523205") as `0x${string}`,
  teller: (process.env.NEXT_PUBLIC_TELLER_ADDRESS || "0x1DC8C46DEF44C89dE572277ffe5Ea15c2C23B8Ef") as `0x${string}`,
};

// ─── ABIs (minimal, can be extended) ────────────────────────────────────────
export const ERC20_ABI = [
  { inputs: [], name: "decimals", outputs: [{ type: "uint8" }], stateMutability: "view", type: "function" },
  { inputs: [{ name: "owner", type: "address" }], name: "balanceOf", outputs: [{ type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [{ name: "spender", type: "address" }, { name: "amount", type: "uint256" }], name: "approve", outputs: [{ type: "bool" }], stateMutability: "nonpayable", type: "function" },
  { inputs: [{ name: "owner", type: "address" }, { name: "spender", type: "address" }], name: "allowance", outputs: [{ type: "uint256" }], stateMutability: "view", type: "function" },
] as const;

export const STRATEGY_ABI = [
  { inputs: [], name: "asset", outputs: [{ type: "address" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "totalAssets", outputs: [{ type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "totalSupply", outputs: [{ type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [{ name: "owner", type: "address" }], name: "balanceOf", outputs: [{ type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [{ name: "assets", type: "uint256" }, { name: "receiver", type: "address" }], name: "deposit", outputs: [{ name: "shares", type: "uint256" }], stateMutability: "nonpayable", type: "function" },
  { inputs: [{ name: "shares", type: "uint256" }, { name: "receiver", type: "address" }, { name: "owner", type: "address" }], name: "redeem", outputs: [{ name: "assets", type: "uint256" }], stateMutability: "nonpayable", type: "function" },
] as const;

export const TELLER_ABI = [
  { inputs: [], name: "currentRate", outputs: [{ type: "uint256" }], stateMutability: "view", type: "function" },
  // Add other functions if needed (e.g., asset, share)
] as const;

// ─── Decimals ────────────────────────────────────────────────────────────────
const USDC_DECIMALS = 6;
const SHARE_DECIMALS = 18;

export function parseUsdc(amount: string): bigint {
  if (!amount || amount === "") return 0n;
  return parseUnits(amount, USDC_DECIMALS);
}

export function formatUsdc(amount: bigint): string {
  return formatUnits(amount, USDC_DECIMALS);
}

export function formatShares(amount: bigint): string {
  return formatUnits(amount, SHARE_DECIMALS);
}

export function parseShares(amount: string): bigint {
  if (!amount || amount === "") return 0n;
  return parseUnits(amount, SHARE_DECIMALS);
}

// Convert Teller's currentRate (basis points of 1e6) to annual percentage yield
// e.g., 1_000_500 → 0.05% daily → (1 + 0.0005)^365 - 1 ≈ 20.0%
export function rateToApy(rate: bigint): number {
  const dailyRate = Number(rate - 1_000_000n) / 1_000_000; // e.g., 0.0005
  const yearly = Math.pow(1 + dailyRate, 365) - 1;
  return yearly * 100;
}