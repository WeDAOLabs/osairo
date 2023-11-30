import { DataModelBase } from "../../core/model/DataModelBase";
import { registerDataModel } from "../../core/model/DataRegister";
import { EncryptUtil } from "../../core/utils/EncryptUtil";
import { StringUtil } from "../../core/utils/StringUtil";

interface IAccountCache {
  address: string;
  secret: string;
}

/*
 * @author: enixlee
 * @description:
 * @date: 2023/11/22 10:45:05
 */
export class WalletModel extends DataModelBase {
  protected get dataCacheKey(): string {
    return "DM:WalletModel";
  }

  protected get defaultData(): IAccountCache {
    return {
      address: "",
      secret: "",
    };
  }

  public get secret(): string | null {
    return StringUtil.isEmpty(this.data.secret) ||
      StringUtil.isEmpty(this.data.address)
      ? null
      : EncryptUtil.decryptWithKey(this.data.secret, this.data.address);
  }

  public get address(): string | null {
    return StringUtil.isEmpty(this.data.address) ? null : this.data.address;
  }

  public async buildAccount() {}
}
export const walletModel: Readonly<WalletModel> = WalletModel.getInstance();

registerDataModel(walletModel);
