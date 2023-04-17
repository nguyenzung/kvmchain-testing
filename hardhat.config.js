/** @type import('hardhat/config').HardhatUserConfig */

require("@nomicfoundation/hardhat-toolbox")
require('dotenv').config()

module.exports = {
  solidity: {
    version: "0.8.7",
    settings: {
      optimizer: {
        enabled: true
      }
     }
  },
  networks: {
    devnet: {
      url: `http://127.0.0.1:8545`,
      accounts: [`0x${process.env.PRIVATE_KEY0}`,`0x${process.env.PRIVATE_KEY1}`, `0x${process.env.PRIVATE_KEY2}`, `0x${process.env.PRIVATE_KEY3}`, `0x${process.env.PRIVATE_KEY4}`]
    },
  },
  etherscan: {
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  }
};
