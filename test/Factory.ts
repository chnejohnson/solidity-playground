import { expect } from "chai";
import { Contract, ContractFactory } from "ethers";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";

let LoadFactory: ContractFactory;
let Load: ContractFactory;

let loadFactory: Contract;
let load: Contract;
let implementation: Contract;

let owner: SignerWithAddress;
let addr1: SignerWithAddress;
let addr2: SignerWithAddress;
let addrs: SignerWithAddress[];

before(async () => {
  LoadFactory = await ethers.getContractFactory("LoadFactory");
  Load = await ethers.getContractFactory("Load");
  implementation = await Load.deploy(42);

  [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
});

beforeEach(async function () {
  loadFactory = await LoadFactory.deploy(implementation.address);
});

describe("Factory", () => {
  it("should be usable for contract deployed by factory", async function () {
    const tx = await loadFactory.createLoad();
    const txReceipt = await tx.wait();

    let addr: string = "";

    // 找出 WalletCreated 事件的參數
    if (txReceipt.events && txReceipt.events[0].args) {
      addr = txReceipt.events[0].args[0];
    }

    load = Load.attach(addr);
    await load.setAmount(12);
    expect(await load.getAmount()).to.equal(12);
  });
});
