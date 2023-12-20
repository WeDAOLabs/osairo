import { Label, _decorator } from "cc";
import { GameObject } from "../../../core/game/GameObject";
import { OnEvent } from "../../../core/event/decorators/OnEventDecorator";
import { playerModel } from "../../data/PlayerModel";
import { GameEventWalletConnected } from "../../events/GameEventWalletConnected";
import { PlayerDTO } from "../../data/dto/PlayerDTO";
import { PrefabsAsync } from "../../enum/Prefabs";
import { ViewUtil } from "../../../core/utils/ViewUtil";
import { utils } from "../../plugins/utils";
import { Toast } from "../Toast/Toast";
import { particleEngine } from "../../plugins/particle/ParticleEngine";
import { GameEventBalanceChanged } from "../../events/GameEventBalanceChanged";
import { maticContract } from "../../contracts/TokenMaticContract";
import { eventBus } from "../../../core/event/EventBus";
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

  @property(Label)
  private balanceLabel: Label = null!;

  private set address(address: string) {
    this.walletAddressLabel.string = address;
  }

  private set balance(balance: string | number) {
    this.balanceLabel.string = `${balance} matic`;
  }

  load() {
    this.setPlayerAddress(playerModel.currentPlayer);

    eventBus.emit(GameEventBalanceChanged.event);
  }

  @OnEvent(GameEventWalletConnected.event)
  private onWalletConnected(player: PlayerDTO) {
    this.setPlayerAddress(player);
  }

  @OnEvent(GameEventBalanceChanged.event)
  private async onBalanceChanged() {
    const address = playerModel.currentPlayer?.address;
    if (!address) {
      return;
    }
    try {
      const balance = await maticContract.balanceOf(address);
      this.balance = parseFloat(`${balance}`).toFixed(4);
    } catch (e) {
      console.error(e);
    }
  }

  private setPlayerAddress(player: PlayerDTO) {
    this.address = player.shortAddress;
  }

  private async onAddressClicked() {
    if (playerModel.isConnected) {
      let msg = "wallet address copied!";
      try {
        await utils.copyTextToClipboard(playerModel.currentPlayer.address);
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
