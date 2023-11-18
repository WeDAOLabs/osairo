import { Button, _decorator } from "cc";
const { menu, ccclass, property } = _decorator;

@ccclass("ButtonWithTransitionScale")
@menu("core/ui/ButtonWithTransitionScale")
export class ButtonWithTransitionScale extends Button {
  protected _duration: number = 0.1;

  protected _zoomScale: number = 0.8;

  protected _lockZoom: boolean = false;

  protected _zoomUpCalls: Function[] = [];
  protected _zoomBackCalls: Function[] = [];

  private _touchMoveCall: Function | null = null;
  public set touchMoveCall(func: Function | null) {
    this._touchMoveCall = func;
  }

  onLoad() {
    this.transition = Button.Transition.SCALE;
  }

  protected _onTouchMove(e?: any) {
    super._onTouchMove(e);
    if (this._touchMoveCall) {
      this._touchMoveCall();
    }
  }

  protected _zoomUp() {
    if (this._lockZoom) {
      return;
    }
    this._lockZoom = true;
    super._zoomUp();
    this._zoomUpCalls.forEach((func) => func());
  }

  protected _zoomBack() {
    super._zoomBack();
    this._lockZoom = false;
    this._zoomBackCalls.forEach((func) => func());
  }

  public registerZoomUpCall(func: Function) {
    this._zoomUpCalls.push(func);
  }

  public registerZoomBackCall(func: Function) {
    this._zoomBackCalls.push(func);
  }
}
