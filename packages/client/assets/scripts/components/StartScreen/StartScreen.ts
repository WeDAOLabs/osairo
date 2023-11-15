import { _decorator } from "cc";
import { GameObject } from "../../core/game/GameObject";
import { eventBus } from "../../core/event/EventBus";
import { GameEventGameLaunch } from "../../core/game/events/GameEventGameLaunch";
const { menu, ccclass } = _decorator;

@ccclass("StartScreen")
@menu("game/logic/components/StartScreen")
export class StartScreen extends GameObject {
  protected load() {
    this.delayStartUp();
  }

  private delayStartUp() {
    this.scheduleOnce(
      () => eventBus.emit(GameEventGameLaunch.event, this.node),
      1.5
    );
  }
}
