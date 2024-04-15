import api from '../../api';

export const startGame = async (doorNumber) => {
  try {
    const response = await api.post('/api/game/initialSelection', { doorNumber });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const revealHardPuzzle = async (gameSessionId) => {
  try {
    const response = await api.get(`/api/game/revealHardPuzzle/${gameSessionId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const submitAnswer = async (answer) => {
  try {
    const response = await api.post('/api/submit-answer', { answer });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchGameState = async (gameSessionId) => {
  try {
    const response = await api.get(`/api/game-state/${gameSessionId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateGameState = async (gameSessionId, stage, selectedDoor, isCorrect) => {
  try {
    const response = await api.put('/api/game-state', {
      gameSessionId,
      stage,
      selectedDoor,
      isCorrect,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};