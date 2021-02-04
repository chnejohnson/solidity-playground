// SPDX-License-Identifier: GPL-3.0-only
pragma solidity 0.7.0;
// pragma experimental ABIEncoderV2;

import "./ILimitStorage.sol";

/**
 * @title IVersionManager
 * @notice Interface for the VersionManager module.
 * @author Olivier VDB - <olivier@argent.xyz>
 */
interface IVersionManager {
    /**
     * @notice Returns true if the feature is authorised for the wallet
     * @param _wallet The target wallet.
     * @param _feature The feature.
     */
    function isFeatureAuthorised(address _wallet, address _feature)
        external
        view
        returns (bool);

    /**
     * @notice Lets a feature (caller) invoke a wallet.
     * @param _wallet The target wallet.
     * @param _to The target address for the transaction.
     * @param _value The value of the transaction.
     * @param _data The data of the transaction.
     */
    function checkAuthorisedFeatureAndInvokeWallet(
        address _wallet,
        address _to,
        uint256 _value,
        bytes calldata _data
    ) external returns (bytes memory _res);

    /* ******* Backward Compatibility with old Storages and BaseWallet *************** */

    /**
     * @notice Sets a new owner for the wallet.
     * @param _newOwner The new owner.
     */
    function setOwner(address _wallet, address _newOwner) external;

    /**
     * @notice Lets a feature write data to a storage contract.
     * @param _wallet The target wallet.
     * @param _storage The storage contract.
     * @param _data The data of the call
     */
    function invokeStorage(
        address _wallet,
        address _storage,
        bytes calldata _data
    ) external;

    /**
     * @notice Upgrade a wallet to a new version.
     * @param _wallet the wallet to upgrade
     * @param _toVersion the new version
     */
    function upgradeWallet(address _wallet, uint256 _toVersion) external;
}
