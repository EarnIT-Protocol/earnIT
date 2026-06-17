"use client";

import { Code2, Globe } from "lucide-react";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { embedSnippet, type Env } from "@/lib/mock/dashboard";

/** SDK + network status cards, plus the embeddable widget snippet. */
export function Integrations({ env }: { env: Env }) {
  const networkLabel = env === "test" ? "Testnet" : "Mainnet";

  return (
    <div className="flex flex-col gap-[18px]">
      {/* Status cards */}
      <div className="flex flex-wrap gap-4">
        <div className="flex min-w-[220px] flex-1 items-center gap-3.5 rounded-2xl border border-hairline bg-card p-5">
          <span className="flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-[rgba(10,92,68,0.08)] text-forest">
            <Code2 size={20} />
          </span>
          <div className="flex flex-col gap-0.5">
            <span className="text-[15px] font-semibold">SDK</span>
            <span className="flex items-center gap-1.5 text-[13px] text-forest">
              <span className="h-[7px] w-[7px] rounded-full bg-forest" />
              Connected · v1.4.2
            </span>
          </div>
        </div>
        <div className="flex min-w-[220px] flex-1 items-center gap-3.5 rounded-2xl border border-hairline bg-card p-5">
          <span className="flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-[rgba(10,92,68,0.08)] text-forest">
            <Globe size={20} />
          </span>
          <div className="flex flex-col gap-0.5">
            <span className="text-[15px] font-semibold">Network</span>
            <span className="text-[13px] text-muted">Arc · {networkLabel}</span>
          </div>
        </div>
      </div>

      {/* Embed snippet */}
      <div className="flex flex-col gap-3 rounded-[18px] border border-hairline bg-card p-6">
        <span className="text-[16px] font-semibold">Embed snippet</span>
        <p className="m-0 text-[13.5px] text-muted">
          Drop this into your app to render the EarnIT widget.
        </p>
        <CodeBlock tabs={[{ label: "html", code: embedSnippet(env) }]} />
      </div>
    </div>
  );
}
