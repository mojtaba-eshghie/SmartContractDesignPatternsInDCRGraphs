# Time Incentivizing Design Pattern Model in DCR Graph

In Ethereum, smart contracts work as a reactive system where specific function calls execute transactions.
There are scenarios where certain actions should be performed at a specific time or when a specific condition is fulfilled. A lack of action may prevent progress, opening up adversarial behavior (e.\,g., the eternal locking of assets). The purpose of the time incentivizing pattern is to motivate parties to cooperate even in the existence of conflicting interests. The incentivizing is typically done by stipulating a deadline before which an actor shall make a move.

## Time Incentivizing Pattern Description

## Example Usage

    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;

    contract TimeIncentivizingContract {
        address public bank;
        address public client;
        bool public loanGiven = false;
        bool public loanPaid = false;
        uint256 public loanGivenTime;

        modifier onlyBank() {
            require(msg.sender == bank, "Only the bank can call this function");
            _;
        }

        modifier onlyClient() {
            require(msg.sender == client, "Only the client can call this function");
            _;
        }

        constructor(address _client) {
            bank = msg.sender;
            client = _client;
        }

        function giveLoan() external onlyBank {
            require(!loanGiven, "Loan has already been given");
            loanGiven = true;
            loanGivenTime = block.timestamp;
        }

        function payLoan() external onlyClient {
            require(loanGiven, "Loan must be given first");
            require(!loanPaid, "Loan has already been paid");
            loanPaid = true;
        }

        function applyFine() external onlyBank {
            require(loanGiven, "Loan must be given first");
            require(!loanPaid, "Cannot apply fine if loan is paid");
            require(block.timestamp >= loanGivenTime + 30 days, "Fine can only be applied after 1 month of giving loan");
        }
    }

## DCR Model

To demonstrate this pattern, we use the simple example of giving a loan and then motivating the client to pay for the loan. Giving a loan is performed only by _bank_ role. In the following model, immediately after giving the loan, the bank includes both the _pay loan_ and _fine_ activities. Without any more relationships, this would mean that the bank might increase the interest on the loan without giving the client enough time to pay for it. This issue is resolved by using the yellow pre-condition arrow from _give loan_ to _fine_ activity. As this pre-condition arrow has a deadline attribute of P1M (one month), it will suspend the availability of _fine_ to one month later. Without this pattern, the client could simply refuse to pay the loan by not participating in any further transaction.

![Time Constraint](/svg/time-incentivizing.svg)

[Download time constraint source](/src/time-incentivizing.xml)

[Link to the public DCR graph in DCRGraphs.net](https://dcrgraphs.net/tool/main/Graph?id=e7ee7bd3-99a3-40a7-bbb7-09e00da6e2c4)
