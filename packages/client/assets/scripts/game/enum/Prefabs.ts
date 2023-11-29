import { registerMediaResources } from "../../core/loader/Resources";

export enum PrefabsAsync {
  TitleBar = "common/prefab/titlebar",
  LandNFTMinter = "common/prefab/landnftminter",
  LandNFTTile = "common/prefab/landnfttile",
}

export enum Prefabs {}
registerMediaResources(Prefabs);
