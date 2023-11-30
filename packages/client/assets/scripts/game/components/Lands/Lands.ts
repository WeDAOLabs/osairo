import { _decorator, math } from "cc";
import { LayoutCom } from "../../layout/LayoutCom";
import { registerLayout } from "../../../core/game/GameUI";
import { LandNFTTile } from "../LandNFTTile/LandNFTTile";
const { menu, ccclass } = _decorator;

const LandMapConfig = {
  size: {
    width: 1000,
    height: 800,
  },
};

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

  private async addTile(posX: number, posY: number) {
    const tile = await LandNFTTile.createAsync();
    if (tile) {
      this.node.addChild(tile.node);
    }
  }
}

registerLayout(Lands);
