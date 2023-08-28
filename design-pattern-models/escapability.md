# Escapability Design Pattern Model in DCR Graph

## Escapability Pattern Description

There have been cases where a vulnerability in the contract triggered by a certain transaction lead to funds being locked in the contract. To prevent this, a smart contract can contain a function whose logic is independent from the main contract logic; when triggered, it can disable all or a subset of functions and withdraw all assets in the contract to a certain address. This new address can be the upgraded version of the contract that contains a patch for the vulnerability. Escapability is arguably a specialized subset of the circuit breaker. The main difference lies in the escapable pattern of directly transferring funds or assets to another address (secure hatch) without further interaction. The escape activity is only callable by the authorized role and disables all other activities in the contract.

## Example Usage

The activities and relations DCR model of this pattern is reflecting the following Solidity contract:

    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;

    contract Escapable {
        address public owner;
        address public escapeHatch;

        bool public isEscaped = false;

        modifier onlyOwner() {
            require(msg.sender == owner, "Only the owner can execute this");
            _;
        }

        modifier notEscaped() {
            require(!isEscaped, "Contract is in escape mode");
            _;
        }

        constructor(address _escapeHatch) {
            owner = msg.sender;
            escapeHatch = _escapeHatch;
        }

        // Normal operations
        function buy() external payable notEscaped {
            // Implement buy logic
        }

        function sell(uint256 amount) external notEscaped {
            // Implement sell logic
            payable(msg.sender).transfer(amount);
        }

        // Escapability
        function escape() external onlyOwner {
            isEscaped = true;
        }

        function transferEverything() external onlyOwner {
            require(isEscaped, "Contract is not in escape mode");
            payable(escapeHatch).transfer(address(this).balance);
        }
    }

## DCR Model

![Escapability](/svg/escapable.svg)

[Download Escapability source](/src/escapable.xml)

[Link to the public DCR graph in DCRGraphs.net](https://dcrgraphs.net/tool/main/Graph?id=1d8e5002-4dda-49e9-8743-2e67371eb70b)
