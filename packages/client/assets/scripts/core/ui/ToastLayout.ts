import { Node, tween, UIOpacity } from "cc";
import { LayoutCom } from "../../game/layout/LayoutCom";
import { LayerType } from "../layout/LayerManager";

export abstract class ToastLayout extends LayoutCom {
  static layer(): LayerType {
    return LayerType.Alert;
  }

  static async open<T>(): Promise<T> {
    const name = this.prefabName();
    return new Promise((resolve) => {
      super.open({
        onAdded(node: Node) {
          const component = node.getComponent(name)! as T;
          resolve(component);
        },
      });
    });
  }

  public fadeIn() {
    const opacity = this.node.getComponent(UIOpacity);
    tween(opacity)
      .to(0.3, { opacity: 255 }, { easing: "backIn" })
      .delay(1)
      .to(0.3, { opacity: 0 }, { easing: "backOut" })
      .call(() => this.close())
      .start();
  }

  protected abstract close(): void;
}
