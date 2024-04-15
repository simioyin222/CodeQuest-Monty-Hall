import React, { useState } from 'react';
import api from '../../backend/api';
import { revealHardPuzze } from '../../backend/src/services/gameService';

const DoorSelection = ({ gameSessionId, onDoorSelected }) => {
  const [selectedDoor, setSelectedDoor] = useState(null);
  const [revealedPuzzle, setRevealedPuzzle] = useState(null);

  const handleRevealHardPuzzle = async () => {
    try {
      const data = await revealHardPuzzle(gameSessionId);
      setRevealedPuzzle(data.puzzle);
    } catch (error) {
      console.error('Error revealing hard puzzle:', error);
    }
  };

  const handleFinalSelection = () => {
    onDoorSelected(selectedDoor);
  };

  return (
    <div>
      <h2>Select a Door</h2>
      <div className="door-selection">
        <button
          className={`door-button ${selectedDoor === 1 ? 'selected' : ''}`}
          onClick={() => setSelectedDoor(1)}
        >
          Door 1
        </button>
        <button
          className={`door-button ${selectedDoor === 2 ? 'selected' : ''}`}
          onClick={() => setSelectedDoor(2)}
        >
          Door 2
        </button>
        <button
          className={`door-button ${selectedDoor === 3 ? 'selected' : ''}`}
          onClick={() => setSelectedDoor(3)}
        >
          Door 3
        </button>
      </div>
      {revealedPuzzle && (
        <div className="revealed-puzzle">
          <p>Revealed Puzzle: {revealedPuzzle.description}</p>
        </div>
      )}
      <button
        className="reveal-button"
        onClick={handleRevealHardPuzzle}
        disabled={!selectedDoor}
      >
        Reveal Hard Puzzle
      </button>
      <button
        className="final-selection-button"
        onClick={handleFinalSelection}
        disabled={!selectedDoor}
      >
        Confirm Final Selection
      </button>
    </div>
  );
};

export default DoorSelection;