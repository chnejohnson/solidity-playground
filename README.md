# Notes

### Initializable
- 引入 @openzeppelin/contracts-upgradeable 並測試 initializer 的功能

### Greeter & GreeterV2
- @openzeppelin/hardhat-upgrades 幫你把 proxy contract 部屬好，有點包裝的太方便，連 proxy contract 的合約都找不到，要你按照 openzeppelin 的 upgradeable 規則去寫，就能製作出可升級的合約，並自動部屬上鏈。
