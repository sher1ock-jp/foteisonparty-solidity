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
  //
  //structs
  ///
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
    uint squareId;
    uint userBalance;
    bool userQuestStatus;
  }
  
  //
  //mapping
  //
  mapping(uint => Square) public squareIdToSquare; // retrive the sqare data from the squareId from the front-end
  mapping(address => User) public users; // retrive the user data from the userAddress from the front-end
  mapping(uint => string) public squareIdToSquareNftURL; // array of  squareId(key) and squarenftURL(value)

  Square[] public squares;


  //StartSquare
  constructor() {
    createSquare (
      "sher1ock.eth",
      1275,
      1000000000000000,
      "Here is the start square",
      "https://thumb.ac-illust.com/cf/cf5e80947bc873ea5ce1489467c261a2_w.jpeg",
      0,
      true,
      "",
      "",
      "https://i.seadn.io/gae/LPMevOz9OE7OT-HhskCJ3h6fAIWGmD_a7VI8xU5cY6Vb_ai3llrGbae4kZ4yV02KnZOM-xcjQob4EkjaGhnereZBzYJ_7aGbHjTwSQ?w=500&auto=format"
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
      bytes(_squareNftURL).length > 0 ? _squareNftURL : "https://thumb.ac-illust.com/f5/f5ccba4a35322a98efe3b74be7fd8422_t.jpeg",
      _squareBalance,
      _IsBalanceAdd,
      bytes(_questContractAddress).length > 0 ? _questContractAddress : "temporary",
      bytes(_questDescription).length > 0 ? _questDescription : "temporary",
      new uint[](0)
    );

    // make the struct to the array
    squareIdToSquare[_squareId] = newSquare;
    squareIdToSquareNftURL[_squareId] = _squareNftURL;
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
  function moveUser( uint _diceNumber) public {
    // fetch the current squareId of the user
    uint currentSquareId = users[msg.sender].squareId;
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
  
  // when a user do a designated transaction, change the userQuestStatus to false
  
  // confirm the square data
  function getSquare(uint squareId) public view returns (Square memory) {
    return squareIdToSquare[squareId];
  }

  // confirm the NFT URL
  function getSquareNftURL(uint squareId) public view returns (string memory) {
      return squareIdToSquareNftURL[squareId];
  }
}
