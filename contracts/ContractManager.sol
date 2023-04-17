// SPDX-License-Identifier: MIT

pragma solidity 0.8.7;

interface ContractManager {
    function owner(address contractAddress) external view returns(address);
    function renounceOwnership(address contractAddress) external;
    function transferOwnership(address contractAddress, address newOwner) external;
    function upgradeContract(address proxyContract, address bytecodeContract) external;
}
