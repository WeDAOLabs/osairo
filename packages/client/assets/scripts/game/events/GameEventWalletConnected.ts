import { GameEventBaseDTO } from "../../core/event/GameEventBaseDTO";

export class GameEventWalletConnected extends GameEventBaseDTO {
  public static readonly event: string = "logic.game.event.wallet_connected";
}
