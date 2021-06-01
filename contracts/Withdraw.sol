//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

contract Withdraw {
    string greeting;

    // constructor(string memory _greeting) {
    //     greeting = _greeting;
    // }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        greeting = _greeting;
    }

    function deposit() public payable {}

    function withdraw(address payable _recipient, uint256 _amount) public {
        (bool success, ) = _recipient.call{value: _amount}("");
        require(success, "payment to _recipient did not go thru");
    }
}
