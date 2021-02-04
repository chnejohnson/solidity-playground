const { expect } = require("chai");

let Greeter;
let greeter;
let GreeterV2;
let greeterV2;

beforeEach(async function () {
  Greeter = await ethers.getContractFactory("Greeter");
  greeter = await upgrades.deployProxy(Greeter, ["version 1"], {
    initializer: "setGreeting",
  });
  GreeterV2 = await ethers.getContractFactory("GreeterV2");
});

describe("Version 1", () => {
  it("Should have state version 1", async function () {
    expect(await greeter.greet()).to.equal("version 1");
  });
});

describe("Upgradeable", function () {
  beforeEach(async () => {
    greeterV2 = await upgrades.upgradeProxy(greeter.address, GreeterV2);
  });
  it("Should remain storage of version 1", async function () {
    // upgrade to version 2

    expect(await greeterV2.greet()).to.equal("version 1");
  });

  it("Should have new function - getVersion", async () => {
    expect(await greeterV2.getVersion()).to.equal("version 2");
  });
});
