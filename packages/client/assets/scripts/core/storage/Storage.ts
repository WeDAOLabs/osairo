import { Singleton } from "../game/Singleton";
import { StorageDefault } from "./StorageDefault";
import { StorageDriver } from "./StorageDriver";
import { StorageIndexDB } from "./StorageIndexDB";

export enum StorageDriverType {
  LocalStorage = "LocalStorage",
  IndexDB = "IndexDB",
}

export class Storage extends Singleton {
  private _driver: StorageDriver | null = null;

  public get driver(): StorageDriver {
    return this._driver!;
  }

  public initDriver(
    cacheVersion: string,
    defaultDriver: StorageDriverType = StorageDriverType.LocalStorage
  ) {
    if (this._driver) {
      return;
    }
    switch (defaultDriver) {
      case StorageDriverType.IndexDB:
        this._driver = StorageIndexDB.instance;
        break;
      case StorageDriverType.LocalStorage:
      default:
        this._driver = new StorageDefault();
        break;
    }
    this._driver.cacheVersion = cacheVersion;
    this._driver.init();
  }
}

export const storage: Readonly<Storage> = Storage.getInstance();
