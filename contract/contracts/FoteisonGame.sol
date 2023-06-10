// write the user data to the contract
// fetch the square data from the contract
// write the new square data to the contract and emit an event
// when a user move to a new square, if the square has the events that move the user to another square or change the user's balance, then do it and emit an event(renew front-end data)
// if user move to a square that force the user to do the designated transaction, prohibit the user to roll the dice until the transaction is don

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// import "@openzeppelin/contracts/utils/Counters.sol";
// import "@openzeppelin/contracts/utils/Strings.sol";
import "hardhat/console.sol";

contract FoteisonGame {
  struct Square{
    address createrAddress;
    string createrIcon;
    string description;
    // when the a square that connects this square is created, adjacentSquareIds is updated
    uint[] adjacentSquareIds;
    // if the function of move the user to other square is developed, make effective
    // uint targetSquareId;
    string nftURL;
    string questDescription;
    address questContractAddress;
    uint userBalanceChange;
  }
  struct User{
    uint squareId;
    uint userBalance;
    bool userQuestStatus;
  }
    // retrive the sqare data from the squareId from the front-end
  mapping(uint => Square) public squareIdToSquare;
  // retrive the user data from the userAddress from the front-end
  mapping(address => User) public users;

  // array of squares
  Square[] public squares;

  // initial square
  constructor() {
    createSquare(
      0,
      "NEKOPULU",
      "NEMUI",
      0,
      "nftURL",
      "questDescription",
      address(0x01d48ea6a728f91b74B0E2F36D9AE40128383569),
      0
    );
  }

  function createSquare(
    // use with array
    uint _squareId,
    // struct
    string memory _createrIcon,
    string memory _description,
    // give _backendSquareId to the function of updateAdjacentSquareIds
    uint _backendSquareId,
    // uint _targetSquareId,
    string memory _nftURL,
    string memory _questDescription,
    address _questContractAddress,
    uint _userBalanceChange
  ) public {
    Square memory newSquare = Square(
      msg.sender,
      _createrIcon,
      _description,
      new uint[](0),
      _nftURL,
      _questDescription,
      _questContractAddress,
      _userBalanceChange
      // address(0),
    );

    // make the struct to the array
    squareIdToSquare[_squareId] = newSquare;
    squares.push(newSquare);
    updateAdjacentSquareIds( _backendSquareId, _squareId);

    // return newSquareId;
  }

  // update the adjacentSquareIds of the square
  function updateAdjacentSquareIds(uint _backendSquareId, uint _squareId ) public {
    squareIdToSquare[_backendSquareId].adjacentSquareIds.push(_squareId);
  }

  // confirm the square data
  function getSquare(uint squareId) public view returns (Square memory) {
    return squareIdToSquare[squareId];
  }
}