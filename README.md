# Solidity Design Patterns Modeled by DCR Graphs
A collection of DCR graphs model of popular design patterns in Solidity smart contracts.

## [Time Locking](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/README.md#time-locking)
![Time Locking Solidity Design Pattern](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/svg/time-locking.svg)
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
[Download time locking pattern DCR graph source](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/src/time-locking.xml)


## [Time Incentivizing](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/README.md#time-incentivizing)

## [Automatic Deprecation](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/README.md#auto-deprecation)

## [Rate Limiting](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/README.md#rate-limiting)

## [Speed Bump](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/README.md#speed-bump)

## [Safe Self-Destruction](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/README.md#safe-self-destruction)
[Download safe self destruction pattern DCR graph source](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/src/safe-self-destruction.xml)
![Safe Self Destruction](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/svg/safe-self-destruction.svg)

## [Access Control](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/README.md#access-control)
[Download access control pattern DCR graph source](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/src/access-control.xml)
![myImage](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/svg/access-control.svg)

## [Commit and Reveal](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/README.md#commit-reveal)

## [Circuit Breaker / Emergency Stop](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/README.md#circuit-breaker)

## [Escapable](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/README.md#escapable)

## [Checks, Effects, Interactions](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/README.md#checks-effects-interactions)

## [Mutex](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/README.md#mutex)

## [Guard Check](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/README.md#guard-check)

## [Abstract Contract States](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/README.md#fsa)

## [Secure Ether Transfer](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/README.md#secure-ether-transfer)

## [Oracle](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/README.md#oracle)

## [Token Patterns](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/README.md#token)

## [Pull over push](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/README.md#pull-over-push)

## [Poll](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/README.md#poll)

## [Proxy,Delegate,Relayer](https://github.com/mojtaba-eshghie/SolidityDesignPatternsDCRGraph/blob/main/README.md#proxy-delegate-relayer)

