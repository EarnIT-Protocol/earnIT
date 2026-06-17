import { ArrowRight } from "lucide-react";
import { BACKING_CHAIN } from "@/lib/mock/security";

/** Dark band tracing a deposit back to its US-treasury backing. */
export function BackingChain() {
  return (
    <section className="bg-ink text-paper">
      <div className="mx-auto flex max-w-[1000px] flex-col items-center gap-[14px] px-6 py-20 text-center">
        <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-citron">
          Backing chain
        </span>
        <h2 className="mb-8 max-w-[560px] font-display text-[34px] font-semibold tracking-[-0.02em] text-balance text-paper max-[640px]:text-[28px]">
          Every dollar traces back to a treasury
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {BACKING_CHAIN.map(({ title, sub, icon: Icon }, i) => (
            <div key={title} className="flex items-center gap-2">
              <div className="flex min-w-[130px] flex-col items-center gap-[6px] rounded-[14px] border border-[rgba(231,229,220,0.14)] bg-[rgba(247,246,241,0.05)] px-5 py-[18px]">
                <span className="text-citron">
                  <Icon className="size-[22px]" strokeWidth={1.9} />
                </span>
                <span className="text-[14px] font-semibold text-paper">{title}</span>
                <span className="text-[11.5px] text-[#8FA39A]">{sub}</span>
              </div>
              {i < BACKING_CHAIN.length - 1 && (
                <ArrowRight className="size-5 shrink-0 text-muted" strokeWidth={2} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
