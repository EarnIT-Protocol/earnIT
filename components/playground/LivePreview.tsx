"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Monitor, Smartphone } from "lucide-react";
import type { PlaygroundConfig, PlaygroundDevice } from "@/lib/mock/playground";
import { EarnitYieldWidget } from "@/components/widget/EarnitYieldWidget";
import { Segmented } from "./controls";

/** The themed widget, shared by both device frames. */
function PreviewWidget({ config }: { config: PlaygroundConfig }) {
  return (
    <EarnitYieldWidget
      primaryColor={config.primaryColor}
      accentColor={config.accentColor}
      radius={config.radius}
      theme={config.theme}
      asset={config.asset}
      displayCurrency={config.currency}
      vaultName={config.vaultName}
      showApy={config.showApy}
      showWithdraw={config.withdraw}
      fontFamily={config.font}
      connected
    />
  );
}

/**
 * Desktop browser-window frame: chrome bar with traffic lights + URL pill over
 * a roomy light app surface. A slim mock host-app header sits above the content
 * and the widget docks like a right-hand panel — evoking a real product page.
 */
function DesktopFrame({ config }: { config: PlaygroundConfig }) {
  const dark = config.theme === "dark";
  const surfaceBg = dark ? "#0B1410" : "#F4F3ED";
  const headerBg = dark ? "#0F1A15" : "#FCFBF7";
  const headerBorder = dark ? "#1C2A23" : "#EFEEE7";
  const skeletonBar = dark ? "#1C2A23" : "#E7E5DC";
  const skeletonFaint = dark ? "#16221C" : "#EFEEE7";

  return (
    <motion.div
      key="desktop"
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.98 }}
      transition={{ duration: 0.25 }}
      className="relative w-full max-w-[860px] overflow-hidden rounded-[16px] border border-hairline bg-white shadow-[0_30px_70px_-30px_rgba(11,20,16,.28)]"
    >
      <div className="flex items-center gap-2 border-b border-hairline-2 bg-[#FBFAF5] px-3.5 py-[11px]">
        <span className="h-[11px] w-[11px] rounded-full bg-[#E5645A]" />
        <span className="h-[11px] w-[11px] rounded-full bg-[#E8B84B]" />
        <span className="h-[11px] w-[11px] rounded-full bg-[#5BB85B]" />
        <span className="ml-2.5 max-w-[300px] flex-1 rounded-lg border border-hairline bg-white px-3 py-[5px] font-mono text-[11.5px] text-muted-2">
          yourapp.com/earn
        </span>
      </div>

      <div className="transition-colors" style={{ background: surfaceBg }}>
        {/* Slim mock host-app header bar */}
        <div
          className="flex items-center gap-3 border-b px-5 py-3"
          style={{ background: headerBg, borderColor: headerBorder }}
        >
          <span className="h-[22px] w-[22px] rounded-md bg-[linear-gradient(140deg,#0A5C44,#C6F24E)]" />
          <span
            className="h-2.5 w-[68px] rounded-full"
            style={{ background: skeletonBar }}
          />
          <div className="ml-auto flex items-center gap-2.5">
            <span
              className="h-2 w-9 rounded-full"
              style={{ background: skeletonFaint }}
            />
            <span
              className="h-2 w-9 rounded-full"
              style={{ background: skeletonFaint }}
            />
            <span
              className="h-[22px] w-[22px] rounded-full"
              style={{ background: skeletonBar }}
            />
          </div>
        </div>

        {/* Product context: mock vault copy on the left, widget docked right */}
        <div className="grid grid-cols-[1fr_380px] gap-7 px-7 py-8 max-[560px]:grid-cols-1">
          <div className="flex flex-col gap-3 pt-1.5 max-[560px]:hidden">
            <span
              className="h-3 w-2/3 rounded-full"
              style={{ background: skeletonBar }}
            />
            <span
              className="h-2.5 w-full rounded-full"
              style={{ background: skeletonFaint }}
            />
            <span
              className="h-2.5 w-5/6 rounded-full"
              style={{ background: skeletonFaint }}
            />
            <div className="mt-4 grid grid-cols-2 gap-3">
              <span
                className="h-16 rounded-xl"
                style={{ background: skeletonFaint }}
              />
              <span
                className="h-16 rounded-xl"
                style={{ background: skeletonFaint }}
              />
            </div>
            <span
              className="mt-3 h-2.5 w-3/4 rounded-full"
              style={{ background: skeletonFaint }}
            />
          </div>
          <div className="w-full min-w-0">
            <PreviewWidget config={config} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Phone frame with a fixed ~640px screen area. Content taller than the screen
 * scrolls inside the device (overflow-y:auto), never the host page.
 */
function MobileFrame({ config }: { config: PlaygroundConfig }) {
  const canvasBg = config.theme === "dark" ? "#0B1410" : "#F7F6F1";

  return (
    <motion.div
      key="mobile"
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.96 }}
      transition={{ duration: 0.25 }}
      className="relative w-[340px] max-w-full overflow-hidden rounded-[42px] border-[10px] border-ink shadow-[0_30px_70px_-28px_rgba(11,20,16,.4)]"
      style={{ background: canvasBg }}
    >
      <div className="absolute left-1/2 top-0 z-[5] h-[26px] w-[120px] -translate-x-1/2 rounded-b-[16px] bg-ink" />
      <div
        className="ew-pg-scroll h-[640px] overflow-y-auto overflow-x-hidden px-4 pb-7 pt-[46px]"
        style={{ background: canvasBg }}
      >
        <PreviewWidget config={config} />
      </div>
    </motion.div>
  );
}

export function LivePreview({
  config,
  device,
  setDevice,
  isPhone,
}: {
  config: PlaygroundConfig;
  device: PlaygroundDevice;
  setDevice: (d: PlaygroundDevice) => void;
  isPhone: boolean;
}) {
  const deviceOptions = [
    {
      value: "desktop" as const,
      label: (
        <>
          <Monitor size={15} /> Desktop
        </>
      ),
    },
    {
      value: "mobile" as const,
      label: (
        <>
          <Smartphone size={15} /> Mobile
        </>
      ),
    },
  ];

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="font-display text-[18px] font-semibold">Live preview</span>
        {/* On real phones the desktop frame can't render usefully — hide it. */}
        {!isPhone && (
          <Segmented<PlaygroundDevice>
            value={device}
            onChange={setDevice}
            options={deviceOptions}
          />
        )}
      </div>

      <div className="relative flex min-h-[560px] items-center justify-center overflow-hidden rounded-[24px] border border-hairline bg-[radial-gradient(circle_at_50%_30%,#FFFFFF,#F1F0EA)] px-6 py-10 max-[640px]:px-3">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: "radial-gradient(#E2E0D6 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        <AnimatePresence mode="wait">
          {device === "desktop" ? (
            <DesktopFrame config={config} />
          ) : (
            <MobileFrame config={config} />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
