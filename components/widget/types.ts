export type WidgetTheme = "light" | "dark";
export type WidgetAsset = "USDC" | "cNGN" | "EURC";
export type DisplayCurrency = "USD" | "NGN";
export type WidgetTab = "deposit" | "withdraw";

/** Live vault + wallet figures. Defaults are mocked; override from on-chain reads. */
export interface VaultModel {
  apy: number;
  apy30: number;
  sharePrice: number;
  balance: number;
  positionShares: number;
  yieldEarned: number;
}

export interface EarnitYieldWidgetProps extends Partial<VaultModel> {
  primaryColor?: string;
  accentColor?: string;
  radius?: number;
  theme?: WidgetTheme;
  asset?: WidgetAsset;
  displayCurrency?: DisplayCurrency;
  vaultName?: string;
  showApy?: boolean;
  showWithdraw?: boolean;
  fontFamily?: string;
  connected?: boolean;
  /** INTEGRATION POINT: wired to the wallet adapter by the host page. */
  onConnect?: () => void;
  /** INTEGRATION POINT: wired to SDK/vault deposit|withdraw by the host page. */
  onSubmit?: (tab: WidgetTab, amount: number) => void;
}
export interface EarnitYieldWidgetProps {
  // Vault data (all optional — falls back to MOCK_VAULT)
  apy?: number;
  apy30?: number;
  sharePrice?: number;
  balance?: number;
  positionShares?: number;
  yieldEarned?: number;

  // Wallet
  connected?: boolean;
  onConnect?: () => void;
  onSubmit?: (action: "deposit" | "withdraw", amount: number) => void;

  // Cosmetic
  primaryColor?: string;
  accentColor?: string;
  radius?: number;
  theme?: "light" | "dark";
 // asset?: string;
  displayCurrency?: DisplayCurrency;
  vaultName?: string;
  showApy?: boolean;
  showWithdraw?: boolean;
  fontFamily?: string;
}
