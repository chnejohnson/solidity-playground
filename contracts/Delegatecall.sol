//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

contract B {
    // NOTE: storage layout must be the same as contract A
    uint256 public num;
    address public sender;
    uint256 public value;

    function setVars(uint256 _num) public payable {
        num = _num;
        sender = msg.sender;
        value = msg.value;
    }
}

contract A {
    uint256 public num;
    address public sender;
    uint256 public value;

    function setVars(address _contract, uint256 _num) public payable {
        // A's storage is set, B is not modified.
        (bool success, bytes memory data) =
            _contract.delegatecall(
                abi.encodeWithSignature("setVars(uint256)", _num)
            );

        // or
        // _contract.delegatecall(
        //     abi.encode(bytes4(keccak256("setVars(uint256)")), _num)
        // );
    }
}
