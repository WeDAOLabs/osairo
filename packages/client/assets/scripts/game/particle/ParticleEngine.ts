import { eventBus } from "../../core/event/EventBus";
import { Singleton } from "../../core/game/Singleton";
import { GameEventWalletChainChanged } from "../events/GameEventWalletChainChanged";
import { GameEventWalletConnected } from "../events/GameEventWalletConnected";
import { GameEventWalletDisconnected } from "../events/GameEventWalletDisconnected";

export class ParticleEngine extends Singleton {
  private get particleEngine(): any {
    return (
      //@ts-ignore
      globalThis?.particleEngine ?? {
        service: undefined,
        chains: [],
        SocialLoginType: {},
      }
    );
  }

  public get particle(): any {
    return this.particleEngine.service;
  }

  public get network(): any {
    return this.particle.client;
  }

  public get particleProvider(): any {
    return this.network.particleProvider;
  }

  public get supportChains(): any[] {
    return this.particleEngine.chains;
  }

  public get LoginType(): any {
    return this.particleEngine.SocialLoginType;
  }

  private registerEvents() {
    const provider = this.particle.getClient(this.supportChains[0]);

    // listen connect event
    provider.auth.on("connect", (userInfo: any) => {
      eventBus.emit(GameEventWalletConnected.event, userInfo);
    });

    // listen disconnect event
    provider.auth.on("disconnect", () => {
      console.log("particle disconnect");
      eventBus.emit(GameEventWalletDisconnected.event);
    });

    // listen chainChanged event
    provider.auth.on("chainChanged", (chain: any) => {
      console.log("particle chainChanged", chain);
      eventBus.emit(GameEventWalletChainChanged.event, chain);
    });
  }

  public async init() {
    this.registerEvents();

    console.log(`particle engine init, version: ${this.particle.version}`);
  }
}

export const particleEngine: Readonly<ParticleEngine> =
  ParticleEngine.getInstance();
