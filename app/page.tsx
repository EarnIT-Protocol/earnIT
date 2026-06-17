import { SiteShell } from "@/components/layout/SiteShell";
import { Hero } from "@/components/landing/Hero";
import { TrustBar } from "@/components/landing/TrustBar";
import { Problem } from "@/components/landing/Problem";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Architecture } from "@/components/landing/Architecture";
import { CodeTeaser } from "@/components/landing/CodeTeaser";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { StatsBand } from "@/components/landing/StatsBand";
import { UseCasesSecurity } from "@/components/landing/UseCasesSecurity";
import { FinalCta } from "@/components/landing/FinalCta";

/** EarnIT marketing landing page — the flagship surface. */
export default function Page() {
  return (
    <SiteShell>
      <Hero />
      <TrustBar />
      <Problem />
      <HowItWorks />
      <Architecture />
      <CodeTeaser />
      <FeatureGrid />
      <StatsBand />
      <UseCasesSecurity />
      <FinalCta />
    </SiteShell>
  );
}
