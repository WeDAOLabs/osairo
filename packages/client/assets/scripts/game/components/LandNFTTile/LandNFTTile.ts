import { Sprite, Label, _decorator, Mask, UITransform, math, Node } from "cc";
import { GameObject } from "../../../core/game/GameObject";
import { PrefabsAsync } from "../../enum/Prefabs";
import { ViewUtil } from "../../../core/utils/ViewUtil";
import { Toast } from "../Toast/Toast";
import { LandTileStatus } from "../../const/Enums";
const { menu, ccclass, integer, property } = _decorator;

export const TileConfig = {
  size: math.size(100, 80),
};

/*
 * @author: enixlee
 * @description:
 * @date: 2023/11/29 10:34:44
 */
@ccclass("LandNFTTile")
@menu("game/components/LandNFTTile")
export class LandNFTTile extends GameObject {
  static prefabName(): string {
    return "LandNFTTile";
  }

  static async createAsync(): Promise<LandNFTTile | null> {
    const node = await ViewUtil.createPrefabAsync(PrefabsAsync.LandNFTTile);
    if (!node) return null;

    const component = node.getComponent(LandNFTTile)!;
    return component;
  }

  @integer
  private borderWidth: number = 1;

  @property(Sprite)
  private bgSprite: Sprite = null!;

  @property(Mask)
  private borderMask: Mask = null!;

  @property(Label)
  private tipLabel: Label = null!;

  private _coordinate: math.Vec3 = math.v3(0, 0);

  private _status: LandTileStatus = LandTileStatus.Empty;

  public set coordinate(coordinate: math.Vec3) {
    this._coordinate = coordinate;
  }

  public get coordinate(): math.Vec3 {
    return this._coordinate;
  }

  public set status(status: LandTileStatus) {
    this._status = status;
    this.tipLabel.string = this.isEmpty
      ? `(${this.coordinate.x},${this.coordinate.y})`
      : "";
  }

  public get status(): LandTileStatus {
    return this.status;
  }

  public get isEmpty() {
    return this._status === LandTileStatus.Empty;
  }

  load() {
    this.buildTile();
  }

  private buildTile() {
    const size = math.size(TileConfig.size.width, TileConfig.size.height);
    const innerSize = math.size(
      size.width - this.borderWidth * 2,
      size.height - this.borderWidth * 2
    );
    const transformNode: UITransform = this.getComponent(UITransform)!;
    transformNode.contentSize = size;

    const bgTransform: UITransform = this.bgSprite.getComponent(UITransform)!;
    bgTransform.contentSize = innerSize;

    const maskTransform: UITransform =
      this.borderMask.node.getComponent(UITransform)!;
    maskTransform.contentSize = innerSize;

    const maskBg: Node = this.borderMask.node.getChildByName("bg")!;
    const transformMaskBg: UITransform = maskBg.getComponent(UITransform)!;
    transformMaskBg.contentSize = size;
  }

  private onClick() {
    Toast.showTip("coming soon!");
  }
}
