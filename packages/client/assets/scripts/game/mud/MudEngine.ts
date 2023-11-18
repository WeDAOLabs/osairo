import { Singleton } from "../../core/game/Singleton";

class MudEngine extends Singleton {
  public get mud(): any {
    // @ts-ignore
    return globalThis.mudEngine;
  }
}

export const mudEngine: Readonly<MudEngine> = MudEngine.getInstance();
