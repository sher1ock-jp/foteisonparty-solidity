// if user's click a square, display the square's information(data when created + other's user's name, icon) using view function of the smart contract
// the display is below the square
// if tha square that user's click is the square that user's staying, user is able to verrify the transaction required for the square)

import { React, useEffect, useState } from "react";

// just  alert("You are staying this square") for now

const ConfirmSquare = ( {_FoteisonGameContract, _id} ) => {
    
    const [squareInfo, setSquareInfo] = useState({
        name: "",
        icon: "",
        description: "",
        balance: "",
        isBool: false,
        questContractAddress: "",
        questDescription: ""
      });

    useEffect(() => {
        const fetchSquare = async () => {
            const square = await _FoteisonGameContract.getSquare(_id);
            setSquareInfo(square)
        };
        fetchSquare();    
    }, []);

    return (
        //display the square's information(name, icon, square's description,square's balance,square's bool, quests's contract address, quest's description)
        <div className="confirm-square-creater">
            <p>{squareInfo[1]}</p>
            <img src={squareInfo[2]} alt="Square Icon" />
            <p>{squareInfo[3]}</p>
            <p>Balance: {squareInfo[5]}</p>
            <p>{squareInfo[6].isBool ? 'Increase' : 'Decrease'}</p>
            <p>Quest Contract: {squareInfo[7]}</p>
            <p>Quest Description: {squareInfo[8]}</p>
        </div>

    );  
};

export default ConfirmSquare;