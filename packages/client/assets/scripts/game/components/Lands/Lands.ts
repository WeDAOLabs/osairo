import { _decorator, math } from "cc";
import { LayoutCom } from "../../layout/LayoutCom";
import { registerLayout } from "../../../core/game/GameUI";
import { LandNFTTile, TileConfig } from "../LandNFTTile/LandNFTTile";
import { LandTileStatus } from "../../const/Enums";
const { menu, ccclass } = _decorator;

const LandMapConfig = {
  size: math.size(1100, 860),
};

interface TileLayout {
  pos: {
    x: number;
    y: number;
  };
  coordinate: {
    x: number;
    y: number;
  };
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
      await this.addTile(tiles[i]);
    }
  }

  private async addTile(layout: TileLayout) {
    const tile = await LandNFTTile.createAsync();
    if (tile) {
      tile.coordinate = math.v3(layout.coordinate.x, layout.coordinate.y);
      tile.node.position = math.v3(layout.pos.x, layout.pos.y);
      tile.status = LandTileStatus.Empty;
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

    const totalTileWidth = tilesPerColumn * tileSize.width;
    const totalTileHeight = tilesPerRow * tileSize.height;

    const offsetX = (mapSize.width - totalTileWidth) / 2;

    for (let row = 0; row < tilesPerRow; row++) {
      for (let col = 0; col < tilesPerColumn; col++) {
        const x =
          col * tileSize.width +
          tileSize.width / 2 -
          offsetX -
          totalTileWidth / 2;

        const y = totalTileHeight / 2 - (row + 1 / 2) * tileSize.height;

        tileLayouts.push({
          pos: { x, y },
          coordinate: {
            x: row,
            y: col,
          },
        });
      }
    }

    return tileLayouts;
  }
}

registerLayout(Lands);
