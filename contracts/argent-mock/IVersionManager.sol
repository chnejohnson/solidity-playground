// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.7.0;

interface IVersionManager {
    // function isFeatureAuthorised(address _wallet, address _feature)
    //     external
    //     view
    //     returns (bool);

    // function checkAuthorisedFeatureAndInvokeWallet(
    //     address _wallet,
    //     address _to,
    //     uint256 _value,
    //     bytes calldata _data
    // ) external returns (bytes memory _res);

    // function setOwner(address _wallet, address _newOwner) external;

    // function invokeStorage(
    //     address _wallet,
    //     address _storage,
    //     bytes calldata _data
    // ) external;

    function upgradeWallet(address _wallet, uint256 _toVersion) external;
}
