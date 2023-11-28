import { setup } from "./setup";
import { custom, createWalletClient } from "viem";

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

  public async rebuild(provider?: any) {
    this._initialized = false;

    const { components, systemCalls, network } = await setup(provider);

    this._network = network;
    this._components = components;
    this._systemCalls = systemCalls;

    this._initialized = true;
  }

  async init(provider?: any) {
    await this.rebuild(provider);
  }
}

const context = globalThis as any;
context.mudEngine = new MudEngine();
