//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "./argent-mock/Proxy.sol";
import "hardhat/console.sol";

contract Load {
    address public implementation;
    uint256 public amount;

    constructor(uint256 _amount) {
        amount = _amount;
    }

    function getAmount() external view returns (uint256) {
        return amount;
    }

    function setAmount(uint256 _amount) external {
        amount = _amount;
    }
}

contract LoadFactory {
    address public implementation;
    event LoadCreated(address indexed load);

    constructor(address _implementation) {
        implementation = _implementation;
    }

    function createLoad() external {
        Proxy proxy = new Proxy(implementation);
        Load load = Load(address(proxy));
        console.log(load.getAmount());
        emit LoadCreated(address(load));
    }
}
