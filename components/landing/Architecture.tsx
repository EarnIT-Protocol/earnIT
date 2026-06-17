"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Boxes, Code, Globe, LayoutPanelLeft, Users, type LucideIcon } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ARCH_LAYERS, type ArchLayer } from "@/lib/mock/landing";

const ICONS: Record<ArchLayer["icon"], LucideIcon> = {
  users: Users,
  "layout-panel-left": LayoutPanelLeft,
  code: Code,
  boxes: Boxes,
  globe: Globe,
};

/** Stacked architecture layers; EarnIT-owned ones are forest-filled. */
export function Architecture() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-24 max-[640px]:py-16">
      <div className="grid grid-cols-[.85fr_1.15fr] items-center gap-16 max-[940px]:grid-cols-1 max-[940px]:gap-8">
        <div className="flex flex-col gap-[18px]">
          <Eyebrow>Architecture</Eyebrow>
          <h2 className="text-balance font-display text-[40px] font-semibold leading-[1.1] tracking-[-0.02em] text-ink">
            One stack, fully owned where it matters
          </h2>
          <p className="text-pretty text-[17px] leading-[1.6] text-muted">
            Your app calls our SDK. We run the vaults, the FX swap, and the allocator — settling into Circle USYC
            on Arc. The layers we own and audit are highlighted.
          </p>
          <div className="mt-1.5 flex gap-4">
            <span className="flex items-center gap-2 text-[13.5px] text-muted">
              <span className="h-3.5 w-3.5 rounded bg-forest" />
              EarnIT-owned
            </span>
            <span className="flex items-center gap-2 text-[13.5px] text-muted">
              <span className="h-3.5 w-3.5 rounded border border-hairline bg-card" />
              Partner / network
            </span>
          </div>
        </div>

        <div className="flex flex-col">
          {ARCH_LAYERS.map((L, i) => {
            const Icon = ICONS[L.icon];
            return (
              <Fragment key={L.title}>
                <motion.div
                  className={`flex cursor-default items-center justify-between rounded-[14px] px-5 py-[18px] ${
                    L.owned
                      ? "bg-forest shadow-[0_10px_26px_-14px_rgba(10,92,68,.45)]"
                      : "border border-hairline bg-card"
                  }`}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: L.owned ? "0 10px 26px -14px rgba(10,92,68,.7)" : undefined,
                    borderColor: L.owned ? undefined : "#0A5C44",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={`flex h-[38px] w-[38px] flex-shrink-0 items-center justify-center rounded-[10px] ${
                        L.owned ? "bg-[rgba(198,242,78,.16)] text-citron" : "bg-[rgba(10,92,68,.07)] text-forest"
                      }`}
                    >
                      <Icon size={20} />
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <span
                        className={`text-[15.5px] font-semibold tracking-[-0.01em] ${L.owned ? "text-paper" : ""}`}
                      >
                        {L.title}
                      </span>
                      <span className={`text-[13px] ${L.owned ? "text-[#A9C4B8]" : "text-muted"}`}>{L.sub}</span>
                    </div>
                  </div>
                  <span
                    className={`whitespace-nowrap rounded-[7px] px-[9px] py-1 font-mono text-[11.5px] font-medium ${
                      L.owned
                        ? "bg-[rgba(198,242,78,.14)] text-citron"
                        : "border border-hairline bg-white text-muted"
                    }`}
                  >
                    {L.tag}
                  </span>
                </motion.div>
                {i < ARCH_LAYERS.length - 1 && (
                  <div className="flex h-[18px] justify-center">
                    <ArrowDown size={18} className="text-[#C0C6BD]" />
                  </div>
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
