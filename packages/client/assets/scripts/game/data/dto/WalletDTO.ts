import { BaseDTO } from "../../../core/model/BaseDTO";
import { utils } from "../../plugins/utils";

/**
 * 
            "uuid": "b1b3588e-a2eb-414d-864b-6d785b04abbd",
            "chain_name": "evm_chain",
            "public_address": "0xd9e5bee269EFfD7d3BFA92332813C913E4B9999F"
 */
export class WalletDTO extends BaseDTO {
  uuid: string | null = null;
  chain_name: string = "";
  public_address: string = "";

  public get isEvm(): boolean {
    return this.chain_name === "evm_chain";
  }

  public get address() {
    return this.public_address;
  }

  public get shortAddress(): string {
    if (utils.stringIsEmpty(this.address)) {
      return "";
    }

    const length = this.address.length;
    if (length <= 10) {
      return this.address;
    }
    return `${this.address.substring(0, 6)}...${this.address.substring(
      length - 4,
      length
    )}`;
  }
}
