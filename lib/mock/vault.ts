import type { VaultModel } from "@/components/widget/types";

// Mock vault + position figures used until live reads are wired in.
// Mirrors the handoff data model for the embeddable widget.
export const MOCK_VAULT: VaultModel = {
  apy: 9.24,
  apy30: 8.91,
  sharePrice: 1.0438,
  balance: 12450.0,
  positionShares: 8120.55,
  yieldEarned: 342.18,
};
