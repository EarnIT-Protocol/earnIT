"use client";

import * as RSelect from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";

export type SelectOption = { value: string; label: string };

type SelectProps = {
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  ariaLabel?: string;
  placeholder?: string;
  className?: string;
};

/** Brand-styled Radix Select. Accessible, keyboard-navigable, portal-rendered. */
export function Select({ value, onValueChange, options, ariaLabel, placeholder, className }: SelectProps) {
  return (
    <RSelect.Root value={value} onValueChange={onValueChange}>
      <RSelect.Trigger
        aria-label={ariaLabel}
        className={`flex h-10 w-full items-center justify-between gap-2 rounded-[10px] border border-hairline bg-white px-3 text-sm font-medium text-ink outline-none transition-colors hover:border-muted-2 focus-visible:border-forest focus-visible:ring-2 focus-visible:ring-forest/20 data-[state=open]:border-forest ${className ?? ""}`}
      >
        <RSelect.Value placeholder={placeholder} />
        <RSelect.Icon>
          <ChevronDown size={16} className="text-muted" />
        </RSelect.Icon>
      </RSelect.Trigger>
      <RSelect.Portal>
        <RSelect.Content
          position="popper"
          sideOffset={6}
          className="z-[300] max-h-[var(--radix-select-content-available-height)] min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-xl border border-hairline bg-white shadow-[0_18px_36px_-18px_rgba(11,20,16,0.28)]"
        >
          <RSelect.Viewport className="p-1">
            {options.map((o) => (
              <RSelect.Item
                key={o.value}
                value={o.value}
                className="flex cursor-pointer select-none items-center justify-between rounded-lg px-2.5 py-2 text-sm text-ink outline-none data-[highlighted]:bg-[rgba(10,92,68,0.07)] data-[highlighted]:text-forest data-[state=checked]:font-semibold"
              >
                <RSelect.ItemText>{o.label}</RSelect.ItemText>
                <RSelect.ItemIndicator>
                  <Check size={15} className="text-forest" />
                </RSelect.ItemIndicator>
              </RSelect.Item>
            ))}
          </RSelect.Viewport>
        </RSelect.Content>
      </RSelect.Portal>
    </RSelect.Root>
  );
}
