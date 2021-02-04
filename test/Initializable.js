const { expect } = require("chai");

let myContract;
let owner;
let addr1;
let addr2;
let addrs;

// `beforeEach` will run before each `it(...)`
beforeEach(async function () {
  const MyContract = await ethers.getContractFactory("MyContract");
  myContract = await MyContract.deploy();
  await myContract.deployed();

  [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
});

describe("Initialization", () => {
  it("Should be initialized only once", async () => {
    const x = 42;
    await myContract.initialize(x);
    expect(await myContract.x()).to.equal(42);
    await expect(myContract.initialize(45)).to.be.reverted;
  });
});
