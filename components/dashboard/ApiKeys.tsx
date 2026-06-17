"use client";

import { useState } from "react";
import { Copy, Eye, EyeOff, Plus, Trash2 } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Select } from "@/components/ui/Select";
import { API_KEYS, maskKey, type ApiKey, type Env } from "@/lib/mock/dashboard";

const TH = "text-[11.5px] font-semibold uppercase tracking-[0.05em] text-muted-2";
const GRID = "grid grid-cols-[1.1fr_2fr_1fr_1fr_110px] gap-3";

function genKey(env: Env): string {
  const body = Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
  return `ek_${env}_${body}`;
}

/** API key management — create, reveal/copy, revoke. Mock (in-memory) state. */
export function ApiKeys() {
  const [keys, setKeys] = useState<ApiKey[]>(API_KEYS);
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [createOpen, setCreateOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEnv, setNewEnv] = useState<Env>("test");
  const [revokeTarget, setRevokeTarget] = useState<ApiKey | null>(null);

  const toggle = (full: string) => setRevealed((r) => ({ ...r, [full]: !r[full] }));
  const copy = (full: string) => navigator.clipboard?.writeText(full).catch(() => {});

  const create = () => {
    const full = genKey(newEnv);
    const key: ApiKey = { name: newName.trim() || "Untitled key", env: newEnv, full, created: "Just now", lastUsed: "—" };
    setKeys((k) => [key, ...k]);
    setRevealed((r) => ({ ...r, [full]: true }));
    setNewName("");
    setNewEnv("test");
    setCreateOpen(false);
  };

  const revoke = () => {
    if (!revokeTarget) return;
    setKeys((k) => k.filter((x) => x.full !== revokeTarget.full));
    setRevokeTarget(null);
  };

  return (
    <div className="flex flex-col gap-[18px]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="m-0 max-w-[520px] text-[14px] text-muted sm:text-[14.5px]">
          API keys authenticate your server requests. Keep secret keys server-side and rotate them if exposed.
        </p>
        <button
          type="button"
          onClick={() => setCreateOpen(true)}
          className="flex shrink-0 cursor-pointer items-center gap-[7px] rounded-[10px] bg-citron px-4 py-2.5 text-[14px] font-semibold text-ink shadow-[0_2px_8px_-2px_rgba(10,92,68,0.25)] transition-all hover:-translate-y-px hover:brightness-[1.03]"
        >
          <Plus size={16} />
          Create key
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-hairline bg-card">
        <div className="overflow-x-auto">
          <div className="min-w-[760px]">
            <div className={`${GRID} border-b border-hairline bg-paper px-[18px] py-[13px]`}>
              <span className={TH}>Name</span>
              <span className={TH}>Key</span>
              <span className={TH}>Created</span>
              <span className={TH}>Last used</span>
              <span className={TH} />
            </div>
            {keys.length === 0 && (
              <div className="px-[18px] py-10 text-center text-[13.5px] text-muted">
                No API keys yet. Create one to start integrating.
              </div>
            )}
            {keys.map((k) => (
              <div key={k.full} className={`${GRID} items-center border-b border-hairline-2 px-[18px] py-[14px] last:border-b-0`}>
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-[5px] px-[7px] py-0.5 font-mono text-[10px] font-semibold uppercase ${
                      k.env === "live" ? "bg-[rgba(10,92,68,0.1)] text-forest" : "bg-hairline-2 text-muted"
                    }`}
                  >
                    {k.env}
                  </span>
                  <span className="text-[14px] font-medium">{k.name}</span>
                </div>
                <span className="truncate font-mono text-[13px] text-text-3">{revealed[k.full] ? k.full : maskKey(k.full)}</span>
                <span className="text-[13px] text-muted">{k.created}</span>
                <span className="text-[13px] text-muted">{k.lastUsed}</span>
                <div className="flex justify-end gap-1.5">
                  <button
                    type="button"
                    onClick={() => toggle(k.full)}
                    title={revealed[k.full] ? "Hide" : "Reveal"}
                    className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-lg border border-hairline bg-white text-muted transition-colors hover:border-forest hover:text-forest"
                  >
                    {revealed[k.full] ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                  <button
                    type="button"
                    onClick={() => copy(k.full)}
                    title="Copy"
                    className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-lg border border-hairline bg-white text-muted transition-colors hover:border-forest hover:text-forest"
                  >
                    <Copy size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setRevokeTarget(k)}
                    title="Revoke"
                    className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-lg border border-hairline bg-white text-muted transition-colors hover:border-danger hover:text-danger"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create key */}
      <Modal open={createOpen} onOpenChange={setCreateOpen} title="Create API key" description="Name the key and pick its environment.">
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-[13px] font-medium text-text-3">Key name</span>
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="e.g. Production server"
              autoFocus
              className="w-full rounded-[10px] border border-hairline bg-white px-3.5 py-2.5 text-[14px] outline-none focus:border-forest"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[13px] font-medium text-text-3">Environment</span>
            <Select
              value={newEnv}
              onValueChange={(v) => setNewEnv(v as Env)}
              options={[
                { value: "test", label: "Test" },
                { value: "live", label: "Live" },
              ]}
              ariaLabel="Environment"
            />
          </label>
          <div className="mt-1 flex justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setCreateOpen(false)}
              className="rounded-[10px] border border-hairline bg-white px-4 py-2.5 text-[14px] font-semibold text-ink transition-colors hover:border-muted-2"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={create}
              className="rounded-[10px] bg-citron px-4 py-2.5 text-[14px] font-semibold text-ink transition-all hover:brightness-[1.03]"
            >
              Create key
            </button>
          </div>
        </div>
      </Modal>

      {/* Revoke confirm */}
      <Modal
        open={revokeTarget !== null}
        onOpenChange={(o) => !o && setRevokeTarget(null)}
        title="Revoke key?"
        description={revokeTarget ? `“${revokeTarget.name}” will stop working immediately for any app using it.` : ""}
      >
        <div className="flex justify-end gap-2.5">
          <button
            type="button"
            onClick={() => setRevokeTarget(null)}
            className="rounded-[10px] border border-hairline bg-white px-4 py-2.5 text-[14px] font-semibold text-ink transition-colors hover:border-muted-2"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={revoke}
            className="rounded-[10px] bg-danger px-4 py-2.5 text-[14px] font-semibold text-white transition-all hover:brightness-110"
          >
            Revoke key
          </button>
        </div>
      </Modal>
    </div>
  );
}
