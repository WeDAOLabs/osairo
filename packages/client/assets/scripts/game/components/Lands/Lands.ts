import { _decorator } from "cc";
import { LayoutCom } from "../../layout/LayoutCom";
import { registerLayout } from "../../../core/game/GameUI";
import { LandNFTTile } from "../LandNFTTile/LandNFTTile";
const { menu, ccclass } = _decorator;

/*
 * @author: enixlee
 * @description:
 * @date: 2023/11/29 11:25:51
 */
@ccclass("Lands")
@menu("game/components/Layout/Lands")
export class Lands extends LayoutCom {
  static prefabName(): string {
    return "Lands";
  }

  protected async load() {
    const tile = await LandNFTTile.createAsync();
    if (tile) {
      this.node.addChild(tile.node);
    }
  }
}

registerLayout(Lands);
