import React from 'react';
import { useEffect,useRef,useState } from 'react';
import ConfirmSquare from './ConfirmSquare';

const Square = ({ _currentAccount, _squareId, _coordinateX, _coordinateY, _initialFocusId, _FoteisonGameContract, _idNftMap }) => {

  const squareRef = useRef(null);
  const [showSquareDescription, setShowSquareDescription] = useState(false);
  const imageUrl = _idNftMap[_squareId];


  const handleClick = () => {
    setShowSquareDescription(!showSquareDescription);
  };

  useEffect(() => {
    if ( _initialFocusId === _squareId) {
      const squareElement = squareRef.current; // squareRef is the reference of the square
      if (squareElement) {
        squareElement.focus();
      }
    }
  }, [_currentAccount]);

  // 
  return (
    <div
      className="square"
      onClick={handleClick}
      ref={squareRef}
      tabIndex={_squareId === _initialFocusId ? 0 : -1} // tabIndex is used to make the square focusable
    >
      {imageUrl && <img src={imageUrl} alt="" width={40} />}
      <span className="coordinates">{_coordinateX},{_coordinateY}</span>
      {showSquareDescription && (
        <ConfirmSquare _FoteisonGameContract={_FoteisonGameContract} _squareId={_squareId} _currentAccount={_currentAccount} />
          )}
    </div>
  );
};

export default Square;