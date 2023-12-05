import {_decorator, Component, Node} from 'cc';
import {landsModel} from "../../data/LandsModel";
import {Toast} from "../Toast/Toast";
import {LandTileStatus} from "../../../game/const/Enums";
import {LandNFTTile} from "../../../game/components/LandNFTTile/LandNFTTile";

const {menu, ccclass, property} = _decorator;

@ccclass("LandMenu")
@menu("game/components/LandMenu")
export class LandMenu extends Component {

    private landNFTTile: LandNFTTile = null!;

    setLandNFTTile(landNFTTile: LandNFTTile) {
        this.landNFTTile = landNFTTile;
    }

    onCloseButtonClick() {
        this.node.destroy();
    }

    onPlaceLandButtonClick() {
        if (this.landNFTTile) {
            const landNft = landsModel.landing();
            if (landNft === null) {
                Toast.showTip("There is none Land NFT");
                return;
            }

            this.landNFTTile.tileType = landNft;
            this.landNFTTile.status = LandTileStatus.Landing;

            Toast.showTip("Land Complete!");
        }

        this.node.destroy();
    }

    onViewButtonClick() {
        Toast.showTip("Coming soon!");
    }
}
