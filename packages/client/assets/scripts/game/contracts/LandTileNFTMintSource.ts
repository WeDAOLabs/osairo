import abi from "./LandTileNFTMintSource.json";
import { Singleton } from "../../core/game/Singleton";
import { ethers, ethersIns } from "../plugins/ethers/Ethers";

export class LandTileNFTMintSourceContract extends Singleton {
  private _contract: any = null;

  private get abi(): any {
    return abi;
  }

  private get address(): string {
    return "0x993e0A85Df7fE97EC83D5676218A2fFd119C0169";
  }

  private async getContract(): Promise<any> {
    if (!this._contract) {
      const contract = new ethers.Contract(this.address, this.abi);
      const signer = await ethersIns.getSigner();
      this._contract = contract.connect(signer);
      this._contract.signer = signer;
      this._contract.provider = ethersIns.provider;
    }
    return this._contract;
  }

  public async mint(): Promise<void> {
    const contract = await this.getContract();
    contract.on("LandTileMinted", async (minter: string, tokenId: number) => {
      console.log("land minted success", minter, tokenId);
    });
    await contract.mint(
      13264668187771770619,
      "0x3619D5Dde38f3C7688EC59db39eFb2e08A7dD23f"
    );
  }
}

export const nftMinterContract: Readonly<LandTileNFTMintSourceContract> =
  LandTileNFTMintSourceContract.getInstance();
