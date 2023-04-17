// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

contract V1  {
    uint public v;

    function setV(uint v1) external {
        v = v1;
    }
}