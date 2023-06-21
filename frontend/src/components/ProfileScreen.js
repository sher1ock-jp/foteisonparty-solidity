// if wallet is connected, display user's profile by viewing the user's profile struct of the smart contract
// profile should display the user's icon, ENS(if ENS is not available, display the address), and the user's cuurent coordinates, the balance of the user's wallet in the game, the progress of the status of the user's quest
// if user do their quest, render the quest's status

import axios from "axios";
import { useEffect, useState } from "react";

const ProfileScreen = ({ _ENS, _setENS, _currentAccount, _currentSquare, _setCurrentSquare, _currentBalance, _setCurrentBalance, _currentQuestStatus, _setCurrentQuestStatus, _FoteisonGameContract }) => {

    const [transactionHash, setTransactionHash] = useState('');
    const [showInput, setShowInput] = useState(false);

    const renewInfo = async () => {
      // if user exists, update the user's information
      const user = await _FoteisonGameContract.confirmUser();
      console.log(user)
      console.log(parseInt(user[1]));
      console.log(parseInt(user[2]));
      console.log(user[3]);

      if(user[0] === true) {
        _setCurrentSquare(parseInt(user[1]));
        _setCurrentBalance(parseInt(user[2]));
        _setCurrentQuestStatus(user[3]);
      }
    }

    const getUserENS = async () => {
      console.log("getUserENS called");
      try {
        const response = await axios.get("http://localhost:8080/UserENS", {
          params: {
            address: _currentAccount,
          },
        });
  
        console.log("success");
        if (response.data.name) {
          _setENS(response.data.name);
          console.log(response.data.name);
        }
      } catch (e) {
        console.log(e);
      }
    };

    const verifyTxn = async ( _transactionHash ) => {
      try {
        const response = await axios.get("http://localhost:8080/confirmTransaction", {
          params: {
            transactionHash: _transactionHash
      },
      });
      
      console.log(response.data);

      if (response.data) {
        console.log("Verified. You can roll the dice!");
        _setCurrentQuestStatus(true);
      }else{
        console.log("Not verified. You can't roll the dice!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleShowInput = () => {
    setShowInput(true);
  };

  const handleInputChange = (e) => {
    setTransactionHash(e.target.value);
  };

  const handleInputSubmit = async () => {
    await verifyTxn(transactionHash);
    setShowInput(false);
  };


    
    useEffect(() => {
      renewInfo();
      getUserENS();
    }, []);

    // if (! _ENS) {
    //   console.log("getUserENS called");
    //   getUserENS();
    // }

    const gridSize = 50;
    const centerX = Math.floor(gridSize / 2);
    const centerY = Math.floor(gridSize / 2);
    const x = _currentSquare %  gridSize - centerX;
    const y = Math.floor( _currentSquare / gridSize) - centerY;
  
    return (
      <>
        <div className="profile-ens">
          {_ENS ? _ENS : _currentAccount}
        </div>
        <div className="profile-eachInformaton">
          <p>Coordinates: {x}, {y}</p>
          <p>Crypulu: {_currentBalance}</p>
          <p>Quest: {_currentQuestStatus ? "no quest" : "do quest"}</p>
          <button onClick={renewInfo}>Renew Info</button>
        <button className="verify-button" onClick={handleShowInput}>
          Verify Transaction
        </button>
        {showInput && (
          <div>
            <input type="text" value={transactionHash} onChange={handleInputChange} />
            <button onClick={handleInputSubmit}>OK</button>
          </div>
        )}

        </div>
      </>
    );
  };
  
export default ProfileScreen;


// import React, { useEffect } from "react";
// useEffect(() => {
//     getUserENS();
//   }, []);
