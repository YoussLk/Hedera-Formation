// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

contract HelloHedera {
    // the contract's owner, set in the constructor
    address owner;

    // the message we're storing
    address newAddress;

    constructor(address _address) {
        // set the owner of the contract for `kill()`
        owner = msg.sender;
        newAddress = _address;
    }

    function set_address(address _address) public {
        // only allow the owner to update the message
        if (msg.sender != owner) return;
        newAddress = _address;
    }

    // return a string
    function get_address() public view returns (address) {
        return newAddress;
    }

}
