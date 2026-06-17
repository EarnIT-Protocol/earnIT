"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Building2,
  ChevronRight,
  Repeat,
  Shield,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { USE_CASES, type UseCase } from "@/lib/mock/landing";

const ICONS: Record<UseCase["icon"], LucideIcon> = {
  "building-2": Building2,
  wallet: Wallet,
  repeat: Repeat,
  briefcase: Briefcase,
};

/** Clickable use-case rows beside a forest security panel. */
export function UseCasesSecurity() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-24 max-[640px]:py-16">
      <div className="grid grid-cols-[1.1fr_.9fr] items-center gap-16 max-[940px]:grid-cols-1 max-[940px]:gap-8">
        <div className="flex flex-col gap-5">
          <Eyebrow>Who builds on EarnIT</Eyebrow>
          <div className="flex flex-col gap-2.5">
            {USE_CASES.map((u) => {
              const Icon = ICONS[u.icon];
              return (
                <motion.div key={u.title} whileHover={{ x: 4 }} transition={{ duration: 0.18 }}>
                  <Link
                    href="/solutions"
                    className="flex items-center justify-between rounded-2xl border border-hairline bg-card px-[22px] py-5 text-ink no-underline transition-colors duration-200 hover:border-forest"
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="flex h-10 w-10 items-center justify-center rounded-[11px] bg-[rgba(10,92,68,.07)] text-forest">
                        <Icon size={20} />
                      </span>
                      <div className="flex flex-col gap-px">
                        <span className="text-base font-semibold">{u.title}</span>
                        <span className="text-[13.5px] text-muted">{u.body}</span>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-muted-2" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="relative flex flex-col gap-[18px] overflow-hidden rounded-3xl bg-forest p-9 shadow-[0_24px_60px_-28px_rgba(10,92,68,.6)]">
          <div
            className="absolute -top-[60px] -right-10 h-[240px] w-[240px]"
            style={{ background: "radial-gradient(circle, rgba(198,242,78,.16), rgba(198,242,78,0) 70%)" }}
          />
          <span className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-[rgba(198,242,78,.16)] text-citron">
            <Shield size={24} />
          </span>
          <h3 className="font-display text-[26px] font-semibold leading-[1.15] tracking-[-0.01em] text-paper">
            Backed by US treasuries. What you audit is what runs.
          </h3>
          <p className="text-[15px] leading-[1.6] text-[#A9C4B8]">
            Non-custodial ERC-4626 vaults settling into Circle USYC. A profit-unlock window blocks flash-loan APY
            manipulation. No upgradeable proxies on the core vault.
          </p>
          <Link
            href="/security"
            className="mt-1 inline-flex items-center gap-2 text-[15px] font-semibold text-citron no-underline"
          >
            Read about security
            <ArrowRight size={16} strokeWidth={2.2} />
          </Link>
        </div>
      </div>
    </section>
  );
}
