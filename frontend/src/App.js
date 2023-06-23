import './App.css';
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS } from './constants';
import FoteisonGame from './utils/FoteisonGame.json';
import WalletConnect from './components/WalletConnect'; 
import ProfileScreen from "./components/ProfileScreen";
import SquareCreation from "./components/SquareCreation";
import Square from "./components/Square";
import Nfts from "./components/NFTs";
import DiceRoll from "./components/DiceRoll";

const App = () => {

  const [initialFocusId] = useState(1275); //when user login, the initial focus is the center square
  const [currentAccount, setCurrentAccount] = useState(null);
  const [ENS, setENS] = useState(null);
  const [allNfts, setAllNfts] = useState(null);
  const [IsProfileNft, setIsProfileNft] = useState(false);
  const [profileIconNft, setProfileIconNft] = useState(null);
  const [currentSquare, setCurrentSquare] = useState(1275);
  const [currentBalance, setCurrentBalance] = useState(1000);
  const [currentQuestStatus, setCurrentQuestStatus] = useState(true);
  const [xCoordinate, setXCoordinate] = useState(null);
  const [yCoordinate, setYCoordinate] = useState(null);
  const [xCoordinateBackend, setXCoordinateBackend] = useState(null);
  const [yCoordinateBackend, setYCoordinateBackend] = useState(null);
  const [selectedSquareId, setSelectedSquareId] = useState(0);
  const [IsSquareNft, setIsSquareNft] = useState(false);
  const [squareNft, setSquareNft] = useState(null);
  const [squareDescription, setSquareDescription] = useState("");
  const [squareBalance, setSquareBalance] = useState("");
  const [balanceIncrease, setBalanceIncrease] = useState(true);
  const [transactionDescription, setTransactionDescription] = useState("");
  const [transaction, setTransaction] = useState("");
  const [showSquareCreation, setShowSquareCreation] = useState(false);
  const [showDiceRoll, setShowDiceRoll] = useState(false);
  const [idNftMap, setIdNftMap] = useState({});

  // because I don't know how to control infinite / mutable / dynamic id, I decided to restrict the id to 50 * 50 = 2500
  const squares = [];
  const gridSize = 50; 
  const centerX = Math.floor(gridSize / 2);
  const centerY = Math.floor(gridSize / 2);
  // if id is only option to find the square, UX is not good when the user create or move the square
  for (let id = 0; id < 2500; id++) {
    const x = id % gridSize - centerX;
    const y = Math.floor(id / gridSize) - centerY; 
    squares.push({ id, x, y }); // connect id and coordinates
  }
  
  const [FoteisonGameContract, setFoteisonGameContract] = useState(null);

  useEffect(() => {
    const connectToBlockchain = async () => {
      try {
        if (typeof window.ethereum !== "undefined") {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            CONTRACT_ADDRESS,
            FoteisonGame.abi,
            signer
          );
          setFoteisonGameContract(contract);
        } else {
          console.log("Please connect to MetaMask.");
        }
      } catch (error) {
        console.error("Failed to connect to the blockchain:", error);
      }
    };

    connectToBlockchain();
  }, []);

  useEffect(() => {
    const fetchAllSquareNftURLs = async () => {
      if (FoteisonGameContract && currentAccount) {
        const result = await FoteisonGameContract.getAllSquareNftURLs();
        const squareIds = result[0].map(hexValue => parseInt(hexValue));
        const squareNftURLs = result[1];
  
        const idNftMap = {};
  
        for (let i = 0; i < squareIds.length; i++) {
          const id = squareIds[i];
          const url = squareNftURLs[i];
          idNftMap[id] = url;
        }

        setIdNftMap(idNftMap); 
  
      }else{
        console.log("Please connect to MetaMask.");
      } 
    };
    if (currentAccount) {
      fetchAllSquareNftURLs();
    }
  }, [FoteisonGameContract, currentAccount]);



  //
  // button Area
  //
  const handleSquareCreationButtonClick = () => {
    console.log("Button clicked");
    setShowSquareCreation(!showSquareCreation);
  };

  const handleDiceRollButtonClick = () => {
    if (currentQuestStatus) {
    setShowDiceRoll(!showDiceRoll);
    }
  };

  const handleAlertButtonClick = () => {
    alert("You have to do your quest first!");
  };

  const handleBackToStart = () => {
    const backToStart = async () => {
      await FoteisonGameContract.backToStart();
      setCurrentSquare(1275);
      setCurrentBalance(1000);
      setCurrentQuestStatus(true);
      alert("Game has been reset!");
    }
    backToStart();
  };

  return (
    <body>
      <div className="background">
        <div className="square-zone">
          
          {squares.map((square) => (
            <Square 
              _currentAccount={currentAccount}
              _squareId={square.id}
              _coordinateX={square.x}
              _coordinateY={square.y}
              _initialFocusId={initialFocusId}
              _idNftMap={idNftMap}
              _FoteisonGameContract={FoteisonGameContract}
            />
          ))}

          {currentAccount ? (
            <>
              <div className="profile-zone">
                <div className="nfts-zone">
                  <Nfts
                    _currentAccount={currentAccount}
                    _allNfts={allNfts}
                    _setAllNfts={setAllNfts}
                    _IsProfileNft={IsProfileNft}
                    _setIsProfileNft={setIsProfileNft}
                    _profileIconNft={profileIconNft}
                    _setProfileIconNft={setProfileIconNft}
                  />
                </div>
                <div className="except-nfts-zone">
                  <ProfileScreen
                    _ENS={ENS}
                    _setENS={setENS}
                    // if ENS is not available, display the address
                    _currentAccount={currentAccount}
                    _currentSquare={currentSquare}
                    _setCurrentSquare={setCurrentSquare}
                    _currentBalance={currentBalance}
                    _setCurrentBalance={setCurrentBalance}
                    _currentQuestStatus={currentQuestStatus}
                    _setCurrentQuestStatus={setCurrentQuestStatus}
                    _FoteisonGameContract={FoteisonGameContract}
                  />
                </div>
              </div>

              <div className="after-login">
                {showSquareCreation ? (
                  <>
                  <SquareCreation
                    squares={squares}
                    _currentAccount={currentAccount}
                    _ENS={ENS}
                    _nfts={allNfts}          
                    _selectedSquareId={selectedSquareId}
                    _setSelectedSquareId={setSelectedSquareId}
                    _xCoordinate={xCoordinate}
                    _setXCoordinate={setXCoordinate}
                    _yCoordinate={yCoordinate}
                    _setYCoordinate={setYCoordinate}
                    _xCoordinateBackend={xCoordinateBackend}
                    _setXCoordinateBackend={setXCoordinateBackend}
                    _yCoordinateBackend={yCoordinateBackend}
                    _setYCoordinateBackend={setYCoordinateBackend}
                    _squareNft={squareNft}
                    _setSquareNft={setSquareNft}
                    _IsSquareNft={IsSquareNft}
                    _setIsSquareNft={setIsSquareNft}
                    _squareDescription={squareDescription}
                    _setSquareDescription={setSquareDescription}
                    _squareBalance={squareBalance}
                    _setSquareBalance={setSquareBalance}
                    _balanceIncrease={balanceIncrease}
                    _setBalanceIncrease={setBalanceIncrease}
                    _transactionDescription={transactionDescription}
                    _setTransactionDescription={setTransactionDescription}
                    _transaction={transaction}
                    _setTransaction={setTransaction}
                    _profileIconNft={profileIconNft}
                    _FoteisonGameContract={FoteisonGameContract}
                  />
                <button className="square-creation-button" onClick={handleSquareCreationButtonClick}>
                  Create Square
                </button>
                </>
                ) : (
                  <button className="square-creation-button" onClick={handleSquareCreationButtonClick}>
                    Create Square
                  </button>
                )}

                {showDiceRoll && <DiceRoll                
                  _FoteisonGameContract={FoteisonGameContract}
                  _squares={squares}
                  _currentSquare={currentSquare}
                  _currentBalance={currentBalance}
                  _currentQuestStatus={currentQuestStatus}
                  _setShowDiceRoll={setShowDiceRoll}
                />}
                {currentQuestStatus ? (
                  <button className="dice-roll-button" onClick={handleDiceRollButtonClick}>
                    Roll Dice
                  </button>
                ) : (
                  <button className="dice-roll-button" onClick={handleAlertButtonClick}>
                    Roll Dice
                  </button>
                )}

                <button className="back-to-start-button" onClick={handleBackToStart}>
                  Reset Game
                </button>
                  </div>
            </>
          ) : (
              <WalletConnect
                _currentAccount={currentAccount}
                _setCurrentAccount={setCurrentAccount}
              />
          )}


        </div>
      </div>
    </body>
  );
};

export default App;