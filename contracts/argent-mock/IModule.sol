// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.7.0;

interface IModule {
    function init(address _wallet) external;

    function addModule(address _wallet, address _module) external;
}
