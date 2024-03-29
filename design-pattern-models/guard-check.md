# Guard Check Design Pattern Model in DCR Graph

## Design Pattern Description

A guard check validates user inputs and performs checks
on bookkeeping variables and invariants before the execution of the function
body (mainly as a require statement). This pattern is often applied using
function modifiers in Solidity and represented using guard conditions on DCR
relations.

## Example Usage

The activity names and the specific guard condition in the DCR model of this pattern is extracted from the following example Solidity contract:

    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;

    contract SimpleWallet {
    address public owner;

        // Events
        event Deposited(address indexed sender, uint256 amount);
        event Withdrawn(address indexed recipient, uint256 amount);

        // Constructor to set the owner of the contract
        constructor() {
            owner = msg.sender;
        }

        // Modifier to check if the caller is the owner
        modifier onlyOwner() {
            require(msg.sender == owner, "Not the contract owner");
            _;
        }

        // Deposit function to deposit ether into the contract
        function deposit() external payable {
            // Guard Check: Ensure a non-zero amount is being deposited
            require(msg.value > 0, "Deposit amount should be greater than 0");

            emit Deposited(msg.sender, msg.value);
        }

        // Withdraw function to withdraw ether from the contract
        function withdraw(uint256 amount) external onlyOwner {
            // Guard Check: Ensure there's enough balance in the contract
            require(address(this).balance >= amount, "Insufficient funds");

            payable(owner).transfer(amount);
            emit Withdrawn(owner, amount);
        }

        // Function to get the balance of the contract
        function getBalance() external view returns (uint256) {
            return address(this).balance;
        }

    }

In the above contract:

- The onlyOwner modifier acts as a guard to ensure that only the owner of the contract can call certain functions.
- The deposit function has a guard check to ensure that the deposited amount is greater than 0.
- The withdraw function has a guard check to ensure that there are sufficient funds in the contract before allowing a withdrawal.

## DCR Model

![Guard Check](/svg/guard-check.svg)

[Download Guard Check source](/src/guard-check.xml)

[Link to the public DCR graph in DCRGraphs.net](https://dcrgraphs.net/tool/main/Graph?id=f3544df8-edac-433f-9047-245b7b717888)
