"use client";
import { useAccount } from "wagmi";
import { useVaultStats } from "./hooks/useVault";
import { DepositPanel } from "./components/DepositPanel";
import { WithdrawPanel } from "./components/WithdrawPanel";
import { PositionsPanel } from "./components/PositionsPanel";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function ClientPage() {
  const stats = useVaultStats();
  const { isConnected } = useAccount();

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">USYC Yield Strategy</h1>
          <ConnectButton />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <DepositPanel stats={stats} />
            <WithdrawPanel stats={stats} />
          </div>
          <div>
            <PositionsPanel stats={stats} />
          </div>
        </div>

        {!isConnected && (
          <div className="text-center text-gray-400 mt-8 text-sm">
            Connect your wallet to deposit USDC and earn yield.
          </div>
        )}
      </div>
    </main>
  );
}