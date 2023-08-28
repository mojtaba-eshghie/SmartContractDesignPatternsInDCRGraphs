# Safe Self-Destruction Pattern Model in DCR Graph

## Safe Self-Destruction Pattern Description

It is possible to define a function in Solidity that uses `selfdestruct(address target)` to destroy the contract intentionally and send all Ether in the contract account to the target. Safe self-destruction is about limiting the execution of the function to specific roles such as the administrator or contract deployer. The simplest way to achieve this is to refine the access control pattern. However, guard check and time constraint patterns can also be used to ensure safety.

## Example Usage

The activities and relations DCR model of this pattern is reflecting the following Solidity contract:

    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;

    contract SafeSelfDestruction {
        address public owner;
        uint256 public destructionRequestedAt;

        // Time delay for destruction after the first request (1 week in seconds)
        uint256 public constant DESTROY_DELAY = 1 weeks;

        // Event to log the destruction of the contract
        event ContractDestroyed(address indexed destroyedBy);
        event DestructionRequested(address indexed requestedBy);

        // Set the contract deployer as the owner
        constructor() {
            owner = msg.sender;
        }

        // Modifier to restrict functions to the owner only
        modifier onlyOwner() {
            require(msg.sender == owner, "Not authorized");
            _;
        }

        // Function to request contract destruction
        function requestDestruction() public onlyOwner {
            destructionRequestedAt = block.timestamp;
            emit DestructionRequested(msg.sender);
        }

        // Function to safely destroy the contract after the delay
        function destroy() public onlyOwner {
            require(block.timestamp >= destructionRequestedAt + DESTROY_DELAY, "Destruction delay not met");
            emit ContractDestroyed(msg.sender);
            selfdestruct(payable(owner));
        }
    }

- _Destruction Request_: The `requestDestruction` function allows the owner to express their intention to destroy the contract. This function sets the `destructionRequestedAt` timestamp.
- _Delayed Destruction_: The destroy function now checks if the current timestamp is at least 1 week (or `DESTROY_DELAY`) after the `destructionRequestedAt` timestamp. If the delay is met, the contract is destroyed; otherwise, an error is thrown.

## DCR Model

![Safe Self-Destruction](/svg/safe-self-destruction.svg)

[Download Safe Self-Destruction source](/src/safe-self-destruction.xml)

[Link to the public DCR graph in DCRGraphs.net](https://dcrgraphs.net/tool/main/Graph?id=35fa88cb-1bfb-4aad-97bd-e2ae9c8be5fb)
