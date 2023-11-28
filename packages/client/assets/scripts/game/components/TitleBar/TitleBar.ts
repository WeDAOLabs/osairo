import { Label, _decorator } from "cc";
import { GameObject } from "../../../core/game/GameObject";
import { OnEvent } from "../../../core/event/decorators/OnEventDecorator";
import { GameEventLoginComplete } from "../../events/GameEventLoginComplete";
import { playerData } from "../../data/PlayerData";
import { GameEventWalletConnected } from "../../events/GameEventWalletConnected";
import { PlayerDTO } from "../../data/dto/PlayerDTO";
import { PrefabsAsync } from "../../enum/Prefabs";
import { ViewUtil } from "../../../core/utils/ViewUtil";
import { utils } from "../../plugins/utils";
import { Toast } from "../Toast/Toast";
import { particleEngine } from "../../plugins/particle/ParticleEngine";
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

  static async createAsync(): Promise<TitleBar | null> {
    const node = await ViewUtil.createPrefabAsync(PrefabsAsync.TitleBar);
    if (!node) return null;

    const component = node.getComponent(TitleBar)!;
    return component;
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

  private async onAddressClicked() {
    if (playerData.isConnected) {
      let msg = "address was copied";
      try {
        await utils.copyTextToClipboard(playerData.currentPlayer.address);
      } catch (e) {
        msg = "copy failed";
        console.error(e);
      }
      Toast.showTip(msg);
    } else {
      await particleEngine.login();
    }
  }
}
