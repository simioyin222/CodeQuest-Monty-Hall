import React, { useState, useEffect } from 'react';
import api from '../../backend/api'; 

const GameManager = ({ gameSessionId, currentStage, selectedDoor, isCorrect }) => {
  const [gameState, setGameState] = useState(null);

  useEffect(() => {
    const fetchGameState = async () => {
      try {
        const response = await api.get(`/api/game-state/${gameSessionId}`);
        setGameState(response.data);
      } catch (error) {
        console.error('Error fetching game state:', error);
      }
    };

    if (gameSessionId) {
      fetchGameState();
    }
  }, [gameSessionId]);

  const updateGameState = async () => {
    try {
      const response = await api.put('/api/game-state', {
        gameSessionId,
        stage: currentStage,
        selectedDoor,
        isCorrect,
      });
      setGameState(response.data);
    } catch (error) {
      console.error('Error updating game state:', error);
    }
  };

  return (
    <div>
      {gameState && (
        <div className="game-state">
          <p>Stage: {gameState.stage}</p>
          <p>Score: {gameState.score}</p>
        </div>
      )}
      <button onClick={updateGameState}>
        Update Game State
      </button>
    </div>
  );
};

export default GameManager;