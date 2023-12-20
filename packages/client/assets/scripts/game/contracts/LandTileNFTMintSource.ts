import abi from "./LandTileNFTMintSource.json";
import { ContractBase } from "./ContractBase";
import { ethers } from "../plugins/ethers/Ethers";

export class LandTileNFTMintSourceContract extends ContractBase {
  protected get abi(): any {
    return abi;
  }

  protected get address(): string {
    return "0xA1ffAeA7129a817D38AcA5b0a1B76dBE37Ee5360";
  }

  public async mint(): Promise<void> {
    const contract = await this.getContract();
    contract.on("LandTileMinted", async (minter: string, tokenId: number) => {
      console.log("land minted success", minter, tokenId);
    });

    await contract.mint(
      "12532609583862916517",
      "0x3619D5Dde38f3C7688EC59db39eFb2e08A7dD23f"
    );
  }
}

export const nftMinterContract: Readonly<LandTileNFTMintSourceContract> =
  LandTileNFTMintSourceContract.getInstance();
