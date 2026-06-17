"use client";

import { TrendingUp } from "lucide-react";
import {
  ACTIVITY,
  ACTIVITY_AMOUNT,
  ACTIVITY_DOT,
  ASSETS_AREA_POINTS,
  STATS,
} from "@/lib/mock/dashboard";

/** Build the line + area paths for the assets-routed chart. */
function buildPaths() {
  const line = ASSETS_AREA_POINTS.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" ");
  const area = `${line} L600,200 L0,200 Z`;
  return { line, area };
}

/** Partner overview: KPI cards + assets chart + recent activity feed. */
export function Overview() {
  const { line, area } = buildPaths();

  return (
    <div className="flex flex-col gap-[22px]">
      {/* Stat cards */}
      <div className="ew-db-stats grid grid-cols-4 gap-4">
        {STATS.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="flex flex-col gap-2.5 rounded-2xl border border-hairline bg-card p-5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-muted">{s.label}</span>
                <span className="flex h-[30px] w-[30px] items-center justify-center rounded-[9px] bg-[rgba(10,92,68,0.07)] text-forest">
                  <Icon size={16} />
                </span>
              </div>
              <span className="font-mono text-[27px] font-semibold tracking-[-0.02em] text-ink">
                {s.value}
              </span>
              <span className="flex items-center gap-1 font-mono text-[12.5px] font-medium text-forest">
                <TrendingUp size={13} />
                {s.delta}
              </span>
            </div>
          );
        })}
      </div>

      {/* Chart + activity */}
      <div className="grid grid-cols-[1.6fr_1fr] gap-4 max-[820px]:grid-cols-1">
        <div className="flex flex-col gap-4 rounded-[18px] border border-hairline bg-card p-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-0.5">
              <span className="text-[16px] font-semibold">Assets routed</span>
              <span className="text-[13px] text-muted-2">Last 12 months</span>
            </div>
            <span className="font-mono text-[20px] font-semibold text-ink">$26.7M</span>
          </div>
          <svg
            viewBox="0 0 600 200"
            preserveAspectRatio="none"
            className="block h-[180px] w-full"
          >
            <defs>
              <linearGradient id="dbArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0A5C44" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#0A5C44" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={area} fill="url(#dbArea)" />
            <path
              d={line}
              fill="none"
              stroke="#C6F24E"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="flex flex-col gap-3.5 rounded-[18px] border border-hairline bg-card p-6">
          <span className="text-[16px] font-semibold">Recent activity</span>
          <div className="flex flex-col gap-3.5">
            {ACTIVITY.map((a) => (
              <div key={a.text} className="flex items-center gap-3">
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ background: ACTIVITY_DOT[a.kind] }}
                />
                <div className="flex min-w-0 flex-1 flex-col gap-px">
                  <span className="text-[13.5px] font-medium text-ink">{a.text}</span>
                  <span className="text-[12px] text-muted-2">{a.time}</span>
                </div>
                {a.amount && (
                  <span
                    className="font-mono text-[13px] font-medium"
                    style={{ color: ACTIVITY_AMOUNT[a.kind] }}
                  >
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
