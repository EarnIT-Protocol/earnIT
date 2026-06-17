"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { PRICING_FAQS } from "@/lib/mock/pricing";

/** Single-open accordion of pricing FAQs; clicking an open row closes it. */
export function FaqAccordion() {
  const [open, setOpen] = useState(0);

  return (
    <section className="mx-auto max-w-[780px] px-6 py-20">
      <h2 className="mb-7 text-center font-display text-[34px] font-semibold tracking-[-0.02em] max-[640px]:text-[28px]">
        Frequently asked
      </h2>
      <div className="flex flex-col gap-[10px]">
        {PRICING_FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <div
              key={f.q}
              className={`overflow-hidden rounded-[14px] bg-card transition-colors ${
                isOpen ? "border border-forest" : "border border-hairline"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-[18px] text-left"
              >
                <span className="text-[16px] font-semibold text-ink">{f.q}</span>
                <span
                  className="flex shrink-0 transition-transform duration-200"
                  style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                >
                  <Plus className="size-[18px] text-forest" strokeWidth={2.2} />
                </span>
              </button>
              {isOpen && (
                <p className="px-5 pb-5 text-[15px] leading-[1.6] text-muted">{f.a}</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
