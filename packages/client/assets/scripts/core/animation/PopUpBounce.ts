import { math, tween, _decorator } from "cc";
import { GameObject } from "../game/GameObject";
const { menu, ccclass } = _decorator;

@ccclass("PopUpBounce")
@menu("game/components/entity/PopUpBounce")
export class PopUpBounce extends GameObject {
  private _initScale: number = 0.8;
  private _maxScale: number = 1.1;
  public set initScale(scale: number) {
    this._initScale = scale;
  }

  public set maxScale(scale: number) {
    this._maxScale = scale;
  }

  private _baseFrame = 1 / 30;

  protected afterLoad() {
    super.afterLoad();

    this.bounceIn();
  }

  private bounceIn() {
    this.node.scale = math.v3(this._initScale, this._initScale, 1);
    tween(this.node)
      .to(
        5 * this._baseFrame,
        { scale: math.v3(this._maxScale, this._maxScale, 1) },
        { easing: "sineOut" }
      )
      .to(
        4 * this._baseFrame,
        { scale: math.v3(1, 1, 1) },
        { easing: "sineIn" }
      )
      .start();
  }

  public bounceOut(callback?: Function) {
    tween(this.node)
      .to(
        2 * this._baseFrame,
        { scale: math.v3(this._maxScale, this._maxScale, 1) },
        { easing: "sineOut" }
      )
      .to(
        3 * this._baseFrame,
        { scale: math.v3(this._initScale, this._initScale, 1) },
        { easing: "sineIn" }
      )
      .call(() => callback && callback())
      .start();
  }
}
