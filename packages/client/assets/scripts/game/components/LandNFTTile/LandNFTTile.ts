import {_decorator, instantiate, Label, Mask, math, Node, Prefab, Sprite, UITransform, Vec3} from "cc";
import {GameObject} from "../../../core/game/GameObject";
import {PrefabsAsync} from "../../enum/Prefabs";
import {ViewUtil} from "../../../core/utils/ViewUtil";
import {LandTileStatus, LandTileType} from "../../const/Enums";
import ImageUtil from "../../../core/utils/ImageUtil";
import {Textures} from "../../enum/Textures";

import {LandMenu} from "db://assets/scripts/game/components/LandMenu/LandMenu";
import {landsModel} from "db://assets/scripts/game/data/LandsModel";

const {menu, ccclass, integer, property} = _decorator;

export const TileConfig = {
    size: math.size(100, 80),
};

/*
 * @author: enixlee
 * @description:
 * @date: 2023/11/29 10:34:44
 */
@ccclass("LandNFTTile")
@menu("game/components/LandNFTTile")
export class LandNFTTile extends GameObject {
    static prefabName(): string {
        return "LandNFTTile";
    }

    static async createAsync(): Promise<LandNFTTile | null> {
        const node = await ViewUtil.createPrefabAsync(PrefabsAsync.LandNFTTile);
        if (!node) return null;
        return node.getComponent(LandNFTTile)!;
    }

    @integer
    private borderWidth: number = 1;

    @property(Sprite)
    private bgSprite: Sprite = null!;

    @property(Mask)
    private borderMask: Mask = null!;

    @property(Label)
    private tipLabel: Label = null!;

    @property(Sprite)
    private tileSp: Sprite = null!;

    @property(Prefab)
    private landMenuPrefab: Prefab = null!;

    private _coordinate: Vec3 = new Vec3(0, 0);

    private _status: LandTileStatus = LandTileStatus.Empty;

    private _tileType: LandTileType = LandTileType.Oasis;

    public set coordinate(coordinate: Vec3) {
        this._coordinate = coordinate;
    }

    public get coordinate(): Vec3 {
        return this._coordinate;
    }

    public set status(status: LandTileStatus) {
        this._status = status;
        this.tileSp.node.active = !this.isEmpty;

        this.tipLabel.string = this.isEmpty
            ? `(${this.coordinate.x},${this.coordinate.y})`
            : "";
    }

    public get status(): LandTileStatus {
        return this._status;
    }

    public set tileType(type: LandTileType) {
        this._tileType = type;
        this.setTileTexture();
    }

    public get tileType(): LandTileType {
        return this._tileType;
    }

    public get isEmpty() {
        return this._status === LandTileStatus.Empty;
    }

    public get isLanding() {
        return (
            this._status === LandTileStatus.Landing ||
            this._status === LandTileStatus.Mining
        );
    }

    load() {
        this.buildTile();
    }

    private buildTile() {
        const size = math.size(TileConfig.size.width, TileConfig.size.height);
        const innerSize = math.size(
            size.width - this.borderWidth * 2,
            size.height - this.borderWidth * 2
        );
        const transformNode: UITransform = this.getComponent(UITransform)!;
        transformNode.contentSize = size;

        const bgTransform: UITransform = this.bgSprite.getComponent(UITransform)!;
        bgTransform.contentSize = innerSize;

        const maskTransform: UITransform =
            this.borderMask.node.getComponent(UITransform)!;
        maskTransform.contentSize = innerSize;

        const maskBg: Node = this.borderMask.node.getChildByName("bg")!;
        const transformMaskBg: UITransform = maskBg.getComponent(UITransform)!;
        transformMaskBg.contentSize = size;

        const texSpTransform: UITransform =
            this.tileSp.node.getComponent(UITransform)!;
        texSpTransform.contentSize = size;
    }

    private setTileTexture() {
        ImageUtil.setTexture(
            this.tileSp,
            Textures.UI_TILE,
            `osairo_land_tile_${this._tileType}`
        );
    }

    // TODO
    private onClick() {
        if (this.status == LandTileStatus.Empty) {
            this.node.parent?.getChildByName("land-menu")?.destroy();
            const landMenuNode = instantiate(this.landMenuPrefab); // 实例化预制体
            const landMenu = landMenuNode.getComponent(LandMenu);
            landMenu?.setLandNFTTile(this);
            landMenuNode.parent = this.node.parent;
            landMenuNode.setPosition(this.node.position.x, this.node.position.y + 100);
        } else {
            console.log("移除NFT")
            this.status = LandTileStatus.Empty;
            this.tileType = LandTileType.Oasis;
        }
    }
}
