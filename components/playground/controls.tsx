"use client";

import type { ReactNode } from "react";
import { Switch } from "@/components/ui/Switch";

/** Uppercase group heading inside the config panel. */
export function GroupLabel({ children }: { children: ReactNode }) {
  return (
    <span className="text-[11px] font-semibold uppercase tracking-[0.07em] text-muted-2">
      {children}
    </span>
  );
}

/** Small control caption (e.g. "Primary color"). */
export function CtrlLabel({ children }: { children: ReactNode }) {
  return <span className="text-[13px] font-medium text-text-3">{children}</span>;
}

/** A bordered card grouping a set of related controls. */
export function SectionCard({ children }: { children: ReactNode }) {
  return (
    <div className="m-2 flex flex-col gap-4 rounded-[14px] border border-hairline-2 bg-white p-4">
      {children}
    </div>
  );
}

export type SegOption<T extends string> = { value: T; label: ReactNode };

/** Pill-style segmented toggle used for theme / asset / device / etc. */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  fill = false,
}: {
  options: SegOption<T>[];
  value: T;
  onChange: (v: T) => void;
  fill?: boolean;
}) {
  return (
    <div className="flex gap-[3px] rounded-[11px] border border-hairline bg-[#F2F1EA] p-[3px]">
      {options.map((o) => {
        const on = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={`flex items-center justify-center gap-1.5 rounded-lg px-1.5 py-2 text-[12.5px] font-semibold whitespace-nowrap transition-all ${
              fill ? "flex-1" : ""
            }`}
            style={
              on
                ? {
                    background: "#0A5C44",
                    color: "#F7F6F1",
                    boxShadow: "0 1px 3px rgba(10,92,68,.3)",
                  }
                : { background: "transparent", color: "#5B6B63" }
            }
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

/** Label + brand Radix switch row. `locked` forces a non-interactive on state. */
export function SwitchRow({
  label,
  on,
  onToggle,
  locked = false,
}: {
  label: string;
  on: boolean;
  onToggle?: () => void;
  locked?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <CtrlLabel>{label}</CtrlLabel>
      <Switch
        checked={on || locked}
        onCheckedChange={() => onToggle?.()}
        disabled={locked}
        ariaLabel={label}
      />
    </div>
  );
}
