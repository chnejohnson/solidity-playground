// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.7.0;

interface IWallet {
    function owner() external view returns (address);

    function modules() external view returns (uint256);

    // function setOwner(address _newOwner) external;

    function authorised(address _module) external view returns (bool);

    // function enabled(bytes4 _sig) external view returns (address);

    // function authoriseModule(address _module, bool _value) external;

    // function enableStaticCall(address _module, bytes4 _method) external;
}
