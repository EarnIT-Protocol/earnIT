"use client";

import * as RSwitch from "@radix-ui/react-switch";

type SwitchProps = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  ariaLabel?: string;
};

/** Brand-styled Radix Switch — citron when on. */
export function Switch({ checked, onCheckedChange, disabled, ariaLabel }: SwitchProps) {
  return (
    <RSwitch.Root
      checked={checked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      aria-label={ariaLabel}
      className="relative h-[24px] w-[42px] shrink-0 cursor-pointer rounded-full border border-hairline bg-hairline-2 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-forest/25 data-[state=checked]:border-forest data-[state=checked]:bg-forest disabled:cursor-not-allowed disabled:opacity-50"
    >
      <RSwitch.Thumb className="block h-[18px] w-[18px] translate-x-[3px] rounded-full bg-white shadow-sm transition-transform duration-200 data-[state=checked]:translate-x-[21px]" />
    </RSwitch.Root>
  );
}
