// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

import { System } from "@latticexyz/world/src/System.sol";

contract LandNFTSystem is System {
  /**
   * generate a tile nft
   */
  function mint() public returns (uint32) {
    return 1;
  }

  /**
   * place tile on the map
   */
  function place(uint256 tokenId) public {

  }

  /**
   * remove tile from map
   */
  function remove(uint256 tokenId) public {

  }
}
