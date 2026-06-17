/** Thin reassurance strip + partner wordmarks below the hero. */
export function TrustBar() {
  return (
    <section className="border-y border-hairline bg-card">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-8 px-6 py-[26px]">
        <span className="whitespace-nowrap text-[13px] font-medium text-muted">
          Regulated RWA · 24/7 settlement · T+0
        </span>
        <div className="flex flex-wrap items-center gap-9 opacity-80">
          <span className="font-display text-[20px] font-semibold tracking-[-0.01em] text-ink">Arc</span>
          <span className="font-display text-[20px] font-semibold tracking-[-0.02em] text-[#2775CA]">Circle</span>
          <span className="text-base font-semibold text-muted-2">Hashnote</span>
          <span className="text-base font-semibold text-muted-2">Lumen Pay</span>
          <span className="text-base font-semibold text-muted-2">Northwind</span>
        </div>
      </div>
    </section>
  );
}
