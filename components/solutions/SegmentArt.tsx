import { Boxes, Check } from "lucide-react";

/** Before/after APY comparison shown under the neobank copy. */
export function NeobankStats() {
  return (
    <div className="mt-[6px] flex gap-3">
      <div className="flex-1 rounded-[14px] border border-hairline bg-white p-4">
        <span className="mb-1 block text-[12px] text-muted-2">Before EarnIT</span>
        <span className="font-mono text-[22px] font-semibold text-danger">0.5% APY</span>
      </div>
      <div className="flex-1 rounded-[14px] bg-forest p-4">
        <span className="mb-1 block text-[12px] text-[#A9C4B8]">With EarnIT</span>
        <span className="font-mono text-[22px] font-semibold text-citron">9.2% APY</span>
      </div>
    </div>
  );
}

/** Checklist of DeFi composability primitives. */
export function DefiChecklist() {
  const items = [
    "Yield-bearing collateral out of the box",
    "CCTP cross-chain deposits",
    "Self-repaying borrow primitives",
  ];
  return (
    <div className="mt-1 flex flex-col gap-2">
      {items.map((i) => (
        <span key={i} className="flex items-center gap-[9px] text-[14.5px] text-text-3">
          <Check className="size-4 shrink-0 text-forest" strokeWidth={2.4} />
          {i}
        </span>
      ))}
    </div>
  );
}

/** Dark "Earn tab" mock used for the fintech wallet segment. */
export function WalletArt() {
  return (
    <div className="flex w-full max-w-[420px] flex-col gap-4 rounded-[22px] bg-ink p-7 shadow-[0_24px_60px_-28px_rgba(11,20,16,0.5)]">
      <span className="text-[13px] text-[#8FA39A]">Wallet home · Earn tab</span>
      <div className="flex flex-col gap-[10px]">
        <div className="flex items-center justify-between rounded-[14px] border border-[rgba(231,229,220,0.12)] bg-[rgba(247,246,241,0.05)] px-4 py-[14px]">
          <span className="text-[14px] text-[#C7D2CB]">USDC earning</span>
          <span className="font-mono font-semibold text-citron">9.24%</span>
        </div>
        <div className="flex items-center justify-between rounded-[14px] border border-[rgba(231,229,220,0.12)] bg-[rgba(247,246,241,0.05)] px-4 py-[14px]">
          <span className="text-[14px] text-[#C7D2CB]">Earned this month</span>
          <span className="font-mono font-semibold text-paper">+$38.12</span>
        </div>
      </div>
      <div className="rounded-[10px] border border-[#27362E] bg-ink-soft p-3 font-mono text-[11px] text-[#6E8278]">
        earnit.deposit(&#123; user, asset:&apos;USDC&apos; &#125;)
      </div>
    </div>
  );
}

/** ERC-4626 share-token card used for the DEXes & DeFi segment. */
export function DefiArt() {
  return (
    <div className="flex w-full max-w-[420px] flex-col gap-[14px] rounded-[22px] border border-hairline bg-white p-7">
      <div className="flex items-center gap-[10px]">
        <span className="flex size-[34px] items-center justify-center rounded-[10px] bg-[rgba(10,92,68,0.08)] text-forest">
          <Boxes className="size-[18px]" strokeWidth={2} />
        </span>
        <span className="text-[15px] font-semibold">ey-USDC</span>
      </div>
      <div className="rounded-[12px] border border-hairline bg-card p-[14px] font-mono text-[12px] leading-[1.7] text-muted">
        vault.convertToAssets(shares)
        <br />
        {"// 1 ey-USDC = 1.0438 USDC"}
        <br />
        asset: USDC
        <br />
        standard: ERC-4626
      </div>
    </div>
  );
}

/** Forest gradient treasury card used for the payroll & treasury segment. */
export function TreasuryArt() {
  return (
    <div className="relative flex w-full max-w-[420px] flex-col gap-[14px] overflow-hidden rounded-[22px] bg-[linear-gradient(150deg,#0A5C44,#0B3B2D)] p-7 text-paper">
      <div className="pointer-events-none absolute -right-5 -top-10 size-[180px] bg-[radial-gradient(circle,rgba(198,242,78,0.16),rgba(198,242,78,0)_70%)]" />
      <span className="text-[13px] text-[#A9C4B8]">Operating cash</span>
      <span className="font-mono text-[34px] font-semibold tracking-[-0.02em] text-paper">$4,200,000</span>
      <div className="flex items-center justify-between border-t border-[rgba(231,229,220,0.16)] pt-2">
        <span className="text-[14px] text-[#A9C4B8]">Earning T+0</span>
        <span className="font-mono font-semibold text-citron">+$386K / yr</span>
      </div>
    </div>
  );
}
