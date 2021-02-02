const { expect } = require("chai");

let greeter;
let owner;
let addr1;
let addr2;
let addrs;

// `beforeEach` will run before each `it(...)`
beforeEach(async function () {
  const Greeter = await ethers.getContractFactory("Greeter");
  greeter = await Greeter.deploy("Hello, world!");
  await greeter.deployed();

  [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
});

describe("Deployment", () => {
  it("Should return initial setting of greeter", async function () {
    expect(await greeter.greet()).to.equal("Hello, world!");
    expect(await greeter.signer.address).to.equal(owner.address);
  });
});

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async () => {
    await greeter.setGreeting("Hola, mundo!");
    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
