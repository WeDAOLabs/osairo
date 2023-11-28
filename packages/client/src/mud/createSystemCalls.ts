/*
 * Create the system calls that the client can use to ask
 * for changes in the World state (using the System contracts).
 */

import { getComponentValue } from "@latticexyz/recs";
import { ClientComponents } from "./createClientComponents";
import { SetupNetworkResult } from "./setupNetwork";
import { singletonEntity } from "@latticexyz/store-sync/recs";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
  /*
   * The parameter list informs TypeScript that:
   *
   * - The first parameter is expected to be a
   *   SetupNetworkResult, as defined in setupNetwork.ts
   *
   *   Out of this parameter, we only care about two fields:
   *   - worldContract (which comes from getContract, see
   *     https://github.com/latticexyz/mud/blob/main/templates/vanilla/packages/client/src/mud/setupNetwork.ts#L63-L69).
   *
   *   - waitForTransaction (which comes from syncToRecs, see
   *     https://github.com/latticexyz/mud/blob/main/templates/vanilla/packages/client/src/mud/setupNetwork.ts#L77-L83).
   *
   * - From the second parameter, which is a ClientComponent,
   *   we only care about Counter. This parameter comes to use
   *   through createClientComponents.ts, but it originates in
   *   syncToRecs
   *   (https://github.com/latticexyz/mud/blob/main/templates/vanilla/packages/client/src/mud/setupNetwork.ts#L77-L83).
   */
  setupNetworkResult: SetupNetworkResult,
  clientComponents: ClientComponents
) {
  const { worldContract, waitForTransaction } = setupNetworkResult;

  let _worldContract = worldContract;

  const setWorld = (world: any) => {
    if (world) {
      _worldContract = world;
    }
  };

  const _getCaller = () => {
    return _worldContract?.write ? _worldContract.write : _worldContract;
  };

  const waitForTransactionComplete = async (tx: any) => {
    const hash = typeof tx === "string" ? tx : tx.hash;
    await waitForTransaction(hash);
  };

  const increment = async () => {
    /*
     * Because IncrementSystem
     * (https://mud.dev/templates/typescript/contracts#incrementsystemsol)
     * is in the root namespace, `.increment` can be called directly
     * on the World contract.
     */
    const tx = await _getCaller().increment();
    await waitForTransactionComplete(tx);
    return getComponentValue(clientComponents.Counter, singletonEntity);
  };

  // TODO systemCalls

  return {
    setWorld,
    waitForTransactionComplete,
    getComponentValue,
    singletonEntity,
    increment,
  };
}
