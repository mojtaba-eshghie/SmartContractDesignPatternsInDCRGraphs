# Abstract Contract States Design Pattern Model in DCR Graph

## Design Pattern Description

In most processes, there is an actiondependency that imposes a partial order on action executions. The smart contracthas to adhere to this order, as shown in detail in the casino contract. Theabstract contract states is a design pattern that uses an enumeration type tomimic a finite state automaton. The state transitions of this FSA modify theset of executable functions, establishing a partial order among action executions.This pattern reflects dependencies (partial ordering of actions) in the businessprocess which we represent explicitly using order-of-actions in DCR graphs. If theordering between activities does not matter, no arrows are required. Therefore,using DCR graphs as a modeling mechanism can make contact states obsolete onthe modeling level. If there is a strong reason for modeling the abstract contractstates instead of the action dependencies they imply, it is still possible to modelthe FSA using DCR graphs. This is done by grouping activities of the same stateinto the same group in DCR graphs and using arrows between state groupings toreflect state transitions of the system.

## Example Usage

The activity names and relations DCR model of this pattern is reflecting the following Solidity contract:

    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;

    contract CasinoGame {

        // Enumeration to represent the states of the contract
        enum GameState {
            RegistrationOpen,
            GameInProgress,
            GameEnded
        }

        GameState public currentState;
        address public owner;

        constructor() {
            owner = msg.sender;
            currentState = GameState.RegistrationOpen;
        }

        modifier onlyOwner() {
            require(msg.sender == owner, "Not the contract owner");
            _;
        }

        modifier inState(GameState _state) {
            require(currentState == _state, "Invalid current state");
            _;
        }

        function startGame() external onlyOwner inState(GameState.RegistrationOpen) {
            currentState = GameState.GameInProgress;
        }

        function endGame() external onlyOwner inState(GameState.GameInProgress) {
            currentState = GameState.GameEnded;
        }

        function resetGame() external onlyOwner inState(GameState.GameEnded) {
            currentState = GameState.RegistrationOpen;
        }
    }

In our CasinoGame contract, we've implemented this pattern using the GameState enumeration, which has three states:

- `RegistrationOpen`: Players can register for the game.
- `GameInProgress`: The game is currently ongoing.
- `GameEnded`: The game has ended.

The contract ensures that certain functions can only be executed in specific states using the inState modifier. For instance:

- The `startGame` function can only be executed when the state is RegistrationOpen.
- The `endGame` function can only be executed when the state is GameInProgress.
- The `resetGame` function can only be executed when the state is GameEnded.

## DCR Model

![Abstract Contract States](/svg/checks-effects-interactions.svg)

[Download Abstract Contract States source](/src/checks-effects-interactions.xml)

[Link to the public DCR graph in DCRGraphs.net](https://dcrgraphs.net/tool/main/Graph?id=281ec871-a868-49dc-8988-b599dae52562)
