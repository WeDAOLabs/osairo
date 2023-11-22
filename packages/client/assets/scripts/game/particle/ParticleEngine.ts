import { Singleton } from "../../core/game/Singleton";

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

  public async init() {
    this.registerEvents();

    console.log(`particle engine init, version: ${this.particle.version}`);
  }
}

export const particleEngine: Readonly<ParticleEngine> =
  ParticleEngine.getInstance();
