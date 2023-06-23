import React from 'react';
import axios from "axios";

const SquareCreation = ({ 
    _currentAccount,
    _ENS,
    _nfts,
    _squareNft,
    _setSquareNft,
    _IsSquareNft,
    _setIsSquareNft,
    _profileIconNft,
    _xCoordinate,
    _setXCoordinate,
    _yCoordinate,
    _setYCoordinate,
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
    _transaction,
    _setTransaction,
    _transactionDescription,
    _setTransactionDescription,
    _FoteisonGameContract
    }) => {

    const createSquare = async () => {

        const getIdFromCoordinates = (x,y) => {
            const gridSize = 50;
            const centerX = Math.floor(gridSize / 2);
            const centerY = Math.floor(gridSize / 2);
            const id = (y + centerY) * 50 + (x + centerX);
            return id;
          }
        
        const getBackendIdFromCoordinates = (x,y) => {
            const gridSize = 50;
            const centerX = Math.floor(gridSize / 2);
            const centerY = Math.floor(gridSize / 2);
            const id = (y + centerY) * 50 + (x + centerX);
            return id;
        }    

        const createId = getIdFromCoordinates(_xCoordinate, _yCoordinate);
        const createStruct = await _FoteisonGameContract.getSquare(createId);

        const backendId = getBackendIdFromCoordinates(_xCoordinateBackend, _yCoordinateBackend);
        const backendStruct = await _FoteisonGameContract.getSquare(backendId);

        if(! _ENS){
            _ENS = _currentAccount;
        }

        // @error After user choose a _profileNFTList more than once, the _profileNFTList is not able to be set to null
        if(_profileIconNft === null ){
            alert("Please set the profile image");
            return;
        }

        if(_xCoordinate === null || _yCoordinate === null){
            alert("Please set the coordinates");
            return;
        }

        if(createStruct.squareDescription !== "" ){
            console.log(createStruct.squareDescription);
            alert("The square is already created");
            return;
        }

        if(!_xCoordinateBackend === null || !_yCoordinateBackend === null){
            alert("Please set the backend coordinates");
            return;
        }

        // @error After user choose a _profileNFTList more than once, the _profileNFTList is not able to be set to null
        if (_squareNft === null){
            alert("Please set the square image");
            return;
        }

        if(backendStruct.squareDescription === "" ){
            console.log(backendStruct.squareDescription);
            alert("The square doesn't exist");
            return;
        }

        if(!_squareDescription){
            alert("Please set the square description");
            return;
        }

        if(_transaction){
            const response = await axios.get("http://localhost:8080/confirmContract", {
                params: {
                    address: _transaction,
                    chain: "0x13881",
                },
            });
            
            if(! response.data.isMoralisError !== true){
                alert("Please set the correct contract address on Mumbai Testnet");
                return;
            }

            if(_transactionDescription === ""){
                alert("Please set the transaction description");
                return;
            }
        }

        try{
            
            const transaction = await _FoteisonGameContract.createSquare(
                _ENS,  // if ens is not set, the currentAccount(Address) is set
                createId,
                backendId,
                _squareDescription,
                _squareNft.image,
                _squareBalance,
                _balanceIncrease,
                _transaction,
                _transactionDescription,
                _profileIconNft.image,
                );
            console.log(transaction);
            
            // alert("Square Created at " + _xCoordinate + ", " + _yCoordinate);
            alert("Square Created at " + _xCoordinate + ", " + _yCoordinate + " and connected from " + _xCoordinateBackend + ", " + _yCoordinateBackend);
            
            // clear the inputs
            _setXCoordinate(null);
            _setYCoordinate(null);
            _setXCoordinateBackend(null);
            _setYCoordinateBackend(null);
            _setSquareDescription("");
            _setSquareBalance(0);
            _setBalanceIncrease(true);
            _setTransaction("");
            _setTransactionDescription("");
            _setSquareNft("");
            _setIsSquareNft(false);

        } catch (error) {
            console.log(error);
            alert("Square Creation Failed");
        }
    }

    //
    // handle input changes
    //
    const handleXCoordinateChange = (e) => {
        const x = parseInt(e.target.value);
        console.log(typeof x);
        _setXCoordinate(x);
    }
    const handleYCoordinateChange = (e) => {
        const y = parseInt(e.target.value);
        _setYCoordinate(y);
    }
    const handleXCoordinateBackendChange = (e) => {
        const x = parseInt(e.target.value);
        _setXCoordinateBackend(x);
    }
    const handleYCoordinateBackendChange = (e) => {
        const y = parseInt(e.target.value);
        _setYCoordinateBackend(y);
    }

    const selectNFT = (nft) => {
        _setSquareNft(nft);
        _setIsSquareNft(true);
    };

    const changeNFT = () => {
        _setIsSquareNft(false);
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
            <div className="square-title">where to create</div>
             <div className="coordinate-inputs">
                <label htmlFor="x-coordinate" className="coordinate-label">X：</label>
                <input type="number" id="x-coordinate" className="coordinate-input" value={_xCoordinate} onChange={handleXCoordinateChange} placeholder="-25~25"/>
                <label htmlFor="y-coordinate" className="coordinate-label">Y：</label>
                <input type="number" id="y-coordinate" className="coordinate-input" value={_yCoordinate} onChange={handleYCoordinateChange}　placeholder="-25~25"/>
                
            </div>
            <div className="square-title">which to connect</div>
             <div className="coordinate-inputs">
                <label htmlFor="x-coordinate" className="coordinate-label">X：</label>
                <input type="number" id="x-coordinate" className="coordinate-input" value={_xCoordinateBackend} onChange={handleXCoordinateBackendChange} placeholder="-25~25"/>
                <label htmlFor="y-coordinate" className="coordinate-label">Y：</label>
                <input type="number" id="y-coordinate" className="coordinate-input" value={_yCoordinateBackend} onChange={handleYCoordinateBackendChange} placeholder="-25~25"/>
            </div>
            <div className="nft-title">which to embed</div>
            <div className="nft-sub-title">if you don't choose your NFT, default image is used</div>
            {! _IsSquareNft && (
                <div className="square-nft-zone">   
                    {_nfts &&
                    _nfts.map((nft, index) => (
                    <div className="square-nft-item" key={index} onClick={() => selectNFT(nft)}>
                        <img className="nft-image" src={nft.image} width={50} alt="" />
                    </div>
                    ))}
                </div>
            )}
            { _IsSquareNft && (
                <div className="sqare-nft-zone">
                    {_squareNft && (
                    <>
                    <div className="square-nft-item">
                        <img src={_squareNft.image} width={70} alt="" /> 
                        <button onClick={changeNFT}　className="square-nft-button">reset</button>
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
                placeholder="This game is very long. Write youe meme here."
            />
            <div className="balance-title">Crypulu Balance Applied to User</div>
                <div className="balance-content">
                    <div>
                        <label htmlFor="amount">Amount: </label>
                        <input type="number" id="amount" value={_squareBalance} onChange={handleSquareBalanceChange} placeholder="0~300"/>
                    </div>
                    <div>
                        <label htmlFor="increase">Increase/Decrease: </label>
                        <select id="increase" value={_balanceIncrease ? 'increase' : 'decrease'} onChange={handleBalanceIncreaseChange}>
                            <option value="increase">Increase</option>
                            <option value="decrease">Decrease</option>
                        </select>
                    </div>
                </div>
            <div className="transaction-title">Quest Contract Address</div>
            <input
                type="text"
                className="transaction-contract-input"
                value={_transaction}
                onChange={handleSquareTransactionContractChange}
                placeholder="optional"
            />
            <div className="transaction-title">Quest Description</div>
            <input
                type="text"
                className="transaction-description-input"
                maxLength={20}
                value={_transactionDescription}
                onChange={handleSquareTransactionChange}
                placeholder="optional"
            />
            <button className="square-creation-transmit-button" onClick={createSquare}>
                Transmit
            </button>
        </div>
    );
};

export default SquareCreation;