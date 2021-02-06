// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.7.0;

contract Proxy {
    address implementation;

    constructor(address _implementation) {
        implementation = _implementation;
    }

    fallback() external payable {
        assembly {
            let target := sload(0)
            calldatacopy(0, 0, calldatasize())
            let result := delegatecall(gas(), target, 0, calldatasize(), 0, 0)
            returndatacopy(0, 0, returndatasize())
            switch result
                case 0 {
                    revert(0, returndatasize())
                }
                default {
                    return(0, returndatasize())
                }
        }
    }
}
