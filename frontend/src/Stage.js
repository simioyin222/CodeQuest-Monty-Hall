import React from 'react';
import Door from './Door';

const Stage = ({ stageNumber, onDoorClick }) => {
  return (
    <div className="stage">
      <h2>Stage {stageNumber}</h2>
      <div className="doors">
        <Door doorNumber={1} onClick={() => onDoorClick(1)} />
        <Door doorNumber={2} onClick={() => onDoorClick(2)} />
        <Door doorNumber={3} onClick={() => onDoorClick(3)} />
      </div>
    </div>
  );
};

export default Stage;