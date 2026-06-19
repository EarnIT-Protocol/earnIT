import { parseUnits, formatUnits } from "viem";

export const USDC_DECIMALS = 6;
export const SHARE_DECIMALS = 18;

const PERIOD_RATE_PRECISION = 1_000_000n; // teller currentRate: 1e6 == 1.0x per period

export function parseUsdc(amount: string): bigint {
  if (!amount) return 0n;
  return parseUnits(amount, USDC_DECIMALS);
}

export function formatUsdc(amount: bigint): string {
  return formatUnits(amount, USDC_DECIMALS);
}

export function parseShares(amount: string): bigint {
  if (!amount) return 0n;
  return parseUnits(amount, SHARE_DECIMALS);
}

export function formatShares(amount: bigint): string {
  return formatUnits(amount, SHARE_DECIMALS);
}

// Annualises the teller's per-period rate assuming daily compounding.
// e.g. 1_000_500 -> 0.05%/day -> ~20% APY.
// export function rateToApy(rate: bigint): number {
//   const dailyRate = Number(rate - PERIOD_RATE_PRECISION) / Number(PERIOD_RATE_PRECISION);
//   return (Math.pow(1 + dailyRate, 365) - 1) * 100;
// }
export function rateToApy(rate: bigint): number {
  // Treat as simple annualized rate: (rate - 1e6) / 1e6 * 100
  const annualRate = Number(rate - 1_000_000n) / 1_000_000;
  return annualRate * 100; // → ~1.16%
}

// Compact USD display for headline figures like TVL ($26.7M).
export function formatCompactUsd(amount: bigint, decimals = USDC_DECIMALS): string {
  const value = Number(formatUnits(amount, decimals));
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);
}
