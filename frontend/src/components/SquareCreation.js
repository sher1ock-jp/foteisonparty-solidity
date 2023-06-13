// if user click the button of square creation, display the inputs of the square'description, the square's image(user is able to choose it from the user's NFTs), and the square's coordinates(X and Y) that is needed for connecting the current square, destination square's coordinates(X and Y), and the transaction event
// transaction event are first: have the user's staying in this square not be allowed to proceed unless they make a designated transaction(creater is able to set the transaction). secondly: A specified amount of in-game currency can be added to or subtracted from the user's staying in this square(create isn't able to recieve the in-game currency)
// transaction and currency are not indispensable and user is able to set just one of them
// Automatically, user's(creator's) ENS(or address) is set as the owner of the square
// if user decide to create the square, write the datas to the blockchain
import React, { useState } from 'react';


const SquareCreation = ({ 
    squares,
    _currentAccount,
    _ENS,
    _NFTList,
    _selectedSquareId,
    _setSelectedSquareId,
    _squareDescription,
    _setSquareDescription,
    _squareBalance,
    _setSquareBalance,
    _transactionDescription,
    _setTransactionDescription,
    _transaction,
    _setTransaction,
    _squareStayerImage,
    _setSquareStayerImage,
    _FoteisonGameContract
    }) => {

    const handleSquareSelection = (e) => {
        const selectedCoordinates = e.target.value;
        const selectedSquare = squares.find((square) => {
          return `${square.x},${square.y}` === selectedCoordinates;
        });
        _setSelectedSquareId(selectedSquare.id);
      };
    
    return (
        // remind: if the selectedSquareId is already set, the square is not able to be selected
        <div className="square-creation">
            <div className="nft-selection"></div>
            <div className="square-id-selection">
                <label htmlFor="square-id">Square ID</label>
                <select id="square-id" value={_selectedSquareId} onChange={handleSquareSelection}>
                    {squares.map((square) => (
                        <option key={square.id} value={`${square.x},${square.y}`}>
                        {square.x}, {square.y}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default SquareCreation;