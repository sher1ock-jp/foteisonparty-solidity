// if wallet is connected, display user's profile by viewing the user's profile struct of the smart contract
// profile should display the user's icon, ENS(if ENS is not available, display the address), and the user's cuurent coordinates, the balance of the user's wallet in the game, the progress of the status of the user's quest
// if user do their quest, render the quest's status

import React, { useState, useEffect } from "react";
import axios from "axios";

const ProfileScreen = () => {

    const [ENS, setENS] = useState(null);

    async function getUserENS(){
        try{

            const response = await axios.get("http://localhost:8080/UserENS",{
                params: {
                    address: "0x1CA2E50Ba6E3E62f7b108BD32A6BD9e71a82cD77",
                },
            });

            if(response.data.name){
                setENS(response.data.name);
            }
        }catch(e){
            console.log(e);
        }
    }

    useEffect(() => {
        getUserENS();
      }, []);

    return  (
        <div className="profile">
            <h2>{ENS ? ENS : ""}</h2>
        </div> 
    );
};

export default ProfileScreen;