import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract, ContractFactory } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { getBalance } from "../../utils/ether";

// 本測試主要用到這四份合約
let Proxy: ContractFactory;
let BaseWallet: ContractFactory;
let VersionManager: ContractFactory;
let ModuleRegistry: ContractFactory;

let versionManager: Contract;
let baseWallet: Contract;
let proxy: Contract;
let wallet: Contract;
let moduleRegistry: Contract;
let module1: Contract;
let module2: Contract;
let module3: Contract;

let owner: SignerWithAddress;
let addr1: SignerWithAddress;
let addr2: SignerWithAddress;
let addrs: SignerWithAddress[];

// 部屬 VersionManager 的函式，作為測試用 module
async function deployTestModule(): Promise<Contract> {
  versionManager = await VersionManager.deploy(
    moduleRegistry.address,
    ethers.constants.AddressZero,
    ethers.constants.AddressZero,
    ethers.constants.AddressZero,
    ethers.constants.AddressZero
  );

  await versionManager.addVersion([], []);
  return versionManager;
}

before(async () => {
  ModuleRegistry = await ethers.getContractFactory("ModuleRegistry");
  BaseWallet = await ethers.getContractFactory("BaseWallet");
  VersionManager = await ethers.getContractFactory("VersionManager");
  Proxy = await ethers.getContractFactory("Proxy");

  // 部屬 moduleRegistry 和 baseWallet
  // 實務上，baseWallet 會由 WalletFactory 去部屬
  moduleRegistry = await ModuleRegistry.deploy();
  baseWallet = await BaseWallet.deploy();

  // 建立三個 module 都是 VersionManager
  module1 = await deployTestModule();
  module2 = await deployTestModule();
  module3 = await deployTestModule();

  [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
});

beforeEach(async () => {
  // 部屬 Proxy 合約
  // 實務上是由 WalletFactory 去部屬
  proxy = await Proxy.deploy(baseWallet.address);

  // 同 Proxy 合約的地址，但可使用 BaseWallet 合約的函式
  // proxy.addree == wallet.address != baseWallet.address
  wallet = BaseWallet.attach(proxy.address);
});

describe("Proxy", () => {
  it("Should be no owner before wallet init", async () => {
    expect(await wallet.owner()).to.equal(ethers.constants.AddressZero);
  });

  it("should init the wallet with the correct owner", async () => {
    await wallet.init(addr1.address, [module1.address]);
    expect(await wallet.owner()).to.equal(addr1.address);
  });

  it("should init a wallet with the correct modules", async () => {
    await wallet.init(addr1.address, [module1.address, module2.address]);
    const module1IsAuthorised = await wallet.authorised(module1.address);
    const module2IsAuthorised = await wallet.authorised(module2.address);
    const module3IsAuthorised = await wallet.authorised(module3.address);
    expect(module1IsAuthorised).to.be.true;
    expect(module2IsAuthorised).to.be.true;
    expect(module3IsAuthorised).to.be.false;
  });

  it("should accept ETH", async () => {
    const before = await getBalance(proxy.address);

    await addr1.sendTransaction({
      to: proxy.address,
      value: ethers.BigNumber.from(50000000),
    });

    const after = await getBalance(proxy.address);
    expect(after.sub(before)).to.equal(ethers.BigNumber.from(50000000));

    // 註：交易可以轉帳給 baseWallet，argent 讓使用者的錢包指向 proxy，但有沒有可能錢不小心跑進 baseWallet 而提不出來？
    // baseWallet 是由合約創建的合約，有可能它的地址是非公開的嗎？有可能在 etherscan 搜尋不到嗎？
    // 不可能，看交易紀錄就應該能知道 baseWallet 的地址了吧...?
  });
});
