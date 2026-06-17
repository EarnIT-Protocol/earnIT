"use client";

import { type FormEvent, useState } from "react";
import { CalendarDays, CheckCircle2 } from "lucide-react";

const USE_CASES = ["Neobank", "Fintech wallet", "DEX / DeFi", "Payroll & treasury", "Other"];
const VOLUMES = ["< $1M", "$1M – $10M", "$10M – $100M", "$100M+"];

/** Dark "book a demo" form. Mock submit flips to a confirmation state. */
export function BookDemoCard() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [useCase, setUseCase] = useState(USE_CASES[0]);
  const [volume, setVolume] = useState(VOLUMES[1]);
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const fieldDark =
    "w-full rounded-[10px] border border-[rgba(231,229,220,0.16)] bg-[rgba(247,246,241,0.05)] px-[13px] py-[11px] font-sans text-[14.5px] text-paper outline-none focus:border-citron";
  const labelDark = "text-[13px] font-medium text-[#A9C4B8]";

  return (
    <div className="flex flex-col gap-[18px] rounded-[20px] bg-ink p-8 text-paper">
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-[11px] bg-[rgba(198,242,78,0.14)] text-citron">
          <CalendarDays className="size-5" strokeWidth={2} />
        </span>
        <div className="flex flex-col">
          <span className="font-display text-[19px] font-semibold text-paper">Book a demo</span>
          <span className="text-[13px] text-[#8FA39A]">For teams with volume</span>
        </div>
      </div>

      {sent ? (
        <div
          className="flex flex-col items-center gap-[10px] px-2 py-7 text-center"
          style={{ animation: "ew-rise .3s ease both" }}
        >
          <span className="flex size-[52px] items-center justify-center rounded-full bg-[rgba(198,242,78,0.16)] text-citron">
            <CheckCircle2 className="size-[26px]" strokeWidth={2} />
          </span>
          <span className="font-display text-[20px] font-semibold text-paper">
            We&apos;ll be in touch
          </span>
          <span className="max-w-[280px] text-[14px] text-[#A9C4B8]">
            Thanks — our team will reach out within one business day to schedule your walkthrough.
          </span>
        </div>
      ) : (
        <form onSubmit={submit} className="flex flex-col gap-[13px]">
          <div className="flex flex-col gap-[6px]">
            <span className={labelDark}>Name</span>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ada Okoye"
              className={fieldDark}
            />
          </div>
          <div className="flex flex-col gap-[6px]">
            <span className={labelDark}>Company</span>
            <input
              required
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Lumen Pay"
              className={fieldDark}
            />
          </div>
          <div className="flex flex-col gap-[6px]">
            <span className={labelDark}>Use case</span>
            <select
              value={useCase}
              onChange={(e) => setUseCase(e.target.value)}
              className={fieldDark}
            >
              {USE_CASES.map((u) => (
                <option key={u}>{u}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-[6px]">
            <span className={labelDark}>Expected volume</span>
            <select value={volume} onChange={(e) => setVolume(e.target.value)} className={fieldDark}>
              {VOLUMES.map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="mt-1 cursor-pointer rounded-[11px] border-none bg-citron py-[13px] text-[15px] font-semibold text-ink transition-all hover:-translate-y-px hover:shadow-[0_8px_20px_-6px_rgba(198,242,78,0.4)]"
          >
            Request demo
          </button>
        </form>
      )}
    </div>
  );
}
