# Governance Design Pattern Model in DCR Graph

## Governance Pattern Description

On-chain governance is a crucial component of decentralized protocols, allowing for decision-making on parameter changes, upgrades, and management. The governance pattern is typically used to allow token holders or a group of privileged users to vote on proposals and make decisions that affect the contract's behavior. A popular example of on-chain governance is the Compound protocol. This design pattern is the result of multiple design patterns from different domains, namely, role-based access control, timed temporal constraint, token, as well as upgrade patterns.

## Example Usage

The activities and relations DCR model of this pattern is reflecting the following Solidity contract:

    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;

    contract Governance {
    address public owner;
    mapping(address => bool) public voters;
    mapping(bytes32 => Proposal) public proposals;

        struct Proposal {
            string description;
            uint256 voteCount;
            bool executed;
        }

        modifier onlyOwner() {
            require(msg.sender == owner, "Only owner can call this.");
            _;
        }

        modifier onlyVoter() {
            require(voters[msg.sender], "Only voters can call this.");
            _;
        }

        constructor() {
            owner = msg.sender;
        }

        function addVoter(address _voter) external onlyOwner {
            voters[_voter] = true;
        }

        function createProposal(string memory _description) external onlyVoter {
            bytes32 proposalId = keccak256(abi.encodePacked(_description, msg.sender, block.timestamp));
            proposals[proposalId] = Proposal(_description, 0, false);
        }

        function vote(bytes32 _proposalId) external onlyVoter {
            Proposal storage proposal = proposals[_proposalId];
            require(!proposal.executed, "Proposal already executed.");
            proposal.voteCount++;
        }

        function executeProposal(bytes32 _proposalId) external onlyOwner {
            Proposal storage proposal = proposals[_proposalId];
            require(proposal.voteCount > 1, "Not enough votes."); // For simplicity, requiring more than 1 vote to execute
            proposal.executed = true;
            // Logic to execute the proposal can be added here
        }
    }

Contract description:

- `owner`: The contract owner, typically the deployer.
- `voters`: A mapping to track addresses that are allowed to vote.
- `proposals`: A mapping to store proposals created by voters.
- `Proposal` struct: Contains the description of the proposal, the number of votes it has received, and a flag indicating if it has been executed.
- `addVoter`: Allows the owner to add a voter.
- `createProposal`: Allows a voter to create a proposal.
- `vote`: Allows a voter to vote on a proposal.
- `executeProposal`: Allows the owner to execute a proposal if it has received enough votes.

## DCR Model

To vote on a proposal, it should have not been already executed. Therefore, as soon as `executeProposal` executes, it excludes `vote` activity. Furthermore, to execute a proposal it should have more than one vote. Execution of a proposal marks the end of its lifecycle too, hence, excluding `executeProposal` and `vote` after it is done.

![Governance](/svg/governance.svg)

[Download Governance source](/src/governance.xml)

[Link to the public DCR graph in DCRGraphs.net](https://dcrgraphs.net/tool/main/Graph?id=341dab9d-3bec-4164-80f1-4ee6543863f4)
