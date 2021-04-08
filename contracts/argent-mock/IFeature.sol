// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.7.0;

interface IFeature {
    enum OwnerSignature {
        Anyone, // Anyone
        Required, // Owner required
        Optional, // Owner and/or guardians
        Disallowed // guardians only
    }

    // function recoverToken(address _token) external;

    function init(address _wallet) external;

    // function isFeatureAuthorisedInVersionManager(
    //     address _wallet,
    //     address _feature
    // ) external view returns (bool);

    // function getRequiredSignatures(address _wallet, bytes calldata _data)
    //     external
    //     view
    //     returns (uint256, OwnerSignature);

    // function getStaticCallSignatures() external view returns (bytes4[] memory);
}
