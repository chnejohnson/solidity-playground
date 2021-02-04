//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

contract GreeterV2 {
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

    function getVersion() public pure returns (string memory) {
        return "version 2";
    }
}
