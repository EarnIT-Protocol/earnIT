"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, Plus } from "lucide-react";
import { ConnectedEarnitWidget } from "@/components/widget/ConnectedEarnitWidget";

/** Live yield figure that ticks up ~every 90ms, mirroring the prototype. */
function useLiveEarned() {
  const [earned, setEarned] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      setEarned((e) => e + 0.0007 + Math.random() * 0.0009);
    }, 90);
    return () => clearInterval(t);
  }, []);
  return earned;
}

export function Hero() {
  const earned = useLiveEarned();

  return (
    <section className="relative overflow-hidden">
      {/* Radial glow blobs behind the art */}
      <div
        className="pointer-events-none absolute -top-[120px] -right-20 h-[560px] w-[560px] animate-[ew-glow_7s_ease-in-out_infinite]"
        style={{
          background: "radial-gradient(circle, rgba(198,242,78,.22), rgba(198,242,78,0) 68%)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-[160px] -left-[120px] h-[520px] w-[520px]"
        style={{
          background: "radial-gradient(circle, rgba(10,92,68,.12), rgba(10,92,68,0) 70%)",
        }}
      />

      <div className="relative mx-auto grid max-w-[1200px] grid-cols-[1.05fr_.95fr] items-center gap-16 px-6 pt-[84px] pb-24 max-[940px]:grid-cols-1 max-[940px]:gap-12 max-[640px]:px-5">
        {/* Left column — copy + CTAs */}
        <motion.div
          className="flex flex-col gap-[26px]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex w-fit items-center gap-2 rounded-full border border-hairline bg-card px-[13px] py-1.5">
            <span className="h-[7px] w-[7px] rounded-full bg-citron shadow-[0_0_0_3px_rgba(198,242,78,.25)]" />
            <span className="text-[13px] font-medium text-muted">Now live on Arc testnet</span>
          </div>

          <h1 className="text-balance font-display text-[60px] font-semibold leading-[1.04] tracking-[-0.025em] text-ink max-[940px]:text-[46px] max-[640px]:text-[38px]">
            The yield engine consumer apps run on
          </h1>

          <p className="max-w-[480px] text-pretty text-[19px] leading-[1.55] text-muted">
            Embed regulated RWA yield. One SDK. Your users earn — you earn a share.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/playground"
              className="inline-flex items-center gap-2 rounded-xl bg-citron px-[22px] py-3.5 text-[15.5px] font-semibold text-ink no-underline shadow-[0_3px_12px_-3px_rgba(10,92,68,.32)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-[1.03] hover:shadow-[0_12px_26px_-8px_rgba(10,92,68,.4)]"
            >
              Open Playground
              <ArrowRight size={17} strokeWidth={2.2} />
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 rounded-xl border border-hairline bg-card px-5 py-3.5 text-[15.5px] font-semibold text-ink no-underline transition-all duration-200 hover:border-forest hover:text-forest"
            >
              Read the docs
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-[18px] pt-2 text-[13.5px] text-muted">
            <span className="flex items-center gap-[7px]">
              <Check size={16} strokeWidth={2.4} className="text-forest" />
              No custody to build
            </span>
            <span className="flex items-center gap-[7px]">
              <Check size={16} strokeWidth={2.4} className="text-forest" />
              SOC-grade compliance
            </span>
          </div>
        </motion.div>

        {/* Right column — floating widget + pinned badges */}
        <motion.div
          className="relative justify-self-end max-[940px]:w-full max-[940px]:justify-self-center max-[940px]:px-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div
            className="pointer-events-none absolute -inset-[30px]"
            style={{
              background:
                "radial-gradient(circle at 50% 40%, rgba(255,255,255,.7), rgba(255,255,255,0) 70%)",
            }}
          />
          <div className="relative mx-auto w-full max-w-[400px] animate-[ew-float_6s_ease-in-out_infinite]">
            {/* Dark "Live yield" badge — figure animates
            <div className="absolute -top-[18px] -left-[22px] z-[3] flex items-center gap-2 rounded-xl bg-ink px-[13px] py-2 shadow-[0_12px_30px_-8px_rgba(11,20,16,.4)]">
              <span className="h-[7px] w-[7px] rounded-full bg-citron animate-[ew-pulse_1.6s_ease-in-out_infinite]" />
              <span className="text-xs text-[#C7D2CB]">Live yield</span>
              <span className="font-mono text-[13px] font-semibold text-citron tabular-nums">
                +${earned.toFixed(4)}
              </span>
            </div> */}

            {/* Light "Built on Arc" badge */}
            <div className="absolute -bottom-4 -right-[18px] z-[3] flex items-center gap-[7px] rounded-xl border border-hairline bg-card px-[13px] py-2 shadow-[0_12px_30px_-10px_rgba(11,20,16,.18)]">
              <Plus size={15} strokeWidth={2} className="text-forest" />
              <span className="whitespace-nowrap text-xs text-muted">Built on Arc · Circle USYC</span>
            </div>

            <ConnectedEarnitWidget />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
