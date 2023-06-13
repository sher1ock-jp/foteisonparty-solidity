// manage and retain all the states of the application

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



const App = () => {
  const [initialFocusId, setInitialFocusId] = useState(1275);
  // for backend
  const [currentAccount, setCurrentAccount] = useState(null);
  const [ENS, setENS] = useState(null);
  const [nfts, setNFTs] = useState(null);
  const [showNFT, setShowNFT] = useState(false);
  const [NFTList, setNFTList] = useState(null);
  // below states are for tha game
  const [showSquareCreation, setShowSquareCreation] = useState(false);
  const [currentSquare, setCurrentSquare] = useState(1275);
  const [currentBalance, setCurrentBalance] = useState(1000);
  const [currentQuestStatus, setCurrentQuestStatus] = useState(true);
  const [selectedSquareId, setSelectedSquareId] = useState(0);
  const [squareDescription, setSquareDescription] = useState("");
  const [squareBalance, setSquareBalance] = useState("");
  const [transactionDescription, setTransactionDescription] = useState("");
  const [transaction, setTransaction] = useState("");
  const [squareStayerImage, setSquareStayerImage] = useState("");
  // const [profile, setProfile] = useState(null);
  
  //
  //square
  //
  const squares = [];
  const gridSize = 50; 
  const centerX = Math.floor(gridSize / 2);
  const centerY = Math.floor(gridSize / 2);

  for (let id = 0; id < 2500; id++) {
    const x = id % gridSize - centerX;
    const y = Math.floor(id / gridSize) - centerY; 
    squares.push({ id, x, y });
  }

  //
  //create
  //
  const handleSquareCreationButtonClick = () => {
    console.log("Button clicked");
    setShowSquareCreation(!showSquareCreation);
  };

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const FoteisonGameContract = new ethers.Contract(
    CONTRACT_ADDRESS,
    FoteisonGame.abi,
    signer
  );

  return (
    <div className="background">
      <div className="zone-wrapper">
        <div className="square-zone">
          {squares.map((square) => (
            <Square 
              key={square.id}
              id={square.id}
              x={square.x}
              y={square.y}
              initialFocusId={initialFocusId}
            />
          ))}
          {currentAccount ? (
            <div className="profile-zone">
              <div className="nfts-ens-container">
                <div className="nfts">
                  <Nfts
                    cur_rentAccount={currentAccount}
                    _nfts={nfts}
                    _setNFTs={setNFTs}
                    _showNFT={showNFT}
                    _setShowNFT={setShowNFT}
                    _NFTList={NFTList}
                    _setNFTList={setNFTList}
                  />
                </div>
                <div className="ens">
                  <ProfileScreen
                    _ENS={ENS}
                    _setENS={setENS}
                    // if ENS is not available, display the address
                    _currentAccount={currentAccount}
                    _id={currentSquare}
                    _currentBalance={currentBalance}
                    _currentQuestStatus={currentQuestStatus}
                  />
                </div>
              </div>
            </div>
          ) : (
              <WalletConnect
                _currentAccount={currentAccount}
                _setCurrentAccount={setCurrentAccount}
              />
          )}
            {showSquareCreation ? (
              <>
              <div className="square-creation">
                <SquareCreation
                  squares={squares}
                  _currentAccount={currentAccount}
                  _ENS={ENS}
                  _NFTList={NFTList}          
                  _selectedSquareId={selectedSquareId}
                  _setSelectedSquareId={setSelectedSquareId}
                  _squareDescription={squareDescription}
                  _setSquareDescription={setSquareDescription}
                  _squareBalance={squareBalance}
                  _setSquareBalance={setSquareBalance}
                  _transactionDescription={transactionDescription}
                  _setTransactionDescription={setTransactionDescription}
                  _transaction={transaction}
                  _setTransaction={setTransaction}
                  // NFT image of squareStayer
                  _squareStayerImage={squareStayerImage}
                  _setSquareStayerImage={setSquareStayerImage}    
                  _FoteisonGameContract={FoteisonGameContract}
                />
              </div>
              <button className="square-creation-button" onClick={handleSquareCreationButtonClick}>
                Create Square
              </button>
              </>
            ) : (
              <button className="square-creation-button" onClick={handleSquareCreationButtonClick}>
                Create Square
              </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default App;