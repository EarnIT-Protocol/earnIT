"use client";

import { Fragment, type ReactNode, useState } from "react";
import { Check, Copy } from "lucide-react";

export type CodeTab = { label: string; code: string };

const TOKEN =
  /(\/\/[^\n]*|#[^\n]*)|(`[^`]*`|"[^"]*"|'[^']*')|\b(import|from|export|default|const|let|var|await|async|function|return|new|if|else|for|of|true|false|null|undefined)\b|\b(\d+(?:\.\d+)?)\b/g;

const COLOR = {
  comment: "#5B6B63",
  string: "#C6F24E",
  keyword: "#E3B341",
  number: "#9AD2C0",
};

// Lightweight highlighter for the short JS/Node/REST snippets in the prototypes.
function highlight(code: string): ReactNode[] {
  return code.split("\n").map((line, li) => {
    const parts: ReactNode[] = [];
    let last = 0;
    let m: RegExpExecArray | null;
    TOKEN.lastIndex = 0;
    while ((m = TOKEN.exec(line)) !== null) {
      if (m.index > last) parts.push(line.slice(last, m.index));
      const [full, comment, str, keyword] = m;
      const color = comment ? COLOR.comment : str ? COLOR.string : keyword ? COLOR.keyword : COLOR.number;
      parts.push(
        <span key={`${li}-${m.index}`} style={{ color }}>
          {full}
        </span>,
      );
      last = m.index + full.length;
    }
    if (last < line.length) parts.push(line.slice(last));
    return (
      <Fragment key={li}>
        {parts.length ? parts : " "}
        {"\n"}
      </Fragment>
    );
  });
}

export function CodeBlock({ tabs, className = "" }: { tabs: CodeTab[]; className?: string }) {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(tabs[active].code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-[#27362E] bg-ink-soft shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)] ${className}`}
    >
      <div className="flex items-center justify-between border-b border-[#27362E] bg-ink-panel px-3 py-2">
        <div className="flex items-center gap-1">
          {tabs.map((t, i) => (
            <button
              key={t.label}
              type="button"
              onClick={() => setActive(i)}
              className="rounded-[7px] px-2.5 py-1 font-mono text-xs font-medium transition-colors"
              style={
                i === active
                  ? { background: "rgba(198,242,78,0.14)", color: "#C6F24E" }
                  : { color: "#8FA39A" }
              }
            >
              {t.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={copy}
          className="flex items-center gap-1.5 rounded-[7px] px-2 py-1 font-mono text-xs text-[#8FA39A] transition-colors hover:text-paper"
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-4 font-mono text-[13px] leading-[1.7] text-[#C7D2CB]">
        <code>{highlight(tabs[active].code)}</code>
      </pre>
    </div>
  );
}
