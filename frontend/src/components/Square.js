// always show all squares by viewing the square struct of the smart contract
// As for CSS, this(UI) component is the bottom layer
// when user access the page, this component is the first component that is rendered
// each square displays creater's icon and coordinate of the square using view function of the smart contract

// import React from 'react';

// function Square() {
//   const squares = [];

//   for (let y = -49; y <= 49; y++) {
//     for (let x = -49; x <= 49; x++) {
//       squares.push({ x, y });
//     }
//   }

//   return (
//     <div className="background">
//       <div className="scrollable-wrapper">
//         <div className="square-zone">
//           {squares.map((square, index) => (
//             <Square key={index} x={square.x} y={square.y} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Square;

import React from 'react';

const Square = ({ x, y }) => {
  return (
    <div className="square">
      <span className="coordinates">X={x}, Y={y}</span>
    </div>
  );
};

export default Square;