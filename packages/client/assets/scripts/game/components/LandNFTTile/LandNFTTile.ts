import { Sprite, Label, _decorator, Mask } from "cc";
import { GameObject } from "../../../core/game/GameObject";
const { menu, ccclass, integer, property } = _decorator;

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

  @integer
  private borderWidth: number = 1;

  @property(Sprite)
  private bgSprite: Sprite = null!;

  @property(Mask)
  private borderMask: Mask = null!;

  @property(Label)
  private tipLabel: Label = null!;

  load() {}

  private onClick() {}
}
