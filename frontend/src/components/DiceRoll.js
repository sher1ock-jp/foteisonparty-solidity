// if user had already done the transaction(verified), user is able to roll the dice
// if the current square doesn't have the connected square, console.log("There is no square connected to this square")
// if the current square has the prular connected square, romdomly choose one of them
// if the number is over the number of the connected square, move the user to the end of the connected square
// finally, display the information of the square that user's moved to

import React, { useState } from 'react';

const DiceRoll = ( {_currentAccount, _FoteisonGameContract, _squares, _currentSquare, _currentBalance, _currentQuestStatus, _setCurrentSquare, _setCurrentBalance, _setCurrentQuestStatus} ) => {
  const [rolling, setRolling] = useState(false);

  const rollDice = async () => {
    if (rolling) return;
    setRolling(true);
  
    setTimeout(async () => {
        try {
          const value = Math.floor(Math.random() * 6) + 1;
          setRolling(false);
          alert(`Dice Value: ${value}`);
    
          const squareIds = await _FoteisonGameContract.moveUser(value, _currentSquare);
          console.log(value);
          console.log(_currentSquare);
          // if square array is empty, console.log("There is no square connected to this square")
          let coords = [];  // to store coordinates
          if (squareIds.length === 0) {
            console.log("There is no square connected to this square");
          } else {
            for (let i = 0; i < squareIds.length; i++) {
              let targetId = parseInt(squareIds[i]);
              console.log(targetId);
              let targetSquare = _squares.find(square => square.id === targetId);
              if (!targetSquare) {
                console.log(`No square with id: ${targetId}`);
              } else {
                console.log(targetSquare.x, targetSquare.y);
                coords.push(`(${targetSquare.x}, ${targetSquare.y})`);  // add coordinates to the array
              }
            }
          }

          // not set currentSquare,  this is temporary
          const squareId = parseInt(squareIds[squareIds.length - 1]);

          const updateUserInfo = async () => {
            const user = await _FoteisonGameContract.updateUser(squareId, _currentBalance, _currentQuestStatus);
            return user;
          }
      
          const userUpdated = await updateUserInfo();
      
          // If the updateUser transaction was successful, userUpdated will be truthy. 
          // If it was not successful (due to InsufficientBalance event being emitted, for example), it will be falsy.
          if (!userUpdated) {
            alert('移動先のマスの残高が不足しており、マスを移動できませんでした！');
            return;
          }
      
          const confirmUser = async () => {
            const user = await _FoteisonGameContract.confirmUser();
            _setCurrentSquare(parseInt(user[1]));
            _setCurrentBalance(parseInt(user[2]));
            _setCurrentQuestStatus(user[3]);
            console.log(user)
          }
      
          await confirmUser();
          
          if (coords.length > 0) {  // if there are coordinates
            alert(`Coordinates: ${coords.join(" -> ")}`);  // join and alert the coordinates
          }
        } catch (error) {
          console.log(`Error: ${error}`);
        }
        }, 2000);
    };
    
  return (
    <div className='dice-roll'>
      <div className={`dice ${rolling ? 'rolling' : ''}`} onClick={rollDice}>
        <div className="side front">
          <div className="dot dot-center" />
        </div>
        <div className="side back">
          <div className="dot dot-center" />
          <div className="dot dot-top-left" />
          <div className="dot dot-bottom-right" />
        </div>
        <div className="side right">
          <div className="dot dot-top-left" />
          <div className="dot dot-bottom-right" />
          <div className="dot dot-top-right" />
          <div className="dot dot-bottom-left" />
        </div>
        <div className="side left">
          <div className="dot dot-top-left" />
          <div className="dot dot-bottom-right" />
          <div className="dot dot-top-right" />
          <div className="dot dot-bottom-left" />
        </div>
        <div className="side top">
          <div className="dot dot-center" />
          <div className="dot dot-top-left" />
          <div className="dot dot-top-right" />
          <div className="dot dot-bottom-left" />
          <div className="dot dot-bottom-right" />
        </div>
        <div className="side bottom">
          <div className="dot dot-center" />
          <div className="dot dot-top-left" />
          <div className="dot dot-top-right" />
          <div className="dot dot-bottom-left" />
          <div className="dot dot-bottom-right" />
        </div>
      </div>
      <button className="roll-button" onClick={rollDice} disabled={rolling}>
        Roll Dice
      </button>
    </div>
  );
};

export default DiceRoll;
