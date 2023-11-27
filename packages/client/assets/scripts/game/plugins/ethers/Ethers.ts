import { Singleton } from "../../../core/game/Singleton";
import { particleEngine } from "../particle/ParticleEngine";

//@ts-ignore
export const ethers = globalThis.ethers;

export class Ethers extends Singleton {
  private _provider: any = null;

  public get provider() {
    if (!this._provider) {
      return new ethers.BrowserProvider(particleEngine.particleProvider);
    }
    return this._provider;
  }

  public async getSigner(): Promise<any> {
    return await this.provider.getSigner();
  }

  public createWallet(privateKey: string, provider: any): any {
    return new ethers.BrowserProvider(privateKey, provider);
  }
}

export const ethersIns: Readonly<Ethers> = Ethers.getInstance();
