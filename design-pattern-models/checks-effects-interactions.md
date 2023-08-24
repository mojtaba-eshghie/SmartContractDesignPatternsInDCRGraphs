# Checks, Effects, Interactions Design Pattern Model in DCR Graph

## Design Pattern Description

This pattern is concerned with theorder of certain activities, especially when interactions with other contracts(external calls) happen. External calls can be risky, in particular as call targets cannot necessarily be trusted. One risk is that the called contract callsback into the calling contract, before returning, purposefully abusing the callingcontract’s logic. To prevent such exploits, the caller first performs checks on its bookkeeping variables (variables keeping the balance of tokens, assets,etc.). Then, it modifies these bookkeeping variables based on the business logic(effects). Lastly, there will be interactions with (i. e., calls to) other contracts. In DCR graphs, we can specify this strict ordering via inclusion/exclusion relationsamong the respective activities. This design pattern has been introduced to prevent reentrancy attacks and other potential vulnerabilities.

## Example Usage

    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;

    contract SimpleEtherStore {
        mapping(address => uint256) public balances;

        // Deposit ether into the contract
        function deposit() external payable {
            // Checks: Ensure a non-zero amount is being deposited
            require(msg.value > 0, "Deposit amount should be greater than 0");

            // Effects: Update the state (balances) of the contract
            balances[msg.sender] += msg.value;
        }

        // Withdraw ether from the contract
        function withdraw(uint256 amount) external {
            // Checks: Ensure the user has enough balance
            require(balances[msg.sender] >= amount, "Insufficient funds");

            // Effects: Update the state (balances) before the external interaction
            balances[msg.sender] -= amount;

            // Interactions: Send the ether to the user
            payable(msg.sender).transfer(amount);
        }
    }

In the above contract:

- **Checks**: Validate all the conditions before executing the function's logic. This often involves using require statements to ensure that conditions are met.
- **Effects**: Update any state variables after the checks. This ensures that even if there's an external call later in the function, the contract's state is already updated, preventing potential reentrancy attacks.
- **Interactions**: Only after the state has been updated, interact with other contracts or addresses.

## DCR Model

![Checks, Effects, Interactions](/svg/checks-effects-interactions.svg)

[Download Checks, Effects, Interactions source](/src/checks-effects-interactions.xml)

[Link to the public DCR graph in DCRGraphs.net](https://dcrgraphs.net/tool/main/Graph?id=ec253dfe-6989-42f9-b0d3-252ca8554b97)
