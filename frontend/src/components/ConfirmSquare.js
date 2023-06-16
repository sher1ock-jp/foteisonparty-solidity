// if user's click a square, display the square's information(data when created + other's user's name, icon) using view function of the smart contract
// the display is below the square
// if tha square that user's click is the square that user's staying, user is able to verrify the transaction required for the square)

import { React, useEffect, useState } from "react";

// just  alert("You are staying this square") for now

const ConfirmSquare = ( {_FoteisonGameContract, _id} ) => {
    
    console.log(_id);
    const [squareInfo, setSquareInfo] = useState([]);

    useEffect(() => {
        const fetchSquare = async () => {
            const square = await _FoteisonGameContract.getSquare(_id);
            setSquareInfo(square)
            console.log(square);
        };
        fetchSquare();    
    }, []);

    return (
        //display the square's information(name, icon, square's description,square's balance,square's bool, quests's contract address, quest's description)
        <div className="confirm-square">
            <div className="creater">  
                Creater：{squareInfo[1] ? squareInfo[1] : squareInfo[0]}
                <img src={squareInfo[4]} alt="" width={20} /> 
            </div>
            <div className="square-description">
                Description：{squareInfo[3]}
            </div>
            <div className="square-balance">
                Balance：{ parseInt(squareInfo[5])}
            </div>
            <div className="square-balance-bool">
                IsBalanceAdd：{squareInfo[6] ? "increase" : "decrease"}
            </div>                
            <div className="quest-description">
                QuestDescription：{squareInfo[8]}
            </div>
            <div className="quest-contract-address">
                QuestAddress：{squareInfo[7]}
            </div>
        </div>

    );  
};

export default ConfirmSquare;