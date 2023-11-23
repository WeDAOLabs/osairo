import { math, Node, Tween, tween, _decorator, Sprite, Label } from "cc";
import { PopUpLayout } from "../../../core/layout/PopUpLayout";
import { LayerType } from "../../../core/layout/LayerManager";
import { language } from "../../../core/i18n/Language";
import { onAddedPromise } from "../../../core/layout/LayerHelper";
import { registerLayout } from "../../../core/game/GameUI";
const { menu, ccclass, integer, property } = _decorator;

@ccclass("Loading")
@menu("game/components/Loading")
export class Loading extends PopUpLayout {
  private static _callStack: number[] = [];

  private _timeTickets: number = 0;

  @integer
  private loadingType: number = 1;

  @property(Sprite)
  private loadingSp: Sprite = null!;

  @property(Label)
  private loadingTxt: Label = null!;

  static prefabName(): string {
    return "Loading";
  }

  static layer(): LayerType {
    return LayerType.Dialog;
  }

  private _deadTime: number = -1;
  public get deadTime(): number {
    return this._deadTime > 0 ? this._deadTime : 30;
  }

  public set deadTime(time: number) {
    this._deadTime = time;
  }

  private _txt: string | null = null;
  public set tipTxt(txt: string) {
    this._txt = txt;
    this.loadingTxt.string = txt;
  }

  public get tipTxt() {
    return this._txt
      ? this._txt
      : language.getLang("loading...({leftTime})", { leftTime: this.leftTime });
  }

  private get leftTime(): number {
    return Math.max(this.deadTime - this._timeTickets, 0);
  }

  private _autoClose: boolean = false;
  public set autoClose(auto: boolean) {
    this._autoClose = auto;
  }

  private _callback: Function | null = null;
  public set callback(callback: Function) {
    this._callback = callback;
  }

  load() {
    const configType: number = 0;
    let renderType: number = this.loadingType;
    if (configType !== renderType && configType !== 0) {
      renderType = configType;
    }
    if (renderType === 1) {
      this.renderNormal();
    } else if (renderType === 2) {
      this.renderWithLabel();
    }
    tween(this.loadingSp.node!)
      .by(0.15, { angle: -20 })
      .repeatForever()
      .start();

    this.schedule(this.timeTick, 1);
  }

  private timeTick() {
    this._timeTickets++;
    this.loadingTxt.string = this.tipTxt;
    if (this._autoClose && this._timeTickets >= this.deadTime) {
      this.close();
    }
  }

  private renderNormal() {
    this.loadingTxt.string = "";
  }

  private renderWithLabel() {
    this.loadingTxt.string = this.tipTxt;
    this.loadingTxt.node.active = true;
  }

  protected dealloc() {
    this._timeTickets = 0;
    Tween.stopAllByTarget(this.loadingSp.node);
  }

  public onClick() {
    if (this._timeTickets >= this.deadTime) {
      this.close();
    }
  }

  private close() {
    this.unschedule(this.timeTick);
    this._callback && this._callback();
    this._callback = null;
    Loading.remove();
  }

  static open(callbacks?: any, uiArgs: any = null): void {
    this._callStack.push(1);
    if (this._callStack.length > 1) {
      return;
    }
    super.open(callbacks, uiArgs);
  }

  static remove(isDestroy: boolean = true) {
    this._callStack.pop();
    if (this._callStack.length > 0) {
      return;
    }
    // @ts-ignore
    super.remove(isDestroy);
  }

  static async autoLoading(delayTime: number | null = null) {
    const loading = await onAddedPromise<Loading>(Loading);
    loading.autoClose = true;
    if (delayTime !== null && delayTime > 0) {
      loading.deadTime = delayTime;
      loading.loadingTxt.string = loading.tipTxt;
    }
    return loading;
  }
}
registerLayout(Loading);
