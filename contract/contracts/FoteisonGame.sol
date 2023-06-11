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
    uint squareBalance;
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

  Square[] public squares;

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
    uint _squareId,
    string memory _createrIcon,
    string memory _description,
    // give _backendSquareId to the function of updateAdjacentSquareIds
    uint _backendSquareId,
    string memory _nftURL,
    string memory _questDescription,
    address _questContractAddress,
    uint _squareBalance
  ) public {
    Square memory newSquare = Square(
      msg.sender,
      _createrIcon,
      _description,
      new uint[](0),
      bytes(_nftURL).length > 0 ? _nftURL : "DEFAULT_NFT_URL",
      bytes(_questDescription).length > 0 ? _questDescription : "DEFAULT_QUEST_DESCRIPTION",
      _questContractAddress != address(0) ? _questContractAddress : address(0),
      _squareBalance
    );

    // make the struct to the array
    squareIdToSquare[_squareId] = newSquare;
    squares.push(newSquare);
    updateAdjacentSquareIds( _backendSquareId, _squareId);
  }

  // when user login, return the user data to the front-end 
  function createUser() public returns (uint squareId, uint userBalance, bool userQuestStatus){
    if (users[msg.sender].squareId != 0){
      return(
        users[msg.sender].squareId,
        users[msg.sender].userBalance,
        users[msg.sender].userQuestStatus
      );
      }else{
        User memory newUser = User(
          0,
          0,
          true
        );
        users[msg.sender] = newUser;
    }
  }

  // update the adjacentSquareIds of the square when a square is created
  function updateAdjacentSquareIds(uint _backendSquareId, uint _squareId ) public {
    squareIdToSquare[_backendSquareId].adjacentSquareIds.push(_squareId);
  }

  event NoConnectedSquares();
  event SquareSelected(uint[] selectedSquareIds);
  event UserBalanceChanged(uint newUserBalance);
  event InsufficientBalance();

  // when user roll a dice, fetch the current squareId of the user and fetch all the connected squareIds from the squareId
  // if connected squareIds has plural squareIds, randomly choose one of them and cotinue this process until the number of dice
  // return the squareId that the user move to
  function moveUser(uint _squareId, uint _diceNumber) public {
    // fetch the current squareId of the user
    uint currentSquareId = users[msg.sender]._squareId;
    // fetch all the connected squareIds from the squareId
    uint[] memory connectedSquareIds = squareIdToSquare[currentSquareId].adjacentSquareIds;
    // Create an array to store the selected squareIds
    uint[] memory selectedSquareIds = new uint[](_diceNumber);
    
    // if connected squareIds has plural squareIds, randomly choose one of them and cotinue this process until the number of dice
    if (connectedSquareIds.length == 0){
      emit NoConnectedSquares();
    }else{
      for(uint i = 0; i < _diceNumber; i++){
        if (connectedSquareIds.length == 0){
          emit SquareSelected(selectedSquareIds);
        }else{
        uint randomSquareIndex = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, i))) % connectedSquareIds.length;
        uint randomSquareId = connectedSquareIds[randomSquareIndex];
        selectedSquareIds[i] = randomSquareId;
        connectedSquareIds = squareIdToSquare[randomSquareId].adjacentSquareIds;
        }
      }
      emit SquareSelected(selectedSquareIds);
    }
  }

  // after a user move to a new square, update the user balance
  function caluculateUserBalance(uint _squareId) internal {
    uint userBalance = users[msg.sender].userBalance;
    uint squareBalance = squareIdToSquare[_squareId].squareBalance;
    if (userBalance > squareBalance){
      uint newUserBalance = userBalance - squareBalance;
      users[msg.sender].userBalance = newUserBalance;
      emit UserBalanceChanged(newUserBalance);
    }else{
      emit InsufficientBalance();
      backToStart();
    }
  }  
  
  function backToStart() public {
    users[msg.sender].squareId = 0;
    users[msg.sender].userBalance = 1000;
    users[msg.sender].userQuestStatus = true;
    }
  
  // confirm the square data
  function getSquare(uint squareId) public view returns (Square memory) {
    return squareIdToSquare[squareId];
  }
}