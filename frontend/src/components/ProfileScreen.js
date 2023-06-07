// if wallet is connected, display user's profile by viewing the user's profile struct of the smart contract
// profile should display the user's icon, ENS(if ENS is not available, display the address), and the user's cuurent coordinates, the balance of the user's wallet in the game, the progress of the status of the user's quest
// if user do their quest, render the quest's status

import axios from "axios";

const ProfileScreen = ({ ENS, setENS, currentAccount }) => {
    const getUserENS = async () => {
      console.log("getUserENS called");
      try {
        const response = await axios.get("http://localhost:8080/UserENS", {
          params: {
            address: currentAccount,
          },
        });
  
        console.log("success");
        if (response.data.name) {
          setENS(response.data.name);
          console.log(response.data.name);
        }
      } catch (e) {
        console.log(e);
      }
    };
  
    if (!ENS) {
      getUserENS();
    }
  
    return (
      <>
        <div className="profile">
          <h2>{ENS}</h2>
        </div>
      </>
    );
  };
  
  export default ProfileScreen;


// import React, { useEffect } from "react";
// useEffect(() => {
//     getUserENS();
//   }, []);
