import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { EarnitYieldWidget } from "@/components/widget/EarnitYieldWidget";
import { SolutionsHero } from "@/components/solutions/SolutionsHero";
import { SegmentSection } from "@/components/solutions/SegmentSection";
import {
  DefiArt,
  DefiChecklist,
  NeobankStats,
  TreasuryArt,
  WalletArt,
} from "@/components/solutions/SegmentArt";
import { SolutionsCta } from "@/components/solutions/SolutionsCta";

export const metadata: Metadata = {
  title: "Solutions — EarnIT",
  description: "One yield engine, every kind of app.",
};

export default function SolutionsPage() {
  return (
    <SiteShell>
      <SolutionsHero />

      {/* Neobanks — paired with the live yield widget */}
      <SegmentSection
        tinted
        eyebrow="Neobanks"
        title="Turn idle balances into a headline rate"
        body="Offer a competitive savings rate without a treasury desk, banking license, or a year of build. Your users earn; you book a new revenue line on every dollar."
        cta={{ label: "Try it in the Playground", href: "/playground" }}
        art={
          <div className="w-[360px] max-w-full">
            <EarnitYieldWidget vaultName="Savings" connected />
          </div>
        }
      >
        <NeobankStats />
      </SegmentSection>

      {/* Fintech wallets — art on the left */}
      <SegmentSection
        artFirst
        eyebrow="Fintech wallets"
        title="Add Earn without building a treasury"
        body="Drop an Earn tab into your wallet with a few SDK calls. Balances stay non-custodial; yield shows up where your users already look."
        cta={{ label: "Read the integration guide", href: "/docs" }}
        art={<WalletArt />}
      />

      {/* DEXes & DeFi */}
      <SegmentSection
        tinted
        eyebrow="DEXes & DeFi"
        title="Composable shares as building blocks"
        body="ERC-4626 vault shares are standard tokens. Use them as collateral, route them through LP positions, or build structured products on top of treasury yield."
        art={<DefiArt />}
      >
        <DefiChecklist />
      </SegmentSection>

      {/* Payroll & treasury — art on the left */}
      <SegmentSection
        artFirst
        eyebrow="Payroll & treasury"
        title="Park operating cash in treasury yield"
        body="Hold balances in USYC-backed vaults with T+0 redemptions. Earn on idle float between payroll runs without locking funds or losing same-day access."
        cta={{ label: "Book a demo", href: "/get-started" }}
        art={<TreasuryArt />}
      />

      <SolutionsCta />
    </SiteShell>
  );
}
