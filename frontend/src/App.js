// manage and retain all the states of the application

import './App.css';
import React, { useState } from 'react';
import WalletConnect from './components/WalletConnect'; 
import ProfileScreen from "./components/ProfileScreen";
import Square from "./components/Square";



const App = () => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [chain, setChain] = useState("0x1");
  const [profile, setProfile] = useState(null);
  const [ENS, setENS] = useState(null);
  const [nfts, setNFTs] = useState(null);

  const squares = [];

  for (let y = -49; y <= 49; y++) {
    for (let x = -49; x <= 49; x++) {
      squares.push({ x, y });
    }
  }

  return (
    <div className="background">
      <div className="scrollable-wrapper">
        <div className="square-zone">
        {squares.map((square, index) => (
            <Square key={index} x={square.x} y={square.y} />
          ))}
        {currentAccount ? (
          <ProfileScreen
            ENS={ENS}
            setENS={setENS}
            currentAccount={currentAccount}
            chain={chain}
            nfts={nfts}
            setNFTs={setNFTs}
          />
        ) : (
          <WalletConnect
            currentAccount={currentAccount}
            setCurrentAccount={setCurrentAccount}
            profile={profile}
            setProfile={setProfile}
          />
        )}
        </div>
      </div>
    </div>
  );
};

export default App;