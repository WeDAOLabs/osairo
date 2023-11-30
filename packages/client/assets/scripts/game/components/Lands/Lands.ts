import { _decorator, math } from "cc";
import { LayoutCom } from "../../layout/LayoutCom";
import { registerLayout } from "../../../core/game/GameUI";
import { LandNFTTile, TileConfig } from "../LandNFTTile/LandNFTTile";
const { menu, ccclass } = _decorator;

const LandMapConfig = {
  size: math.size(1100, 860),
};

interface TileLayout {
  x: number;
  y: number;
}

/*
 * @author: enixlee
 * @description:
 * @date: 2023/11/29 11:25:51
 */
@ccclass("Lands")
@menu("game/components/Layout/Lands")
export class Lands extends LayoutCom {
  static prefabName(): string {
    return "Lands";
  }

  protected async load() {
    await this.addTiles();
  }

  private async addTiles() {
    const tiles: TileLayout[] = this.calculateTileLayout(
      LandMapConfig.size,
      TileConfig.size
    );

    for (let i = 0; i < tiles.length; i++) {
      const pos = tiles[i];
      await this.addTile(pos.x, pos.y, i);
    }
  }

  private async addTile(posX: number, posY: number, index: number) {
    const tile = await LandNFTTile.createAsync();
    if (tile) {
      tile.tip = `${index}`;
      tile.node.position = math.v3(posX, posY);
      this.node.addChild(tile.node);
    }
  }

  private calculateTileLayout(
    mapSize: math.Size,
    tileSize: math.Size
  ): TileLayout[] {
    const tileLayouts: TileLayout[] = [];

    const tilesPerRow = Math.floor(mapSize.height / tileSize.height);
    const tilesPerColumn = Math.floor(mapSize.width / tileSize.width);

    const totalTileWidth = tilesPerRow * tileSize.width;
    const totalTileHeight = tilesPerColumn * tileSize.height;

    const offsetX = (mapSize.width - totalTileWidth) / 2;

    for (let row = 0; row < tilesPerRow; row++) {
      for (let col = 0; col < tilesPerColumn; col++) {
        const x =
          col * tileSize.width +
          tileSize.width / 2 -
          offsetX -
          totalTileWidth / 2;
        // const y =
        //   row * tileSize.height +
        //   tileSize.height / 2 -
        //   (row + 1) * tileSize.height +
        //   (totalTileHeight / 2 - tileSize.height / 2 - row * tileSize.height);
        const y = totalTileHeight / 2 - (row + 1) * tileSize.height;

        tileLayouts.push({ x, y });
      }
    }

    return tileLayouts;
  }
}

registerLayout(Lands);
