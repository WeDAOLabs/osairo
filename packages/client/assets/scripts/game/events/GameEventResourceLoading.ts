import { GameEventBaseDTO } from "../../core/event/GameEventBaseDTO";

export class GameEventResourceLoading extends GameEventBaseDTO {
  public static readonly event: string = "logic.game.event.resource_loading";
}
