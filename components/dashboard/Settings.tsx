"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { ORG, TEAM } from "@/lib/mock/dashboard";

/** Organization + payout settings and the team roster. */
export function Settings() {
  const [orgName, setOrgName] = useState(ORG.name);
  const [payout, setPayout] = useState(ORG.payoutAddress);

  return (
    <div className="flex flex-col gap-[18px]">
      {/* Organization */}
      <div className="flex flex-col gap-4 rounded-[18px] border border-hairline bg-card p-5 sm:p-6">
        <span className="text-[15px] font-semibold sm:text-[16px]">Organization</span>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <span className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-[14px] bg-forest font-mono text-[22px] font-semibold text-citron">
            L
          </span>
          <div className="flex flex-col gap-1">
            <input
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              className="w-full rounded-[9px] border border-hairline bg-white px-3 py-2.5 text-[14px] font-medium outline-none focus:border-forest sm:w-[260px]"
            />
            <span className="text-[12px] text-muted-2">{ORG.meta}</span>
          </div>
        </div>
        <div className="flex w-full flex-col gap-[7px] sm:max-w-[440px]">
          <span className="text-[13px] font-medium text-text-3">Payout address</span>
          <input
            value={payout}
            onChange={(e) => setPayout(e.target.value)}
            className="w-full rounded-[10px] border border-hairline bg-white px-3.5 py-2.5 font-mono text-[13px] text-text-3 outline-none focus:border-forest"
          />
        </div>
      </div>

      {/* Team */}
      <div className="flex flex-col gap-3.5 rounded-[18px] border border-hairline bg-card p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <span className="text-[15px] font-semibold sm:text-[16px]">Team</span>
          <button
            type="button"
            className="flex cursor-pointer items-center gap-1.5 rounded-[9px] border border-hairline bg-white px-3 py-2 text-[13.5px] font-semibold transition-colors hover:border-forest hover:text-forest"
          >
            <Plus size={15} />
            Invite
          </button>
        </div>
        {TEAM.map((t) => (
          <div key={t.email} className="flex items-center gap-3 border-t border-hairline-2 py-2.5 first:border-t-0">
            <span
              className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full text-[12.5px] font-semibold text-ink"
              style={{ background: t.avatarBg }}
            >
              {t.initials}
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-px">
              <span className="truncate text-[14px] font-medium">{t.name}</span>
              <span className="truncate text-[12.5px] text-muted-2">{t.email}</span>
            </div>
            <span className="shrink-0 rounded-full border border-hairline bg-paper px-2.5 py-1 text-[12px] font-medium text-muted">
              {t.role}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
