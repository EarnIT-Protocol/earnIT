import { useReadContract, useReadContracts, useWriteContract, useWaitForTransactionReceipt, useAccount } from "wagmi";
import { useState, useCallback } from "react";
import { CONTRACTS, ERC20_ABI, VAULT_ABI, TELLER_ABI } from "@/lib/contracts";
import { parseUsdc, rateToApy } from "@/lib/format";

// ─── Read: vault stats (TVL, user balances, allowance, APY) ──────────────────
export function useVaultStats() {
  const { address } = useAccount();

  const { data, refetch } = useReadContracts({
    contracts: [
      { address: CONTRACTS.vault, abi: VAULT_ABI, functionName: "totalAssets" },
      { address: CONTRACTS.vault, abi: VAULT_ABI, functionName: "totalSupply" },
      { address: CONTRACTS.teller,   abi: TELLER_ABI,   functionName: "currentRate" },
      { address: CONTRACTS.usdc,     abi: ERC20_ABI,    functionName: "balanceOf",    args: [address ?? "0x0"] },
      { address: CONTRACTS.vault, abi: VAULT_ABI, functionName: "balanceOf",    args: [address ?? "0x0"] },
      { address: CONTRACTS.usdc,     abi: ERC20_ABI,    functionName: "allowance",    args: [address ?? "0x0", CONTRACTS.vault] },
    ],
    allowFailure: false,
  });

  const totalAssets  = (data?.[0] as bigint) ?? 0n;
  const totalSupply  = (data?.[1] as bigint) ?? 0n;
  const currentRate  = (data?.[2] as bigint) ?? 1_000_000n;
  const usdcBalance  = (data?.[3] as bigint) ?? 0n;
  const shareBalance = (data?.[4] as bigint) ?? 0n;
  const allowance    = (data?.[5] as bigint) ?? 0n;

  // Share price = totalAssets / totalSupply (if supply > 0)
  const sharePrice = totalSupply > 0n ? Number(totalAssets) / Number(totalSupply) : 1;

  // Value of user's shares in USDC (deposited value)
  const depositedValue = BigInt(Math.floor(Number(shareBalance) * sharePrice));

  const apy = rateToApy(currentRate);

  return { totalAssets, totalSupply, currentRate, usdcBalance, shareBalance, depositedValue, allowance, sharePrice, apy, refetch };
}

// ─── Write: approve + deposit ────────────────────────────────────────────────
export function useDeposit() {
  const { address } = useAccount();
  const { writeContractAsync, isPending: isWritePending } = useWriteContract();
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>();
  const [step, setStep] = useState<"idle" | "approving" | "depositing" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash: txHash });

  const deposit = useCallback(async (rawAmount: string, currentAllowance: bigint) => {
    if (!address) return;
    const amount = parseUsdc(rawAmount);
    if (amount === 0n) return;

    setError(null);
    try {
      if (currentAllowance < amount) {
        setStep("approving");
        const approveTx = await writeContractAsync({
          address: CONTRACTS.usdc,
          abi: ERC20_ABI,
          functionName: "approve",
          args: [CONTRACTS.vault, amount],
        });
        setTxHash(approveTx);
        // Wait a couple seconds for approval to land
        await new Promise(r => setTimeout(r, 2000));
      }

      setStep("depositing");
      const depositTx = await writeContractAsync({
        address: CONTRACTS.vault,
        abi: VAULT_ABI,
        functionName: "deposit",
        args: [amount, address],
      });
      setTxHash(depositTx);
      setStep("done");
    } catch (e: unknown) {
      setStep("error");
      setError(e instanceof Error ? e.message : "Transaction failed");
    }
  }, [address, writeContractAsync]);

  const reset = () => { setStep("idle"); setError(null); setTxHash(undefined); };

  return { deposit, step, error, isConfirming, isSuccess, reset, isPending: isWritePending || isConfirming };
}

// ─── Write: redeem (withdraw shares → USDC) ─────────────────────────────────
export function useWithdraw() {
  const { address } = useAccount();
  const { writeContractAsync, isPending: isWritePending } = useWriteContract();
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>();
  const [step, setStep] = useState<"idle" | "redeeming" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash: txHash });

  const withdraw = useCallback(async (shareAmount: bigint) => {
    if (!address || shareAmount === 0n) return;
    setError(null);
    setStep("redeeming");
    try {
      const tx = await writeContractAsync({
        address: CONTRACTS.vault,
        abi: VAULT_ABI,
        functionName: "redeem",
        args: [shareAmount, address, address],
      });
      setTxHash(tx);
      setStep("done");
    } catch (e: unknown) {
      setStep("error");
      setError(e instanceof Error ? e.message : "Transaction failed");
    }
  }, [address, writeContractAsync]);

  const reset = () => { setStep("idle"); setError(null); setTxHash(undefined); };

  return { withdraw, step, error, isConfirming, isSuccess, reset, isPending: isWritePending || isConfirming };
}

// ─── Sparkline: historical share price (mock from currentRate) ──────────────
export function useSharePrice() {
  const { data } = useReadContract({
    address: CONTRACTS.teller,
    abi: TELLER_ABI,
    functionName: "currentRate",
  });

  const rate = (data as bigint | undefined) ?? 1_000_500n;
  // Generate 30 trailing days using the daily rate
  const dailyRate = Number(rate - 1_000_000n) / 1_000_000;
  const points = Array.from({ length: 30 }, (_, i) => {
    const day = i - 29;
    const price = Math.pow(1 + dailyRate, 30 + day);
    return { day: `D${day + 30}`, price: parseFloat(price.toFixed(6)) };
  });
  return points;
}