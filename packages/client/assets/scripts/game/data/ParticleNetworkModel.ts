import { DataModelBase } from "../../core/model/DataModelBase";
import { registerDataModel } from "../../core/model/DataRegister";

/*
 * @author: enixlee
 * @description:
 * @date: 2023/11/21 17:02:36
 */
export class ParticleNetworkModel extends DataModelBase {
  private get particleEngine(): any {
    //@ts-ignore
    return globalThis.particleEngine;
  }

  public get particle(): any {
    return this.particleEngine.service;
  }

  public get supportChains(): any[] {
    return this.particleEngine.chains;
  }

  public get LoginType(): any {
    return this.particleEngine.SocialLoginType;
  }
}
export const particleNetworkModelData: Readonly<ParticleNetworkModel> =
  ParticleNetworkModel.getInstance();

registerDataModel(particleNetworkModelData);
