import { ContractBase } from "./ContractBase";

// 0xF6b9e4d192d7a408C9F3d9d0C99adF86A7094471
export class TokenMaticContract extends ContractBase {
  protected get address(): string {
    return "0xacc9c88798aa7d50a4a10f19485a8165669ddab1";
  }

  protected get abi(): any {
    return [
      "function balanceOf(address owner) view returns (uint256)",
      "function approve(address spender, uint256 amount) returns (bool)",
      "function allowance(address a,address b) view returns (uint256)",
    ];
  }

  public async balanceOf(userAddress: string): Promise<any> {
    const contract = await this.getContract();
    return await contract.balanceOf(userAddress);
  }
}

export const maticContract: Readonly<TokenMaticContract> =
  TokenMaticContract.getInstance();
