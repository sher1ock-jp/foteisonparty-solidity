// manage and retain all the states of the application

import './App.css';
import React, { useState } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS } from './constants';
import FoteisonGame from './utils/FoteisonGame.json';
import WalletConnect from './components/WalletConnect'; 
import ProfileScreen from "./components/ProfileScreen";
// import SquareCreation from "./components/SquareCreation";
import Square from "./components/Square";
import Nfts from "./components/NFTs";



const App = () => {
  const [currentAccount, setCurrentAccount] = useState(null);
  // const [profile, setProfile] = useState(null);
  const [ENS, setENS] = useState(null);
  const [nfts, setNFTs] = useState(null);
  const [showNFT, setShowNFT] = useState(false);
  const [NFTList, setNFTList] = useState(null);
  // below states are for SquareCreation
  const [squareDescription, setSquareDescription] = useState("");
  const [squareBalance, setSquareBalance] = useState("");
  const [transactionDescription, setTransactionDescription] = useState("");
  const [transaction, setTransaction] = useState("");
  // NFT image of squareStayer
  const [squareStayer, setSquareStayer] = useState("");
    
    

  const squares = [];

  for (let id = 0; id < 2500; id++) {
    squares.push({ id });
  }

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
            <Square key={square.id} id={square.id} />
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
                  _currentAccount={currentAccount}
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
        {/* { currentAccount && (
          <SquareCreation
            squares={squares}
            _currentAccount={currentAccount}
            _ENS={ENS}
            _NFTList={NFTList}          
            _squareDescription={squareDescription}
            _setSquareDescription={setSquareDescription}
            _squareBalance={squareBalance}
            _setSquareBalance={setSquareBalance}
            _transactionDescription={transactionDescription}
            _setTransactionDescription={setTransactionDescription}
            _transaction={transaction}
            _setTransaction={setTransaction}
            // NFT image of squareStayer
            _squareStayer={squareStayer}
            _setSquareStayer={setSquareStayer}    
            _FoteisonGameContract={FoteisonGameContract}
          />
        )} */}
        </div>
      </div>
    </div>
  );
};

export default App;