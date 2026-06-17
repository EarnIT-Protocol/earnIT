import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { PricingHero } from "@/components/pricing/PricingHero";
import { PricingTiers } from "@/components/pricing/PricingTiers";
import { RevenueCalculator } from "@/components/pricing/RevenueCalculator";
import { FaqAccordion } from "@/components/pricing/FaqAccordion";

export const metadata: Metadata = {
  title: "Pricing — EarnIT",
  description: "You earn when your users earn. Flat 5% performance fee on yield.",
};

export default function PricingPage() {
  return (
    <SiteShell>
      <PricingHero />
      <PricingTiers />
      <RevenueCalculator />
      <FaqAccordion />
    </SiteShell>
  );
}
