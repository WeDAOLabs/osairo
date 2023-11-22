import { setup } from "./mud/setup";

class MudEngine {
  private _env: any = {};
  private _initialized: boolean = false;

  private _network: any = null!;
  private _systemCalls: any = {};
  private _components: any = {};

  public get version(): string {
    return "0.0.1";
  }

  public get env() {
    return this._env;
  }

  public get network() {
    return this._network;
  }

  public get isInit(): boolean {
    return this._initialized;
  }

  public get systemCalls(): any {
    return this._systemCalls;
  }

  public get components(): any {
    return this._components;
  }

  constructor() {
    // @ts-ignore
    this._env = import.meta.env;
  }

  public async rebuild() {
    this._initialized = false;

    const {
      components,
      systemCalls: { increment },
      network,
    } = await setup();

    this._network = network;
    this._components = components;
    this._systemCalls = { increment };

    this._initialized = true;
  }

  async init() {
    await this.rebuild();
  }
}

const context = globalThis as any;
context.mudEngine = new MudEngine();
