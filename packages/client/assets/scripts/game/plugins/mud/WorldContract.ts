import { OnEvent } from "../../../core/event/decorators/OnEventDecorator";
import { Singleton } from "../../../core/game/Singleton";
import { GameEventLoginComplete } from "../../events/GameEventLoginComplete";
import { mudEngine } from "./MudEngine";
import { ethers, ethersIns } from "../ethers/Ethers";

export class WorldContract extends Singleton {
  private _contract: any = null;

  private get baseContract() {
    return mudEngine.mud.network.worldContract;
  }

  private get abi() {
    return this.baseContract.abi;
  }

  private async getContract(): Promise<any> {
    if (!this._contract) {
      const contract = new ethers.Contract(this.baseContract.address, this.abi);
      const signer = await ethersIns.getSigner();
      this._contract = contract.connect(signer);
      this._contract.signer = signer;
      this._contract.provider = ethersIns.provider;
    }
    return this._contract;
  }

  @OnEvent(GameEventLoginComplete.event)
  private async onLogin() {
    this.registerDelegation();
  }

  public async registerDelegation() {
    if (!mudEngine.isMudDevChain) {
      const world = await this.getContract();
      mudEngine.systemCalls.setWorld(world);
    }
  }
}

export const worldContract: Readonly<WorldContract> =
  WorldContract.getInstance();
