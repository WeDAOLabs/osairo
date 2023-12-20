import { ContractBase } from "./ContractBase";
import { ethers } from "../plugins/ethers/Ethers";

export abstract class Erc20TokenBalance extends ContractBase {
  protected abstract get address(): string;

  protected get abi(): any {
    return [
      "function balanceOf(address owner) view returns (uint256)",
      "function approve(address spender, uint256 amount) returns (bool)",
      "function allowance(address a,address b) view returns (uint256)",
    ];
  }

  public abstract get tokenName(): string;

  public async balanceOf(userAddress: string): Promise<any> {
    const contract = await this.getContract();
    try {
      const balance = await contract.balanceOf(userAddress);
      return ethers.formatEther(balance);
    } catch (e) {
      throw new Error(`get ${this.tokenName} token balance failed`);
    }
  }
}
