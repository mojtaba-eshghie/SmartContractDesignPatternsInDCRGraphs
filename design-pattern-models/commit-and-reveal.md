# Commit and Reveal Design Pattern Model in DCR Graph

## Commit and Reveal Pattern Description

In a public permissionless blockchain platform such as Ethereum, transaction data is public. Therefore, if a secret is sent along with a transaction request, participants in the blockchain consensus protocol can see the secret value. On the other hand, the party holding the secret should commit to it before other parties act, so the secret cannot be changed after the fact. The Commit and Reveal pattern addresses this problem and works in two phases. In Phase 1, a piece of data is submitted that depends on the secret (which itself is not yet submitted). Often, that data is the crypto-hash of the secret, such that the secret cannot be reconstructed. Phase 2 is the submission (and reveal) of the secret itself. We use a combination of condition, milestone, and response relations to enforce the ordering of actions in the Commit and Reveal.

## Example Usage

The activities and relations DCR model of this pattern is reflecting the following Solidity contract:

    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;

    contract CommitAndReveal {
        enum State { NotCommitted, Committed, Revealed, Passed, Failed }
        State public currentState = State.NotCommitted;

        address public committer;
        bytes32 public commitHash;
        string public revealedSecret;

        // Events
        event Committed(address indexed _committer, bytes32 _hash);
        event Revealed(string _secret);
        event Passed();
        event Failed();

        modifier inState(State _state) {
            require(currentState == _state, "Invalid state");
            _;
        }

        function commit(bytes32 _hash) external inState(State.NotCommitted) {
            committer = msg.sender;
            commitHash = _hash;
            currentState = State.Committed;
            emit Committed(committer, commitHash);
        }

        function reveal(string memory _secret) external inState(State.Committed) {
            require(msg.sender == committer, "Only the committer can reveal");

            revealedSecret = _secret;
            currentState = State.Revealed;
            emit Revealed(_secret);

            // Decide based on the revealed secret
            decide();
        }

        function decide() internal inState(State.Revealed) {
            if (keccak256(abi.encodePacked(revealedSecret)) == commitHash) {
                currentState = State.Passed;
                emit Passed();
            } else {
                currentState = State.Failed;
                emit Failed();
            }
        }

        function getSecret() external view returns (string memory) {
            require(currentState == State.Revealed || currentState == State.Passed || currentState == State.Failed, "Secret is not yet revealed or decision not made");
            return revealedSecret;
        }
    }

## DCR Model

Here, the activity reveal is blocked initially by the condition relation from commit to reveal, and is enabled once a user commits. The commit makes reveal pending (by the blue response relation arrow). Finally, the milestone relation from the pending reveal to commit means that unless a reveal happens, no other commit is possible. The decision is then made using the Decide activity based on committed and revealed values.

![Commit and Reveal](/svg/commit-and-reveal.svg)

[Download Commit and Reveal source](/src/commit-and-reveal.xml)

[Link to the public DCR graph in DCRGraphs.net](https://dcrgraphs.net/tool/main/Graph?id=be7101d4-6b98-413b-91e5-de8bd4390d3b)
