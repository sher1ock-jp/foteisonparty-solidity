// if user click the button of square creation, display the inputs of the square'description, the square's image(user is able to choose it from the user's NFTs), and the square's coordinates(X and Y) that is needed for connecting the current square, destination square's coordinates(X and Y), and the transaction event
// transaction event are first: have the user's staying in this square not be allowed to proceed unless they make a designated transaction(creater is able to set the transaction). secondly: A specified amount of in-game currency can be added to or subtracted from the user's staying in this square(create isn't able to recieve the in-game currency)
// transaction and currency are not indispensable and user is able to set just one of them
// Automatically, user's(creator's) ENS(or address) is set as the owner of the square
// if user decide to create the square, write the datas to the blockchain
import React, { useState, useEffect } from 'react';


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
    _xCoordinate,
    _setXCoordinate,
    _yCoordinate,
    _setYCoordinate,
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

    // const handleSquareSelection = (e) => {
    //     const selectedCoordinates = `${_xCoordinate},${_yCoordinate}`;
    //     console.log("Selected Coordinates:", selectedCoordinates);
    //     const selectedSquare = squares.find((square) => {
    //       return `${square.x},${square.y}` === selectedCoordinates;
    //     });
    //     console.log("Selected Square:", selectedSquare);
    //     _setSelectedSquareId(selectedSquare.id);
    //   }

    const handleXCoordinateChange = (e) => {
        _setXCoordinate(e.target.value);
    }
    const handleYCoordinateChange = (e) => {
        _setYCoordinate(e.target.value);
    }

    const selectNFT = (nft) => {
        _setSquareNFTList(nft);
        _setShowSquareNFT(true);
    };

    const changeNFT = () => {
        _setShowSquareNFT(false);
    };
    
    return (
        // remind: if the selectedSquareId is already set, the square is not able to be selected
        <div className="square-creation">
            <div className="square-title">Square Selection</div>
             <div className="coordinate-inputs">
                <label htmlFor="x-coordinate" className="coordinate-label">x座標：</label>
                <input type="number" id="x-coordinate" className="coordinate-input" value={_xCoordinate} onChange={handleXCoordinateChange}/>
                <label htmlFor="y-coordinate" className="coordinate-label">y座標：</label>
                <input type="number" id="y-coordinate" className="coordinate-input" value={_yCoordinate} onChange={handleYCoordinateChange}/>
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
        </div>
    );
};

export default SquareCreation;