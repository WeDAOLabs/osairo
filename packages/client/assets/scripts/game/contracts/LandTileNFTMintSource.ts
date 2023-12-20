import abi from "./LandTileNFTMintSource.json";
import { maticContract } from "./TokenMaticContract";
import { ContractBase } from "./ContractBase";
import { ethers } from "../plugins/ethers/Ethers";

export class LandTileNFTMintSourceContract extends ContractBase {
  protected get abi(): any {
    return abi;
  }

  protected get address(): string {
    return "0x993e0A85Df7fE97EC83D5676218A2fFd119C0169";
  }

  public async mint(): Promise<void> {
    const contract = await this.getContract();
    contract.on("LandTileMinted", async (minter: string, tokenId: number) => {
      console.log("land minted success", minter, tokenId);
    });

    const balance = await maticContract.balanceOf(
      "0xF6b9e4d192d7a408C9F3d9d0C99adF86A7094471"
    );
    console.log("balance", balance);

    await contract.mint(
      ethers.parseUnits("13264668187771770619", 0),
      "0x3619D5Dde38f3C7688EC59db39eFb2e08A7dD23f"
    );
  }
}

export const nftMinterContract: Readonly<LandTileNFTMintSourceContract> =
  LandTileNFTMintSourceContract.getInstance();
