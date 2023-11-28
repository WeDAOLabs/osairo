import { math, screen, UITransform, view, _decorator } from "cc";
import { GameObject } from "../../game/GameObject";
const { menu, ccclass } = _decorator;

@ccclass("FitHeight")
@menu("game/components/entity/FitHeight")
export class FitHeight extends GameObject {
  protected load() {
    const transform: UITransform = this.node.getComponent(UITransform)!;
    let srcScaleForShowAll = Math.min(
      screen.windowSize.width / view.getDesignResolutionSize().width,
      screen.windowSize.height / view.getDesignResolutionSize().height
    );
    let realHeight = transform.contentSize.height * srcScaleForShowAll;
    transform.contentSize = math.size(
      transform.contentSize.width,
      transform.contentSize.height * (screen.windowSize.height / realHeight)
    );
  }
}
