// if wallet is connected, display user's profile by viewing the user's profile struct of the smart contract
// profile should display the user's icon, ENS(if ENS is not available, display the address), and the user's cuurent coordinates, the balance of the user's wallet in the game, the progress of the status of the user's quest
// if user do their quest, render the quest's status

import axios from "axios";
import { useEffect } from "react";

const ProfileScreen = ({ _ENS, _setENS, _currentAccount, _currentSquare, _setCurrentSquare, _currentBalance, _setCurrentBalance, _currentQuestStatus, _setCurrentQuestStatus, _FoteisonGameContract }) => {

    const confirmUser = async () => {
      // if user exists, update the user's information
      const user = await _FoteisonGameContract.confirmUser();
      console.log(user)
      console.log(parseInt(user[1]))
      if(parseInt(user[1]) !== 0 && user[2] !== 0 && user[3] !==false ) {
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
    
    useEffect(() => {
      confirmUser();
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
          {/* <button onClick={confirmUser}>confirm</button> */}
        </div>
      </>
    );
  };
  
export default ProfileScreen;


// import React, { useEffect } from "react";
// useEffect(() => {
//     getUserENS();
//   }, []);
