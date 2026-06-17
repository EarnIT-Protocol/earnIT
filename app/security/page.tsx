import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { SecurityHero } from "@/components/security/SecurityHero";
import { TrustGrid } from "@/components/security/TrustGrid";
import { BackingChain } from "@/components/security/BackingChain";
import { PreAuditNote } from "@/components/security/PreAuditNote";
import { SecurityFaq } from "@/components/security/SecurityFaq";

export const metadata: Metadata = {
  title: "Security — EarnIT",
  description: "What you audit is what runs. Non-custodial ERC-4626 vaults backed by US treasuries.",
};

export default function SecurityPage() {
  return (
    <SiteShell>
      <SecurityHero />
      <TrustGrid />
      <BackingChain />
      <PreAuditNote />
      <SecurityFaq />
    </SiteShell>
  );
}
