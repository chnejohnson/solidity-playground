// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.7.0;

/**
 * @title IModule
 * @notice Interface for a module.
 * A module MUST implement the addModule() method to ensure that a wallet with at least one module
 * can never end up in a "frozen" state.
 * @author Julien Niset - <julien@argent.xyz>
 */
interface IModule {
    /**
     * @notice Inits a module for a wallet by e.g. setting some wallet specific parameters in storage.
     * @param _wallet The wallet.
     */
    function init(address _wallet) external;

    /**
     * @notice Adds a module to a wallet. Cannot execute when wallet is locked (or under recovery)
     * @param _wallet The target wallet.
     * @param _module The modules to authorise.
     */

    function addModule(address _wallet, address _module) external;
}
