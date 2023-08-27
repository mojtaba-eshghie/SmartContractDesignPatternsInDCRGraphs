# Pull over Push Design Pattern Model in DCR Graph

## Pull over Push Pattern Description

A contract might need to send a token or Ether to other accounts. The _pull over push_ pattern discourages pushing tokens or Ether to the destination as a side-effect of calling a function. Rather, it encourages exposing a withdraw function for specific accounts can call for specifically this reason. This inclination towards pull is based on the factthat when sending Ether or tokens via any external call, the receiver may act unexpectedly before returning the control. We model this pattern in a DCR graph by having an extra activity forthe withdraw functionality.

## Example Usage

The activities and relations DCR model of this pattern is reflecting the following Solidity contract:

    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;

    contract PullOverPush {
        address public admin;
        mapping(address => uint256) public balances;

        constructor() {
            admin = msg.sender; // Set the contract deployer as the admin
        }

        modifier onlyAdmin() {
            require(msg.sender == admin, "Only admin can call this function.");
            _;
        }

        modifier onlyUser() {
            require(msg.sender != admin, "Admin cannot call this function.");
            _;
        }

        // Anti-pattern for pull-over-push
        function transferToUser(address user, uint256 value) external onlyAdmin {
            require(balances[user] >= value, "Insufficient funds");
            balances[admin] -= value;
            bool sent = payable(user).send(value);
            require(sent, "Failed to send Ether");
        }

        // Pull over push pattern
        function requestWithdraw(uint256 value) external onlyUser {
            require(balances[msg.sender] >= value, "Insufficient funds");
            balances[msg.sender] -= value;
            bool sent = payable(msg.sender).send(value);
            require(sent, "Failed to send Ether");
        }

        // Function to deposit Ether into the contract
        function deposit() external payable onlyUser {
            balances[msg.sender] += msg.value;
        }
    }

- `admin`: This state variable defines the admin of the contract.
- `balances`: This mapping keeps track of the Ether balance of each address.
- `onlyAdmin` and onlyUser Modifiers: These ensure that only the admin can execute certain functions, and only users (non-admins) can execute others.
- `transferToUser`: This function demonstrates the anti-pattern of directly sending Ether. It transfers Ether from the user's balance to a specified user.
- `requestWithdraw`: This function allows users to withdraw their Ether. It demonstrates the pull-over-push pattern, where users initiate the withdrawal themselves.
- `deposit`: This function allows users to deposit Ether into the contract.

For demonstration, the example contains a function for both the pattern and anti-pattern functionalities. Likewise, the DCR model for both of them is also provided.

## DCR Model

### The pattern:

![Pull over push pattern](/svg/pull-over-push.svg)

### The anti-pattern for pull over push:

![Anti-pattern for pull over push](/svg/pull-over-push-anti-pattern.svg)

[Download pull over push source](/src/pull-over-push.xml)

[Link to the public DCR graph in DCRGraphs.net](https://dcrgraphs.net/tool/main/Graph?id=41157b2a-d8ce-4832-8994-c54839987b91)
