// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.7.0;

import "./IWallet.sol";

contract BaseWallet is IWallet {
    address public implementation;
    address public override owner = address(0);
    uint256 public override modules;
    mapping(address => bool) public override authorised;

    modifier moduleOnly {
        require(
            authorised[msg.sender],
            "BW: msg.sender not an authorised module"
        );
        _;
    }

    function init(address _owner, address[] calldata _modules) external {
        require(
            owner == address(0) && modules == 0,
            "BW: wallet already initialized"
        );
        owner = _owner;
        modules = _modules.length;

        for (uint256 i = 0; i < _modules.length; i++) {
            require(
                authorised[_modules[i]] == false,
                "BW: module is already added"
            );
            authorised[_modules[i]] = true;
        }
    }
}
