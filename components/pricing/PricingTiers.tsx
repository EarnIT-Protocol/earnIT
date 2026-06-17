import Link from "next/link";
import { Check } from "lucide-react";
import { PRICING_TIERS, type PricingTier } from "@/lib/mock/pricing";

/** One tier card; featured tier renders on the dark ink surface. */
function TierCard({ tier }: { tier: PricingTier }) {
  const dark = tier.featured;
  return (
    <div
      className={`relative flex flex-col gap-[14px] rounded-[20px] p-[30px] ${
        dark
          ? "bg-ink shadow-[0_24px_60px_-24px_rgba(11,20,16,0.5)]"
          : "border border-hairline bg-card"
      }`}
    >
      {tier.featured && (
        <span className="absolute right-[18px] top-[18px] rounded-full bg-citron px-[10px] py-1 text-[11px] font-semibold uppercase tracking-[0.04em] text-ink">
          Popular
        </span>
      )}
      <span
        className={`font-display text-[20px] font-semibold ${dark ? "text-paper" : "text-ink"}`}
      >
        {tier.name}
      </span>
      <div className="flex items-baseline gap-[6px]">
        <span
          className={`font-mono text-[36px] font-semibold tracking-[-0.02em] ${
            dark ? "text-citron" : "text-ink"
          }`}
        >
          {tier.fee}
        </span>
        {tier.feeNote && (
          <span className={`text-[14px] ${dark ? "text-[#8FA39A]" : "text-muted"}`}>
            {tier.feeNote}
          </span>
        )}
      </div>
      <p className={`text-[14.5px] leading-[1.5] ${dark ? "text-[#8FA39A]" : "text-muted"}`}>
        {tier.tagline}
      </p>
      <div className={`my-1 h-px ${dark ? "bg-[rgba(231,229,220,0.14)]" : "bg-hairline"}`} />
      <div className="flex flex-col gap-[11px]">
        {tier.features.map((f) => (
          <div key={f} className="flex items-start gap-[10px]">
            <Check
              className={`mt-px size-[17px] shrink-0 ${dark ? "text-citron" : "text-forest"}`}
              strokeWidth={2.4}
            />
            <span className={`text-[14px] leading-[1.45] ${dark ? "text-[#C7D2CB]" : "text-text-3"}`}>
              {f}
            </span>
          </div>
        ))}
      </div>
      <Link
        href="/get-started"
        className={`mt-[6px] rounded-[12px] py-[13px] text-center text-[14.5px] font-semibold transition-all ${
          dark
            ? "bg-citron text-ink hover:-translate-y-0.5"
            : "border border-hairline bg-white text-ink hover:border-forest"
        }`}
      >
        {tier.cta}
      </Link>
    </div>
  );
}

/** Three-up grid of pricing tiers. */
export function PricingTiers() {
  return (
    <section className="mx-auto max-w-[1100px] px-6 pb-10 pt-6">
      <div className="ew-tiers grid grid-cols-3 items-stretch gap-5 max-[940px]:grid-cols-1">
        {PRICING_TIERS.map((t) => (
          <TierCard key={t.name} tier={t} />
        ))}
      </div>
    </section>
  );
}
