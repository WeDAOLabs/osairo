import { IDataModel } from "./IDataModel";

const DataCache: IDataModel[] = [];

export const registerDataModel = (dataModel: IDataModel) => {
  DataCache.push(dataModel);
};

export const dataModels = DataCache;
