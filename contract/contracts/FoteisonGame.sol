// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract FoteisonGame {
 
  struct Square{
    // not include squareId because it is the key of the mapping
    address createrAddress;
    string createrENS;
    string createrIcon;
    string squareDescription;
    string squareNftURL;
    uint squareBalance;
    bool IsBalanceAdd;
    string questContractAddress;
    string questDescription;
    uint[] adjacentSquareIds; // when the a square that connects this square is created, adjacentSquareIds is updated
  }
  struct User{
    bool initialized;
    uint squareId;
    uint userBalance;
    bool userQuestStatus;
  }

  mapping(uint => Square) public squareIdToSquare; 
  mapping(address => User) public users; 
  mapping(uint => string) public squareIdToSquareNftURL; // for rendering all the NFTs to the each square

  Square[] public squares;

  constructor() {
    createSquare (
      // start square data
      "sher1ock.eth",
      1275,
      1000000000000000,
      "Here is the start square",
      "https://thumb.ac-illust.com/cf/cf5e80947bc873ea5ce1489467c261a2_w.jpeg",
      0,
      true,
      "",
      "",
      ""
    );
    squareIdToSquareNftURL[1275] = "https://thumb.ac-illust.com/cf/cf5e80947bc873ea5ce1489467c261a2_w.jpeg";
  }

  function createSquare(
    string memory _createrENS,
    uint _squareId,
    uint _backendSquareId, // give _backendSquareId to the function of updateAdjacentSquareIds
    string memory _squareDescription,
    string memory _squareNftURL,
    uint _squareBalance,
    bool _IsBalanceAdd,
    string memory _questContractAddress,
    string memory _questDescription,
    string memory _createrIcon 
  ) public {
    Square memory newSquare = Square(
      msg.sender,
      _createrENS,
      _createrIcon,
      _squareDescription,
      _squareNftURL,
      _squareBalance,
      _IsBalanceAdd,
      bytes(_questContractAddress).length > 0 ? _questContractAddress : "",
      bytes(_questDescription).length > 0 ? _questDescription : "",
      new uint[](0)
    );

    // make the struct to the array
    squareIdToSquare[_squareId] = newSquare;
    squareIdToSquareNftURL[_squareId] = _squareNftURL;
    squares.push(newSquare);
    updateAdjacentSquareIds( _backendSquareId, _squareId);
  }

  function createUser(
    uint _squareId,
    uint _userBalance,
    bool _userQuestStatus
  ) public {
    User memory newUser = User(
      true,
      _squareId,
      _userBalance,
      _userQuestStatus
    );
    users[msg.sender] = newUser;
  }

  // // create a user data when user roll a dice
  function updateUser(
    uint _squareId,
    uint _userBalance,
    bool _userQuestStatus
  ) public {
    // if the user is new, create a user data
    if (!users[msg.sender].initialized){
      createUser(_squareId, _userBalance, _userQuestStatus);
    }

    if (squareIdToSquare[_squareId].squareBalance > 0){
      bool sufficientBalance = calculateUserBalance(_squareId);
      if (!sufficientBalance) {
        return;  // If balance is insufficient, stop processing
      }
    }

    if (keccak256(abi.encodePacked(squareIdToSquare[_squareId].questContractAddress)) != keccak256(abi.encodePacked(""))) {
      users[msg.sender].userQuestStatus = false;
    }
  }

  event InsufficientBalance();

  function calculateUserBalance(uint _squareId) internal returns(bool) {
    uint userBalance = users[msg.sender].userBalance;
    uint squareBalance = squareIdToSquare[_squareId].squareBalance;

    if (squareIdToSquare[_squareId].IsBalanceAdd){
      uint newUserBalance = userBalance + squareBalance;
      users[msg.sender].userBalance = newUserBalance;
      return true;
    }else{
      if (userBalance > squareBalance){
        uint newUserBalance = userBalance - squareBalance;
        users[msg.sender].userBalance = newUserBalance;
        return true;
      }else{
        emit InsufficientBalance();
        return false;
      }
    }
  }

  function backToStart() public {
    users[msg.sender].initialized = false;
    users[msg.sender].squareId = 1275;
    users[msg.sender].userBalance = 1000;
    users[msg.sender].userQuestStatus = true;
  }
  

  // update the adjacentSquareIds of the square when a square is created
  function updateAdjacentSquareIds(uint _backendSquareId, uint _squareId ) public {
    squareIdToSquare[_backendSquareId].adjacentSquareIds.push(_squareId);
  }

  // confirm the square's adjacentSquareIds
  function getAdjacentSquareIds(uint squareId) public view returns (uint[] memory) {
    return squareIdToSquare[squareId].adjacentSquareIds;
  } 

  function moveUser(uint _diceNumber, uint _currentSquareId) public view returns (uint[] memory) {
    uint[] memory connectedSquareIds = squareIdToSquare[_currentSquareId].adjacentSquareIds;

    if (connectedSquareIds.length == 0) {
        return new uint[](0);
    }

    uint[] memory selectedSquareIds = new uint[](_diceNumber);
    uint actualMoves = 0; // track actual number of moves made

    for (uint i = 0; i < _diceNumber; i++) {
        if (connectedSquareIds.length == 0) {
            break;
        }

        uint randomSquareIndex = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, i))) % connectedSquareIds.length;
        uint randomSquareId = connectedSquareIds[randomSquareIndex];
        selectedSquareIds[i] = randomSquareId;
        actualMoves++; // increment actualMoves

        connectedSquareIds = squareIdToSquare[randomSquareId].adjacentSquareIds;
    }

    // Create a new array with actual size
    uint[] memory actualSelectedSquareIds = new uint[](actualMoves);
    for (uint i = 0; i < actualMoves; i++) {
        actualSelectedSquareIds[i] = selectedSquareIds[i];
    }

    return actualSelectedSquareIds;
}

  // when user login, return the user data to the front-end 
  function confirmUser() public view returns (User memory) {
    return users[msg.sender];
  }

  // confirm the square data
  function getSquare(uint squareId) public view returns (Square memory) {
    return squareIdToSquare[squareId];
  }

  // confirm the NFT URL
  function getSquareNftURL(uint squareId) public view returns (string memory) {
      return squareIdToSquareNftURL[squareId];
  }

  //  for rendering all the NFTs to the each square
  function getAllSquareNftURLs() public view returns (uint[] memory, string[] memory) {
    uint[] memory ids = new uint[](2500); 
    string[] memory urls = new string[](2500); 
    uint count = 0;

    for (uint i = 0; i < 2500; i++) {
        uint squareId = i;
        string memory url = squareIdToSquareNftURL[squareId];
        if (bytes(url).length > 0) {
            ids[count] = squareId;
            urls[count] = url;
            count++;
        }
    }
    
    uint[] memory filteredIds = new uint[](count);
    string[] memory filteredUrls = new string[](count);
    for (uint i = 0; i < count; i++) {
        filteredIds[i] = ids[i];
        filteredUrls[i] = urls[i];
    }

    return (filteredIds, filteredUrls);
  }
}
