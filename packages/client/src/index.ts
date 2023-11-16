import { setup } from "./mud/setup";
class MudEngine {
  private _env: any = {};
  private _initialized: boolean = false;

  private _network: any = null!;

  public get network() {
    return this._network;
  }

  public get isInit(): boolean {
    return this._initialized;
  }

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

    this._network = network;

    this._initialized = true;

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
