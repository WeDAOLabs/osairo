import { OnEvent } from "../../../core/event/decorators/OnEventDecorator";
import { GameEventLoginComplete } from "../../events/GameEventLoginComplete";
import { mudEngine } from "./MudEngine";
import { ethers } from "../ethers/Ethers";
import { ContractBase } from "../../contracts/ContractBase";

export class WorldContract extends ContractBase {
  private get baseContract() {
    return mudEngine.mud.network.worldContract;
  }

  protected get address(): string {
    return this.baseContract.address;
  }

  protected get abi() {
    return this.baseContract.abi;
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
