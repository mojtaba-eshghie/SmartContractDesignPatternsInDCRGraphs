# Secure Ether Transfer Design Pattern Model in DCR Graph

## Design Pattern Description

This structural design pattern imposes a design choice between various ways of sending Ether from one contract to the other (via send, transfer, or call). Using each of them requires a distinct way of ensuring the target contract cannot harm the contract sending Ether. As a structural design pattern, Secure Ether Transfer imposes certain guard checks, mutual exclusions, and ordering of actions to ensure an external call (especially to transfer Ether) is not exploitable by a malicious party.

## Example Usage

The activities and relations DCR model of this pattern is reflecting the following Solidity contract:

    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;

    contract SecureEtherTransfer {

        address public owner;
        int public balance;
        int public result = -1; // Default value

        // Guard check to ensure only the owner can perform certain actions
        modifier onlyOwner() {
            require(msg.sender == owner, "Not the contract owner");
            _;
        }

        constructor() {
            owner = msg.sender;
        }

        // Function to deposit Ether into the contract
        function deposit() external payable onlyOwner {
            balance += int(msg.value);
        }

        // Function to withdraw all Ether if balance is greater than 0
        function withdrawAll() external onlyOwner {
            require(balance > 0, "Insufficient funds");
            payable(owner).transfer(uint256(balance));
            result = 0; // Representing a successful withdrawal
        }

        // Function to check the result of the withdrawal
        function checkResult() external onlyOwner returns (int) {
            if (result != -1) {
                balance = 0;
            }
            return result;
        }

    }

1. **balance**: This variable represents the balance of the contract. It's an integer to match the DCR graph's semantics, but in practice, it would be better to use uint256 for balances in a real contract.
2. **result**: This variable represents the result of the withdrawAll function. By default, it's set to -1, indicating no withdrawal attempt. If a withdrawal is successful, it's set to 0.
3. **deposit()**: This function allows the owner to deposit Ether into the contract.
4. **withdrawAll()**: This function allows the owner to withdraw all Ether from the contract if the balance is greater than 0. After a successful withdrawal, the result is set to 0.
5. **checkResult()**: This function checks the result of the withdrawal. If the result is not -1 (indicating a withdrawal attempt), it sets the balance to 0.

_The most nateworthy aspect of the upcoming model is that DCR graphs does not have an explicit notion of post-condition checking. Therefore, we have to use the guarded relations to the next logical step to represent the post-condition (in this case guard on the **add value** relation)_

## DCR Model

![Secure Ether Transfer](/svg/secure-ether-transfer.svg)

[Download Secure Ether Transfer source](/src/secure-ether-transfer.xml)

[Link to the public DCR graph in DCRGraphs.net](https://dcrgraphs.net/tool/main/Graph?id=35fa88cb-1bfb-4aad-97bd-e2ae9c8be5fb)
