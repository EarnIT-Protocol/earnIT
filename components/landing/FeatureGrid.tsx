import {
  Boxes,
  DollarSign,
  LayoutTemplate,
  Repeat,
  Scan,
  Shield,
  Split,
  Webhook,
  type LucideIcon,
} from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FEATURES, type Feature } from "@/lib/mock/landing";

const ICONS: Record<Feature["icon"], LucideIcon> = {
  boxes: Boxes,
  "layout-template": LayoutTemplate,
  repeat: Repeat,
  "dollar-sign": DollarSign,
  scan: Scan,
  webhook: Webhook,
  split: Split,
  shield: Shield,
};

/** 8 cells in a 1px-gap hairline grid; cells brighten on hover. */
export function FeatureGrid() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-24 max-[640px]:py-16">
      <div className="mb-12 flex flex-col gap-3.5">
        <Eyebrow>Platform</Eyebrow>
        <h2 className="max-w-[560px] text-balance font-display text-[40px] font-semibold leading-[1.1] tracking-[-0.02em] text-ink">
          Everything the yield layer needs, already built
        </h2>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-px overflow-hidden rounded-[20px] border border-hairline bg-hairline">
        {FEATURES.map((f) => {
          const Icon = ICONS[f.icon];
          return (
            <div
              key={f.title}
              className="flex flex-col gap-3 bg-card px-6 py-7 transition-colors duration-200 hover:bg-white"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-[11px] bg-[rgba(10,92,68,.07)] text-forest">
                <Icon size={20} />
              </span>
              <span className="text-[15.5px] font-semibold tracking-[-0.01em]">{f.title}</span>
              <span className="text-[14px] leading-[1.5] text-muted">{f.body}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
