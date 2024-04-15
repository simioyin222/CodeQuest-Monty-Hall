import React, { useState } from 'react';
import api from '../../backend/api';
import { submitAnswer } from '../../backend/src/services/gameService';

const Puzzle = ({ puzzleData, onAnswerSubmit }) => {
  const [answer, setAnswer] = useState('');

  const handleSubmit = async () => {
    try {
      const data = await submitAnswer(answer);
      onAnswerSubmit(data.isCorrect);
      setAnswer('');
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  return (
    <div className="puzzle-container">
      <h3>Puzzle</h3>
      <p>{puzzleData.description}</p>
      <input
        type="text"
        placeholder="Enter your answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Puzzle;