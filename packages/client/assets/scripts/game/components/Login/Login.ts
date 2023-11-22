import { Label, _decorator } from "cc";
import { OnEvent } from "../../../core/event/decorators/OnEventDecorator";
import { LayerType } from "../../../core/layout/LayerManager";
import { VERSION } from "../../const/Game";
import { LayoutCom } from "../../layout/LayoutCom";
import { registerLayout } from "../../../core/game/GameUI";
import { GameEventResourceLoading } from "../../events/GameEventResourceLoading";
import { particleEngine } from "../../particle/ParticleEngine";
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

  protected load() {
    this.versionLabel.string = `version: ${VERSION.version}.${
      VERSION.buildVersion.split(".")[1]
    }`;

    if (particleEngine.particle.hasLogin) {
      console.log("已登录");
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

  private async onLoginClicked() {
    try {
      await particleEngine.particle.login();
    } catch (e) {
      console.log("login failed", e);
    }
  }
}

registerLayout(Login);
