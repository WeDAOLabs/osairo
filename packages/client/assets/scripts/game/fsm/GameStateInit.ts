import { eventBus } from "../../core/event/EventBus";
import { onAddedPromise } from "../../core/layout/LayerHelper";
import { gameManager } from "../../core/manager/GameManager";
import { dataModels } from "../../core/model/DataRegister";
import { Login } from "../components/Login/Login";
import { Main } from "../components/Main/Main";
import { GameEventLoginComplete } from "../events/GameEventLoginComplete";
import { mudEngine } from "../plugins/mud/MudEngine";
import { particleEngine } from "../plugins/particle/ParticleEngine";
import { GameFsmBase } from "./GameFmsBase";
import { SceneState } from "./SceneState";
import { ethers } from "../plugins/ethers/Ethers";

interface IEngineMap {
  mud: boolean;
  particle: boolean;
  ethers: boolean;
}

export class GameStateGameInit extends GameFsmBase {
  private _timeInterval = 0;
  private _initialized = false;
  private _engineLaunched: IEngineMap = null!;

  constructor(owner: any) {
    super(SceneState.GAME_INIT, owner);
  }

  protected get nextState(): SceneState {
    return SceneState.GAME_GAMING;
  }

  private initTimeDelay() {
    this._timeInterval = gameManager.timer.getLocalTime();
  }

  private get isEngineLaunched(): boolean {
    return (
      this._engineLaunched.mud &&
      this._engineLaunched.particle &&
      this._engineLaunched.ethers
    );
  }

  private async initGame() {
    this._initialized = true;

    await this._loadDataModels();

    await this._loadResources();

    await particleEngine.init();

    await mudEngine.init();
  }

  private onLoginComplete() {
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

  tick() {
    if (this.isEngineLaunched) {
      if (!this._initialized) {
        this.initGame();
      }
      return;
    }

    if (mudEngine.mud) {
      this._engineLaunched.mud = true;
    }
    if (particleEngine.service) {
      this._engineLaunched.particle = true;
    }
    if (ethers) {
      this._engineLaunched.ethers = true;
    }
  }

  async onEnter(): Promise<void> {
    eventBus.on(GameEventLoginComplete.event, this.onLoginComplete, this);

    this.initTimeDelay();
    this._engineLaunched = {
      mud: false,
      particle: false,
      ethers: false,
    };
    await onAddedPromise(Login);

    const startScreen =
      gameManager.canvas.getComponentInChildren("StartScreen");
    if (startScreen && startScreen.node) {
      startScreen.node.destroy();
    }
  }

  async onExit(): Promise<void> {
    eventBus.off(GameEventLoginComplete.event, this.onLoginComplete, this);

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
