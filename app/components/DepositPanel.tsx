"use client";
import { useState } from "react";
import { useAccount } from "wagmi";
import { useDeposit, useVaultStats } from "../hooks/useVault";
import { formatUsdc, parseUsdc } from "../lib/constants";
import { CheckCircle, Loader2, AlertCircle } from "lucide-react";

interface Props {
  stats: ReturnType<typeof useVaultStats>;
}

export function DepositPanel({ stats }: Props) {
  const { isConnected } = useAccount();
  const [amount, setAmount] = useState("");
  const { deposit, step, error, isSuccess, reset, isPending } = useDeposit();

  const usdcBal = stats.usdcBalance;
  const parsedAmount = parseUsdc(amount);
  const needsApproval = parsedAmount > 0n && stats.allowance < parsedAmount;
  const btnDisabled = !isConnected || isPending || parsedAmount === 0n || parsedAmount > usdcBal;

  const pct = (p: number) => {
    const val = (Number(usdcBal) * p) / 1e6 / 100;
    setAmount(val.toFixed(2));
  };

  const handleDeposit = async () => {
    await deposit(amount, stats.allowance);
    await stats.refetch();
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-8 gap-3">
        <CheckCircle className="text-green-500" size={40} />
        <p className="text-white font-medium">Deposit confirmed!</p>
        <p className="text-sm text-gray-400">Your USDC is now earning yield.</p>
        <button onClick={() => { reset(); setAmount(""); }} className="mt-2 text-sm text-green-500 hover:underline">
          Deposit more
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Amount input */}
      <div className="rounded-xl bg-gray-900 border border-gray-800 p-4 space-y-2">
        <div className="flex justify-between text-xs text-gray-400">
          <span>Amount</span>
          <span>
            Balance: <span className="text-white font-mono">{formatUsdc(usdcBal)}</span> USDC
          </span>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            className="flex-1 bg-transparent text-2xl font-mono text-white outline-none placeholder:text-gray-500"
          />
          <div className="flex items-center gap-1.5 bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5">
            <span className="w-4 h-4 rounded-full bg-blue-500 flex-shrink-0" />
            <span className="text-sm font-semibold text-white">USDC</span>
          </div>
        </div>
        <div className="flex gap-1.5">
          {[25, 50, 75, 100].map(p => (
            <button
              key={p}
              onClick={() => pct(p)}
              className="text-xs px-2 py-0.5 rounded-md bg-gray-800 text-gray-400 hover:bg-green-900/50 hover:text-green-400 transition-colors"
            >
              {p === 100 ? "MAX" : `${p}%`}
            </button>
          ))}
        </div>
      </div>

      {/* Preview */}
      {parsedAmount > 0n && (
        <div className="rounded-xl bg-gray-800 border border-gray-700 p-3 text-sm space-y-2">
          <Row label="You deposit" value={`${amount} USDC`} />
          <Row label="You receive" value={`≈ ${amount} shares`} accent />
          <Row label="Est. annual return" value={`${stats.apy.toFixed(2)}% APY`} accent />
          {needsApproval && (
            <p className="text-xs text-amber-400/80 pt-1 border-t border-gray-700">
              Approval required before deposit
            </p>
          )}
        </div>
      )}

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
        onClick={handleDeposit}
        className="w-full py-3 rounded-xl font-semibold text-sm transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-500 text-white"
      >
        {isPending && <Loader2 size={16} className="animate-spin" />}
        {!isConnected
          ? "Connect Wallet"
          : step === "approving"
          ? "Approving…"
          : step === "depositing"
          ? "Depositing…"
          : needsApproval
          ? "Approve & Deposit"
          : "Deposit"}
      </button>
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