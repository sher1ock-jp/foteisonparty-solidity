// if user had already done the transaction(verified), user is able to roll the dice
// if the current square doesn't have the connected square, console.log("There is no square connected to this square")
// if the current square has the prular connected square, romdomly choose one of them
// if the number is over the number of the connected square, move the user to the end of the connected square
// finally, display the information of the square that user's moved to

import React, { useState } from 'react';

const DiceRoll = ( {_currentAccount, _FoteisonGameContract, _currentSquare, _squares} ) => {
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
        if (squareIds.length === 0) {
          console.log("There is no square connected to this square");
        } else {
          for (let i = 0; i < squareIds.length; i++) {
              let targetId = parseInt(squareIds[i]);
              let targetSquare = _squares.find(square => square.id === targetId);
              if (!targetSquare) {
                console.log(`No square with id: ${targetId}`);
              } else {
                console.log(targetSquare.x, targetSquare.y); 
              }
          }
        }
        // console the last id of the square array
        console.log(squareIds[squareIds.length - 1]);
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
