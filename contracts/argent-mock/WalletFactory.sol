// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.7.0;

import "./Proxy.sol";
import "./BaseWallet.sol";
import "./IVersionManager.sol";
import "hardhat/console.sol";

contract WalletFactory {
    address public walletImplementation;

    event WalletCreated(address indexed wallet);

    constructor(address _walletImplementation) {
        walletImplementation = _walletImplementation;
    }

    function createWallet(
        address _owner,
        address _versionManager,
        uint256 _version
    ) external returns (uint256) {
        Proxy proxy = new Proxy(walletImplementation);
        address payable wallet = address(proxy);
        configureWallet(BaseWallet(wallet), _owner, _versionManager, _version);
    }

    function configureWallet(
        BaseWallet _wallet,
        address _owner,
        address _versionManager,
        uint256 _version
    ) internal returns (uint256) {
        address[] memory extendedModules = new address[](2);
        extendedModules[0] = _versionManager;
        extendedModules[1] = address(this);

        _wallet.init(_owner, extendedModules);

        IVersionManager(_versionManager).upgradeWallet(
            address(_wallet),
            _version
        );

        emit WalletCreated(address(_wallet));
    }
}
