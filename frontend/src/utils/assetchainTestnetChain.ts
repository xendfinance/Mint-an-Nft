//DO NOT EDIT THIS FILE
/*

  @author ASSETCHAIN DEVREL TEAM
   @author James Harrison(https://github.com/KodeSage/)
   @author  Okorie Ebube(https://github.com/theiceeman)
 */

import { defineChain } from "viem";

export const assetchain_testnet = defineChain({
  id: 42421,
  name: "AssetChain Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "AssetChain Testnet",
    symbol: "RWA",
  },
  rpcUrls: {
    default: {
      http: ["https://rpctestnet.xendrwachain.com"],
      webSocket: ["wss://rpctestnet.xendrwachain.com"],
    },
  },
  blockExplorers: {
    default: { name: "Xendrwachain", url: "https://testnet.xendrwachain.com" },
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 42421,
    },
  },
});
