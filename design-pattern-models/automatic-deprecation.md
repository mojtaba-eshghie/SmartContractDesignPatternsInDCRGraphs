# Automatic Deprecation Design Pattern Model in DCR Graph

## Automatic Deprecation Pattern Description

Oracles enable smart contracts to incorporate off-chain data in their execution and push information from a blockchain to external systems. The oracle pattern employs an external call to another service smart contract(data source) to register the request for off-chain data. This registration callinformation should also be kept in bookkeeping variables inside the contractitself. When the data is ready in the service contract, it will inform the maincontract about the result by calling a specific callback function. To model this, the callback function of the smart contract is excluded by default and is includedwhen the smart contract calls an oracle.

## Example Usage

The activities and relations DCR model of this pattern is reflecting the following Solidity contract:

    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;

    contract TimeBasedDeprecation {
        uint256 public deprecationTime;
        address public owner;

        modifier onlyOwner() {
            require(msg.sender == owner, "Only owner can call this.");
            _;
        }

        modifier notDeprecated() {
            require(block.timestamp < deprecationTime, "This function is deprecated.");
            _;
        }

        constructor(uint256 _secondsTillDeprecation) {
            deprecationTime = block.timestamp + _secondsTillDeprecation;
            owner = msg.sender;
        }

        function setDeprecationTime(uint256 _newDeprecationTime) external onlyOwner {
            deprecationTime = _newDeprecationTime;
        }

        function perform() external notDeprecated {
            // Some logic here
        }
    }

Description:

- `deprecationTime`: This variable holds the timestamp after which the function will be deprecated.
- `notDeprecated` modifier: This modifier checks if the current timestamp is less than the deprecationTime. If it's not, the function will revert with a message indicating that the function is deprecated.
- `setDeprecationTime`: This function allows the owner to set a new deprecation timestamp.
- `performAction`: This is a sample function that will be deprecated after the deprecationTime is reached.

## DCR Model

As DCR semantics does not support checking a condition when the activity is called, we use an auxiliary activity _auxiliary_deprecate_ to _exclude_ the `perform` function/activity exactly at the time set by `setDeprecationTime`. Furthermore, to enforce execution of this axiliary activity at that exact time we use _pre-condition_ and _response_ relations from `setDeprecationTime` (that has the id `deprecationTime` and _integer_ type) to the axiliary activity with the same duration of `deprecationTime` for _delay_ (on yellow arrow) and _deadline_ (on blue arrow).

![Automatic Deprecation](/svg/automatic-deprecation.svg)

[Download Automatic Deprecation source](/src/automatic-deprecation.xml)

[Link to the public DCR graph in DCRGraphs.net](https://dcrgraphs.net/tool/main/Graph?id=2f318f9f-8696-4237-89bd-177692439328)
