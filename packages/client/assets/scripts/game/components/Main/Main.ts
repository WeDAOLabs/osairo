import { Label, _decorator } from "cc";
import { LayoutCom } from "../../layout/LayoutCom";
import { registerLayout } from "../../../core/game/GameUI";
import { mudEngine } from "../../plugins/mud/MudEngine";
import { OnEvent } from "../../../core/event/decorators/OnEventDecorator";
import { GameEventMudComponentUpdated } from "../../events/GameEventMudComponentUpdated";
const { menu, ccclass, property } = _decorator;

/*
 * @author: enixlee
 * @description:
 * @date: 2023/11/15 18:07:34
 */
@ccclass("Main")
@menu("game/components/Layout/Main")
export class Main extends LayoutCom {
  static prefabName(): string {
    return "Main";
  }

  @property(Label)
  private goldCountLabel: Label = null!;

  private async onExploreClicked() {
    await mudEngine.systemCalls.increment();
    console.log("begin seek treasure");
  }

  @OnEvent(GameEventMudComponentUpdated.event)
  private onGoldCountIncreased(name: string, update: any) {
    if (name !== "Counter") {
      return;
    }

    const [nextValue, prevValue] = update.value;
    this.goldCountLabel.string = `gold count: ${nextValue?.value ?? 0}`;
  }
}

registerLayout(Main);
