import { math, UITransform, _decorator } from "cc";
import { GameObject } from "../../game/GameObject";
const { menu, ccclass, property, float } = _decorator;

@ccclass("LayoutOnTopBorder")
@menu("game/components/entity/LayoutOnTopBorder")
export class LayoutOnTopBorder extends GameObject {
  @float
  public marginLeft: number = 0;
  @float
  public marginRight: number = 0;
  @float
  public marginTop: number = 0;

  protected load() {
    const transform: UITransform = this.node.getComponent(UITransform)!;
    const parentTransform: UITransform =
      this.node.parent!.getComponent(UITransform)!;
    let posX = this.node.position.x;
    if (this.marginLeft > 0) {
      posX =
        -(parentTransform.contentSize.width / 2 - this.marginLeft) +
        transform.anchorX * transform.contentSize.width;
    } else if (this.marginRight > 0) {
      posX =
        parentTransform.contentSize.width / 2 -
        this.marginRight -
        transform.anchorX * transform.contentSize.width;
    }
    this.node.position = math.v3(
      posX,
      parentTransform.contentSize.height / 2 -
        transform.anchorY * transform.contentSize.height -
        this.marginTop
    );
  }
}
