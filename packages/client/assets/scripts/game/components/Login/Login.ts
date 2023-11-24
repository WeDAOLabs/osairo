import { Label, _decorator } from "cc";
import { OnEvent } from "../../../core/event/decorators/OnEventDecorator";
import { LayerType } from "../../../core/layout/LayerManager";
import { VERSION } from "../../const/Game";
import { LayoutCom } from "../../layout/LayoutCom";
import { registerLayout } from "../../../core/game/GameUI";
import { GameEventResourceLoading } from "../../events/GameEventResourceLoading";
import { particleEngine } from "../../particle/ParticleEngine";
import { GameEventWalletConnected } from "../../events/GameEventWalletConnected";
import { eventBus } from "../../../core/event/EventBus";
import { GameEventLoginComplete } from "../../events/GameEventLoginComplete";
import { PlayerDTO } from "../../data/dto/PlayerDTO";
import { Toast } from "../Toast/Toast";
const { menu, ccclass, property } = _decorator;

@ccclass("Login")
@menu("game/logic/components/Login")
export class Login extends LayoutCom {
  static prefabName(): string {
    return "Login";
  }

  static layer(): LayerType {
    return LayerType.Dialog;
  }

  @property(Label)
  private loadingLabel: Label = null!;

  @property(Label)
  private versionLabel: Label = null!;

  protected async load() {
    this.versionLabel.string = `version: ${VERSION.version}.${
      VERSION.buildVersion.split(".")[1]
    }`;

    try {
      const userInfo = await particleEngine.particle.isLoginAsync();
      if (userInfo) {
        this.onWalletConnected(userInfo);
      }
    } catch (e) {
      console.error(e);
    }
  }

  @OnEvent(GameEventResourceLoading.event)
  public updateProgress(progress: number, total: number) {
    if (!this.loadingLabel) {
      return;
    }

    const percent = Math.floor((progress / total) * 100);
    this.loadingLabel.string = `loading....${percent}%`;
  }

  @OnEvent(GameEventWalletConnected.event)
  private onWalletConnected(userInfo: any) {
    eventBus.emit(GameEventLoginComplete.event, PlayerDTO.fillWith(userInfo));
  }

  private async onLoginClicked() {
    try {
      await particleEngine.particle.login();
    } catch (e: any) {
      Toast.showTip(`login failed: ${e.message}`);
      console.log("login failed", e);
    }
  }
}

registerLayout(Login);
