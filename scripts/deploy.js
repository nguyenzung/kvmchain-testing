const hre = require("hardhat")


async function main() {
    console.log(" Deploy smart contract ")
    signers = await ethers.getSigners();

    console.log(" Signer ", signers.length)

    let V1 = await hre.ethers.getContractFactory("V1");

    let contract = await V1.connect(signers[0]).deploy();
    await contract.deployed();
    
    console.log("Contract deployed to:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });