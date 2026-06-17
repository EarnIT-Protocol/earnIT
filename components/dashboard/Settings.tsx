"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Select } from "@/components/ui/Select";
import { ORG, TEAM, type TeamMember } from "@/lib/mock/dashboard";

const AVATARS = [
  "linear-gradient(135deg,#9DB6F5,#5B82E0)",
  "linear-gradient(135deg,#F5C99D,#E0975B)",
  "linear-gradient(135deg,#C6F24E,#7FBF52)",
  "linear-gradient(135deg,#E0A3F5,#A35BE0)",
];

export function Settings() {
  const [orgName, setOrgName] = useState(ORG.name);
  const [payout, setPayout] = useState(ORG.payoutAddress);
  const [saved, setSaved] = useState(false);

  const [team, setTeam] = useState<TeamMember[]>(TEAM);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Developer");

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 1600);
  };

  const invite = () => {
    const email = inviteEmail.trim();
    if (!email) return;
    const handle = email.split("@")[0];
    const name = handle.replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    const initials = (handle.slice(0, 2) || "??").toUpperCase();
    const member: TeamMember = {
      name,
      email,
      role: inviteRole,
      initials,
      avatarBg: AVATARS[team.length % AVATARS.length],
    };
    setTeam((t) => [...t, member]);
    setInviteEmail("");
    setInviteRole("Developer");
    setInviteOpen(false);
  };

  return (
    <div className="flex flex-col gap-[18px]">
      {/* Organization */}
      <div className="flex flex-col gap-4 rounded-[18px] border border-hairline bg-card p-5 sm:p-6">
        <span className="text-[15px] font-semibold sm:text-[16px]">Organization</span>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <span className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-[14px] bg-forest font-mono text-[22px] font-semibold text-citron">
            {(orgName.charAt(0) || "L").toUpperCase()}
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
        <div className="flex">
          <button
            type="button"
            onClick={save}
            className="rounded-[10px] bg-forest px-[18px] py-2.5 text-[14px] font-semibold text-paper transition-colors hover:brightness-110"
          >
            {saved ? "Saved ✓" : "Save changes"}
          </button>
        </div>
      </div>

      {/* Team */}
      <div className="flex flex-col gap-3.5 rounded-[18px] border border-hairline bg-card p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <span className="text-[15px] font-semibold sm:text-[16px]">Team</span>
          <button
            type="button"
            onClick={() => setInviteOpen(true)}
            className="flex cursor-pointer items-center gap-1.5 rounded-[9px] border border-hairline bg-white px-3 py-2 text-[13.5px] font-semibold transition-colors hover:border-forest hover:text-forest"
          >
            <Plus size={15} />
            Invite
          </button>
        </div>
        {team.map((t) => (
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

      {/* Invite modal */}
      <Modal open={inviteOpen} onOpenChange={setInviteOpen} title="Invite teammate" description="They'll get access to this organization's dashboard.">
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-[13px] font-medium text-text-3">Email</span>
            <input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="teammate@company.com"
              autoFocus
              className="w-full rounded-[10px] border border-hairline bg-white px-3.5 py-2.5 text-[14px] outline-none focus:border-forest"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[13px] font-medium text-text-3">Role</span>
            <Select
              value={inviteRole}
              onValueChange={setInviteRole}
              options={[
                { value: "Admin", label: "Admin" },
                { value: "Developer", label: "Developer" },
                { value: "Viewer", label: "Viewer" },
              ]}
              ariaLabel="Role"
            />
          </label>
          <div className="mt-1 flex justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setInviteOpen(false)}
              className="rounded-[10px] border border-hairline bg-white px-4 py-2.5 text-[14px] font-semibold text-ink transition-colors hover:border-muted-2"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={invite}
              className="rounded-[10px] bg-citron px-4 py-2.5 text-[14px] font-semibold text-ink transition-all hover:brightness-[1.03]"
            >
              Send invite
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
