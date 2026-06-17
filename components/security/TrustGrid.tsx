import { SECURITY_BLOCKS } from "@/lib/mock/security";

/** Three-up grid of security guarantees; each card lifts on hover. */
export function TrustGrid() {
  return (
    <section className="mx-auto max-w-[1140px] px-6 pb-16 pt-8">
      <div className="ew-trust grid grid-cols-3 gap-4 max-[820px]:grid-cols-1">
        {SECURITY_BLOCKS.map(({ title, body, icon: Icon }) => (
          <div
            key={title}
            className="flex flex-col gap-3 rounded-[18px] border border-hairline bg-card p-[26px] transition-all hover:-translate-y-[3px] hover:border-forest"
          >
            <span className="flex size-[42px] items-center justify-center rounded-[12px] bg-[rgba(10,92,68,0.07)] text-forest">
              <Icon className="size-[22px]" strokeWidth={2} />
            </span>
            <span className="text-[16.5px] font-semibold tracking-[-0.01em]">{title}</span>
            <span className="text-[14.5px] leading-[1.55] text-muted">{body}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
