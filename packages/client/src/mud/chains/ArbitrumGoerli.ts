import { MUDChain } from "@latticexyz/common/chains";

export const Mumbai = {
  name: "Arbitrum Goerli",
  id: 421613,
  network: "Arbitrum-Goerli",
  nativeCurrency: { decimals: 18, name: "Ether", symbol: "ETH" },
  rpcUrls: {
    default: {
      http: ["https://arbitrum-goerli.publicnode.com"],
      webSocket: ["wss://arbitrum-goerli.publicnode.com"],
    },
    public: {
      http: ["https://endpoints.omniatech.io/v1/arbitrum/goerli/public"],
      webSocket: ["wss://arbitrum-goerli.publicnode.com"],
    },
  },
  blockExplorers: {
    default: {
      name: "Arbiscan",
      url: "https://goerli.arbiscan.io/",
    },
  },
} as const satisfies MUDChain;

