// write the profile data to the contract
// fetch the square data from the contract
// write the new square data to the contract and emit an event
// when a user move to a new square, if the square has the events that move the user to another square or change the user's balance, then do it and emit an event(renew front-end data)
// if user move to a square that force the user to do the designated transaction, prohibit the user to roll the dice until the transaction is don

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "hardhat/console.sol";

contract FoteisonGame {
  //struct Square { creater's address, creater's icon, square's coordinates（X,Y), square's description, square's id,backend's square's id, target's square's id, nft's address, nft's chain, Quest's description, Quest's contract address, user's address, userBalanceChange; }
  struct Square{
    address createrAddress;
    string createrIcon;
    int squareCoordinateX;
    int squareCoordinateY;
    string description;
    // uint squareId;
    uint backendSquareId;
    uint targetSquareId;
    address nftAddress;
    string nftChain;
    string questDescription;
    address questContractAddress;
    uint userBalanceChange;
    address userAddress;
  }

  struct User{
    int userCoordinateX;
    int userCoordinateY;
    uint userBalance;
    bool userQuestStatus;
  }

  // array of squares
  Square[] public squares;

  // using Counters for Counters.Counter;
  // Counters.Counter private _squareId;


}