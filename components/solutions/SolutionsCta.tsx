import Link from "next/link";

/** Closing forest-gradient panel inviting teams that don't see their fit. */
export function SolutionsCta() {
  return (
    <section className="mt-20 px-6 pb-24">
      <div className="relative mx-auto max-w-[1140px] overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,#0A5C44,#0B3B2D)] px-12 py-16 text-center max-[640px]:px-6">
        <div className="pointer-events-none absolute -top-20 left-1/2 h-[300px] w-[600px] -translate-x-1/2 bg-[radial-gradient(circle,rgba(198,242,78,0.18),rgba(198,242,78,0)_70%)]" />
        <div className="relative flex flex-col items-center gap-[22px]">
          <h2 className="max-w-[600px] font-display text-[42px] font-semibold leading-[1.05] tracking-[-0.02em] text-balance text-paper max-[640px]:text-[32px]">
            Not sure where you fit? We&apos;ll map it.
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/get-started"
              className="rounded-[12px] bg-citron px-[26px] py-[15px] text-[15.5px] font-semibold text-ink transition-transform hover:-translate-y-0.5"
            >
              Talk to us
            </Link>
            <Link
              href="/docs"
              className="rounded-[12px] border border-[rgba(247,246,241,0.18)] bg-[rgba(247,246,241,0.08)] px-6 py-[15px] text-[15.5px] font-semibold text-paper"
            >
              Read the docs
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
