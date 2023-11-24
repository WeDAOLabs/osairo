import { Singleton } from "../../../core/game/Singleton";

//@ts-ignore
export const ethers = globalThis.ethers;

export class Ethers extends Singleton {
  public createWallet(privateKey: string, provider: any): any {
    return new ethers.BrowserProvider(privateKey, provider);
  }
}

export const ethersIns: Readonly<Ethers> = Ethers.getInstance();
