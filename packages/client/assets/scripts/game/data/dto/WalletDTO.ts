import { BaseDTO } from "../../../core/model/BaseDTO";

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
}
