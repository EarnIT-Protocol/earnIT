import { DollarSign, Sprout } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealSection } from "./Section";

/** "The spread problem" — copy + two stacked contrast cards. */
export function Problem() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-24 max-[640px]:py-16">
      <RevealSection>
        <div className="grid grid-cols-2 items-start gap-[72px] max-[940px]:grid-cols-1 max-[940px]:gap-8">
          <div className="flex flex-col gap-[18px]">
            <Eyebrow>The spread problem</Eyebrow>
            <h2 className="text-balance font-display text-[40px] font-semibold leading-[1.1] tracking-[-0.02em] text-ink">
              Banks keep the yield. Your users get crumbs.
            </h2>
            <p className="text-pretty text-[17px] leading-[1.6] text-muted">
              Deposits get lent out at 6–23%. Depositors see close to 0%. The spread is the business — and it has
              never been shared with the people whose money makes it.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {/* Build-cost card — danger tinted */}
            <div className="flex gap-4 rounded-[18px] border border-hairline bg-card p-[22px]">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[rgba(192,73,43,.1)]">
                <DollarSign size={22} className="text-danger" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-base font-semibold">The build cost is brutal</span>
                <span className="text-[14.5px] leading-[1.5] text-muted">
                  Custody, oracles, compliance, smart contracts —{" "}
                  <strong className="font-mono font-medium text-ink">9–12 months</strong> and{" "}
                  <strong className="font-mono font-medium text-ink">$1–3M</strong> before a single user earns.
                </span>
              </div>
            </div>

            {/* Solution card — forest filled */}
            <div className="flex gap-4 rounded-[18px] bg-forest p-[22px] shadow-[0_12px_30px_-14px_rgba(10,92,68,.5)]">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[rgba(198,242,78,.18)]">
                <Sprout size={22} className="text-citron" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-base font-semibold text-paper">EarnIT collapses it to one SDK</span>
                <span className="text-[14.5px] leading-[1.5] text-[#A9C4B8]">
                  We own custody, compliance, and the protocol. You ship yield this week — and earn a share of
                  every basis point.
                </span>
              </div>
            </div>
          </div>
        </div>
      </RevealSection>
    </section>
  );
}
