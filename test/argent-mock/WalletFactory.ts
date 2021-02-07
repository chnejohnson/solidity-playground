import { expect } from "chai";
import {
  Contract,
  ContractFactory,
  ContractReceipt,
  ContractTransaction,
} from "ethers";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";

let WalletFactory: ContractFactory;
let VersionManager: ContractFactory;
let BaseWallet: ContractFactory;

let walletFactory: Contract;
let versionManager: Contract;
let wallet: Contract;
let implementation: Contract;

let owner: SignerWithAddress;
let addr1: SignerWithAddress; // 部屬 WalletFactory 時設定
let walletOwner: SignerWithAddress; // createWallet 時的 owner 參數
let addrs: SignerWithAddress[];

before(async () => {
  WalletFactory = await ethers.getContractFactory("WalletFactory");
  VersionManager = await ethers.getContractFactory(
    "contracts/argent-mock/VersionManager.sol:VersionManager"
  );

  BaseWallet = await ethers.getContractFactory(
    "contracts/argent-mock/BaseWallet.sol:BaseWallet"
  );
  implementation = await BaseWallet.deploy();

  [owner, addr1, walletOwner, ...addrs] = await ethers.getSigners();
});

beforeEach(async function () {
  walletFactory = await WalletFactory.deploy(implementation.address);
  versionManager = await VersionManager.deploy();
});

describe("Create wallet", () => {
  beforeEach(async () => {
    const tx: ContractTransaction = await walletFactory.createWallet(
      walletOwner.address,
      versionManager.address,
      1
    );

    // 取得 baseWallet 地址
    const txReceipt: ContractReceipt = await tx.wait();
    let walletAddr: string = "";
    if (txReceipt.events && txReceipt.events[0].args) {
      walletAddr = txReceipt.events[0].args[0];
    }

    wallet = BaseWallet.attach(walletAddr);
  });

  it("should create a wallet at owner address", async () => {
    expect(await wallet.owner()).to.equal(walletOwner.address);
  });

  it("should be version 1 of the wallet", async () => {
    expect(await versionManager.walletVersions(wallet.address)).to.equal(1);
  });
});
