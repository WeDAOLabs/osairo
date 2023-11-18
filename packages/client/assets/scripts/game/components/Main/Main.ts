import { Label, _decorator } from "cc";
import { LayoutCom } from "../../layout/LayoutCom";
import { registerLayout } from "../../../core/game/GameUI";
import { mudEngine } from "../../mud/MudEngine";
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

  private onGoldCountIncreased(nextValue: any, preValue: any) {}
}

registerLayout(Main);
