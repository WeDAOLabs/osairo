import { _decorator } from "cc";
import { PopUpLayout } from "../PopUpLayout";
import { BounceIn } from "../LayoutDecorators";
const { menu, ccclass } = _decorator;

@ccclass("PopUpBounceIn")
@menu("game/components/entity/PopUpBounceIn")
@BounceIn()
export class PopUpBounceIn extends PopUpLayout {}
