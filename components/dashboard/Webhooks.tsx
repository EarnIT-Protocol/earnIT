"use client";

import { Check } from "lucide-react";
import {
  DELIVERIES,
  WEBHOOK_ENDPOINT,
  WEBHOOK_EVENTS,
  type WebhookEvent,
} from "@/lib/mock/dashboard";

const TH = "text-[11.5px] font-semibold uppercase tracking-[0.05em] text-muted-2";
const GRID = "grid grid-cols-[1.6fr_1fr_1fr_110px] gap-3";

/** Webhook endpoint config, event subscriptions, and delivery log. */
export function Webhooks({
  events,
  onToggle,
}: {
  events: Record<WebhookEvent, boolean>;
  onToggle: (e: WebhookEvent) => void;
}) {
  return (
    <div className="flex flex-col gap-[18px]">
      <div className="flex flex-col gap-3.5 rounded-[18px] border border-hairline bg-card p-6">
        <span className="text-[16px] font-semibold">Endpoint</span>
        <div className="flex flex-wrap gap-2.5">
          <input
            value={WEBHOOK_ENDPOINT}
            readOnly
            className="min-w-[240px] flex-1 rounded-[10px] border border-hairline bg-white px-3.5 py-2.5 font-mono text-[13px] text-text-3"
          />
          <button
            type="button"
            className="cursor-pointer rounded-[10px] border-none bg-forest px-[18px] py-2.5 text-[14px] font-semibold text-paper"
          >
            Save
          </button>
        </div>

        <span className="mt-1 text-[14px] font-semibold">Subscribed events</span>
        <div className="grid grid-cols-2 gap-2 max-[820px]:grid-cols-1">
          {WEBHOOK_EVENTS.map((name) => {
            const on = events[name];
            return (
              <button
                key={name}
                type="button"
                onClick={() => onToggle(name)}
                className={`flex cursor-pointer items-center gap-2.5 rounded-[11px] border bg-white px-3.5 py-3 text-left transition-colors ${
                  on ? "border-forest" : "border-hairline"
                }`}
              >
                <span
                  className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] border ${
                    on ? "border-citron bg-citron" : "border-[#D7D4C9] bg-white"
                  }`}
                >
                  {on && <Check size={13} strokeWidth={3} className="text-ink" />}
                </span>
                <span className="font-mono text-[13px] text-ink">{name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Deliveries */}
      <div className="overflow-hidden rounded-2xl border border-hairline bg-card">
        <div className={`${GRID} border-b border-hairline bg-paper px-[18px] py-[13px]`}>
          <span className={TH}>Event</span>
          <span className={TH}>ID</span>
          <span className={TH}>Time</span>
          <span className={TH}>Status</span>
        </div>
        {DELIVERIES.map((d) => (
          <div
            key={d.id}
            className={`${GRID} items-center border-b border-hairline-2 px-[18px] py-[13px]`}
          >
            <span className="font-mono text-[13px] text-text-3">{d.event}</span>
            <span className="font-mono text-[12.5px] text-muted-2">{d.id}</span>
            <span className="text-[13px] text-muted">{d.time}</span>
            <span
              className={`justify-self-start rounded-md px-2.5 py-[3px] font-mono text-[12px] font-semibold ${
                d.status === "200"
                  ? "bg-[rgba(10,92,68,0.1)] text-forest"
                  : "bg-[rgba(192,73,43,0.1)] text-danger"
              }`}
            >
              {d.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
