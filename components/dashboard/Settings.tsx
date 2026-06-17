"use client";

import { useState } from "react";
import { ORG, TEAM } from "@/lib/mock/dashboard";

/** Organization + payout settings and the team roster. */
export function Settings() {
  // Controlled inputs (mock — no persistence).
  const [orgName, setOrgName] = useState(ORG.name);
  const [payout, setPayout] = useState(ORG.payoutAddress);

  return (
    <div className="flex flex-col gap-[18px]">
      {/* Organization */}
      <div className="flex flex-col gap-4 rounded-[18px] border border-hairline bg-card p-6">
        <span className="text-[16px] font-semibold">Organization</span>
        <div className="flex items-center gap-4">
          <span className="flex h-[54px] w-[54px] items-center justify-center rounded-[14px] bg-forest font-mono text-[22px] font-semibold text-citron">
            L
          </span>
          <div className="flex flex-col gap-1">
            <input
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              className="w-[240px] rounded-[9px] border border-hairline bg-white px-3 py-2.5 text-[14px] font-medium"
            />
            <span className="text-[12px] text-muted-2">{ORG.meta}</span>
          </div>
        </div>
        <div className="flex max-w-[420px] flex-col gap-[7px]">
          <span className="text-[13px] font-medium text-text-3">Payout address</span>
          <input
            value={payout}
            onChange={(e) => setPayout(e.target.value)}
            className="rounded-[10px] border border-hairline bg-white px-3.5 py-2.5 font-mono text-[13px] text-text-3"
          />
        </div>
      </div>

      {/* Team */}
      <div className="flex flex-col gap-3.5 rounded-[18px] border border-hairline bg-card p-6">
        <div className="flex items-center justify-between">
          <span className="text-[16px] font-semibold">Team</span>
          <button
            type="button"
            className="flex cursor-pointer items-center gap-1.5 rounded-[9px] border border-hairline bg-white px-3 py-2 text-[13.5px] font-semibold"
          >
            Invite
          </button>
        </div>
        {TEAM.map((t) => (
          <div key={t.email} className="flex items-center gap-3 py-1.5">
            <span
              className="flex h-[34px] w-[34px] items-center justify-center rounded-full text-[12.5px] font-semibold text-ink"
              style={{ background: t.avatarBg }}
            >
              {t.initials}
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-px">
              <span className="text-[14px] font-medium">{t.name}</span>
              <span className="text-[12.5px] text-muted-2">{t.email}</span>
            </div>
            <span className="rounded-full border border-hairline bg-paper px-2.5 py-1 text-[12px] font-medium text-muted">
              {t.role}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
