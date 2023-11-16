import { setup } from "./mud/setup";
import mudConfig from "contracts/mud.config";

class MudEngine {
  private _env: any = {};

  constructor() {
    // @ts-ignore
    this._env = import.meta.env;
  }

  async init() {
    const {
      components,
      systemCalls: { increment },
      network,
    } = await setup();
    components.Counter.update$.subscribe((update) => {
      const [nextValue, prevValue] = update.value;
      console.log("Counter updated", update, { nextValue, prevValue });
      // document.getElementById("counter")!.innerHTML = String(
      //   nextValue?.value ?? "unset"
      // );
    });
    (window as any).increment = async () => {
      console.log("new counter value:", await increment());
    };
  }
}

const context = globalThis as any;
context.mudEngine = new MudEngine();

// if (import.meta.env.DEV) {
//   const { mount: mountDevTools } = await import("@latticexyz/dev-tools");
//   mountDevTools({
//     config: mudConfig,
//     publicClient: network.publicClient,
//     walletClient: network.walletClient,
//     latestBlock$: network.latestBlock$,
//     storedBlockLogs$: network.storedBlockLogs$,
//     worldAddress: network.worldContract.address,
//     worldAbi: network.worldContract.abi,
//     write$: network.write$,
//     recsWorld: network.world,
//   });
// }
