import { Singleton } from "../../core/game/Singleton";
import { ethers, ethersIns } from "../plugins/ethers/Ethers";

export abstract class ContractBase extends Singleton {
  private _contract: any = null;

  protected abstract get abi(): any;

  protected abstract get address(): string;

  protected async getContract(): Promise<any> {
    if (!this._contract) {
      const contract = new ethers.Contract(this.address, this.abi);
      const signer = await ethersIns.getSigner();
      this._contract = contract.connect(signer);
      this._contract.signer = signer;
      this._contract.provider = ethersIns.provider;
    }
    return this._contract;
  }
}
