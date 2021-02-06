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
let Proxy: ContractFactory;

let walletFactory: Contract;
let versionManager: Contract;
let wallet: Contract;
let proxy: Contract;

let owner: SignerWithAddress;
let walletImplementation: SignerWithAddress; // 部屬 WalletFactory 時設定
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

  Proxy = await ethers.getContractFactory(
    "contracts/argent-mock/Proxy.sol:Proxy"
  );

  [
    owner,
    walletImplementation,
    walletOwner,
    ...addrs
  ] = await ethers.getSigners();
});

beforeEach(async function () {
  walletFactory = await WalletFactory.deploy(walletImplementation.address);
  versionManager = await VersionManager.deploy();
});

describe("Create wallet", () => {
  it("should create a wallet at owner address", async () => {
    const tx: ContractTransaction = await walletFactory.createWallet(
      walletOwner.address,
      versionManager.address,
      1
    );
    console.log("walletOwner address", walletOwner.address);

    const txReceipt: ContractReceipt = await tx.wait();

    let walletAddr: string = "";

    // 找出 WalletCreated 事件的參數
    if (txReceipt.events && txReceipt.events[0].args) {
      walletAddr = txReceipt.events[0].args[0];
    }

    // wallet = await ethers.getContractAt(
    //   "contracts/argent-mock/IWallet.sol:IWallet",
    //   walletAddr
    // );

    proxy = Proxy.attach(walletAddr);
    wallet = BaseWallet.attach(proxy.address);

    console.log("wallet address", wallet.address);

    expect(await wallet.owner()).to.equal(walletOwner.address);
  });
});
