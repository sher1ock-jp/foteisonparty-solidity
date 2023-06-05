// manage and retain all the states of the application

import './App.css';
import axios from 'axios';
import React, { useState } from 'react';
import Square from './components/Square';
import WalletConnect from './components/WalletConnect'; 



const App = () => {
  
  const [wallet, setWallet] = useState("");
  const [chain, setChain] = useState("0x1");

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
          <WalletConnect />
        </div>
      </div>
    </div>
  );
};

export default App;