"use client";

import { useState } from "react";
import { Copy, Eye, EyeOff, Plus } from "lucide-react";
import { API_KEYS, maskKey } from "@/lib/mock/dashboard";

const TH = "text-[11.5px] font-semibold uppercase tracking-[0.05em] text-muted-2";
const GRID = "grid grid-cols-[1.1fr_2fr_1fr_1fr_80px] gap-3";

/** API key management table with per-row reveal + copy. */
export function ApiKeys() {
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  const toggle = (i: number) => setRevealed((r) => ({ ...r, [i]: !r[i] }));
  const copy = (full: string) => {
    navigator.clipboard?.writeText(full).catch(() => {});
  };

  return (
    <div className="flex flex-col gap-[18px]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="m-0 max-w-[520px] text-[14px] text-muted sm:text-[14.5px]">
          API keys authenticate your server requests. Keep secret keys server-side and rotate them if exposed.
        </p>
        <button
          type="button"
          className="flex shrink-0 cursor-pointer items-center gap-[7px] rounded-[10px] bg-citron px-4 py-2.5 text-[14px] font-semibold text-ink shadow-[0_2px_8px_-2px_rgba(10,92,68,0.25)] transition-all hover:-translate-y-px hover:brightness-[1.03]"
        >
          <Plus size={16} />
          Create key
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-hairline bg-card">
        <div className="overflow-x-auto">
          <div className="min-w-[720px]">
            <div className={`${GRID} border-b border-hairline bg-paper px-[18px] py-[13px]`}>
              <span className={TH}>Name</span>
              <span className={TH}>Key</span>
              <span className={TH}>Created</span>
              <span className={TH}>Last used</span>
              <span className={TH} />
            </div>
            {API_KEYS.map((k, i) => (
              <div key={k.full} className={`${GRID} items-center border-b border-hairline-2 px-[18px] py-[14px] last:border-b-0`}>
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-[5px] px-[7px] py-0.5 font-mono text-[10px] font-semibold uppercase ${
                      k.env === "live" ? "bg-[rgba(10,92,68,0.1)] text-forest" : "bg-hairline-2 text-muted"
                    }`}
                  >
                    {k.env}
                  </span>
                  <span className="text-[14px] font-medium">{k.name}</span>
                </div>
                <span className="truncate font-mono text-[13px] text-text-3">
                  {revealed[i] ? k.full : maskKey(k.full)}
                </span>
                <span className="text-[13px] text-muted">{k.created}</span>
                <span className="text-[13px] text-muted">{k.lastUsed}</span>
                <div className="flex justify-end gap-1.5">
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    title="Reveal"
                    className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-lg border border-hairline bg-white text-muted transition-colors hover:border-forest hover:text-forest"
                  >
                    {revealed[i] ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                  <button
                    type="button"
                    onClick={() => copy(k.full)}
                    title="Copy"
                    className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-lg border border-hairline bg-white text-muted transition-colors hover:border-forest hover:text-forest"
                  >
                    <Copy size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
