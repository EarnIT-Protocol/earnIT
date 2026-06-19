"use client";

import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useVaultStats, useDeposit, useWithdraw } from "@/hooks/useVault";
import { EarnitYieldWidget } from "./EarnitYieldWidget";
import { useEffect, useState } from "react";
import { parseUnits } from "viem";

export function ConnectedEarnitWidget() {
  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const stats = useVaultStats();
  const { deposit } = useDeposit();
  const { withdraw } = useWithdraw();

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (mounted) {
      console.log("wallet:", { address, isConnected, hasModal: !!openConnectModal });
    }
  }, [mounted, address, isConnected, openConnectModal]);

  const handleConnect = () => {
    console.log("connect clicked, openConnectModal:", !!openConnectModal);
    if (openConnectModal) openConnectModal();
  };

  const handleSubmit = async (action: "deposit" | "withdraw", amount: number) => {
    if (!address || amount <= 0) return;
    try {
      if (action === "deposit") {
        await deposit(amount.toString(), stats.allowance);
      } else {
        const totalSharesHuman = Number(stats.shareBalance) / 1e6;
        const pct = totalSharesHuman > 0 ? (amount / totalSharesHuman) * 100 : 0;
        const sharesToRedeem = BigInt(Math.floor(Number(stats.shareBalance) * Math.min(pct, 100) / 100));
        await withdraw(sharesToRedeem);
      }
      await stats.refetch();
    } catch (e) {
      console.error("tx failed:", e);
    }
  };

  return (
    <EarnitYieldWidget
      apy={stats.apy}
      apy30={stats.apy}
      sharePrice={stats.sharePrice}
      balance={Number(stats.usdcBalance) / 1e6}
      positionShares={Number(stats.shareBalance) / 1e6}
      yieldEarned={0}
      connected={mounted && isConnected}  // ← key fix
      onConnect={handleConnect}
      onSubmit={handleSubmit}
      asset="USDC"
      vaultName="USDC Vault"
      showApy
      showWithdraw
    />
  );
}