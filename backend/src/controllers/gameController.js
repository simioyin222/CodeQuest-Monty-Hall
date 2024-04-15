const GameSession = require('../models/gameSessionModel');
const Puzzle = require('../models/puzzleModel');
const gameLogic = require('../utils/gameLogic');

// Controller functions for handling API requests

// initialSelection controller
exports.initialSelection = async (req, res) => {
  try {
    const { doorNumber } = req.body;
    // Validation for doorNumber input
    if (doorNumber < 1 || doorNumber > 3) {
      return res.status(400).json({ error: 'Invalid door number' });
    }

    // Call assignPuzzles from gameLogic
    const puzzles = await gameLogic.assignPuzzles();

    // Create a new game session document in the database
    const gameSession = new GameSession({
      selectedDoor: doorNumber,
      puzzles: puzzles,
      stage, stage
    });

    // Save the game session to the database
    await gameSession.save();

    // Send the response to the client with the game session ID
    res.json({ gameSessionId: gameSession._id });
  } catch (error) {
    console.error('Error in initial door selection:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// revealHardPuzzle controller
exports.revealHardPuzzle = async (req, res) => {
  try {
    const { gameSessionId } = req.params;

    // Find the game session document in the database
    const gameSession = await GameSession.findById(gameSessionId);

    if (!gameSession) {
      return res.status(404).json({ error: 'Game session not found' });
    }

    const { selectedDoor, puzzles } = gameSession;

    // Call the revealHardPuzzle function from gameLogic
    const revealedPuzzle = gameLogic.revealHardPuzzle(selectedDoor, puzzles);

    // Send the revealed puzzle to the client
    res.json({ puzzle: revealedPuzzle });
  } catch (error) {
    console.error('Error in revealing hard puzzle:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// finalSelection controller
exports.finalSelection = async (req, res) => {
  try {
    const { gameSessionId } = req.params;
    const { doorNumber } = req.body;

    // Find the game session document in the database
    const gameSession = await GameSession.findById(gameSessionId);

    if (!gameSession) {
      return res.status(404).json({ error: 'Game session not found' });
    }

    // Update the game session with the final selected door
    gameSession.finalSelectedDoor = doorNumber;
    await gameSession.save();

    // Send a success response to the client
    res.json({ message: 'Final door selection updated successfully' });
  } catch (error) {
    console.error('Error in final door selection:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// getGameState controller
exports.getGameState = async (req, res) => {
  try {
    const { gameSessionId } = req.params;

    // Find the game session document in the database
    const gameSession = await GameSession.findById(gameSessionId);

    if (!gameSession) {
      return res.status(404).json({ error: 'Game session not found' });
    }

    // Send the game state to the client
    res.json(gameSession);
  } catch (error) {
    console.error('Error in getting game state:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// updateGameState controller
exports.updateGameState = async (req, res) => {
  try {
    const { gameSessionId, stage, selectedDoor, isCorrect } = req.body;

    // Find the game session document in the database
    const gameSession = await GameSession.findById(gameSessionId);

    if (!gameSession) {
      return res.status(404).json({ error: 'Game session not found' });
    }

    // Update the game session with the new game state
    gameSession.stage = stage;
    gameSession.selectedDoor = selectedDoor;
    if (isCorrect) {
      gameSession.score += 1;
    }
    await gameSession.save();

    // Send the updated game state to the client
    res.json(gameSession);
  } catch (error) {
    console.error('Error in updating game state:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//moved from gameLogic
exports.checkAnswer = async (puzzleId, userAnswer) => {
  try {
    const puzzle = await Puzzle.findById(puzzleId);
    if (!puzzle) {
      throw new Error('Puzzle not found');
    }
    return puzzle.answer.toLowerCase() === userAnswer.toLowerCase();
  } catch (error) {
    console.error('Error checking answer:', error);
    throw error;
  }
}

//maybe?
exports.updateScore = async (gameSession, puzzleId, isCorrect) => {
  try {
    const puzzle = await Puzzle.findById(puzzleId);
    if (!puzzle) {
      throw new Error('Puzzle not found');
    }
    const puzzleScore = isCorrect ? puzzle.difficulty === 'hard' ? 2 : 1 : 0;
    gameSession.score += puzzleScore;
    await gameSession.save();
  } catch (error) {
    console.error('Error updating score:', error);
    throw error;
  }
}

exports.assignPuzzles = async () => {
  try {
    const hardPuzzles = await Puzzle.aggregate([
      { $match: { difficulty: 'hard' } },
      { $sample: { size: 2 } }
    ]);
    const easyPuzzle = await Puzzle.aggregate([
      { $match: { difficulty: 'easy' } },
      { $sample: { size: 1 } }
    ]);
    return [...hardPuzzles, ...easyPuzzle];
  } catch (error) {
    console.error('Error assigning puzzles:', error);
    throw error;
  }
}