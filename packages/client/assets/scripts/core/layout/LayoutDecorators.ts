import { Node } from "cc";
import { LayerType } from "./LayerManager";
import { UICallbacks } from "./Defines";
import { popUpManager } from "./PopUpManager";
import { PopUpScaleIn } from "../animation/PopUpScaleIn";
import { PopUpBounce } from "../animation/PopUpBounce";
import { PanelSlideIn } from "../animation/PanelSlideIn";

export const PopUpDecorator = <T extends { new (...args: any[]): {} }>(
  ct: T
) => {
  return class extends ct {
    static layer(): LayerType {
      return LayerType.PopUp;
    }

    static open(callbacks?: UICallbacks, uiArgs: any = null): void {
      // popUpManager.show(() => {
      // @ts-ignore
      super.open(callbacks, uiArgs);
      // });
    }

    static remove(isDestroy: boolean = true) {
      // @ts-ignore
      super.remove(isDestroy);
      popUpManager.showOver();
    }
  };
};

export const ScaleIn = <T extends { new (...args: any[]): {} }>(ct: T) => {
  return class extends ct {
    protected static actionOnRemove(node: Node, next?: Function) {
      let component = node.getComponent(PopUpScaleIn);
      if (!component) {
        component = node.getComponentInChildren(PopUpScaleIn);
      }
      if (component) {
        component.scaleOut(next);
      } else {
        next && next();
      }
    }
  };
};

export const BounceIn =
  (initialScale: number = 0.75, maxScale: number = 1.2) =>
  <T extends { new (...args: any[]): {} }>(ct: T) => {
    return class extends ct {
      private get bounceComponent(): PopUpBounce | null {
        // @ts-ignore
        let component = this.node.getComponent(PopUpBounce);
        if (!component) {
          // @ts-ignore
          component = this.node.getComponentInChildren(PopUpBounce);
        }
        return component;
      }

      protected beforeLoad() {
        //@ts-ignore
        super.beforeLoad();

        const component = this.bounceComponent;
        if (component) {
          component.initScale = initialScale;
          component.maxScale = maxScale;
        }
      }

      protected static actionOnRemove(node: Node, next?: Function) {
        let component = node.getComponent(PopUpBounce);
        if (!component) {
          component = node.getComponentInChildren(PopUpBounce);
        }
        if (component) {
          component.bounceOut(next);
        } else {
          next && next();
        }
      }
    };
  };

export const SlideIn = <T extends { new (...args: any[]): {} }>(ct: T) => {
  return class extends ct {
    protected static actionOnRemove(node: Node, next?: Function) {
      let component = node.getComponent(PanelSlideIn);
      if (!component) {
        component = node.getComponentInChildren(PanelSlideIn);
      }
      if (component) {
        component.slideOut(next);
      } else {
        next && next();
      }
    }
  };
};
