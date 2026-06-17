import Link from "next/link";

/** Forest-gradient closing panel with the two primary conversions. */
export function FinalCta() {
  return (
    <section className="px-6 pb-24 max-[640px]:pb-16">
      <div
        className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[28px] px-12 py-[72px] text-center max-[640px]:px-6"
        style={{ background: "linear-gradient(135deg,#0A5C44,#0B3B2D)" }}
      >
        <div
          className="pointer-events-none absolute -top-20 left-1/2 h-[300px] w-[600px] -translate-x-1/2"
          style={{ background: "radial-gradient(circle, rgba(198,242,78,.18), rgba(198,242,78,0) 70%)" }}
        />
        <div className="relative flex flex-col items-center gap-6">
          <h2 className="max-w-[640px] text-balance font-display text-[48px] font-semibold leading-[1.05] tracking-[-0.02em] text-paper max-[640px]:text-[38px]">
            Ship yield this week.
          </h2>
          <p className="max-w-[480px] text-[18px] text-[#A9C4B8]">
            Get a test API key and have the widget live in your app before lunch.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/get-started"
              className="rounded-xl bg-citron px-[26px] py-[15px] text-[15.5px] font-semibold text-ink no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-8px_rgba(198,242,78,.4)]"
            >
              Get API key
            </Link>
            <Link
              href="/playground"
              className="rounded-xl border border-[rgba(247,246,241,.18)] bg-[rgba(247,246,241,.08)] px-6 py-[15px] text-[15.5px] font-semibold text-paper no-underline transition-colors duration-200 hover:bg-[rgba(247,246,241,.14)]"
            >
              Open Playground
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
