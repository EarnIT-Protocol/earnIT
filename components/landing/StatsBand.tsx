import { STATS } from "@/lib/mock/landing";

/** Four headline KPIs in mono numerals. */
export function StatsBand() {
  return (
    <section className="border-y border-hairline bg-card">
      <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-8 px-6 py-14">
        {STATS.map((st) => (
          <div key={st.label} className="flex flex-col items-center gap-1.5 text-center">
            <span className="font-mono text-[40px] font-semibold tracking-[-0.02em] text-ink">{st.value}</span>
            <span className="text-sm text-muted">{st.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
