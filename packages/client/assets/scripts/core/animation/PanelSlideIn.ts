import { math, tween, UITransform, _decorator } from "cc";
import { GameObject } from "../game/GameObject";
const { menu, ccclass, integer } = _decorator;

export enum PANEL_SLIDE_DIRECTION {
  LEFT_TO_RIGHT = 0,
  RIGHT_TO_LEFT = 1,
  BOTTOM_TO_TOP = 2,
  TOP_TO_BOTTOM = 3,
}

@ccclass("PanelSlideIn")
@menu("game/components/entity/PanelSlideIn")
export class PanelSlideIn extends GameObject {
  @integer
  private dir: PANEL_SLIDE_DIRECTION = PANEL_SLIDE_DIRECTION.LEFT_TO_RIGHT;

  protected load() {
    const pos = this.node.position;
    const originX = pos.x;
    const originY = pos.y;

    const contentSize = this.node.getComponent(UITransform)!.contentSize;
    let toPosX = originX;
    if (this.dir === PANEL_SLIDE_DIRECTION.LEFT_TO_RIGHT) {
      toPosX = originX - contentSize.width;
    } else if (this.dir === PANEL_SLIDE_DIRECTION.RIGHT_TO_LEFT) {
      toPosX = originX + contentSize.width;
    }

    let toPosY = originY;
    if (this.dir === PANEL_SLIDE_DIRECTION.BOTTOM_TO_TOP) {
      toPosY = originY - contentSize.height;
    }

    this.node.setPosition(toPosX, toPosY);

    tween(this.node)
      .to(0.2, { position: math.v3(originX, originY) }, { easing: "sineInOut" })
      .start();
  }

  /**
   * 滑出
   * @param callback
   */
  public slideOut(callback?: Function) {
    const pos = this.node.position;
    const contentSize = this.node.getComponent(UITransform)!.contentSize;

    let toPosX = pos.x;
    if (this.dir === PANEL_SLIDE_DIRECTION.LEFT_TO_RIGHT) {
      toPosX = pos.x - contentSize.width;
    } else if (this.dir === PANEL_SLIDE_DIRECTION.RIGHT_TO_LEFT) {
      toPosX = pos.x + contentSize.width;
    }

    let toPosY = pos.y;
    if (this.dir === PANEL_SLIDE_DIRECTION.BOTTOM_TO_TOP) {
      toPosY = pos.y - contentSize.height;
    }

    tween(this.node)
      .to(0.2, { position: math.v3(toPosX, toPosY) }, { easing: "sineInOut" })
      .call(() => callback && callback())
      .start();
  }
}
