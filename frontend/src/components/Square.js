// always show all squares by viewing the square struct of the smart contract
// As for CSS, this(UI) component is the bottom layer
// when user access the page, this component is the first component that is rendered
// each square displays creater's icon and coordinate of the square using view function of the smart contract

// import React from 'react'

import React from 'react';

const Square = ({ id }) => {
  const image = id === 1
    ? 'https://i.seadn.io/gcs/files/2d0323112af4b9aac8642eec4afc7179.png?auto=format&dpr=1&w=1000'
    : null;

  return (
    <div className="square">
      <img src={image} alt={""} width={10}/>
      <span className="coordinates">ID={id}</span>
    </div>
  );
};

export default Square;