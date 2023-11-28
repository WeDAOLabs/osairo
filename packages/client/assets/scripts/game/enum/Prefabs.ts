import { registerMediaResources } from "../../core/loader/Resources";

export enum PrefabsAsync {
  TitleBar = "common/prefab/titlebar",
}

export enum Prefabs {}
registerMediaResources(Prefabs);
