import { Sprite, Label, _decorator, Mask, UITransform, math, Node } from "cc";
import { GameObject } from "../../../core/game/GameObject";
import { PrefabsAsync } from "../../enum/Prefabs";
import { ViewUtil } from "../../../core/utils/ViewUtil";
import { LandTileStatus, LandTileType } from "../../const/Enums";
import ImageUtil from "../../../core/utils/ImageUtil";
import { Textures } from "../../enum/Textures";
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

  @property(Sprite)
  private tileSp: Sprite = null!;

  private _coordinate: math.Vec3 = math.v3(0, 0);

  private _status: LandTileStatus = LandTileStatus.Empty;

  private _tileType: LandTileType = LandTileType.Oasis;

  public set coordinate(coordinate: math.Vec3) {
    this._coordinate = coordinate;
  }

  public get coordinate(): math.Vec3 {
    return this._coordinate;
  }

  public set status(status: LandTileStatus) {
    this._status = status;
    this.tileSp.node.active = !this.isEmpty;

    this.tipLabel.string = this.isEmpty
      ? `(${this.coordinate.x},${this.coordinate.y})`
      : "";
  }

  public get status(): LandTileStatus {
    return this.status;
  }

  public set tileType(type: LandTileType) {
    this._tileType = type;
    this.setTileTexture();
  }

  public get tileType(): LandTileType {
    return this._tileType;
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

    const texSpTransform: UITransform =
      this.tileSp.node.getComponent(UITransform)!;
    texSpTransform.contentSize = size;
  }

  private setTileTexture() {
    ImageUtil.setTexture(
      this.tileSp,
      Textures.UI_TILE,
      `tile_${this._tileType}`
    );
  }

  private onClick() {
    if (!this.isEmpty) {
      return;
    }
    this.tileType = Math.floor(Math.random() * 3);
    this.status = LandTileStatus.Landing;
  }
}
