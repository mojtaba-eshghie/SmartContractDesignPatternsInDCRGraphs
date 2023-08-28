# Speed Bump Design Pattern Model in DCR Graph

## Speed Bump Pattern Description

A speed bump is used to slow down critical operations such as the withdrawal of assets, authorization of significant actions, etc. It imposes a temporal barrier that gives enough time to a monitoring system to detect a problematic activity and mitigate it. This pattern is a specialized form of time constraint pattern where the participating user can only execute an action after a predefined time period has passed (after the point the action request is registered). The wait time is modeled using a delay on a condition arrow from the activity requesting the specified action to the actual action.

## Example Usage

The activities and relations DCR model of this pattern is reflecting the following Solidity contract:

    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;

    contract SpeedBump {
        address public owner;
        uint256 public withdrawalRequestedAt;
        uint256 public withdrawalAmount;
        uint256 public constant WAIT_PERIOD = 1 weeks; // 1 week delay

        event WithdrawalRequested(address indexed requester, uint256 amount);
        event WithdrawalExecuted(address indexed requester, uint256 amount);

        constructor() {
            owner = msg.sender;
        }

        modifier onlyOwner() {
            require(msg.sender == owner, "Not authorized");
            _;
        }

        function requestWithdrawal(uint256 amount) public onlyOwner {
            require(amount <= address(this).balance, "Insufficient funds");
            withdrawalRequestedAt = block.timestamp;
            withdrawalAmount = amount;
            emit WithdrawalRequested(msg.sender, amount);
        }

        function executeWithdrawal() public onlyOwner {
            require(block.timestamp >= withdrawalRequestedAt + WAIT_PERIOD, "Wait period not met");
            uint256 amount = withdrawalAmount;
            withdrawalAmount = 0; // Reset withdrawal amount
            payable(owner).transfer(amount);
            emit WithdrawalExecuted(msg.sender, amount);
        }

        // Function to deposit ether into the contract
        function deposit() public payable onlyOwner {}
    }

The actual withdrawal can only be executed after a predefined delay the _speed bump_. This delay ensures that there's enough time for any monitoring system or other checks to detect and potentially prevent problematic activity.

## DCR Model

![Speed Bump](/svg/speed-bump.svg)

[Download Speed Bump source](/src/speed-bump.xml)

[Link to the public DCR graph in DCRGraphs.net](https://dcrgraphs.net/tool/main/Graph?id=adcc8b39-de19-45c8-acb6-70f2bcbbc9e6)
