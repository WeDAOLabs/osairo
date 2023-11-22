import { GameEventBaseDTO } from "../../core/event/GameEventBaseDTO";

export class GameEventLoginComplete extends GameEventBaseDTO {
  public static readonly event: string = "logic.game.event.login_complete";
}
