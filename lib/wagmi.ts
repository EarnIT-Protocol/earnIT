import { http } from "wagmi";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { arcTestnet } from "./chains";

// getDefaultConfig wires the wallet set RainbowKit's ConnectButton expects.
// A WalletConnect projectId is required for mobile/QR wallets; injected wallets
// work without it. Get one at https://cloud.walletconnect.com.
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "earnit-dev-placeholder";

export const config = getDefaultConfig({
  appName: "EarnIT",
  projectId,
  chains: [arcTestnet],
  transports: {
    [arcTestnet.id]: http(arcTestnet.rpcUrls.default.http[0]),
  },
  ssr: true,
});
