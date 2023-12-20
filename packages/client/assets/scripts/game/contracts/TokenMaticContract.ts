import { Erc20TokenBalance } from "./Erc20TokenContractBase";

// test owner address: 0xF6b9e4d192d7a408C9F3d9d0C99adF86A7094471
export class TokenMaticContract extends Erc20TokenBalance {
  protected get address(): string {
    return "0x0000000000000000000000000000000000001010";
  }

  public get tokenName(): string {
    return "Matic";
  }
}

export const maticContract: Readonly<TokenMaticContract> =
  TokenMaticContract.getInstance();
