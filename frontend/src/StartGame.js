import React, { useState } from 'react';
import api from '../../backend/api';
import { startGame } from '../../backend/src/services/gameService';

const StartGame = ({ onGameStart }) => {
  const [selectedDoor, setSelectedDoor] = useState(null);

  const handleStartGame = async () => {
    try {
      const data = await startGame(selectedDoor);
      onGameStart(data.gameSessionId);
    } catch (error) {
      console.error('Error starting game:', error);
    }
  };

  return (
    <div>
      <h2>Select a Door to Start the Game</h2>
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
      <button
        className="start-button"
        onClick={handleStartGame}
        disabled={!selectedDoor}
      >
        Start Game
      </button>
    </div>
  );
};

export default StartGame;