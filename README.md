# Solidity Design Patterns Modeled by DCR Graphs
A collection of DCR graphs model of popular design patterns in Solidity smart contracts.

## [Time-constrained](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/README.md#time-constrained)
![Time-Constrained Solidity Design Pattern](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/svg/time-constrained.svg)
At its simplest form (extracted from [lottery @ Etherscan](https://etherscan.io/address/0x302fE87B56330BE266599FAB2A54747299B5aC5B)):
```
function payoutReady() constant returns (bool) {
    return decidingBlock <= btcRelay.getLastBlockHeight();
}
function processPayout() returns (bool done) {
    if (!payoutReady()) throw;
    ...
}
```
```
pragma solidity >=0.8.0; 
abstract contract Ballot {
    uint256 public targetBlock;
    function setTargetBlock(uint256 _targetBlock) public {
        targetBlock = _targetBlock;
    } 
    function vote() public {
        require(block.timestamp != targetBlock, "Voting on the target is not possible");
        if (block.timestamp > targetBlock) {
            upVote();
        } else {
            downVote();
        }
    }
    function upVote() virtual internal;
    function downVote() virtual internal;
}
```
[Download time-constrained pattern DCR graph source](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/src/time-constrained.xml)


## [Time Incentivizing](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/README.md#time-incentivizing)
![Time Incentivizing Solidity Design Pattern](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/svg/time-incentivizing.svg)

[Download time incentivizing DCR graph source](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/src/time-incentivizing.xml)

## [Automatic Deprecation](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/README.md#auto-deprecation)
![Automatic Deprecation Solidity Design Pattern](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/svg/automatic-deprecation-1.svg)

[Download automatic deprecation (1) DCR graph source](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/src/automatic-deprecation-1.xml)

![Automatic Deprecation Solidity Design Pattern](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/svg/automatic-deprecation-2.svg)

[Download automatic deprecation (2) DCR graph source](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/src/automatic-deprecation-2.xml)


## [Rate Limiting](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/README.md#rate-limiting)
![Rate Limiting Solidity Design Pattern](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/svg/rate-limiting.svg)

[Download rate limiting DCR graph source](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/src/rate-limiting.xml)

## [Speed Bump (timed temporal-constrained)](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/README.md#speed-bump)
[Download speed bump pattern DCR graph source](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/src/speed-bump.xml)
![Speed bump (timed temporal-constrained)](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/svg/speed-bump.svg)

## [Safe Self-Destruction](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/README.md#safe-self-destruction)
[Download safe self destruction pattern DCR graph source](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/src/safe-self-destruction.xml)
![Safe Self Destruction](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/svg/safe-self-destruction.svg)

## [Access Control](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/README.md#access-control)
![Access Control Smart Contract Design Pattern](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/svg/access-control.svg)

[Download access control pattern DCR graph source](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/src/access-control.xml)

## [Commit and Reveal](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/README.md#commit-reveal)
![Commit and Reveal Design Pattern](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/svg/commit-and-reveal.svg)
```
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.0; 

// Use hash for 3 for instance: 0xc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b

contract CommitRevealPattern {
    bytes32 private hashedNumber;
    bool public commitStatus;
    bool public won;
    constructor () {
        commitStatus = false;
        won = false;
    }
    modifier isCommitted() {
        require(commitStatus);
        _;
    }
    modifier isNotCommitted() {
        require(!commitStatus);
        _;
    }
    function commit(bytes32 _hashedNumber) external isNotCommitted returns(bool) {
        hashedNumber = _hashedNumber;
        commitStatus = true;
    } 
    function reveal(uint256 secret) external isCommitted returns (bytes32){
        require(hashedNumber == keccak256(abi.encodePacked(secret)));
        won = true;
    }
}
```
[Download commit and reveal pattern DCR graph source](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/src/commit-and-reveal.xml)


## [Circuit Breaker / Emergency Stop](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/README.md#circuit-breaker)
![Circuit Breaker Blockchain Smart Contract Design Pattern](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/svg/circuit-breaker-milestone.svg)

[Download circuit breaker pattern DCR graph source](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/src/circuit-breaker-milestone.xml)

## [Escapable](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/README.md#escapable)
![Escapable Blockchain Smart Contract Design Pattern](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/svg/escapable.svg)

[Download escapable pattern DCR graph source](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/src/escapable.xml)

## [Checks, Effects, Interactions](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/README.md#checks-effects-interactions)

## [Mutex](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/README.md#mutex)
![Mutex Design Pattern DCR Graph Model for Ethereum Smart Contracts](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/svg/mutex.svg)

[Download mutex pattern DCR graph source](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/src/mutex.xml)

## [Guard Check](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/README.md#guard-check)

## [Abstract Contract States](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/README.md#fsa)

## [Secure Ether Transfer](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/README.md#secure-ether-transfer)

## [Oracle](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/README.md#oracle)

## [Token Patterns](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/README.md#token)

## [Pull over push](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/README.md#pull-over-push)

## [Governance](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/README.md#governance)

## [Upgradability](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/README.md#upgradability)

