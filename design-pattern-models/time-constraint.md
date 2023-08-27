# Time Constraint Design Pattern Model in DCR Graph

## Time Constraint Pattern Description

In multi-stage business processes, code execution mustadhere to specific stages. This can be achieved through time-based or action-based dependencies. The former denotes stages solely based on elapsed time. This pattern prohibits calling a function until a specific time is reached on the blockchain, represented by a delayed condition relation in DCR graphs.The simplest form of this pattern is modeled directly using a delayed condition DCR relation.

## Example Usage

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

    contract TimeConstraintExample {
        address public owner;
        bool public activity0Executed = false;
        bool public activity1Executed = false;
        uint256 public activity0ExecutionTime;

        modifier onlyOwner() {
            require(msg.sender == owner, "Only the owner can call this function");
            _;
        }

        constructor() {
            owner = msg.sender;
        }

        function executeActivity0() external onlyOwner {
            require(!activity0Executed, "Activity0 has already been executed");
            activity0Executed = true;
            activity0ExecutionTime = block.timestamp;
        }

        function executeActivity1() external onlyOwner {
            require(activity0Executed, "Activity0 must be executed first");
            require(block.timestamp <= activity0ExecutionTime + 1 hours, "You can only execute Activity1 within 1 hour of executing Activity0");
            require(!activity1Executed, "Activity1 has already been executed");
            activity1Executed = true;
        }

    }

## DCR Model

![Time Constraint](/svg/time-constraint.svg)

[Download time constraint source](/src/time-constraint.xml)

[Link to the public DCR graph in DCRGraphs.net](https://dcrgraphs.net/tool/main/Graph?id=db8ca57a-5808-46a8-9c8d-b74c640a0d81)
