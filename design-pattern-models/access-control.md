# Access Control Pattern Model in DCR Graph

## Access Control Pattern Description

Access control restricts access to desired functions to only a subset of accounts calling them. A common instance of this pattern is to initialize a variable owner to the contract deployer and only allow this account successfully call certain functions. Here, we can nicely exploit that access control is built into DCR graphs as a first-class citizen, in the form of roles
assigned to activities. Each activity in a DCR model can be limited to one or more specific roles. In simpler scenarios, roles are assigned statically to accounts when a contract is deployed on the blockchain. In general, however, access rights can be assigned dynamically. DCR graphs support this using activity effects from an external database source. This feature allows changing the roles of activities as a result of an activity being executed.

## Example Usage

The activities and relations DCR model of this pattern is reflecting the following Solidity contract:

    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;

    contract RoleBasedAccess {
        address public admin;
        address public player;

        constructor(address _player) {
            admin = msg.sender; // The deployer of the contract is the admin
            player = _player;  // The player's address is set during contract deployment
        }

        modifier onlyAdmin() {
            require(msg.sender == admin, "Only admin can call this function");
            _;
        }

        modifier onlyPlayer() {
            require(msg.sender == player, "Only player can call this function");
            _;
        }

        function start() public onlyAdmin returns(string memory) {
            return "Admin function executed!";
        }

        function play() public onlyPlayer returns(string memory) {
            return "Player function executed!";
        }
    }

## DCR Model

![Access Control](/svg/access-control.svg)

[Download Access Control source](/src/access-control.xml)

[Link to the public DCR graph in DCRGraphs.net](https://dcrgraphs.net/tool/main/Graph?id=b5d35894-e109-4e38-8b5d-c781ebe7b3cc)
