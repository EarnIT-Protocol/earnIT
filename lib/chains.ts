import { defineChain } from "viem";

const ARC_TESTNET_RPC = process.env.NEXT_PUBLIC_ARC_RPC_URL || "https://rpc.testnet.arc.network";

// Arc uses USDC as its native gas token. The native interface carries 18 decimals
// while the ERC-20 interface (used for app-level transfers) carries 6.
export const arcTestnet = defineChain({
  id: 5042002,
  name: "Arc Testnet",
  testnet: true,
  nativeCurrency: { name: "USD Coin", symbol: "USDC", decimals: 18 },
  rpcUrls: {
    default: { http: [ARC_TESTNET_RPC], webSocket: ["wss://rpc.testnet.arc.network"] },
  },
  blockExplorers: {
    default: { name: "Arcscan", url: "https://testnet.arcscan.app" },
  },
});

export const SUPPORTED_CHAINS = [arcTestnet] as const;
