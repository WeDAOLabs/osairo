import { math, tween, UIOpacity, _decorator } from "cc";
import { GameObject } from "../game/GameObject";
const { menu, ccclass } = _decorator;

@ccclass("PopUpScaleIn")
@menu("game/components/entity/PopUpScaleIn")
export class PopUpScaleIn extends GameObject {
  protected afterLoad() {
    super.afterLoad();

    this.node.addComponent(UIOpacity);
    this.scaleIn();
  }

  private scaleIn() {
    const fade = this.node.getComponent(UIOpacity)!;
    fade.opacity = 0;

    tween(this.node)
      .to(0.01, { scale: math.v3(0, 0, 1) })
      .to(0.1, { scale: math.v3(1.1, 1.1, 1) })
      .to(0.05, { scale: math.v3(1, 1, 1) })
      .start();
    tween(fade).delay(0.01).to(0.1, { opacity: 255 }).start();
  }

  public scaleOut(callback?: Function) {
    const fade = this.node.getComponent(UIOpacity)!;

    tween(this.node)
      .to(0.05, { scale: math.v3(1.1, 1.1, 1) })
      .to(0.05, { scale: math.v3(1, 1, 1) })
      .to(0.1, { scale: math.v3(0, 0, 1) })
      .call(() => callback && callback())
      .start();
    tween(fade).delay(0.1).to(0.1, { opacity: 0 }).start();
  }
}
