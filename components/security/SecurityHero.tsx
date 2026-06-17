import { ShieldCheck } from "lucide-react";

/** Shield-topped centered intro for the Security page. */
export function SecurityHero() {
  return (
    <section className="mx-auto flex max-w-[880px] flex-col items-center gap-5 px-6 pb-12 pt-[84px] text-center">
      <span className="flex size-14 items-center justify-center rounded-[16px] bg-[rgba(10,92,68,0.08)] text-forest">
        <ShieldCheck className="size-7" strokeWidth={2} />
      </span>
      <h1 className="font-display text-[52px] font-semibold leading-[1.04] tracking-[-0.025em] text-balance max-[640px]:text-[38px]">
        What you audit is what runs
      </h1>
      <p className="max-w-[580px] text-[19px] leading-[1.55] text-muted text-pretty">
        Real-world-asset yield, backed by US treasuries, in non-custodial vaults. No upgradeable
        proxies, no hidden levers — just contracts you can read.
      </p>
    </section>
  );
}
