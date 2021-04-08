import { expect } from "chai";
import { Contract, ContractFactory } from "ethers";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";

let RelayerManager: ContractFactory;

let relayerManager: Contract;

let owner: SignerWithAddress;
let addr1: SignerWithAddress;
let addr2: SignerWithAddress;
let addrs: SignerWithAddress[];

before(async () => {
  RelayerManager = await ethers.getContractFactory("RelayerManager");
  [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
});

beforeEach(async function () {
  relayerManager = await RelayerManager.deploy();
});

describe("RelayerManager", () => {
  it("should test", async () => {});
});
