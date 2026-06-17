"use client";

import { type FormEvent, useRef, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Code2 } from "lucide-react";

const TEST_KEY = "ek_pub_test_8f2a4b7c9d1e3f5a6b8c";

/**
 * Self-serve key issuance. Submitting the (mock) form flips to a success state
 * that reveals a test key with a copy-to-clipboard button.
 */
export function SelfServeCard() {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [keyIssued, setKeyIssued] = useState(false);
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setKeyIssued(true);
  };

  const copyKey = () => {
    navigator.clipboard?.writeText(TEST_KEY).catch(() => {});
    setCopied(true);
    clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(false), 1500);
  };

  const field =
    "w-full rounded-[10px] border border-hairline bg-white px-[13px] py-[11px] font-sans text-[14.5px] text-ink outline-none focus:border-forest";
  const label = "text-[13px] font-medium text-text-3";

  return (
    <div className="flex flex-col gap-[18px] rounded-[20px] border border-hairline bg-card p-8">
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-[11px] bg-[rgba(10,92,68,0.08)] text-forest">
          <Code2 className="size-5" strokeWidth={2} />
        </span>
        <div className="flex flex-col">
          <span className="font-display text-[19px] font-semibold">Self-serve</span>
          <span className="text-[13px] text-muted-2">Free · no card required</span>
        </div>
      </div>

      {keyIssued ? (
        <div
          className="flex flex-col gap-[14px]"
          style={{ animation: "ew-rise .3s ease both" }}
        >
          <div className="flex items-center gap-[10px] rounded-[12px] border border-[rgba(10,92,68,0.2)] bg-[rgba(10,92,68,0.06)] px-4 py-[14px]">
            <CheckCircle2 className="size-5 text-forest" strokeWidth={2} />
            <span className="text-[14.5px] font-medium text-ink">Your test key is ready</span>
          </div>
          <div className="flex items-center gap-2 rounded-[11px] bg-ink-soft px-[14px] py-[13px]">
            <span className="flex-1 overflow-hidden text-ellipsis font-mono text-[13px] text-citron">
              {TEST_KEY}
            </span>
            <button
              type="button"
              onClick={copyKey}
              className="cursor-pointer border-none bg-transparent text-[12.5px] text-[#9DB0A6]"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <Link
            href="/docs"
            className="rounded-[11px] bg-forest py-[13px] text-center text-[14.5px] font-semibold text-paper"
          >
            Open the Quickstart
          </Link>
        </div>
      ) : (
        <form onSubmit={submit} className="flex flex-col gap-[13px]">
          <div className="flex flex-col gap-[6px]">
            <span className={label}>Work email</span>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className={field}
            />
          </div>
          <div className="flex flex-col gap-[6px]">
            <span className={label}>Company</span>
            <input
              required
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Acme Fintech"
              className={field}
            />
          </div>
          <button
            type="submit"
            className="mt-1 cursor-pointer rounded-[11px] border-none bg-citron py-[13px] text-[15px] font-semibold text-ink transition-all hover:-translate-y-px hover:shadow-[0_8px_20px_-6px_rgba(10,92,68,0.35)]"
          >
            Get test API key
          </button>
          <span className="text-center text-[12px] text-muted-2">
            No credit card. Upgrade when you go live.
          </span>
        </form>
      )}
    </div>
  );
}
