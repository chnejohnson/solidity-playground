// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./argent/IVersionManager.sol";
import "hardhat/console.sol";

contract Transfer {
    IVersionManager internal versionManager;

    constructor(IVersionManager _versionManager) {
        versionManager = _versionManager;
    }

    function transferToken(address _token) external {
        uint256 total = ERC20(_token).balanceOf(address(this));
        // ERC20(_token).transfer(address(versionManager), total);

        bytes memory payload =
            abi.encodeWithSelector(
                ERC20(_token).transfer.selector,
                address(versionManager),
                total
            );
        console.logBytes4(ERC20(_token).transfer.selector);
        console.logBytes(payload);

        _token.call(payload);
    }
}
