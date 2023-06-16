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
  const [allNfts, setAllNFTs] = useState(null);
  const [showProfileNFT, setProfileShowNFT] = useState(false);
  const [profileNFTList, setProfileNFTList] = useState(null);
  // below states are for tha game
  const [showSquareCreation, setShowSquareCreation] = useState(false);
  const [currentSquare, setCurrentSquare] = useState(1275);
  const [currentBalance, setCurrentBalance] = useState(1000);
  const [currentQuestStatus, setCurrentQuestStatus] = useState(true);
  const [xCoordinate, setXCoordinate] = useState(0);
  const [yCoordinate, setYCoordinate] = useState(0);
  const [xCoordinateBackend, setXCoordinateBackend] = useState(0);
  const [yCoordinateBackend, setYCoordinateBackend] = useState(0);
  const [selectedSquareId, setSelectedSquareId] = useState(0);
  const [showSquareNFT, setShowSquareNFT] = useState(false);
  const [squareNFTList, setSquareNFTList] = useState(null);
  const [squareDescription, setSquareDescription] = useState("");
  const [squareBalance, setSquareBalance] = useState("");
  const [balanceIncrease, setBalanceIncrease] = useState(true);
  const [transactionDescription, setTransactionDescription] = useState("");
  const [transaction, setTransaction] = useState("");
  const [squareStayerImage, setSquareStayerImage] = useState("");
  // for nft rendering
  const [idUrlMap, setIdUrlMap] = useState({});

  //
  // enalbe connection to the blockchain
  //
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const FoteisonGameContract = new ethers.Contract(
    CONTRACT_ADDRESS,
    FoteisonGame.abi,
    signer
  );
  
  //
  //square generation
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
  //buttons on the top of the screen
  //
  const handleSquareCreationButtonClick = () => {
    console.log("Button clicked");
    setShowSquareCreation(!showSquareCreation);
  };

  //
  // for nft rendering
  //

  useEffect(() => {
    const fetchAllSquareNftURLs = async () => {
      const result = await FoteisonGameContract.getAllSquareNftURLs();
      const numericIds = result[0].map(hexValue => parseInt(hexValue));
      const squareNftURLs = result[1]

      const idUrlMap = {};

      for (let i = 0; i < numericIds.length; i++) {
        const id = numericIds[i];
        const url = squareNftURLs[i];
        idUrlMap[id] = url;
      }
      setIdUrlMap(idUrlMap);
      console.log(idUrlMap);
    };

    fetchAllSquareNftURLs();
  }, []);

  return (
    <body>
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
                _FoteisonGameContract={FoteisonGameContract}
                _idUrlMap={idUrlMap}
              />
            ))}
            {currentAccount ? (
              <div className="profile-zone">
                <div className="nfts">
                  <Nfts
                    cur_rentAccount={currentAccount}
                    _nfts={allNfts}
                    _setNFTs={setAllNFTs}
                    _showNFT={showProfileNFT}
                    _setShowNFT={setProfileShowNFT}
                    _NFTList={profileNFTList}
                    _setNFTList={setProfileNFTList}
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
            ) : (
                <WalletConnect
                  _currentAccount={currentAccount}
                  _setCurrentAccount={setCurrentAccount}
                />
            )}
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
                    _squareNFTList={squareNFTList}
                    _setSquareNFTList={setSquareNFTList}
                    _showSquareNFT={showSquareNFT}
                    _setShowSquareNFT={setShowSquareNFT}
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
                    _profileNFTList={profileNFTList}
                    // NFT image of squareStayer
                    _squareStayerImage={squareStayerImage}
                    _setSquareStayerImage={setSquareStayerImage}    
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
          </div>
        </div>
      </div>
    </body>
  );
};

export default App;