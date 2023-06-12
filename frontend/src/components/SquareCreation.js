// if user click the button of square creation, display the inputs of the square'description, the square's image(user is able to choose it from the user's NFTs), and the square's coordinates(X and Y) that is needed for connecting the current square, destination square's coordinates(X and Y), and the transaction event
// transaction event are first: have the user's staying in this square not be allowed to proceed unless they make a designated transaction(creater is able to set the transaction). secondly: A specified amount of in-game currency can be added to or subtracted from the user's staying in this square(create isn't able to recieve the in-game currency)
// transaction and currency are not indispensable and user is able to set just one of them
// Automatically, user's(creator's) ENS(or address) is set as the owner of the square
// if user decide to create the square, write the datas to the blockchain
import React, { useState } from 'react';


const SquareCreation = ({ squares, _currentAccount, _ENS, _NFTList, _squareDescription, _setSquareDescription, _squareBalance, _setSquareBalance, _transactionDescription, _setTransactionDescription, _transaction, _setTransaction, _setTransaction, _squareStayer, _setSquareStayer, _FoteisonGameContract }) => {
    
    const createSquare = async () => {
        if (!_currentAccount) {
        alert("Please connect your wallet");
        return;
        }
        if (!description || !image || !X || !Y) {
        alert("Please fill out the form");
        return;
        }
        if (!transaction && !currency) {
        alert("Please set the transaction or currency");
        return;
        }
        if (transaction && currency) {
        alert("Please set either transaction or currency");
        return;
        }
    
        try {
        const transaction = await _FoteisonGameContract.createSquare(description, image, X, Y, transaction, currency);
        await transaction.wait();
        alert("Successfully created the square");
        } catch (error) {
        console.log(error);
        alert("Failed to create the square");
        }
    };
    
    return (
        <div className="square-creation">
        <div className="square-creation-form">
            <div className="square-creation-form-item">
            <label htmlFor="description">Description</label>
            <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            </div>
            <div className="square-creation-form-item">
            <label htmlFor="image">Image</label>
            <input
                type="text"
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
            />
            </div>
            <div className="square-creation-form-item">
            <label htmlFor="X">X</label>
            <input
                type="text"
                id="X"
                value={X}
                onChange={(e) => setX(e.target.value)}
            />
            </div>
            <div className="square-creation-form-item">
            <label htmlFor="Y">Y</label>
            <input
                type="text"
                id="Y"
                value={Y}
                onChange={(e) => setY(e.target.value)}
            />
            </div>
            <div className="square-creation-form-item">
            

            <label htmlFor="transaction">Transaction</label>
            <input 
                type="text"
                id="transaction"
                value={transaction}
                onChange={(e) => setTransaction(e.target.value)}
            />
            </div>
            <div className="square-creation-form-item">
            <label htmlFor="currency">Currency</label>
            <input
                type="text"
                id="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
            />
            </div>
        </div>
        <button className="square-creation-button" onClick={createSquare}>
            Create Square
        </button>
        </div>
    );
};

export default SquareCreation;