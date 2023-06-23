import { React, useEffect, useState } from "react";

const ConfirmSquare = ( {_FoteisonGameContract, _squareId, _currentAccount} ) => {
    
    const [squareInfo, setSquareInfo] = useState([]);

    useEffect(() => {
        if (_currentAccount) {
          const fetchSquare = async () => {
            const square = await _FoteisonGameContract.getSquare(_squareId);
            setSquareInfo(square);
          };
          fetchSquare();
        }
    }, [_currentAccount]);

    return (
        <div className="confirm-square">
            <div className="creater">  
                Creater：{squareInfo[1] ? squareInfo[1] : squareInfo[0]}
                <img src={squareInfo[2]} alt="" width={30} /> 
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