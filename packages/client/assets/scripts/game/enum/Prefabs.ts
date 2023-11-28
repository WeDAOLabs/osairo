import { registerMediaResources } from "../../core/loader/Resources";

export enum PrefabsAsync {
  TitleBar = "common/prefab/titlebar",
  LandNFTMinter = "common/prefab/landnftminter",
}

export enum Prefabs {}
registerMediaResources(Prefabs);
