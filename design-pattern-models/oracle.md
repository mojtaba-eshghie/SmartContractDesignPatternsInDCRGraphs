# Oracle Design Pattern Model in DCR Graph

## Oracle Pattern Description

## Example Usage

The activities and relations DCR model of this pattern is reflecting the following Solidity contract:

    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;

    interface IOracleService {
        function requestData() external;
        function getResult() external view returns (string memory);
    }

    contract Oracle {
        address public oracleServiceAddress;
        string public data;
        bool public isDataReady = false;

        constructor(address _oracleServiceAddress) {
            oracleServiceAddress = _oracleServiceAddress;
        }

        function requestOffChainData() public {
            IOracleService(oracleServiceAddress).requestData();
            // Bookkeeping: Registration call information
            isDataReady = false;
        }

        function callback(string memory _data) public {
            require(msg.sender == oracleServiceAddress, "Only the Oracle Service can call this function");
            data = _data;
            isDataReady = true;
        }
    }

The Oracle contract interacts with an external Oracle Service (represented by the `IOracleService` interface). The main contract (Oracle) can request off-chain data by calling the `requestOffChainData` function. This function, in turn, calls the `requestData` function of the Oracle Service. The Oracle Service, when it has the data ready, will call the `callback` function of the main contract to provide the data. The `isDataReady` variable acts as a bookkeeping variable to keep track of whether the data is ready or not.

_Here, as it is demonstrated by the model in the next section, the only role able to call the `callback` function is the oracle._

## DCR Model

![Oracle](/svg/oracle-pattern.svg)

[Download Oracle source](/src/oracle-pattern.xml)

[Link to the public DCR graph in DCRGraphs.net](https://dcrgraphs.net/tool/main/Graph?id=35fa88cb-1bfb-4aad-97bd-e2ae9c8be5fb)
