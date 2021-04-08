// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.7.0;

import "./BaseFeature.sol";

contract RelayerManager is BaseFeature {
    bytes32 constant NAME = "RelayerManager";

    struct RelayerConfig {
        uint256 nonce;
        mapping(bytes32 => bool) executedTx;
    }

    struct StackExtension {
        uint256 requiredSignatures;
        OwnerSignature ownerSignatureRequirement;
        bytes32 signHash;
        bool success;
        bytes returnData;
    }

    event TransactionExecuted(
        address indexed wallet,
        bool indexed success,
        bytes returnData,
        bytes32 signedHash
    );

    constructor(IVersionManager _versionManager)
        BaseFeature(_versionManager, NAME)
    {}

    function execute(
        address _wallet,
        address _feature,
        bytes calldata _data,
        uint256 _nonce,
        bytes calldata _signatures,
        uint256 _gasPrice,
        uint256 _gasLimit,
        address _refundToken,
        address _refundAddress
    ) external returns (bool) {}
}
