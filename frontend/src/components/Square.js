// always show all squares by viewing the square struct of the smart contract
// As for CSS, this(UI) component is the bottom layer
// when user access the page, this component is the first component that is rendered
// each square displays creater's icon and coordinate of the square using view function of the smart contract

// import React from 'react'

import React from 'react';
import { useEffect, useRef } from 'react';

const Square = ({ id, x, y,initialFocusId }) => {
  const image = id === 1
    ? 'https://i.seadn.io/gae/LPMevOz9OE7OT-HhskCJ3h6fAIWGmD_a7VI8xU5cY6Vb_ai3llrGbae4kZ4yV02KnZOM-xcjQob4EkjaGhnereZBzYJ_7aGbHjTwSQ?w=500&auto=format'
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
      <img src={image} alt="" width={50} />
      <span className="coordinates">{x},{y}</span>
    </div>
  );
};

export default Square;