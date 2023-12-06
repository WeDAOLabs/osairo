import { _decorator, Component, Node } from "cc";
import { landsModel } from "../../data/LandsModel";
import { Toast } from "../Toast/Toast";
import { LandTileStatus } from "../../../game/const/Enums";
import { LandNFTTile } from "../../../game/components/LandNFTTile/LandNFTTile";
import { PopUpBounceIn } from "../../../core/layout/popup/PopUpBounceIn";
import { registerLayout } from "../../../core/game/GameUI";

const { menu, ccclass, property } = _decorator;

@ccclass("LandMenu")
@menu("game/components/LandMenu")
export class LandMenu extends PopUpBounceIn {
  static prefabName(): string {
    return "LandMenu";
  }

  private close() {
    LandMenu.remove();
  }

  private onCancel() {
    this.close();
  }

  onPlaceLandButtonClick() {
    Toast.showTip("Please choose a tile NFT!");
  }

  onViewButtonClick() {
    Toast.showTip("Coming soon!");
  }
}

registerLayout(LandMenu);
