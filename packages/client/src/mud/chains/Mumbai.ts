import { MUDChain } from "@latticexyz/common/chains";

export const Mumbai = {
  name: "Mumbai",
  id: 80001,
  network: "Mumbai",
  nativeCurrency: { decimals: 18, name: "MATIC", symbol: "MATIC" },
  rpcUrls: {
    default: {
      http: ["https://polygon-mumbai-bor.publicnode.com"],
      webSocket: ["wss://polygon-mumbai-bor.publicnode.com"],
    },
    public: {
      http: ["https://polygon-mumbai-bor.publicnode.com"],
      webSocket: ["wss://polygon-mumbai-bor.publicnode.com"],
    },
  },
  blockExplorers: {
    default: {
      name: "Polygonscan",
      url: "https://mumbai.polygonscan.com",
    },
  },
} as const satisfies MUDChain;

