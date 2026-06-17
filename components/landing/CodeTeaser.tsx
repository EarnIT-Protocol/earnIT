import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { CODE_TABS } from "@/lib/mock/landing";

/** Dark developer-first section pairing copy with a tabbed code block. */
export function CodeTeaser() {
  return (
    <section className="relative overflow-hidden bg-ink">
      <div
        className="pointer-events-none absolute -top-[100px] -right-[60px] h-[420px] w-[420px]"
        style={{ background: "radial-gradient(circle, rgba(198,242,78,.1), rgba(198,242,78,0) 70%)" }}
      />
      <div className="relative mx-auto max-w-[1100px] px-6 py-24 max-[640px]:py-16">
        <div className="grid grid-cols-[.9fr_1.1fr] items-center gap-14 max-[940px]:grid-cols-1 max-[940px]:gap-8">
          <div className="flex flex-col gap-[18px]">
            <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-citron">
              Developer-first
            </span>
            <h2 className="text-balance font-display text-[40px] font-semibold leading-[1.1] tracking-[-0.02em] text-paper">
              Eight lines to your first deposit
            </h2>
            <p className="text-pretty text-[17px] leading-[1.6] text-[#9DB0A6]">
              Typed SDK, idempotent calls, webhooks for everything. No chain to learn, no keys to manage.
            </p>
            <Link
              href="/docs"
              className="mt-1 inline-flex w-fit items-center gap-2 text-[15px] font-semibold text-citron no-underline"
            >
              View the quickstart
              <ArrowRight size={16} strokeWidth={2.2} />
            </Link>
          </div>

          <CodeBlock tabs={CODE_TABS} />
        </div>
      </div>
    </section>
  );
}
