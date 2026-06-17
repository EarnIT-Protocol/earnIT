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

export function LivePreview({
  config,
  device,
  setDevice,
}: {
  config: PlaygroundConfig;
  device: PlaygroundDevice;
  setDevice: (d: PlaygroundDevice) => void;
}) {
  const canvasBg = config.theme === "dark" ? "#0B1410" : "#F7F6F1";

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="font-display text-[18px] font-semibold">Live preview</span>
        <Segmented<PlaygroundDevice>
          value={device}
          onChange={setDevice}
          options={[
            {
              value: "desktop",
              label: (
                <>
                  <Monitor size={15} /> Desktop
                </>
              ),
            },
            {
              value: "mobile",
              label: (
                <>
                  <Smartphone size={15} /> Mobile
                </>
              ),
            },
          ]}
        />
      </div>

      <div className="relative flex min-h-[560px] items-center justify-center overflow-hidden rounded-[24px] border border-hairline bg-[radial-gradient(circle_at_50%_30%,#FFFFFF,#F1F0EA)] px-6 py-10">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: "radial-gradient(#E2E0D6 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        <AnimatePresence mode="wait">
          {device === "desktop" ? (
            <motion.div
              key="desktop"
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-[760px] overflow-hidden rounded-[16px] border border-hairline bg-white shadow-[0_30px_70px_-30px_rgba(11,20,16,.28)]"
            >
              <div className="flex items-center gap-2 border-b border-hairline-2 bg-[#FBFAF5] px-3.5 py-[11px]">
                <span className="h-[11px] w-[11px] rounded-full bg-[#E5645A]" />
                <span className="h-[11px] w-[11px] rounded-full bg-[#E8B84B]" />
                <span className="h-[11px] w-[11px] rounded-full bg-[#5BB85B]" />
                <span className="ml-2.5 max-w-[300px] flex-1 rounded-lg border border-hairline bg-white px-3 py-[5px] font-mono text-[11.5px] text-muted-2">
                  app.yourbank.com/earn
                </span>
              </div>
              <div
                className="flex justify-center px-6 py-9 transition-colors"
                style={{ background: canvasBg }}
              >
                <div className="w-[380px] max-w-full">
                  <PreviewWidget config={config} />
                </div>
              </div>
            </motion.div>
          ) : (
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
              <div className="flex justify-center px-4 pb-7 pt-[46px]">
                <PreviewWidget config={config} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
