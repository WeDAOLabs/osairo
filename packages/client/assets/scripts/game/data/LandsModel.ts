import { OnEvent } from "../../core/event/decorators/OnEventDecorator";
import { DataModelBase } from "../../core/model/DataModelBase";
import { registerDataModel } from "../../core/model/DataRegister";
import { Toast } from "../components/Toast/Toast";
import { LandTileType } from "../const/Enums";
import { GameEventLandNFTMinted } from "../events/GameEventLandNFTMinted";

/*
 * @author: enixlee
 * @description:
 * @date: 2023/11/30 18:01:01
 */
export class LandsModel extends DataModelBase {
  private _lands: LandTileType[] = [];

  @OnEvent(GameEventLandNFTMinted.event)
  private onLandNFTMinted(tile: LandTileType) {
    this._lands.push(tile);
  }

  public landing(): LandTileType | null {
    if (!this._lands || this._lands.length === 0) {
      Toast.showTip("There is none Land NFT");
      return null;
    }

    const tile = this._lands.shift()!;
    return tile;
  }
}
export const landsModel: Readonly<LandsModel> = LandsModel.getInstance();

registerDataModel(landsModel);
