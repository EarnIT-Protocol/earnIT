"use client";

import { motion } from "framer-motion";
import { Code, DollarSign, Sprout, TrendingUp, type LucideIcon } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HOW_STEPS, type HowStep } from "@/lib/mock/landing";

const ICONS: Record<HowStep["icon"], LucideIcon> = {
  code: Code,
  "dollar-sign": DollarSign,
  "trending-up": TrendingUp,
  sprout: Sprout,
};

export function HowItWorks() {
  return (
    <section className="border-y border-hairline bg-card">
      <div className="mx-auto max-w-[1200px] px-6 py-24 max-[640px]:py-16">
        <div className="mb-[54px] flex flex-col items-center gap-3.5 text-center">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="max-w-[620px] text-balance font-display text-[40px] font-semibold leading-[1.1] tracking-[-0.02em] text-ink">
            From npm install to live yield in four steps
          </h2>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-5">
          {HOW_STEPS.map((s, i) => {
            const Icon = ICONS[s.icon];
            return (
              <motion.div
                key={s.n}
                className="flex flex-col gap-3.5 rounded-[18px] border border-hairline bg-white p-[26px]"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.07 }}
                whileHover={{ y: -4, boxShadow: "0 18px 36px -18px rgba(11,20,16,.18)" }}
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-[rgba(10,92,68,.08)] text-forest">
                    <Icon size={20} />
                  </span>
                  <span className="font-mono text-[13px] font-medium text-[#C0C6BD]">
                    0{s.n}
                  </span>
                </div>
                <span className="text-[16.5px] font-semibold tracking-[-0.01em]">{s.title}</span>
                <span className="text-[14.5px] leading-[1.55] text-muted">{s.body}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
