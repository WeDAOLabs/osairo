import { GameEventBaseDTO } from "../../core/event/GameEventBaseDTO";

export class GameEventMudComponentUpdated extends GameEventBaseDTO {
  public static readonly event: string =
    "logic.game.event.mud.component.updated";
}
