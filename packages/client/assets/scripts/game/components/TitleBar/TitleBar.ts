import { Label, _decorator } from "cc";
import { GameObject } from "../../../core/game/GameObject";
import { OnEvent } from "../../../core/event/decorators/OnEventDecorator";
import { GameEventLoginComplete } from "../../events/GameEventLoginComplete";
import { playerData } from "../../data/PlayerData";
import { GameEventWalletConnected } from "../../events/GameEventWalletConnected";
import { PlayerDTO } from "../../data/dto/PlayerDTO";
const { menu, ccclass, property } = _decorator;

/*
 * @author: enixlee
 * @description:
 * @date: 2023/11/28 18:08:25
 */
@ccclass("TitleBar")
@menu("game/components/TitleBar")
export class TitleBar extends GameObject {
  static prefabName(): string {
    return "TitleBar";
  }

  @property(Label)
  private walletAddressLabel: Label = null!;

  private set address(address: string) {
    this.walletAddressLabel.string = address;
  }

  load() {
    this.setPlayerAddress(playerData.currentPlayer);
  }

  @OnEvent(GameEventWalletConnected.event)
  private onWalletConnected(player: PlayerDTO) {
    this.setPlayerAddress(player);
  }

  private setPlayerAddress(player: PlayerDTO) {
    this.address = player.wallet.shortAddress;
  }
}
