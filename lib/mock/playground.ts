import type {
  DisplayCurrency,
  WidgetAsset,
  WidgetTheme,
} from "@/components/widget/types";

/** Font choices offered in the configurator (drives the widget `fontFamily`). */
export type PlaygroundFont = "General Sans" | "Clash Display";

/** Device frame shown in the live preview. */
export type PlaygroundDevice = "desktop" | "mobile";

/** Generated-code language tabs. */
export type CodeLang = "react" | "js" | "rest";

/**
 * The single source of truth driving both the live widget preview and the
 * generated code snippets. Held in one `useState` object on the page.
 */
export interface PlaygroundConfig {
  primaryColor: string;
  accentColor: string;
  radius: number;
  theme: WidgetTheme;
  font: PlaygroundFont;
  asset: WidgetAsset;
  currency: DisplayCurrency;
  vaultName: string;
  showApy: boolean;
  withdraw: boolean;
  compound: boolean;
  borrow: boolean;
}

export const DEFAULT_CONFIG: PlaygroundConfig = {
  primaryColor: "#0A5C44",
  accentColor: "#C6F24E",
  radius: 20,
  theme: "light",
  font: "General Sans",
  asset: "USDC",
  currency: "USD",
  vaultName: "USDC Vault",
  showApy: true,
  withdraw: true,
  compound: true,
  borrow: false,
};

/** One-click brand presets that patch multiple fields at once. */
export const PRESETS: {
  id: string;
  label: string;
  swatch: string;
  config: PlaygroundConfig;
}[] = [
  {
    id: "neobank",
    label: "Neobank",
    swatch: "linear-gradient(135deg,#0A5C44,#C6F24E)",
    config: {
      primaryColor: "#0A5C44",
      accentColor: "#C6F24E",
      radius: 16,
      theme: "light",
      font: "General Sans",
      asset: "USDC",
      currency: "USD",
      vaultName: "Savings Vault",
      showApy: true,
      withdraw: true,
      compound: true,
      borrow: false,
    },
  },
  {
    id: "wallet",
    label: "Crypto wallet",
    swatch: "linear-gradient(135deg,#6D28D9,#A78BFA)",
    config: {
      primaryColor: "#6D28D9",
      accentColor: "#A78BFA",
      radius: 26,
      theme: "dark",
      font: "Clash Display",
      asset: "USDC",
      currency: "USD",
      vaultName: "Earn",
      showApy: true,
      withdraw: true,
      compound: true,
      borrow: true,
    },
  },
  {
    id: "minimal",
    label: "Minimal",
    swatch: "linear-gradient(135deg,#0B1410,#5B6B63)",
    config: {
      primaryColor: "#0B1410",
      accentColor: "#0B1410",
      radius: 8,
      theme: "light",
      font: "General Sans",
      asset: "USDC",
      currency: "USD",
      vaultName: "Vault",
      showApy: true,
      withdraw: false,
      compound: false,
      borrow: false,
    },
  },
];

/** Color swatch presets for the brand pickers. */
export const PRIMARY_SWATCHES = ["#0A5C44", "#1D4ED8", "#6D28D9", "#0B1410"];
export const ACCENT_SWATCHES = ["#C6F24E", "#A78BFA", "#F59E0B", "#0B1410"];

/**
 * Builds the embed/SDK snippet for a given language, reflecting the live
 * config. Mirrors the conventions in the handoff (`@earnit/react`,
 * `cdn.earnit.xyz/widget.js`, `api.earnit.xyz/v1`).
 */
export function generateCode(lang: CodeLang, c: PlaygroundConfig): string {
  const feats = `{ deposit: true, withdraw: ${c.withdraw}, autocompound: ${c.compound}, borrow: ${c.borrow} }`;

  if (lang === "react") {
    return [
      "import { EarnitYieldWidget } from '@earnit/react';",
      "",
      "export default function Earn() {",
      "  return (",
      "    <EarnitYieldWidget",
      "      apiKey={process.env.EARNIT_KEY}",
      `      asset="${c.asset}"`,
      `      vaultName="${c.vaultName}"`,
      `      showApy={${c.showApy}}`,
      "      theme={{",
      `        primary: '${c.primaryColor}',`,
      `        accent: '${c.accentColor}',`,
      `        radius: ${c.radius},`,
      `        mode: '${c.theme}',`,
      `        font: '${c.font}',`,
      "      }}",
      `      features={${feats}}`,
      "    />",
      "  );",
      "}",
    ].join("\n");
  }

  if (lang === "js") {
    const ST = "<script";
    const STc = "</script>";
    return [
      '<div id="earnit-earn"></div>',
      `${ST} src="https://cdn.earnit.xyz/widget.js">${STc}`,
      `${ST}>`,
      "  EarnIT.mount('#earnit-earn', {",
      "    apiKey: 'ek_pub_test_8f2a...',",
      `    asset: '${c.asset}',`,
      `    vaultName: '${c.vaultName}',`,
      `    showApy: ${c.showApy},`,
      `    theme: { primary: '${c.primaryColor}', accent: '${c.accentColor}', radius: ${c.radius}, mode: '${c.theme}' },`,
      `    features: ${feats},`,
      "  });",
      STc,
    ].join("\n");
  }

  return [
    "$ curl https://api.earnit.xyz/v1/widgets \\",
    '    -H "Authorization: Bearer $EARNIT_KEY" \\',
    `    -d asset=${c.asset} \\`,
    `    -d vault_name="${c.vaultName}" \\`,
    `    -d theme[primary]=${c.primaryColor} \\`,
    `    -d theme[accent]=${c.accentColor} \\`,
    `    -d theme[radius]=${c.radius} \\`,
    `    -d theme[mode]=${c.theme}`,
    "",
    '# => { "embed_url": "https://w.earnit.xyz/v/9f2a",',
    '#      "status": "ready" }',
  ].join("\n");
}
