import { eventBus } from "../../../core/event/EventBus";
import { MUD_DEV_CHAIN } from "../../../core/event/constants";
import { Singleton } from "../../../core/game/Singleton";
import { GameEventMudComponentUpdated } from "../../events/GameEventMudComponentUpdated";

class MudEngine extends Singleton {
  public get mud(): any {
    // @ts-ignore
    return globalThis.mudEngine;
  }

  public get isMudDevChain() {
    return this.mud.network?.chain?.id === MUD_DEV_CHAIN;
  }

  public get systemCalls(): any {
    return this.mud.systemCalls;
  }

  public async init(provider?: any) {
    //@ts-ignore
    // window.chainParams = { chainId: 31337 };

    await this.mud.init(provider);

    // register event
    this.registerComponents();
    if (this.mud.env.VITE_DEV) {
      console.log(
        `mud init, version: ${this.mud.version}, world address: ${this.mud.network.worldAddress}`
      );
    }
  }

  private registerComponents() {
    if (!this.mud || !this.mud.components) {
      return;
    }

    const keys = Object.keys(this.mud.components);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const component = this.mud.components[key];

      this.registerComponent(key, component);
    }
  }

  private registerComponent(name: string, component: any) {
    if (!component || !component?.update$) {
      return;
    }
    component.update$.subscribe((update: any) => {
      eventBus.emit(GameEventMudComponentUpdated.event, name, update);
    });
  }
}

export const mudEngine: Readonly<MudEngine> = MudEngine.getInstance();
