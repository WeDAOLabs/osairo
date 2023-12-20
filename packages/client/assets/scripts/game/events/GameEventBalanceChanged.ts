import { GameEventBaseDTO } from "../../core/event/GameEventBaseDTO";

export class GameEventBalanceChanged extends GameEventBaseDTO {
  public static readonly event: string = "logic.game.event.balance_changed";
}
