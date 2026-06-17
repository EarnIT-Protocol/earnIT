"use client";

import { useMemo, useState } from "react";
import { SiteShell } from "@/components/layout/SiteShell";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { ConfigPanel } from "@/components/playground/ConfigPanel";
import { LivePreview } from "@/components/playground/LivePreview";
import {
  DEFAULT_CONFIG,
  generateCode,
  type PlaygroundConfig,
  type PlaygroundDevice,
} from "@/lib/mock/playground";

/**
 * Interactive widget configurator: a single config object drives a live,
 * device-framed preview and three always-in-sync code snippets (React, JS
 * embed, REST). Configure → copy → ship.
 */
export default function PlaygroundPage() {
  const [config, setConfigState] = useState<PlaygroundConfig>(DEFAULT_CONFIG);
  const [device, setDevice] = useState<PlaygroundDevice>("desktop");

  // Partial patches merge into the single source-of-truth config object.
  const setConfig = (patch: Partial<PlaygroundConfig>) =>
    setConfigState((prev) => ({ ...prev, ...patch }));

  // Code tabs regenerate from the live config on every change.
  const tabs = useMemo(
    () => [
      { label: "React", code: generateCode("react", config) },
      { label: "Embed", code: generateCode("js", config) },
      { label: "REST", code: generateCode("rest", config) },
    ],
    [config],
  );

  return (
    <SiteShell>
      {/* Top banner */}
      <div className="bg-ink text-paper">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-3 px-6 py-3.5">
          <span className="flex items-center gap-[7px] rounded-full bg-[rgba(198,242,78,.14)] px-2.5 py-1 text-[12px] font-semibold text-citron">
            <span className="h-1.5 w-1.5 rounded-full bg-citron" />
            Playground
          </span>
          <span className="text-[14px] text-[#C7D2CB]">
            This is exactly what your users see. Configure it, copy the code, ship
            in an afternoon.
          </span>
        </div>
      </div>

      {/* Split layout: config panel (left) + preview & code (right) */}
      <div className="ew-pg-main mx-auto grid max-w-[1280px] grid-cols-[360px_1fr] items-start gap-7 px-6 pb-16 pt-7 max-[980px]:grid-cols-1">
        <ConfigPanel config={config} setConfig={setConfig} />

        <div className="flex min-w-0 flex-col gap-5">
          <LivePreview config={config} device={device} setDevice={setDevice} />

          {/* Generated code — three tabs, always reflecting current config */}
          <CodeBlock tabs={tabs} />
        </div>
      </div>
    </SiteShell>
  );
}
