import { _decorator } from "cc";
import { Singleton } from "../game/Singleton";
const { menu, ccclass } = _decorator;

@ccclass("PopUpManager")
@menu("game/components/entity/PopUpManager")
export class PopUpManager extends Singleton {
  static showPopUp(showFunction: Function) {
    popUpManager.show(showFunction);
  }

  private _callStack: Function[] = [];
  private _isShowing: boolean = false;

  private showOne() {
    if (this._callStack.length <= 0 || this._isShowing) {
      return;
    }

    this._isShowing = true;
    const method: Function = this._callStack.shift()!;
    method.call(this);
  }

  public show(showFunction: Function) {
    this._callStack.push(showFunction);
    this.showOne();
  }

  public showOver() {
    this._isShowing = false;
    this.showOne();
  }
}

export const popUpManager: Readonly<PopUpManager> = PopUpManager.getInstance();
