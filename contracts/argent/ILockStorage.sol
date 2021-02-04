// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.7.0;

interface ILockStorage {
    function isLocked(address _wallet) external view returns (bool);

    function getLock(address _wallet) external view returns (uint256);

    function getLocker(address _wallet) external view returns (address);

    function setLock(
        address _wallet,
        address _locker,
        uint256 _releaseAfter
    ) external;
}
