import { expect } from "chai";
import { Contract, ContractFactory } from "ethers";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";

let Transfer: ContractFactory;
let ERC20: ContractFactory;
let VersionManager: ContractFactory;
let ModuleRegistry: ContractFactory;

let transfer: Contract;
let erc20: Contract;
let versionManager: Contract;
let moduleRegistry: Contract;

let owner: SignerWithAddress;
let addr1: SignerWithAddress;
let addr2: SignerWithAddress;
let addrs: SignerWithAddress[];

before(async () => {
  // ERC20 和 VersionManager 是早已部屬的合約
  [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
  ERC20 = await ethers.getContractFactory("TestERC20");
  erc20 = await ERC20.deploy(
    [owner.address, addr1.address, addr2.address],
    100,
    0
  );

  // argent
  ModuleRegistry = await ethers.getContractFactory("ModuleRegistry");
  VersionManager = await ethers.getContractFactory("VersionManager");
  moduleRegistry = await ModuleRegistry.deploy();
  versionManager = await VersionManager.deploy(
    moduleRegistry.address,
    ethers.constants.AddressZero,
    ethers.constants.AddressZero,
    ethers.constants.AddressZero,
    ethers.constants.AddressZero
  );
  await versionManager.addVersion([], []);
});

beforeEach(async function () {
  // Transfer 是之後部屬的合約，欲使用既有合約，Transfer 合約需引入欲使用的合約的 interface 或合約本身
  Transfer = await ethers.getContractFactory("Transfer");
  transfer = await Transfer.deploy(versionManager.address);
});

describe("ERC20 Initialization", () => {
  it("Should have balance 100 MAT", async function () {
    expect(await erc20.balanceOf(addr1.address)).to.equal(100);
  });
});

describe("Transfer", () => {
  it("Shoud transfer token to VersonManager", async () => {
    // owner --20--> transfer contract
    await erc20.transfer(transfer.address, 20);
    expect(await erc20.balanceOf(transfer.address)).to.equal(20);
    // transfer contract --20--> versionManager contract
    await transfer.transferToken(erc20.address);
    expect(await erc20.balanceOf(versionManager.address)).to.equal(20);
  });
});
