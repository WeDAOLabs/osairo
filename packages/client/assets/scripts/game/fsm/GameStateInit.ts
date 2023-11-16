import { onAddedPromise } from "../../core/layout/LayerHelper";
import { gameManager } from "../../core/manager/GameManager";
import { dataModels } from "../../core/model/DataRegister";
import { Login } from "../components/Login/Login";
import { Main } from "../components/Main/Main";
import { MudEngine } from "../mud/MudEngine";
import { GameFsmBase } from "./GameFmsBase";
import { SceneState } from "./SceneState";

export class GameStateGameInit extends GameFsmBase {
  private _timeInterval = 0;

  constructor(owner: any) {
    super(SceneState.GAME_INIT, owner);
  }

  protected get nextState(): SceneState {
    return SceneState.GAME_GAMING;
  }

  private initTimeDelay() {
    this._timeInterval = gameManager.timer.getLocalTime();
  }

  async onEnter(): Promise<void> {
    this.initTimeDelay();
    // if (!walletData.hasProvider) {
    //   Toast.showMessage(
    //     `there's no provider has been found, please install metamask first`
    //   );
    //   return Promise.resolve();
    // }

    await this._loadDataModels();

    await this._loadResources();

    await MudEngine.getInstance().init();

    const timeSpan = gameManager.timer.getLocalTime() - this._timeInterval;
    if (timeSpan < 1000) {
      this.scheduleOnce(
        () => this.updateComplete(),
        Math.max(200, timeSpan) / 1000
      );
    } else {
      this.updateComplete();
    }
  }

  async onExit(): Promise<void> {
    const startScreen =
      gameManager.canvas.getComponentInChildren("StartScreen");
    await onAddedPromise(Main);
    if (startScreen && startScreen.node) {
      startScreen.node.destroy();
    }
    Login.remove();
  }

  private async _loadDataModels() {
    for (let i = 0; i < dataModels.length; i++) {
      const v = dataModels[i];
      v.preload && v.preload();
      if (v && v.loadData) {
        await v.loadData();
      }
    }
  }

  private async _loadResources() {
    // init cache
  }
}

export const stateGameInit: Readonly<GameStateGameInit> =
  GameStateGameInit.getInstance();