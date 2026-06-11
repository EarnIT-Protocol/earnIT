"use client";
import { useState } from "react";
import { useAccount } from "wagmi";
import { useWithdraw, useVaultStats } from "../hooks/useVault";
import { formatShares, formatUsdc } from "../lib/constants";
import { CheckCircle, Loader2, AlertCircle } from "lucide-react";

interface Props {
  stats: ReturnType<typeof useVaultStats>;
}

export function WithdrawPanel({ stats }: Props) {
  const { isConnected } = useAccount();
  const [pctIn, setPctIn] = useState(100);
  const { withdraw, step, error, isSuccess, reset, isPending } = useWithdraw();

  const shareBal   = stats.shareBalance;
  const shareAmt   = BigInt(Math.floor(Number(shareBal) * pctIn / 100));
  const usdcOut    = BigInt(Math.floor(Number(shareAmt) * stats.sharePrice));
  const btnDisabled = !isConnected || isPending || shareBal === 0n;

  const handleWithdraw = async () => {
    await withdraw(shareAmt);
    await stats.refetch();
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-8 gap-3">
        <CheckCircle className="text-green-500" size={40} />
        <p className="text-white font-medium">Withdrawal complete!</p>
        <p className="text-sm text-gray-400">USDC returned to your wallet.</p>
        <button onClick={reset} className="mt-2 text-sm text-green-500 hover:underline">
          Withdraw more
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Positions summary */}
      <div className="rounded-xl bg-gray-900 border border-gray-800 p-4">
        <div className="flex justify-between text-xs text-gray-400 mb-3">
          <span>Your deposit</span>
          <span>Shares: <span className="text-white font-mono">{formatShares(shareBal)}</span></span>
        </div>
        <p className="text-2xl font-mono font-semibold text-white">
          ${formatUsdc(stats.depositedValue)}
        </p>
        <p className="text-xs text-gray-400 mt-0.5">current value</p>
      </div>

      {/* Percentage slider */}
      <div className="rounded-xl bg-gray-800 border border-gray-700 p-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Redeem amount</span>
          <span className="font-mono text-white">{pctIn}%</span>
        </div>
        <input
          type="range"
          min={1}
          max={100}
          value={pctIn}
          onChange={e => setPctIn(Number(e.target.value))}
          className="w-full accent-green-500"
        />
        <div className="flex gap-2">
          {[25, 50, 75, 100].map(p => (
            <button
              key={p}
              onClick={() => setPctIn(p)}
              className={`flex-1 py-1 text-xs rounded-lg border transition-colors ${
                pctIn === p
                  ? "bg-green-900/50 border-green-700/60 text-green-400"
                  : "border-gray-700 text-gray-400 hover:text-white"
              }`}
            >
              {p === 100 ? "MAX" : `${p}%`}
            </button>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="rounded-xl bg-gray-800 border border-gray-700 p-3 text-sm space-y-2">
        <Row label="Shares redeemed" value={`${formatShares(shareAmt)}`} />
        <Row label="You receive" value={`$${formatUsdc(usdcOut)}`} accent />
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-2 text-sm text-red-400 bg-red-900/20 border border-red-800/40 rounded-xl p-3">
          <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
          <span>{error.slice(0, 120)}</span>
        </div>
      )}

      {/* CTA */}
      <button
        disabled={btnDisabled}
        onClick={handleWithdraw}
        className="w-full py-3 rounded-xl font-semibold text-sm border transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 border-green-700/60 text-green-400 hover:bg-green-900/30"
      >
        {isPending && <Loader2 size={16} className="animate-spin" />}
        {step === "redeeming" ? "Redeeming…" : "Withdraw"}
      </button>

      {shareBal === 0n && (
        <p className="text-center text-xs text-gray-400">No shares to withdraw</p>
      )}
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-400">{label}</span>
      <span className={accent ? "text-green-400 font-mono" : "text-white font-mono"}>{value}</span>
    </div>
  );
}