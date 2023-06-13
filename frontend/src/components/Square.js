// always show all squares by viewing the square struct of the smart contract
// As for CSS, this(UI) component is the bottom layer
// when user access the page, this component is the first component that is rendered
// each square displays creater's icon and coordinate of the square using view function of the smart contract

// import React from 'react'

import React from 'react';
import { useEffect, useRef } from 'react';

const Square = ({ id, x, y,initialFocusId, pageInitialized, setPageInitialized }) => {
  const image = id === 1
    ? 'https://i.seadn.io/gcs/files/2d0323112af4b9aac8642eec4afc7179.png?auto=format&dpr=1&w=1000'
    : null;

  const squareRef = useRef(null);

  useEffect(() => {
    if (id === initialFocusId) {
      const squareElement = squareRef.current;
      if (squareElement) {
        squareElement.focus();
      }
    }
  }, [id, initialFocusId]);

  return (
    <div
      className="square"
      ref={squareRef}
      tabIndex={id === initialFocusId ? 0 : -1} // フォーカス可能にするための tabIndex
    >
      <img src={image} alt="" width={10} />
      <span className="coordinates">{id},{x},{y}</span>
    </div>
  );
};

export default Square;