// if wallet is connected, display user's profile by viewing the user's profile struct of the smart contract
// profile should display the user's icon, ENS(if ENS is not available, display the address), and the user's cuurent coordinates, the balance of the user's wallet in the game, the progress of the status of the user's quest
// if user do their quest, render the quest's status

import axios from "axios";

const ProfileScreen = ({ _ENS, _setENS, _currentAccount, _id, _currentBalance, _currentQuestStatus }) => {

    const gridSize = 50;
    const centerX = Math.floor(gridSize / 2);
    const centerY = Math.floor(gridSize / 2);
    const x = _id % gridSize - centerX;
    const y = Math.floor( _id / gridSize) - centerY;

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
  
    if (! _ENS) {
      console.log("getUserENS called");
      getUserENS();
    }
  
    return (
      <>
        <div className="profile-ens">
          {_ENS}
        </div>
        <div className="profile-eachInformaton">
          <p>Coordinates: {x}, {y}</p>
          <p>Crypulu: {_currentBalance}</p>
          <p>Quest: {_currentQuestStatus}</p>
        </div>
      </>
    );
  };
  
  export default ProfileScreen;


// import React, { useEffect } from "react";
// useEffect(() => {
//     getUserENS();
//   }, []);
