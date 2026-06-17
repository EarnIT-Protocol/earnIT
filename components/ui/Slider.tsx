"use client";

import * as RSlider from "@radix-ui/react-slider";

type SliderProps = {
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  ariaLabel?: string;
};

/** Brand-styled Radix Slider (single thumb). */
export function Slider({ value, onValueChange, min = 0, max = 100, step = 1, ariaLabel }: SliderProps) {
  return (
    <RSlider.Root
      value={[value]}
      onValueChange={([v]) => onValueChange(v)}
      min={min}
      max={max}
      step={step}
      aria-label={ariaLabel}
      className="relative flex h-5 w-full cursor-pointer touch-none select-none items-center"
    >
      <RSlider.Track className="relative h-1.5 grow rounded-full bg-hairline">
        <RSlider.Range className="absolute h-full rounded-full bg-forest" />
      </RSlider.Track>
      <RSlider.Thumb className="block h-[18px] w-[18px] rounded-full border-2 border-forest bg-white shadow-sm outline-none transition-shadow focus-visible:ring-4 focus-visible:ring-forest/20" />
    </RSlider.Root>
  );
}
