import { DataModelBase } from "../../core/model/DataModelBase";
import { registerDataModel } from "../../core/model/DataRegister";

/*
 * @author: enixlee
 * @description:
 * @date: 2023/11/22 10:45:05
 */
export class WalletModel extends DataModelBase {}
export const WalletModelData: Readonly<WalletModel> = WalletModel.getInstance();

registerDataModel(WalletModelData);
