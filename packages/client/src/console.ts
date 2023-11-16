import mudConfig from "contracts/mud.config";

async function openDebugConsole() {
  // @ts-ignore
  const dev = import.meta.env.VITE_DEV;
  console.log("环境变量", dev);
  if (dev) {
    console.log("配置控制台");
    const { mount: mountDevTools } = await import("@latticexyz/dev-tools");
    const context = window as any;
    const mud = context.mudEngine as any;
    const network = mud.network;

    mountDevTools({
      config: mudConfig,
      publicClient: network.publicClient,
      walletClient: network.walletClient,
      latestBlock$: network.latestBlock$,
      storedBlockLogs$: network.storedBlockLogs$,
      worldAddress: network.worldContract.address,
      worldAbi: network.worldContract.abi,
      write$: network.write$,
      recsWorld: network.world,
    });
  }
}

const interval = setInterval(() => {
  const context = window as any;
  if (context.mudEngine && context.mudEngine.isInit) {
    clearInterval(interval);

    console.log("mud engine start");
    openDebugConsole();
  }
}, 200);
