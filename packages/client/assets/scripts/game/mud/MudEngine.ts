export class MudEngine {
  public static getInstance(): any {
    // @ts-ignore
    return globalThis.mudEngine;
  }
}
