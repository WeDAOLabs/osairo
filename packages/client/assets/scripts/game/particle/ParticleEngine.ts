import { Singleton } from "../../core/game/Singleton";

export class ParticleEngine extends Singleton {
  private get particleEngine(): any {
    //@ts-ignore
    return globalThis.particleEngine;
  }

  public get particle(): any {
    return this.particleEngine.service;
  }

  public get supportChains(): any[] {
    return this.particleEngine.chains;
  }

  public get LoginType(): any {
    return this.particleEngine.SocialLoginType;
  }

  protected initialize() {
    this.registerEvents();
  }

  private registerEvents() {
    const provider = this.particle.getClient(this.supportChains[0]);
    // listen connect event
    provider.auth.on("connect", (userInfo: any) => {
      console.log("particle userInfo", userInfo);
    });

    // listen disconnect event
    provider.auth.on("disconnect", () => {
      console.log("particle disconnect");
    });

    // listen chainChanged event
    provider.auth.on("chainChanged", (chain: any) => {
      console.log("particle chainChanged", chain);
    });
  }
}
