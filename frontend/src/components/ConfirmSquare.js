// if user's click a square, display the square's information(data when created + other's user's name, icon) using view function of the smart contract
// the display is below the square
// if tha square that user's click is the square that user's staying, user is able to verrify the transaction required for the square)

// just  alert("You are staying this square") for now

const ConfirmSquare = () => {
    return (
        // input box for the transaction
        <input className="confirm-square" type="text" placeholder="Enter the transaction" />
    );  
};

export default ConfirmSquare;