"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { SECURITY_FAQS } from "@/lib/mock/security";

/** Single-open accordion of security questions. */
export function SecurityFaq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="mx-auto max-w-[780px] px-6 pb-20 pt-12">
      <h2 className="mb-6 text-center font-display text-[30px] font-semibold tracking-[-0.02em]">
        Security questions
      </h2>
      <div className="flex flex-col gap-[10px]">
        {SECURITY_FAQS.map((f, i) => {
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
                <span className="text-[15.5px] font-semibold text-ink">{f.q}</span>
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
