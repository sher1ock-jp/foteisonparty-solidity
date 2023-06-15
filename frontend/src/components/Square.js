// always show all squares by viewing the square struct of the smart contract
// As for CSS, this(UI) component is the bottom layer
// when user access the page, this component is the first component that is rendered
// each square displays creater's icon and coordinate of the square using view function of the smart contract

// import React from 'react'

import React from 'react';
import { useEffect,useRef,useState } from 'react';

const Square = ({ id, x, y,initialFocusId, _FoteisonGameContract }) => {

  const squareRef = useRef(null);
  const [image, setImage] = useState([]);

  // initialFocusId is 1275 and id is given by the map function in App.js
  useEffect(() => {
    if ( initialFocusId === id) {
      const squareElement = squareRef.current;
      if (squareElement) {
        squareElement.focus();
      }
    }
  }, []);

  useEffect(() => {
    const fetchImage = async () => {
        const image = await _FoteisonGameContract.getSquareNftURL(id);
        setImage(image);
        console.log(image);
    };
  
    fetchImage();
  }, []);

  return (
    <div
      className="square"
      ref={squareRef}
      tabIndex={id === initialFocusId ? 0 : -1} // tabIndex is used to make the square focusable
    >
      {image && <img src={image} alt="" width={40} />}
      <span className="coordinates">{x},{y}</span>
    </div>
  );
};

export default Square;