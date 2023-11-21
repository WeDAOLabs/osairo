import { DataModelBase } from "../../core/model/DataModelBase";
import { registerDataModel } from "../../core/model/DataRegister";
import { mudEngine } from "../mud/MudEngine";

/*
 * @author: enixlee
 * @description:
 * @date: 2023/11/21 17:02:36
 */
export class ParticleNetworkModel extends DataModelBase {
  public get particle(): any {
    return mudEngine.mud.particleConfig.service;
  }

  public get supportChains(): any[] {
    return mudEngine.mud.particleConfig.chains;
  }

  public get LoginType(): any {
    return mudEngine.mud.particleConfig.SocialLoginType;
  }
}
export const particleNetworkModelData: Readonly<ParticleNetworkModel> =
  ParticleNetworkModel.getInstance();

registerDataModel(particleNetworkModelData);
