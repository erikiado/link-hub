// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract LinkHub {
    struct Link {
        string url;
        address linker;
        uint256 timestamp;
    }
    uint256 totalLinks;
    Link[] links;
    uint256 private seed;

    mapping(address => uint256) public lastSentAt;

    event NewLink(address indexed from, uint256 timestamp, string message);


    constructor() payable {
        console.log("Yo yo, i am a contract and i am smart and i give links");
        seed = (block.timestamp + block.difficulty) % 100;
    }

    function link(string memory url) public {
        /*
         * We need to make sure the current timestamp is at least 15-minutes bigger than the last timestamp we stored
         */
        require(
            lastSentAt[msg.sender] + 30 seconds < block.timestamp,
            "Wait 30 seconds"
        );

        lastSentAt[msg.sender] = block.timestamp;

        Link memory lnk;
        lnk.url = url;
        lnk.linker = msg.sender;
        lnk.timestamp = block.timestamp;
        totalLinks += 1;
        links.push(lnk);
        console.log("%s has sent %s!", lnk.linker, url);
        seed = (block.difficulty + block.timestamp + seed) % 100;
        console.log("Random # generated: %d", seed);
        if (seed <= 50) {
            console.log("%s won!", msg.sender);
            uint256 prizeAmount = 0.0001 ether;
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than the contract has."
            );
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract.");
        }
        emit NewLink(msg.sender, block.timestamp, url);
    }

    function getTotalLinks() public view returns (uint256) {
        console.log("We have %d total links!", totalLinks);
        return totalLinks;
    }

    function getAllLinks() public view returns (Link[] memory) {
        return links;
    }
}
