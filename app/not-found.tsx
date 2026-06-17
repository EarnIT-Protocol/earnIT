import Link from "next/link";
import { Sprout } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";

export default function NotFound() {
  return (
    <SiteShell>
      <div className="relative flex flex-col items-center justify-center gap-6 overflow-hidden px-6 py-16 text-center">
        <div className="pointer-events-none absolute left-1/2 top-1/2 size-[520px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(198,242,78,0.16),rgba(198,242,78,0)_68%)]" />

        <div
          className="relative flex size-[88px] items-center justify-center rounded-[24px] bg-[linear-gradient(140deg,#0A5C44_0%,#0A5C44_38%,#7FBF52_78%,#C6F24E_100%)] shadow-[0_20px_50px_-16px_rgba(10,92,68,0.5)]"
          style={{ animation: "ew-float 5s ease-in-out infinite" }}
        >
          <Sprout className="size-11 text-paper" strokeWidth={1.8} />
        </div>

        <span className="relative font-mono text-[72px] font-semibold leading-none tracking-[-0.04em] text-ink">
          404
        </span>
        <h1 className="relative m-0 font-display text-[30px] font-semibold tracking-[-0.02em]">
          This page didn&apos;t compound
        </h1>
        <p className="relative max-w-[420px] text-[16.5px] text-muted text-pretty">
          The page you&apos;re looking for isn&apos;t here. Let&apos;s get you back to something that
          earns.
        </p>
        <div className="relative flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-[12px] bg-citron px-[22px] py-[13px] text-[15px] font-semibold text-ink transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_26px_-8px_rgba(10,92,68,0.4)]"
          >
            Back home
          </Link>
          <Link
            href="/docs"
            className="rounded-[12px] border border-hairline bg-card px-5 py-[13px] text-[15px] font-semibold text-ink"
          >
            Read the docs
          </Link>
        </div>
      </div>
    </SiteShell>
  );
}
