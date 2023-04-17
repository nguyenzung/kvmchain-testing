const { expect } = require("chai")
const { ethers } = require("hardhat")

function hexToBytes(hex) {
    let bytes = [];
    for (let i = 0; i < hex.length; i += 2) {
        bytes.push(parseInt(hex.substr(i, 2), 16));
    }
    return bytes;
}

describe("ContractOwnerFeature", function () {
    let contractManager
    let V1, v1
    let V2, v2
    let acc, acc1, acc2, acc3, acc4

    before(async () => {
        contractManager = await ethers.getContractAt("ContractManager", "0x6c65153cB775fcd022d79C49f1374D0Dae73DF64")
        V1 = await ethers.getContractFactory("V1")
        V2 = await ethers.getContractFactory("V2")
        let signers = await ethers.getSigners();
        [acc, acc1, acc2, acc3, acc4] = signers;
        console.log(acc1.address, acc2.address, acc3.address, acc4.address)
    })
    
    beforeEach(async function() {    
        v1 = await V1.connect(acc).deploy()
        await v1.deployed()
        console.log("V1 address: ", v1.address)
    })
    
    describe("GetContractOwner", function () {
        it('correct owner', async () => {
            expect(await contractManager.owner(v1.address)).to.be.equal(acc.address)
            expect(await contractManager.owner(v1.address)).not.be.equal(acc1.address)
        })
    })

    describe('TransferOwnership', () => {
        it('only contract owner can transfer', async () => {
            try {
                await contractManager.connect(acc1).transferOwnership(v1.address, acc2.address)
            } catch (error) {
            }
            let tx = await contractManager.connect(acc).transferOwnership(v1.address, acc1.address)
            await tx.wait()
            expect(await contractManager.owner(v1.address)).to.be.equal(acc1.address)
            expect(await contractManager.owner(v1.address)).not.be.equal(acc.address)
        })
    
        it('post checking after transfering ownership', async () => {
            let tx = await contractManager.connect(acc).transferOwnership(v1.address, acc1.address)
            await tx.wait()
            try {
                await contractManager.connect(acc).transferOwnership(v1.address, acc2.address)
            } catch (error) {
            }
            let tx1 = await contractManager.connect(acc1).transferOwnership(v1.address, acc2.address)
            await tx1.wait()
            expect(await contractManager.owner(v1.address)).to.be.equal(acc2.address)
            expect(await contractManager.owner(v1.address)).not.be.equal(acc1.address)
        })
    })
    
    describe('RenounceOwnership', () => {
        it('only contract owner can renounce ownership', async () => {
            try {
                await contractManager.connect(acc1).renounceOwnership(v1.address)
            } catch (error) {
            }

            let tx = await contractManager.connect(acc).renounceOwnership(v1.address)
            await tx.wait()
            expect(await contractManager.owner(v1.address)).not.be.equal(acc.address)
        })
    
    })

    describe('UpgradeContract', () => {
        it('Test Upgrade Permission', async() => {
            v2 = await V2.connect(acc1).deploy()
            await v2.deployed()
            console.log("Deployed V2", v2.address)
            
            try {
                await contractManager.connect(acc1).upgradeContract(v1.address, v2.address)
            } catch (error) {
            }
            tx = await contractManager.connect(acc).upgradeContract(v1.address, v2.address)
        })

        it('Test Logic after upgrading contract', async() => {
            v2 = await V2.connect(acc1).deploy()
            await v2.deployed()
            console.log("Deployed V2", v2.address)
    
            tx = await contractManager.connect(acc).upgradeContract(v1.address, v2.address)
            await tx.wait()
            tx = await v1.connect(acc).setV(10)
            await tx.wait()
            expect(await v1.v()).to.equal(20)
        })
    
    })

    
});
