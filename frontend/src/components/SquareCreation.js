// if user click the button of square creation, display the inputs of the square'description, the square's image(user is able to choose it from the user's NFTs), and the square's coordinates(X and Y) that is needed for connecting the current square, destination square's coordinates(X and Y), and the transaction event
// transaction event are first: have the user's staying in this square not be allowed to proceed unless they make a designated transaction(creater is able to set the transaction). secondly: A specified amount of in-game currency can be added to or subtracted from the user's staying in this square(create isn't able to recieve the in-game currency)
// transaction and currency are not indispensable and user is able to set just one of them
// Automatically, user's(creator's) ENS(or address) is set as the owner of the square
// if user decide to create the square, write the datas to the blockchain
import React, { useState, useEffect } from 'react';
import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from '../constants';
import FoteisonGame from '../utils/FoteisonGame.json';


const SquareCreation = ({ 
    squares,
    _currentAccount,
    _ENS,
    _nfts,
    _selectedSquareId,
    _setSelectedSquareId,
    _squareNFTList,
    _setSquareNFTList,
    _showSquareNFT,
    _setShowSquareNFT,
    // 
    _xCoordinate,
    _setXCoordinate,
    _yCoordinate,
    _setYCoordinate,
    //
    _xCoordinateBackend,
    _setXCoordinateBackend,
    _yCoordinateBackend,
    _setYCoordinateBackend,
    _squareDescription,
    _setSquareDescription,
    _squareBalance,
    _setSquareBalance,
    _balanceIncrease,
    _setBalanceIncrease,
    _transactionDescription,
    _setTransactionDescription,
    _transaction,
    _setTransaction,
    _squareStayerImage,
    _setSquareStayerImage,
    _FoteisonGameContract
    }) => {

    const createSquare = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const FoteisonGameContract = new ethers.Contract(
            CONTRACT_ADDRESS,
            FoteisonGame.abi,
            signer
        );
        try{
            const transaction = await FoteisonGameContract.getSquare(1275);
            console.log(transaction);
        } catch (error) {
            console.log(error);
            alert("Failed");
        }
    }

    const handleXCoordinateChange = (e) => {
        _setXCoordinate(e.target.value);
    }
    const handleYCoordinateChange = (e) => {
        _setYCoordinate(e.target.value);
    }
    const handleXCoordinateBackendChange = (e) => {
        _setXCoordinateBackend(e.target.value);
    }
    const handleYCoordinateBackendChange = (e) => {
        _setYCoordinateBackend(e.target.value);
    }

    const selectNFT = (nft) => {
        _setSquareNFTList(nft);
        _setShowSquareNFT(true);
    };

    const changeNFT = () => {
        _setShowSquareNFT(false);
    };

    const handleSquareDescriptionChange = (e) => {
        _setSquareDescription(e.target.value);
    }

    const handleSquareBalanceChange = (e) => {
        _setSquareBalance(e.target.value);
    }

    const handleBalanceIncreaseChange = (e) => {
        _setBalanceIncrease(e.target.value === 'increase');
    }

    const handleSquareTransactionChange = (e) => {
        _setTransactionDescription(e.target.value);
    }

    const handleSquareTransactionContractChange = (e) => {
        _setTransaction(e.target.value);
    }
    
    return (
        // remind: if the selectedSquareId is already set, the square is not able to be selected
        <div className="square-creation">
            <div className="square-title">Square Selection</div>
             <div className="coordinate-inputs">
                <label htmlFor="x-coordinate" className="coordinate-label">X：</label>
                <input type="number" id="x-coordinate" className="coordinate-input" value={_xCoordinate} onChange={handleXCoordinateChange}/>
                <label htmlFor="y-coordinate" className="coordinate-label">Y：</label>
                <input type="number" id="y-coordinate" className="coordinate-input" value={_yCoordinate} onChange={handleYCoordinateChange}/>
            </div>
            <div className="square-title">Backend Selection</div>
             <div className="coordinate-inputs">
                <label htmlFor="x-coordinate" className="coordinate-label">X：</label>
                <input type="number" id="x-coordinate" className="coordinate-input" value={_xCoordinateBackend} onChange={handleXCoordinateBackendChange}/>
                <label htmlFor="y-coordinate" className="coordinate-label">Y：</label>
                <input type="number" id="y-coordinate" className="coordinate-input" value={_yCoordinateBackend} onChange={handleYCoordinateBackendChange}/>
            </div>
            <div className="nft-title">NFT Selection</div>
            {! _showSquareNFT && (
                <div className="square-nft-zone">   
                    {_nfts &&
                    _nfts.map((nft, index) => (
                    <div className="square-nft-item" key={index} onClick={() => selectNFT(nft)}>
                        <img className="nft-image" src={nft.image} width={50} alt="" />
                    </div>
                    ))}
                </div>
            )}
            { _showSquareNFT && (
                <div className="sqare-nft-zone">
                    {_squareNFTList && (
                    <>
                    <div className="square-nft-item">
                        <img src={_squareNFTList.image} width={70} alt="" /> 
                        <button onClick={changeNFT}　className="square-nft-button">再設定</button>
                    </div>
                    </>
                    )}
                </div>
            )}
            <div className="description-title">Square Description</div>
            <input
                type="text"
                className="description-input"
                maxLength={20}
                value={_squareDescription}
                onChange={handleSquareDescriptionChange}
            />
            <div className="balance-title">Crypulu Balance Applied to User</div>
                <div className="balance-content">
                    <div>
                        <label htmlFor="amount">Amount: </label>
                        <input type="number" id="amount" value={_squareBalance} onChange={handleSquareBalanceChange} />
                    </div>
                    <div>
                        <label htmlFor="increase">Increase/Decrease: </label>
                        <select id="increase" value={_balanceIncrease ? 'increase' : 'decrease'} onChange={handleBalanceIncreaseChange}>
                            <option value="increase">Increase</option>
                            <option value="decrease">Decrease</option>
                        </select>
                    </div>
                </div>
            <div className="transaction-title">Transaction Contract Address</div>
            <input
                type="text"
                className="transaction-contract-input"
                value={_transaction}
                onChange={handleSquareTransactionContractChange}
            />
            <div className="transaction-title">Transaction Description</div>
            <input
                type="text"
                className="transaction-description-input"
                maxLength={20}
                value={_transactionDescription}
                onChange={handleSquareTransactionChange}
            />
            <button className="square-creation-transmit-button" onClick={createSquare}>
                Create Square
            </button>
        </div>
    );
};

export default SquareCreation;