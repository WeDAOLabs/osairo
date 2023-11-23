import {
  _decorator,
  Node,
  Label,
  UITransform,
  math,
  Sprite,
  Overflow,
  HorizontalTextAlignment,
} from "cc";
import { ToastLayout } from "../../../core/ui/ToastLayout";
import { registerLayout } from "../../../core/game/GameUI";
const { menu, ccclass, property } = _decorator;

@ccclass("Toast")
@menu("game/components/Toast")
export class Toast extends ToastLayout {
  static prefabName(): string {
    return "Toast";
  }

  private static _isShowing: boolean = false;

  @property(Label)
  private tipLabel: Label = null!;

  @property(Node)
  private maskNode: Node = null!;

  @property(Sprite)
  private bgSp: Sprite = null!;

  public set message(txt: string) {
    this.tipLabel.string = txt;
    this.tipLabel.updateRenderData(true);
    if (this.tipLabel.getComponent(UITransform)!.contentSize.width > 480) {
      const sum =
        this.tipLabel.getComponent(UITransform)!.contentSize.width / 480;
      const size = math.size(520, 60 + sum * 30);
      const transformMask: UITransform =
        this.maskNode.getComponent(UITransform)!;
      transformMask.contentSize = size;
      const transformSp: UITransform = this.bgSp.getComponent(UITransform)!;
      transformSp.contentSize = size;
      this.tipLabel.overflow = Overflow.CLAMP;
      this.tipLabel.horizontalAlign = HorizontalTextAlignment.LEFT;
      this.tipLabel
        .getComponent(UITransform)!
        .setContentSize(480, 60 + sum * 30);
      this.tipLabel.updateRenderData(true);
    }
  }

  static async showTip(txt: string) {
    if (Toast._isShowing) {
      return;
    }
    Toast._isShowing = true;
    const toast: Toast = await Toast.open();
    toast.message = txt;
    toast.fadeIn();
  }

  protected close() {
    Toast.remove();
    Toast._isShowing = false;
  }
}

registerLayout(Toast);
