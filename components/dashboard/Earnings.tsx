"use client";

import {
  EARNINGS_BARS,
  FEE_EARNINGS_TOTAL,
  NEXT_PAYOUT_AMOUNT,
  NEXT_PAYOUT_DATE,
  PAYOUT_ADDRESS,
  PAYOUTS,
} from "@/lib/mock/dashboard";

const TH = "text-[11.5px] font-semibold uppercase tracking-[0.05em] text-muted-2";
const GRID = "grid grid-cols-[1fr_1fr_1fr_120px] gap-3";

const BAR_WIDTH = 34;
const BAR_GAP = 49;
const CHART_H = 160;

/** Fee-share earnings: bar chart + next-payout card + payouts table. */
export function Earnings() {
  return (
    <div className="flex flex-col gap-[18px]">
      <div className="grid grid-cols-[1.6fr_1fr] gap-4 max-[820px]:grid-cols-1">
        {/* Bar chart */}
        <div className="flex flex-col gap-4 rounded-[18px] border border-hairline bg-card p-6">
          <div className="flex items-center justify-between">
            <span className="text-[16px] font-semibold">Fee-share earnings</span>
            <span className="font-mono text-[20px] font-semibold text-forest">
              {FEE_EARNINGS_TOTAL}
            </span>
          </div>
          <svg viewBox="0 0 600 180" preserveAspectRatio="none" className="block h-[160px] w-full">
            {EARNINGS_BARS.map((h, i) => (
              <rect
                key={i}
                x={10 + i * BAR_GAP}
                y={CHART_H - h}
                width={BAR_WIDTH}
                height={h}
                rx={5}
                fill={i === EARNINGS_BARS.length - 1 ? "#C6F24E" : "#0A5C44"}
              />
            ))}
          </svg>
        </div>

        {/* Next payout card */}
        <div className="relative flex flex-col gap-2.5 overflow-hidden rounded-[18px] bg-[linear-gradient(150deg,#0A5C44,#0B3B2D)] p-6 text-paper">
          <div className="pointer-events-none absolute -right-5 -top-10 h-[180px] w-[180px] bg-[radial-gradient(circle,rgba(198,242,78,0.16),rgba(198,242,78,0)_70%)]" />
          <span className="text-[13px] text-[#A9C4B8]">Next payout</span>
          <span className="font-mono text-[38px] font-semibold tracking-[-0.02em] text-citron">
            {NEXT_PAYOUT_AMOUNT}
          </span>
          <span className="text-[13px] text-[#A9C4B8]">Scheduled {NEXT_PAYOUT_DATE}</span>
          <div className="mt-auto overflow-hidden text-ellipsis whitespace-nowrap border-t border-[rgba(231,229,220,0.16)] pt-3.5 font-mono text-[12px] text-[#A9C4B8]">
            {PAYOUT_ADDRESS}
          </div>
        </div>
      </div>

      {/* Payouts table */}
      <div className="overflow-hidden rounded-2xl border border-hairline bg-card">
        <div className={`${GRID} border-b border-hairline bg-paper px-[18px] py-[13px]`}>
          <span className={TH}>Date</span>
          <span className={TH}>Amount</span>
          <span className={TH}>Tx</span>
          <span className={TH}>Status</span>
        </div>
        {PAYOUTS.map((p) => (
          <div
            key={p.date}
            className={`${GRID} items-center border-b border-hairline-2 px-[18px] py-[14px]`}
          >
            <span className="text-[13.5px] text-text-3">{p.date}</span>
            <span className="font-mono text-[13.5px] font-medium text-ink">{p.amount}</span>
            <span className="font-mono text-[13px] text-muted">{p.tx}</span>
            <span className="justify-self-start rounded-full bg-[rgba(10,92,68,0.1)] px-[11px] py-1 text-[12px] font-semibold text-forest">
              {p.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
