import { _decorator } from "cc";
import { LayoutCom } from "../../layout/LayoutCom";
import { registerLayout } from "../../../core/game/GameUI";
const { menu, ccclass } = _decorator;

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
}

registerLayout(Main);
