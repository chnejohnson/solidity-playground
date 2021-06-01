import { expect } from "chai";
import { Contract, ContractFactory } from "ethers";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { formatEther } from "@ethersproject/units";

let A: ContractFactory;
let B: ContractFactory;

let a: Contract;
let b: Contract;

let owner: SignerWithAddress;
let addr1: SignerWithAddress;
let addr2: SignerWithAddress;
let addrs: SignerWithAddress[];

before(async () => {
  A = await ethers.getContractFactory("contracts/Delegatecall.sol:A");
  B = await ethers.getContractFactory("contracts/Delegatecall.sol:B");

  [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
});

beforeEach(async function () {
  a = await A.deploy();
  b = await B.deploy();
});

describe("Delegatecall", () => {
  it("should delegatecall", async () => {
    console.log("contract A address: ", a.address);
    console.log("contract B address: ", b.address);
    console.log("owner address: ", owner.address);

    await a.setVars(b.address, 42, { value: ethers.utils.parseEther("10.0") });
    console.log("A");
    console.log((await a.num()).toNumber());
    console.log(await a.sender());
    console.log(formatEther(await a.value()));
    console.log();
    console.log("B");
    console.log((await b.num()).toNumber());
    console.log(await b.sender());
    console.log(formatEther(await b.value()));

    expect(await a.sender()).to.equal(owner.address);
    // msg.value 是指 msg.sender 傳入合約的 ETH 數量
    expect(await a.value()).to.equal(ethers.utils.parseEther("10.0"));
  });
});
