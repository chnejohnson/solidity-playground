import { expect } from "chai";
import { Contract, ContractFactory } from "ethers";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { getBalance } from "../utils/ether";
import { formatEther } from "@ethersproject/units";

let Withdraw: ContractFactory;

let withdraw: Contract;

let owner: SignerWithAddress;
let addr1: SignerWithAddress;
let addr2: SignerWithAddress;
let addrs: SignerWithAddress[];

before(async () => {
  Withdraw = await ethers.getContractFactory("Withdraw");
  [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
});

beforeEach(async function () {
  withdraw = await Withdraw.deploy();
});

describe("Withdraw", () => {
  it("should deposit 1 ETH into contract", async () => {
    await withdraw.deposit({ value: ethers.utils.parseEther("1.0") });
    expect(await getBalance(withdraw.address)).to.equal(
      ethers.utils.parseEther("1.0")
    );
  });

  it("should withdraw 1 ETH from the contract", async () => {
    await withdraw.deposit({ value: ethers.utils.parseEther("1.0") });

    const before = await getBalance(addr1.address);
    await withdraw.withdraw(addr1.address, ethers.utils.parseEther("1.0"));
    const after = await getBalance(addr1.address);

    expect(after.sub(before)).to.equal(ethers.utils.parseEther("1"));
  });
});
