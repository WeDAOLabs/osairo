import { GameEventBaseDTO } from "../../core/event/GameEventBaseDTO";

export class GameEventLandNFTMinted extends GameEventBaseDTO {
  public static readonly event: string = "logic.game.event.land_nft_minted";
}
