import { math, screen, UITransform, view, _decorator } from "cc";
import { GameObject } from "../../game/GameObject";
const { menu, ccclass } = _decorator;

@ccclass("FitWidth")
@menu("game/components/entity/FitWidth")
export class FitHeight extends GameObject {
  protected load() {
    const transform: UITransform = this.node.getComponent(UITransform)!;
    let srcScaleForShowAll = Math.min(
      screen.windowSize.width / view.getDesignResolutionSize().width,
      screen.windowSize.height / view.getDesignResolutionSize().height
    );
    let realWidth = transform.contentSize.width * srcScaleForShowAll;
    transform.contentSize = math.size(
      transform.contentSize.width * (screen.windowSize.width / realWidth),
      transform.contentSize.height
    );
  }
}
