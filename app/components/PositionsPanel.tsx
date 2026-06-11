"use client";
import { useAccount } from "wagmi";
import { useVaultStats } from "../hooks/useVault";
import { formatShares, formatUsdc } from "../lib/constants";
import { TrendingUp, Coins, BarChart2 } from "lucide-react";

interface Props {
  stats: ReturnType<typeof useVaultStats>;
}

export function PositionsPanel({ stats }: Props) {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center py-10 gap-2 text-gray-400">
        <BarChart2 size={32} className="opacity-30" />
        <p className="text-sm">Connect your wallet to see positions</p>
      </div>
    );
  }

  const { shareBalance, depositedValue, apy, sharePrice } = stats;

  // Estimate yield earned: current value - initial deposit (assuming deposit at 1:1)
  const depositedAtCost = shareBalance; // original USDC amount (1 USDC = 1 share initially)
  const yieldEarned = depositedValue > depositedAtCost ? depositedValue - depositedAtCost : 0n;

  return (
    <div className="space-y-4">
      <MetricRow
        icon={<Coins size={16} className="text-green-500" />}
        label="Vault Shares"
        value={`${formatShares(shareBalance)} shares`}
      />
      <MetricRow
        icon={<TrendingUp size={16} className="text-green-500" />}
        label="Current Value"
        value={`$${formatUsdc(depositedValue)}`}
        accent
      />
      <MetricRow
        icon={<TrendingUp size={16} className="text-green-300" />}
        label="Yield Earned (est.)"
        value={yieldEarned > 0n ? `+$${formatUsdc(yieldEarned)}` : "Accruing…"}
        accent
      />
      <div className="border-t border-gray-800 pt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-gray-900 border border-gray-800 p-3">
          <p className="text-xs text-gray-400">Current APY</p>
          <p className="text-lg font-mono font-semibold text-green-500">{apy.toFixed(2)}%</p>
        </div>
        <div className="rounded-xl bg-gray-900 border border-gray-800 p-3">
          <p className="text-xs text-gray-400">Share Price</p>
          <p className="text-lg font-mono font-semibold text-white">{sharePrice.toFixed(4)}</p>
        </div>
      </div>
      <p className="text-xs text-center text-gray-400">
        Yield accrues via daily rate adjustments in the USYC teller.
      </p>
    </div>
  );
}

function MetricRow({ icon, label, value, accent }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-gray-900 border border-gray-800">
      <div className="flex items-center gap-2 text-sm text-gray-400">
        {icon}
        {label}
      </div>
      <span className={`text-sm font-mono font-medium ${accent ? "text-green-500" : "text-white"}`}>
        {value}
      </span>
    </div>
  );
}