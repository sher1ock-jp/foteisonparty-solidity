// if user click the button of square creation, display the inputs of the square'description, the square's image(user is able to choose it from the user's NFTs), and the square's coordinates(X and Y) that is needed for connecting the current square, destination square's coordinates(X and Y), and the transaction event
// transaction event are first: have the user's staying in this square not be allowed to proceed unless they make a designated transaction(creater is able to set the transaction). secondly: A specified amount of in-game currency can be added to or subtracted from the user's staying in this square(create isn't able to recieve the in-game currency)
// transaction and currency are not indispensable and user is able to set just one of them
// Automatically, user's(creator's) ENS(or address) is set as the owner of the square
// if user decide to create the square, write the datas to the blockchain
import React from 'react';
import axios from "axios";

const SquareCreation = ({ 
    squares,
    _currentAccount,
    _ENS,
    _nfts,
    _squareNFTList,
    _setSquareNFTList,
    _showSquareNFT,
    _setShowSquareNFT,
    _profileNFTList,
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
    _transaction,
    _setTransaction,
    _transactionDescription,
    _setTransactionDescription,
    _squareStayerImage,
    _setSquareStayerImage,
    _FoteisonGameContract
    }) => {

    const createSquare = async () => {

        const createId = getCreateIdFromCoordinates(_xCoordinate, _yCoordinate);
        const createStruct = await _FoteisonGameContract.getSquare(createId);

        const backendId = getBackendIdFromCoordinates(_xCoordinateBackend, _yCoordinateBackend);
        const backendStruct = await _FoteisonGameContract.getSquare(backendId);

        // @error After user choose a _profileNFTList, if user click the reset button, the _profileNFTList is remainig
        // if(_profileNFTList.image === ""){
        //     alert("Please set the profile image");
        //     return;
        // }

        if(! _ENS){
            _ENS = _currentAccount;
        }

        if(! _profileNFTList.image === null ){
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

        if (!_squareNFTList.image === null){
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

        if(_squareBalance > 500) {
            alert("Please set the square balance less than 500");
            return;
        }

        if(_transaction){
            const response = await axios.get("http://localhost:8080/nftBalance", {
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
                _ENS,
                createId,
                backendId,
                _squareDescription,
                _squareNFTList.image,
                _squareBalance,
                _balanceIncrease,
                _transaction,
                _transactionDescription,
                _profileNFTList.image,
                );
            console.log(transaction);
            alert("Success");
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
            _setSquareStayerImage("");
            _setSquareNFTList("");
            _setShowSquareNFT(false);
        } catch (error) {
            console.log(error);
            alert("Failed");
        }
    }

    const getCreateIdFromCoordinates = (x,y) => {
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
      
    const handleXCoordinateChange = (e) => {
        const x = parseInt(e.target.value);
        console.log(typeof x);
        console.log(x);
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
            <div className="square-title">where to create</div>
             <div className="coordinate-inputs">
                <label htmlFor="x-coordinate" className="coordinate-label">X：</label>
                <input type="number" id="x-coordinate" className="coordinate-input" value={_xCoordinate} onChange={handleXCoordinateChange}/>
                <label htmlFor="y-coordinate" className="coordinate-label">Y：</label>
                <input type="number" id="y-coordinate" className="coordinate-input" value={_yCoordinate} onChange={handleYCoordinateChange}/>
            </div>
            <div className="square-title">which to connect</div>
             <div className="coordinate-inputs">
                <label htmlFor="x-coordinate" className="coordinate-label">X：</label>
                <input type="number" id="x-coordinate" className="coordinate-input" value={_xCoordinateBackend} onChange={handleXCoordinateBackendChange}/>
                <label htmlFor="y-coordinate" className="coordinate-label">Y：</label>
                <input type="number" id="y-coordinate" className="coordinate-input" value={_yCoordinateBackend} onChange={handleYCoordinateBackendChange}/>
            </div>
            <div className="nft-title">which to embed</div>
            <div className="nft-sub-title">if you don't choose your NFT, default image is used</div>
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
            <div className="transaction-title">Quest Contract Address</div>
            <input
                type="text"
                className="transaction-contract-input"
                value={_transaction}
                onChange={handleSquareTransactionContractChange}
            />
            <div className="transaction-title">Quest Description</div>
            <input
                type="text"
                className="transaction-description-input"
                maxLength={20}
                value={_transactionDescription}
                onChange={handleSquareTransactionChange}
            />
            <button className="square-creation-transmit-button" onClick={createSquare}>
                Transmit
            </button>
        </div>
    );
};

export default SquareCreation;