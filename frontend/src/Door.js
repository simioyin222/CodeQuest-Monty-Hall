import React from 'react';

const Door = ({ doorNumber, onClick }) => {
  return (
    <button className="door" onClick={onClick}>
      Door {doorNumber}
    </button>
  );
};

export default Door;