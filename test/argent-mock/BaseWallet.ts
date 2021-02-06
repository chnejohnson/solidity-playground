import { expect } from "chai";
import { Contract, ContractFactory } from "ethers";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";

let BaseWallet: ContractFactory;
let baseWallet: Contract;

let owner: SignerWithAddress;
let walletOwner: SignerWithAddress;
let module1: SignerWithAddress;
let module2: SignerWithAddress;
let addrs: SignerWithAddress[];

before(async () => {
  BaseWallet = await ethers.getContractFactory(
    "contracts/argent-mock/BaseWallet.sol:BaseWallet"
  );

  [owner, walletOwner, module1, module2, ...addrs] = await ethers.getSigners();
});

beforeEach(async function () {
  baseWallet = await BaseWallet.deploy();
});

describe("BaseWallet", () => {
  it("should init the owner and modules", async function () {
    await baseWallet.init(walletOwner.address, [
      module1.address,
      module2.address,
    ]);
    expect(await baseWallet.owner()).to.equal(walletOwner.address);
    expect(await baseWallet.modules()).to.equal(2);

    // using IWallet interface
    const wallet = await ethers.getContractAt(
      "contracts/argent-mock/IWallet.sol:IWallet",
      baseWallet.address
    );
    expect(await wallet.owner()).to.equal(walletOwner.address);
  });

  it("should not init same module", async () => {
    await expect(
      baseWallet.init(walletOwner.address, [module1.address, module1.address])
    ).to.be.revertedWith("BW: module is already added");
  });
});
