import { gameManager } from "../manager/GameManager";
import { StorageDriver } from "./StorageDriver";

export class StorageIndexDB extends StorageDriver {
  private static _instance: StorageIndexDB;
  static get instance(): StorageIndexDB {
    if (!StorageIndexDB._instance) {
      StorageIndexDB._instance = new StorageIndexDB();
    }
    return StorageIndexDB._instance;
  }

  private db: IDBDatabase = null!;
  private get dataStoreName(): string {
    return this.storageUniqueKey;
  }

  private get dbName(): string {
    return `WeDAOLabGame${gameManager.gameId}`;
  }

  public async connect(dbName: string) {
    if (this.db) {
      return Promise.resolve(this.db);
    }

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName, 1);

      request.onsuccess = (event: any) => {
        this.db = event.target.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event: any) => {
        const db = event.target.result;
        db.createObjectStore(`${this.dataStoreName}`, {
          keyPath: "id",
        });
      };

      request.onerror = (event) => reject(event);
    });
  }

  public async setItem<T>(key: string, value: any): Promise<T> {
    if (!this.db) await this.connect(this.dbName);

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(
        [this.dataStoreName],
        "readwrite"
      );
      const store = transaction.objectStore(this.dataStoreName);

      const cacheValue = {
        id: key,
        value: value,
      };

      const request = store.put(cacheValue);
      request.onsuccess = (event: any) => resolve(event);

      request.onerror = (event) => reject(event);
    });
  }

  public async getItem<T>(key: string): Promise<T> {
    if (!this.db) await this.connect(this.dbName);

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(
        [this.dataStoreName],
        "readwrite"
      );
      const store = transaction.objectStore(this.dataStoreName);
      const getRequest = store.get(key);
      getRequest.onsuccess = (event: any) => {
        resolve(event.target?.result?.value as T);
      };

      getRequest.onerror = (event) => reject(event);
    });
  }

  public async setItemWithExpiry<T>(
    key: string,
    value: any,
    expiry = 60 * 60
  ): Promise<T> {
    if (!this.db) await this.connect(this.dbName);

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(
        [this.dataStoreName],
        "readwrite"
      );
      const store = transaction.objectStore(this.dataStoreName);

      const now = new Date();
      const expiryDate = new Date(now.getTime() + expiry * 1000);

      const cacheValue = {
        id: key,
        value: value,
        expiry: expiryDate.getTime(),
      };

      const request = store.put(cacheValue);
      request.onsuccess = (event: any) => resolve(event);

      request.onerror = (event) => reject(event);
    });
  }

  public async getItemWithExpiry<T>(key: string): Promise<T> {
    if (!this.db) await this.connect(this.dbName);

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(
        [this.dataStoreName],
        "readwrite"
      );
      const store = transaction.objectStore(this.dataStoreName);
      const getRequest = store.get(key);

      getRequest.onsuccess = (event: any) => {
        const result = event.target.result;
        const now = new Date();
        if (result && now.getTime() < result.expiry) {
          resolve(result.value as T);
        } else {
          resolve(null!);
        }
      };

      getRequest.onerror = (event) => reject(event);
    });
  }

  public async removeItem(key: string) {
    if (!this.db) await this.connect(this.dbName);

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(
        [this.dataStoreName],
        "readwrite"
      );
      const store = transaction.objectStore(this.dataStoreName);

      const deleteRequest = store.delete(key);
      deleteRequest.onsuccess = (event: any) => resolve(event);

      deleteRequest.onerror = (event) => reject(event);
    });
  }
}
