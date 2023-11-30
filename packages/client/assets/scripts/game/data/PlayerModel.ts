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
export class PlayerModel extends DataModelBase {
  private _currentPlayer: PlayerDTO | null = null;

  public get currentPlayer(): PlayerDTO {
    return this._currentPlayer!;
  }

  public get isConnected() {
    return this._currentPlayer !== null;
  }

  @OnEvent(GameEventLoginComplete.event)
  public setPlayer(player: PlayerDTO) {
    this._currentPlayer = player;
  }
}
export const playerModel: Readonly<PlayerModel> = PlayerModel.getInstance();

registerDataModel(playerModel);
