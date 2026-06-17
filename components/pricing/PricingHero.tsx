import { Eyebrow } from "@/components/ui/Eyebrow";

/** Centered intro for the Pricing page. */
export function PricingHero() {
  return (
    <section className="mx-auto flex max-w-[840px] flex-col items-center gap-[18px] px-6 pb-12 pt-[84px] text-center">
      <Eyebrow>Pricing &amp; partner economics</Eyebrow>
      <h1 className="font-display text-[54px] font-semibold leading-[1.04] tracking-[-0.025em] text-balance max-[640px]:text-[40px]">
        You earn when your users earn
      </h1>
      <p className="max-w-[560px] text-[19px] leading-[1.55] text-muted text-pretty">
        No seat fees. No minimums. EarnIT takes a flat 5% performance fee on yield — you keep a
        configurable share of the rest.
      </p>
    </section>
  );
}
