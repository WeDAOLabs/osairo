import { GameEventBaseDTO } from "../../core/event/GameEventBaseDTO";

export class GameEventWalletDisconnected extends GameEventBaseDTO {
  public static readonly event: string = "logic.game.event.wallet_disconnected";
}
