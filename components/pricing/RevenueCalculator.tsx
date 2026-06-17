"use client";

import { useState } from "react";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { formatMoney } from "@/lib/mock/pricing";

interface SliderRowProps {
  label: string;
  display: string;
  min: number;
  max: number;
  step: number;
  value: number;
  minLabel: string;
  maxLabel: string;
  onChange: (v: number) => void;
}

function SliderRow({
  label,
  display,
  min,
  max,
  step,
  value,
  minLabel,
  maxLabel,
  onChange,
}: SliderRowProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between">
        <span className="text-[14px] font-medium text-text-3">{label}</span>
        <span className="font-mono text-[20px] font-semibold text-ink">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full cursor-pointer accent-forest"
      />
      <div className="flex justify-between font-mono text-[11.5px] text-muted-2">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}

/**
 * Live revenue projection. All three inputs recompute the breakdown on change:
 * gross yield → 5% EarnIT fee → 95% net split between users and the partner's
 * configurable share. Figures are illustrative, not a quote.
 */
export function RevenueCalculator() {
  const [deposits, setDeposits] = useState(10_000_000);
  const [apy, setApy] = useState(9.2);
  const [share, setShare] = useState(20);

  const gross = (deposits * apy) / 100;
  const earnitFee = gross * 0.05;
  const net = gross - earnitFee;
  const partner = net * (share / 100);
  const users = net - partner;

  return (
    <section className="border-y border-hairline bg-card">
      <div className="mx-auto max-w-[1100px] px-6 py-20">
        <div className="mb-10 flex flex-col items-center gap-3 text-center">
          <Eyebrow>Revenue calculator</Eyebrow>
          <h2 className="font-display text-[36px] font-semibold tracking-[-0.02em] text-balance max-[640px]:text-[28px]">
            See what your book could earn
          </h2>
        </div>

        <div className="ew-calc grid grid-cols-2 items-stretch gap-6 max-[940px]:grid-cols-1">
          {/* Inputs */}
          <div className="flex flex-col gap-7 rounded-[20px] border border-hairline bg-white p-8">
            <SliderRow
              label="User deposits"
              display={formatMoney(deposits)}
              min={100_000}
              max={100_000_000}
              step={100_000}
              value={deposits}
              minLabel="$100K"
              maxLabel="$100M"
              onChange={(v) => setDeposits(Math.round(v))}
            />
            <SliderRow
              label="Net APY"
              display={`${apy.toFixed(1)}%`}
              min={4}
              max={14}
              step={0.1}
              value={apy}
              minLabel="4%"
              maxLabel="14%"
              onChange={setApy}
            />
            <SliderRow
              label="Your share of yield"
              display={`${share}%`}
              min={5}
              max={40}
              step={1}
              value={share}
              minLabel="5%"
              maxLabel="40%"
              onChange={(v) => setShare(Math.round(v))}
            />
          </div>

          {/* Result */}
          <div className="relative flex flex-col gap-[18px] overflow-hidden rounded-[20px] bg-[linear-gradient(150deg,#0A5C44,#0B3B2D)] p-8 text-paper">
            <div className="pointer-events-none absolute -right-[30px] -top-[50px] size-[220px] bg-[radial-gradient(circle,rgba(198,242,78,0.18),rgba(198,242,78,0)_70%)]" />
            <span className="text-[13px] font-medium text-[#A9C4B8]">Your annual fee earnings</span>
            <span className="font-mono text-[52px] font-semibold leading-none tracking-[-0.02em] text-citron">
              {formatMoney(partner)}
            </span>
            <div className="my-1 h-px bg-[rgba(231,229,220,0.16)]" />
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[14px] text-[#A9C4B8]">Gross annual yield</span>
                <span className="font-mono text-[15px] font-medium">{formatMoney(gross)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[14px] text-[#A9C4B8]">To your users</span>
                <span className="font-mono text-[15px] font-medium">{formatMoney(users)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[14px] text-[#A9C4B8]">EarnIT performance fee (5%)</span>
                <span className="font-mono text-[15px] font-medium">{formatMoney(earnitFee)}</span>
              </div>
            </div>
            <Link
              href="/get-started"
              className="mt-auto rounded-[12px] bg-citron py-[14px] text-center text-[15px] font-semibold text-ink transition-all hover:-translate-y-0.5"
            >
              Talk to us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
