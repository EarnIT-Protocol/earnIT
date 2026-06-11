import { http, createConfig } from "wagmi";
import { mainnet, sepolia, anvil } from "wagmi/chains";
import { injected } from "wagmi/connectors";

export const arcTestnet = {
  id: 5042002,
  name: "Arc Testnet",
  nativeCurrency: { name: "ARC", symbol: "ARC", decimals: 18 },
  rpcUrls: { default: { http: ["https://rpc.testnet.arc.network"] } },
};

export const config = createConfig({
  chains: [arcTestnet, sepolia],
  connectors: [injected()],
  transports: {
    [arcTestnet.id]: http("https://rpc.testnet.arc.network"),
    [sepolia.id]: http(),
  },
});