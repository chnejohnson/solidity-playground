// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;

/**
 * @title ILimitStorage
 * @notice LimitStorage interface
 */

interface ILimitStorage {
    struct Limit {
        // the current limit
        uint128 current;
        // the pending limit if any
        uint128 pending;
        // when the pending limit becomes the current limit
        uint64 changeAfter;
    }

    struct DailySpent {
        // The amount already spent during the current period
        uint128 alreadySpent;
        // The end of the current period
        uint64 periodEnd;
    }

    function setLimit(address _wallet, Limit memory _limit) external;

    function getLimit(address _wallet)
        external
        view
        returns (Limit memory _limit);

    function setDailySpent(address _wallet, DailySpent memory _dailySpent)
        external;

    function getDailySpent(address _wallet)
        external
        view
        returns (DailySpent memory _dailySpent);

    function setLimitAndDailySpent(
        address _wallet,
        Limit memory _limit,
        DailySpent memory _dailySpent
    ) external;

    function getLimitAndDailySpent(address _wallet)
        external
        view
        returns (Limit memory _limit, DailySpent memory _dailySpent);
}
