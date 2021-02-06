# Notes

### Initializable
- 引入 @openzeppelin/contracts-upgradeable 並測試 initializer 的功能

### Greeter & GreeterV2
- @openzeppelin/hardhat-upgrades 幫你把 proxy contract 部屬好，有點包裝的太方便，連 proxy contract 的合約都找不到，要你按照 openzeppelin 的 upgradeable 規則去寫，就能製作出可升級的合約，並自動部屬上鏈。

### Transfer
- 實驗一個場景，ERC20 與 VersionManager 是已經部屬上鏈的合約，那麼 Transfer 合約若要與他們互動，需要引入他們的合約一起部屬上鏈。
- 部屬 ERC20 合約本身也可以，但合約內容大，浪費 gas，應該是部屬 interface 就好。
- 重點在於要把已上鏈的合約的地址，用引入的合約或 interface 包起來，像這樣：ERC20(`<`address`>`).balanceOf() 就可以調用其方法了。
- 另一個要試驗的是，使用底層方法去呼叫引入合約的方法。
- ERC20(_token).transfer.selector 是指 ERC20 transfer 函式的 id，使用 hardhat console 中 ethers.utils.id("transfer(address,uint256)") 得出的值，其前四個 byte 也就是 0xa9059cbb 就是該函式的 id，也就是該函式的 selector。
- 此實驗場景是模仿 argent 的 BaseFeature - recoverToken 這個函式，還是不懂為什麼底層的 .call() 來調用函式，而不像第一行直接調用就好了？

### argent & Proxy testing

### argent-mock & WalletFactory testing