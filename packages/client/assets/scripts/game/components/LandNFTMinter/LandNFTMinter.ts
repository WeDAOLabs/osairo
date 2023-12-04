import { _decorator } from "cc";
import { LayoutCom } from "../../layout/LayoutCom";
import { registerLayout } from "../../../core/game/GameUI";
import { ViewUtil } from "../../../core/utils/ViewUtil";
import { PrefabsAsync } from "../../enum/Prefabs";
import { Toast } from "../Toast/Toast";
import { eventBus } from "../../../core/event/EventBus";
import { GameEventLandNFTMinted } from "../../events/GameEventLandNFTMinted";
const { menu, ccclass } = _decorator;

/*
 * @author: enixlee
 * @description:
 * @date: 2023/11/28 19:01:14
 */
@ccclass("LandNFTMinter")
@menu("game/components/LandNFTMinter")
export class LandNFTMinter extends LayoutCom {
  static prefabName(): string {
    return "LandNFTMinter";
  }

  static async createAsync(): Promise<LandNFTMinter | null> {
    const node = await ViewUtil.createPrefabAsync(PrefabsAsync.LandNFTMinter);
    if (!node) return null;

    const component = node.getComponent(LandNFTMinter)!;
    return component;
  }

  private async onMintLand() {
    const landTile = Math.floor(Math.random() * 9);

    eventBus.emit(GameEventLandNFTMinted.event, landTile);

    Toast.showTip(`Osairo LandNFT: type ${landTile} has been minted!`);
  }
}

registerLayout(LandNFTMinter);
