import { Eyebrow } from "@/components/ui/Eyebrow";

const SEGMENTS = ["Neobanks", "Fintech wallets", "DEXes & DeFi", "Payroll & treasury"];

/** Centered intro for the Solutions page with segment chips. */
export function SolutionsHero() {
  return (
    <section className="mx-auto flex max-w-[860px] flex-col items-center gap-[18px] px-6 pb-14 pt-[84px] text-center">
      <Eyebrow>Solutions</Eyebrow>
      <h1 className="font-display text-[54px] font-semibold leading-[1.04] tracking-[-0.025em] text-balance max-[640px]:text-[40px]">
        One yield engine, every kind of app
      </h1>
      <p className="max-w-[560px] text-[19px] leading-[1.55] text-muted text-pretty">
        Whatever you&apos;re building, EarnIT slots in as the earn layer — with the custody,
        compliance, and settlement already handled.
      </p>
      <div className="mt-2 flex flex-wrap justify-center gap-[10px]">
        {SEGMENTS.map((s) => (
          <span
            key={s}
            className="rounded-full border border-hairline bg-card px-[14px] py-[7px] text-[13px] font-medium text-text-3"
          >
            {s}
          </span>
        ))}
      </div>
    </section>
  );
}
