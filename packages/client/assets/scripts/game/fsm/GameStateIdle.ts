import { OnEvent } from "../../core/event/decorators/OnEventDecorator";
import { uiConfigs } from "../../core/game/GameUI";
import { GameEventGameLaunch } from "../../core/game/events/GameEventGameLaunch";
import { gameManager } from "../../core/manager/GameManager";
import { GameFsmBase } from "./GameFmsBase";
import { SceneState } from "./SceneState";

export class GameStateIdle extends GameFsmBase {
  public get nextState(): SceneState {
    return SceneState.GAME_INIT;
  }
  constructor(owner: any) {
    super(SceneState.GAME_IDLE, owner);
  }

  @OnEvent(GameEventGameLaunch.event)
  private onGameLaunch() {
    this.updateComplete();
  }

  async onExit(): Promise<void> {
    gameManager.gui.init(uiConfigs());
  }
}

export const stateGameIdle: Readonly<GameStateIdle> =
  GameStateIdle.getInstance();
