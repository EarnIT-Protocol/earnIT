"use client";

import { useMemo, useState } from "react";
import { TrendingUp } from "lucide-react";
import {
  ACTIVITY,
  ACTIVITY_AMOUNT,
  ACTIVITY_DOT,
  ASSETS_AREA_POINTS,
  CHART_MONTHS,
  STATS,
  type ActivityKind,
} from "@/lib/mock/dashboard";

const RANGES = [
  { label: "3M", months: 3 },
  { label: "6M", months: 6 },
  { label: "12M", months: 12 },
] as const;

const FILTERS: { key: "all" | ActivityKind; label: string }[] = [
  { key: "all", label: "All" },
  { key: "deposit", label: "Deposits" },
  { key: "yield", label: "Yield" },
  { key: "withdraw", label: "Withdrawals" },
];

// Build line + area paths (and the end marker position) from a list of y values,
// remapping x evenly across the 0–600 viewBox so any window fills the width.
function buildChart(ys: number[]) {
  const n = ys.length;
  const x = (i: number) => (n <= 1 ? 600 : (i / (n - 1)) * 600);
  const line = ys.map((y, i) => `${i === 0 ? "M" : "L"}${x(i)},${y}`).join(" ");
  return {
    line,
    area: `${line} L600,200 L0,200 Z`,
    endLeft: (x(n - 1) / 600) * 100,
    endTop: (ys[n - 1] / 200) * 100,
  };
}

export function Overview() {
  const [months, setMonths] = useState(12);
  const [filter, setFilter] = useState<"all" | ActivityKind>("all");

  const { line, area, endLeft, endTop, labels } = useMemo(() => {
    const ys = ASSETS_AREA_POINTS.slice(-months).map((p) => p[1]);
    return { ...buildChart(ys), labels: CHART_MONTHS.slice(-months) };
  }, [months]);

  const activity = useMemo(
    () => (filter === "all" ? ACTIVITY : ACTIVITY.filter((a) => a.kind === filter)),
    [filter],
  );

  return (
    <div className="flex flex-col gap-5">
      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="flex flex-col gap-2.5 rounded-2xl border border-hairline bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-18px_rgba(11,20,16,0.18)]"
            >
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-muted">{s.label}</span>
                <span className="flex h-[30px] w-[30px] items-center justify-center rounded-[9px] bg-[rgba(10,92,68,0.07)] text-forest">
                  <Icon size={16} />
                </span>
              </div>
              <span className="font-mono text-[26px] font-semibold tracking-[-0.02em] text-ink sm:text-[27px]">{s.value}</span>
              <span className="flex items-center gap-1 font-mono text-[12.5px] font-medium text-forest">
                <TrendingUp size={13} />
                {s.delta}
              </span>
            </div>
          );
        })}
      </div>

      {/* Chart + activity */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.6fr_1fr]">
        <div className="flex flex-col gap-4 rounded-[18px] border border-hairline bg-card p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex flex-col gap-0.5">
              <span className="text-[15px] font-semibold sm:text-[16px]">Assets routed</span>
              <span className="text-[13px] text-muted-2">Last {months} months</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[18px] font-semibold text-ink sm:text-[20px]">$26.7M</span>
              <div className="flex gap-0.5 rounded-lg border border-hairline bg-hairline-2 p-[3px]">
                {RANGES.map((r) => (
                  <button
                    key={r.label}
                    type="button"
                    onClick={() => setMonths(r.months)}
                    className={`cursor-pointer rounded-md px-2.5 py-1 font-mono text-[11.5px] font-medium transition-all ${
                      months === r.months ? "bg-white text-ink shadow-[0_1px_2px_rgba(11,20,16,0.08)]" : "text-muted-2 hover:text-ink"
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="relative h-[180px] w-full sm:h-[200px]">
            {[0, 25, 50, 75, 100].map((t) => (
              <div key={t} className="absolute left-0 right-0 border-t border-hairline/70" style={{ top: `${t}%` }} />
            ))}
            <svg viewBox="0 0 600 200" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
              <defs>
                <linearGradient id="dbArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0A5C44" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#0A5C44" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={area} fill="url(#dbArea)" />
              <path d={line} fill="none" stroke="#C6F24E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
            </svg>
            <span
              className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-card bg-citron shadow-[0_0_0_3px_rgba(198,242,78,0.3)] transition-all duration-300"
              style={{ left: `${endLeft}%`, top: `${endTop}%` }}
            />
          </div>

          <div className="flex justify-between font-mono text-[11px] text-muted-2">
            {labels.map((m, i) => (
              <span key={`${m}-${i}`}>{m}</span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3.5 rounded-[18px] border border-hairline bg-card p-5 sm:p-6">
          <div className="flex flex-col gap-3">
            <span className="text-[15px] font-semibold sm:text-[16px]">Recent activity</span>
            <div className="flex flex-wrap gap-1.5">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setFilter(f.key)}
                  className={`cursor-pointer rounded-full px-2.5 py-1 text-[12px] font-medium transition-colors ${
                    filter === f.key
                      ? "bg-[rgba(10,92,68,0.08)] text-forest"
                      : "text-muted-2 hover:bg-hairline-2 hover:text-ink"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="-mx-2 flex max-h-[300px] flex-col overflow-y-auto">
            {activity.length === 0 && (
              <span className="px-2 py-6 text-center text-[13px] text-muted-2">No activity in this view.</span>
            )}
            {activity.map((a, i) => (
              <div key={`${a.text}-${i}`} className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-hairline-2">
                <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: ACTIVITY_DOT[a.kind] }} />
                <div className="flex min-w-0 flex-1 flex-col gap-px">
                  <span className="truncate text-[13.5px] font-medium text-ink">{a.text}</span>
                  <span className="text-[12px] text-muted-2">{a.time}</span>
                </div>
                {a.amount && (
                  <span className="shrink-0 font-mono text-[13px] font-medium" style={{ color: ACTIVITY_AMOUNT[a.kind] }}>
                    {a.amount}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
