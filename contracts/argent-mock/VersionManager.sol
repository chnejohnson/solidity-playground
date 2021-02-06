// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.7.0;

import "./IVersionManager.sol";
import "./IWallet.sol";

contract VersionManager is IVersionManager {
    mapping(address => uint256) public walletVersions;
    mapping(uint256 => mapping(bytes4 => address)) public staticCallExecutors;

    function upgradeWallet(address _wallet, uint256 _toVersion)
        external
        override
    {
        require(
            IWallet(_wallet).authorised(msg.sender) ||
                isOwner(_wallet, msg.sender),
            "VM: sender may not upgrade wallet"
        );

        walletVersions[_wallet] = _toVersion;
        // Setup static call redirection
        // Init features
    }

    function isOwner(address _wallet, address _addr)
        internal
        view
        returns (bool)
    {
        return IWallet(_wallet).owner() == _addr;
    }

    fallback() external {
        uint256 version = walletVersions[msg.sender];
        address feature = staticCallExecutors[version][msg.sig];
        require(
            feature != address(0),
            "VM: static call not supported for wallet version"
        );

        assembly {
            calldatacopy(0, 0, calldatasize())
            let result := delegatecall(gas(), feature, 0, calldatasize(), 0, 0)
            returndatacopy(0, 0, returndatasize())
            switch result
                case 0 {
                    revert(0, returndatasize())
                }
                default {
                    return(0, returndatasize())
                }
        }
    }
}
