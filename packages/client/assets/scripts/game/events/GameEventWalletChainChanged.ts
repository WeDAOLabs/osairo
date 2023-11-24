import { GameEventBaseDTO } from "../../core/event/GameEventBaseDTO";

export class GameEventWalletChainChanged extends GameEventBaseDTO {
  public static readonly event: string =
    "logic.game.event.wallet_chain_changed";
}
