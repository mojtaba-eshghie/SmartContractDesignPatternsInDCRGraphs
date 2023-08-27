# Tokens Design Pattern Model in DCR Graph

## Tokens Pattern Description

Tokens represent assets, their behavior, and manageability. Ethereum smart contracts and token standards (such as ERC-20, ERC-721, and ERC-777) enable developers to use tokens according to specific requirements. DCR graphs can model both tokens and their interacting contracts. For instance, ERC-20 mostly involves using inclusion/exclusion arrows to model the partial ordering of activities (transferFrom, approve, etc.).

## Example Usage

The activities and relations DCR model of this pattern is reflecting the following Solidity contract:

    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;

    contract ERC20Token {
        mapping(address => uint256) public balances;
        mapping(address => mapping(address => uint256)) public allowed;
        uint256 public totalSupply;
        string public name;
        string public symbol;
        uint8 public decimals;

        event Transfer(address indexed from, address indexed to, uint256 value);
        event Approval(address indexed owner, address indexed spender, uint256 value);

        constructor(string memory _name, string memory _symbol, uint8 _decimals, uint256 _initialSupply) {
            name = _name;
            symbol = _symbol;
            decimals = _decimals;
            totalSupply = _initialSupply * (10 ** uint256(decimals));
            balances[msg.sender] = totalSupply;
        }

        function transfer(address _to, uint256 _value) public returns (bool success) {
            require(balances[msg.sender] >= _value, "Insufficient balance.");
            balances[msg.sender] -= _value;
            balances[_to] += _value;
            emit Transfer(msg.sender, _to, _value);
            return true;
        }

        function approve(address _spender, uint256 _value) public returns (bool success) {
            allowed[msg.sender][_spender] = _value;
            emit Approval(msg.sender, _spender, _value);
            return true;
        }

        function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
            require(balances[_from] >= _value, "Insufficient balance.");
            require(allowed[_from][msg.sender] >= _value, "Not allowed.");
            balances[_from] -= _value;
            balances[_to] += _value;
            allowed[_from][msg.sender] -= _value;
            emit Transfer(_from, _to, _value);
            return true;
        }

        function allowance(address _owner, address _spender) public view returns (uint256 remaining) {
            return allowed[_owner][_spender];
        }
    }

### Description of the pattern

- **State Variables**: The contract has state variables like balances to keep track of each address's token balance, allowed to keep track of approved token transfers, and metadata like name, symbol, and decimals.

- `Transfer`: Allows an address to transfer tokens to another address.

- `Approve`: Allows an address to approve another address to transfer a certain amount of tokens on its behalf.

- `TransferFrom`: Allows an address to transfer tokens on behalf of another address, given that it has been approved to do so.

- `Allowance`: Returns the amount of tokens that an address has been approved to transfer on behalf of another address.

There are only three state-changing public functions in ERC-20 token standard: `transfer`, `approve`, and `transferFrom`. The DCR graph captures the relation between `approve` and `transferFrom` making it only possible to use `transferFrom` when token holder role approves it. Furthermore, the current model includes `allowance` as the id of `approve`. Therefore, whenever `approve` is executed the `allowance` value is determined too. Likewise, `balance` which is both modified by the execution of `transfer` and `transferFrom` (currently not modeled) is included as an activity with integer data type.

## DCR Model

![Oracle](/svg/ERC-20.svg)

[Download Oracle source](/src/ERC-20.xml)

[Link to the public DCR graph in DCRGraphs.net](https://dcrgraphs.net/tool/main/Graph?id=e53d53e3-24ad-4fc9-90bf-b127a4b7d7f6)
