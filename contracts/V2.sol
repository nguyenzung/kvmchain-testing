// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

contract V2  {
    uint public v;

    function setV(uint v2) external {
        v = v2 + 10;
    }
}