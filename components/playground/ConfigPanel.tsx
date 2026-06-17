"use client";

import { Plus } from "lucide-react";
import type { PlaygroundConfig, PlaygroundFont } from "@/lib/mock/playground";
import {
  ACCENT_SWATCHES,
  PRESETS,
  PRIMARY_SWATCHES,
} from "@/lib/mock/playground";
import type {
  DisplayCurrency,
  WidgetAsset,
  WidgetTheme,
} from "@/components/widget/types";
import {
  CtrlLabel,
  GroupLabel,
  SectionCard,
  Segmented,
  SwitchRow,
} from "./controls";

type Patch = Partial<PlaygroundConfig>;

/** Color picker: native swatch + hex readout + quick preset chips. */
function ColorControl({
  label,
  value,
  swatches,
  onChange,
}: {
  label: string;
  value: string;
  swatches: string[];
  onChange: (hex: string) => void;
}) {
  return (
    <div className="flex flex-col gap-[7px]">
      <CtrlLabel>{label}</CtrlLabel>
      <div className="flex items-center gap-2">
        <label className="relative h-[30px] w-[30px] shrink-0 cursor-pointer overflow-hidden rounded-[9px] border border-hairline">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 cursor-pointer opacity-0"
          />
          <span className="block h-full w-full" style={{ background: value }} />
        </label>
        <span className="font-mono text-[13px] uppercase text-muted">{value}</span>
        <div className="ml-auto flex gap-[5px]">
          {swatches.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onChange(s)}
              aria-label={`Set ${label} to ${s}`}
              className="h-[22px] w-[22px] cursor-pointer rounded-[7px] border border-hairline"
              style={{ background: s }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ConfigPanel({
  config,
  setConfig,
}: {
  config: PlaygroundConfig;
  setConfig: (patch: Patch) => void;
}) {
  return (
    <aside className="ew-pg-scroll sticky top-[84px] max-h-[calc(100vh-104px)] self-start overflow-y-auto rounded-[20px] border border-hairline bg-card p-1.5 max-[980px]:static max-[980px]:max-h-none">
      <div className="px-4 pb-2.5 pt-4">
        <span className="font-display text-[18px] font-semibold tracking-[-0.01em]">
          Configure
        </span>
      </div>

      {/* Presets */}
      <div className="flex flex-col gap-[9px] px-4 pb-4">
        <GroupLabel>Presets</GroupLabel>
        <div className="grid grid-cols-3 gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setConfig(p.config)}
              className="flex flex-col items-center gap-1.5 rounded-[11px] border border-hairline bg-white px-1.5 py-[11px] text-[12px] font-semibold text-text-3 transition-all hover:-translate-y-px hover:border-forest"
            >
              <span
                className="h-[18px] w-[18px] rounded-md"
                style={{ background: p.swatch }}
              />
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Brand */}
      <SectionCard>
        <GroupLabel>Brand</GroupLabel>
        <ColorControl
          label="Primary color"
          value={config.primaryColor}
          swatches={PRIMARY_SWATCHES}
          onChange={(primaryColor) => setConfig({ primaryColor })}
        />
        <ColorControl
          label="Accent color"
          value={config.accentColor}
          swatches={ACCENT_SWATCHES}
          onChange={(accentColor) => setConfig({ accentColor })}
        />
        <div className="flex flex-col gap-[7px]">
          <div className="flex items-center justify-between">
            <CtrlLabel>Corner radius</CtrlLabel>
            <span className="font-mono text-[12.5px] text-muted">
              {config.radius}px
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={32}
            value={config.radius}
            onChange={(e) => setConfig({ radius: parseInt(e.target.value, 10) })}
            className="w-full cursor-pointer"
            style={{ accentColor: "#0A5C44" }}
          />
        </div>
        <div className="flex flex-col gap-[7px]">
          <CtrlLabel>Theme</CtrlLabel>
          <Segmented<WidgetTheme>
            fill
            value={config.theme}
            onChange={(theme) => setConfig({ theme })}
            options={[
              { value: "light", label: "Light" },
              { value: "dark", label: "Dark" },
            ]}
          />
        </div>
        <div className="flex flex-col gap-[7px]">
          <CtrlLabel>Font</CtrlLabel>
          <Segmented<PlaygroundFont>
            fill
            value={config.font}
            onChange={(font) => setConfig({ font })}
            options={[
              { value: "General Sans", label: "General Sans" },
              { value: "Clash Display", label: "Clash" },
            ]}
          />
        </div>
        <div className="flex flex-col gap-[7px]">
          <CtrlLabel>Logo</CtrlLabel>
          <div className="flex cursor-pointer items-center gap-2.5 rounded-[11px] border border-dashed border-[#D7D4C9] bg-white p-2.5 transition-colors hover:border-forest">
            <span className="flex h-[34px] w-[34px] items-center justify-center rounded-[9px] bg-[linear-gradient(140deg,#0A5C44,#C6F24E)]">
              <Plus size={16} color="#F7F6F1" strokeWidth={2} />
            </span>
            <span className="text-[13px] text-muted">
              Upload your logo (SVG/PNG)
            </span>
          </div>
        </div>
      </SectionCard>

      {/* Product */}
      <SectionCard>
        <GroupLabel>Product</GroupLabel>
        <div className="flex flex-col gap-[7px]">
          <CtrlLabel>Asset</CtrlLabel>
          <Segmented<WidgetAsset>
            fill
            value={config.asset}
            onChange={(asset) => {
              // Asset choice sensibly defaults the currency + vault name.
              if (asset === "cNGN")
                setConfig({ asset, currency: "NGN", vaultName: "cNGN Vault" });
              else if (asset === "EURC")
                setConfig({ asset, currency: "USD", vaultName: "EURC Vault" });
              else setConfig({ asset, currency: "USD", vaultName: "USDC Vault" });
            }}
            options={[
              { value: "USDC", label: "USDC" },
              { value: "cNGN", label: "cNGN" },
              { value: "EURC", label: "EURC" },
            ]}
          />
        </div>
        <div className="flex flex-col gap-[7px]">
          <CtrlLabel>Display currency</CtrlLabel>
          <Segmented<DisplayCurrency>
            fill
            value={config.currency}
            onChange={(currency) => setConfig({ currency })}
            options={[
              { value: "USD", label: "USD" },
              { value: "NGN", label: "NGN" },
            ]}
          />
        </div>
        <div className="flex flex-col gap-[7px]">
          <CtrlLabel>Vault name</CtrlLabel>
          <input
            value={config.vaultName}
            onChange={(e) => setConfig({ vaultName: e.target.value })}
            className="w-full rounded-[10px] border border-hairline bg-white px-3 py-2.5 font-sans text-[14px] text-ink outline-none"
          />
        </div>
        <div className="flex flex-col gap-2 pt-0.5">
          <SwitchRow
            label="Show APY"
            on={config.showApy}
            onToggle={() => setConfig({ showApy: !config.showApy })}
          />
          <SwitchRow label="Deposit" on locked />
          <SwitchRow
            label="Withdraw"
            on={config.withdraw}
            onToggle={() => setConfig({ withdraw: !config.withdraw })}
          />
          <SwitchRow
            label="Auto-compound"
            on={config.compound}
            onToggle={() => setConfig({ compound: !config.compound })}
          />
          <SwitchRow
            label="Borrow"
            on={config.borrow}
            onToggle={() => setConfig({ borrow: !config.borrow })}
          />
        </div>
      </SectionCard>
    </aside>
  );
}
