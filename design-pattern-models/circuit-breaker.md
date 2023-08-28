# Circuit Breaker Design Pattern Model in DCR Graph

## Circuit Breaker Pattern Description

This pattern enables the contract owner to temporarily halt the contract’s normal operations until a manual or automatic investigation is performed. Other contract functions, such as those based on timed temporal constraints, can also trigger the circuit breaker.

## Example Usage

The activities and relations DCR model of this pattern is reflecting the following Solidity contract:

    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;

    contract CircuitBreaker {
    enum State { Normal, Paused }
    State public currentState = State.Normal;

        address public owner;
        address public monitor;

        modifier onlyOwner() {
            require(msg.sender == owner, "Only the owner can execute this");
            _;
        }

        modifier onlyMonitor() {
            require(msg.sender == monitor, "Only the monitor can execute this");
            _;
        }

        modifier inState(State _state) {
            require(currentState == _state, "Invalid state");
            _;
        }

        constructor(address _monitor) {
            owner = msg.sender;
            monitor = _monitor;
        }

        // Normal operations
        function buy() external inState(State.Normal) {
            // Implement buy logic
        }

        function sell() external inState(State.Normal) {
            // Implement sell logic
        }

        function transfer() external inState(State.Normal) {
            // Implement transfer logic
        }

        // Circuit Breaker
        function panic() external onlyMonitor inState(State.Normal) {
            currentState = State.Paused;
        }

        function revive() external onlyOwner inState(State.Paused) {
            currentState = State.Normal;
        }

        // Contingency plan
        function contingency(address newContractAddress) external onlyOwner inState(State.Paused) {
            // Transfer all assets or relevant data to the new contract
        }

    }

## DCR Model

To model this design pattern, we categorize activities into two subsets: activities that are available in the normal execution of the contract and those that are only available when the circuit breaker is triggered. There is a milestone relationship between circuit breaker grouping and all other DCR nodes. The existence of this milestone helps to disable execution of all of these activities by just making the circuit breaker pending. The activity `panic` executed by the `monitor` role makes the circuit breaker pending. This means unless `revive` activity in the circuit breaker group is executed, none of the `buy`, `sell`, `transfer`, and `panic` activities are executable. Executing contingency instead will enable `contingency` plan (transfering everything to another contract).

![Circuit Breaker](/svg/circuit-breaker-milestone.svg)

[Download Circuit Breaker source](/src/circuit-breaker-milestone.xml)

[Link to the public DCR graph in DCRGraphs.net](https://dcrgraphs.net/tool/main/Graph?id=880ebfb3-8250-4f79-ab5b-d03cb77021bf)
