// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.7.0;

import "./IVersionManager.sol";
import "./IFeature.sol";
import "./IWallet.sol";

contract BaseFeature is IFeature {
    IVersionManager internal versionManager;

    event FeatureCreated(bytes32 name);

    modifier onlyVersionManager() {
        require(
            msg.sender == address(versionManager),
            "BF: caller must be VersionManager"
        );
        _;
    }

    modifier onlyWalletOwner(address _wallet) {
        require(isOwner(_wallet, msg.sender), "BF: must be wallet owner");
        _;
    }

    constructor(IVersionManager _versionManager, bytes32 _name) {
        versionManager = _versionManager;
        emit FeatureCreated(_name);
    }

    function init(address _wallet) external virtual override {}

    function isOwner(address _wallet, address _addr)
        internal
        view
        returns (bool)
    {
        return IWallet(_wallet).owner() == _addr;
    }
}
