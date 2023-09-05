# Rate Limiting Design Pattern Model in DCR Graph

## Rate Limiting Pattern Description

Oracles enable smart contracts to incorporate off-chain data intheir execution and push information from a blockchain to external systems.The oracle pattern employs an external call to another service smart contract(data source) to register the request for off-chain data. This registration callinformation should also be kept in bookkeeping variables inside the contractitself. When the data is ready in the service contract, it will inform the maincontract about the result by calling a specific callback function. To model this,the callback function of the smart contract is excluded by default and is includedwhen the smart contract calls an oracle.

## Example Usage

The activities and relations DCR model of this pattern is reflecting the following Solidity contract:

    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;

    contract RateLimiter {
        uint256 public limit = 3; // Number of allowed withdrawals in a time period
        uint256 public periodDuration = 1 days; // Duration of a time period
        uint256 public lastResetTime = block.timestamp; // Last time the count was reset
        uint256 public currentAmount = 0; // Current count of withdrawals in the period

        modifier withinPeriod() {
            require(block.timestamp - lastResetTime < periodDuration, "Outside of the current period");
            _;
        }

        modifier notExceedingLimit() {
            require(currentAmount < limit, "Withdrawal limit reached for the period");
            _;
        }

        function setLimit(uint256 _limit) external {
            limit = _limit;
        }

        function withdraw() external withinPeriod notExceedingLimit {
            currentAmount++;
            // Logic for withdrawal, e.g., transfer some tokens or ether
        }

        function startNewPeriod() external {
            require(block.timestamp - lastResetTime >= periodDuration, "Cannot start a new period yet");
            lastResetTime = block.timestamp;
            currentAmount = 0;
        }
    }

Description:

- `setLimit`: This function allows setting the maximum number of withdrawals allowed in a period (limit).

- `withdraw`: This function allows users to withdraw if they haven't exceeded their limit for the current period. It checks if the current time is still within the period and if the withdrawal count hasn't reached the limit.

- `startNewPeriod`: This function starts a new period, allowing users to make withdrawals again. It checks if the current period has ended before allowing the reset and resets the currentAmount to 0.

## DCR Model

- `rate limiter` subprocess (with the id `currentamount`) keeps track of the current count. Every time it's executed, it increments by 1 (using activity computations).
- `withdraw` activity represents the action of withdrawing and is associated with the user role.
- The `newperiod` activity represents the start of a new period and is associated with the system role. Every time it's executed, it checks if the current amount is greater than or equal to the set limit. If so, the `withdraw` activity becomes a milestone. Additionally, every time "newperiod" is executed, the current amount is reset to 0.
- `limit` activity allows the user to set a limit for rate-limiting.

![Rate Limiting](/svg/rate-limiting.svg)

[Download Rate Limiting source](/src/rate-limiting.xml)

[Link to the public DCR graph in DCRGraphs.net](https://dcrgraphs.net/tool/main/Graph?id=00307896-5158-418e-bd05-20b90c57f05c)
