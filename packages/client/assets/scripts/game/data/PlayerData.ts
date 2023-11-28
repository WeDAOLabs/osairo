import { eventBus } from "../../core/event/EventBus";
import { OnEvent } from "../../core/event/decorators/OnEventDecorator";
import { DataModelBase } from "../../core/model/DataModelBase";
import { registerDataModel } from "../../core/model/DataRegister";
import { GameEventLoginComplete } from "../events/GameEventLoginComplete";
import { PlayerDTO } from "./dto/PlayerDTO";

/*
 * @author: enixlee
 * @description:
 * @date: 2023/11/23 11:54:36
 */
export class PlayerData extends DataModelBase {
  private _currentPlayer: PlayerDTO | null = null;

  public get currentPlayer(): PlayerDTO {
    return this._currentPlayer!;
  }

  @OnEvent(GameEventLoginComplete.event)
  public setPlayer(player: PlayerDTO) {
    this._currentPlayer = player;
    console.log(player);
  }
}
export const playerData: Readonly<PlayerData> = PlayerData.getInstance();

registerDataModel(playerData);
