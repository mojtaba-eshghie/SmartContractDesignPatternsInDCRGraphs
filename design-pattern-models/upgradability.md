# Upgradability Design Pattern Model in DCR Graph

## Upgradability Pattern Description

The upgradability design pattern consists of severalcontracts that enable easy upgrading of immutable smart contracts. Thisdesign pattern consists of up to five subpatterns, which we do not classify as stand-alone patterns. (1) The proxy subpattern keeps addresses of referred contracts.(2) The data segregation subpattern separates the logic and data layers by storingdata in a separate smart contract. (3) The satellite pattern outsources functionalunits to separate satellite contracts and stores their addresses in a base contractallowing the replacement of their functionality. (4) The register contract tracksdifferent versions of a contract and points to the latest one. (5) While keepingthe old contract address, the relay pattern uses a proxy contract to forward callsand data to the newest contract version.

## Example Usage

The activities and relations DCR model of this pattern is reflecting the following Solidity contract:

    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;

    // Interface for the logic contract
    interface ILogicContract {
        function executeLogic() external returns (string memory);
    }

    contract Proxy {
        address public logicContractAddress;
        address public owner;

        modifier onlyOwner() {
            require(msg.sender == owner, "Only the owner can call this function");
            _;
        }

        constructor(address _logicContractAddress) {
            logicContractAddress = _logicContractAddress;
            owner = msg.sender;
        }

        function upgradeLogicContract(address _newLogicContractAddress) external onlyOwner {
            logicContractAddress = _newLogicContractAddress;
        }

        function execute() external returns (string memory) {
            ILogicContract logic = ILogicContract(logicContractAddress);
            return logic.executeLogic();
        }
    }

    contract LogicV1 is ILogicContract {
        function executeLogic() external pure override returns (string memory) {
            return "Logic V1 executed";
        }
    }

    contract LogicV2 is ILogicContract {
        function executeLogic() external pure override returns (string memory) {
            return "Logic V2 executed";
        }
    }

### Description of the pattern

- Proxy Contract: This contract acts as a proxy to the actual logic contract. Users interact with the Proxy contract, which then delegates calls to the logic contract. The Proxy contract holds the address of the current logic contract and can be changed (upgraded) by the owner.

- Logic Contracts (V1 & V2): These are the contracts that contain the actual business logic. In this example, there are two versions of the logic contract to demonstrate upgradability.

- Upgradability: The owner of the Proxy contract can upgrade the logic contract by calling the upgradeLogicContract function and providing the address of the new logic contract. This allows for the logic to be changed without affecting the state or address of the Proxy contract.

- Interface: The ILogicContract interface ensures that all logic contracts have the executeLogic function, which is called by the Proxy contract.

## DCR Model

The `upgradeLogicContract` (only callable by `owner` role) activity will set a value for `logicAddress` (id associated with `upgradeLogicContract` activity). Then, in the event of an `exeucte`, it will include the exact logic required and make them pending (blue arrow).

![Upgradability](/svg/upgradability.svg)

[Download upgradability source](/src/upgradability.xml)

[Link to the public DCR graph in DCRGraphs.net](https://dcrgraphs.net/tool/main/Graph?id=9333f84f-8273-43cb-90a5-e9a61b053bc7)
