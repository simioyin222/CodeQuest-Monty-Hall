const Puzzle = require('../frontend/src/puzzleModel');

// async function assignPuzzles() {
//   try {
//     const hardPuzzles = await Puzzle.aggregate([
//       { $match: { difficulty: 'hard' } },
//       { $sample: { size: 2 } }
//     ]);
//     const easyPuzzle = await Puzzle.aggregate([
//       { $match: { difficulty: 'easy' } },
//       { $sample: { size: 1 } }
//     ]);
//     return [...hardPuzzles, ...easyPuzzle];
//   } catch (error) {
//     console.error('Error assigning puzzles:', error);
//     throw error;
//   }
// }

function revealHardPuzzle(selectedDoor, puzzles) {
  const hardPuzzleIndices = puzzles
    .map((puzzle, index) => (puzzle.difficulty === 'hard' ? index : -1))
    .filter(index => index !== -1 && index !== selectedDoor - 1);
  const revealedPuzzleIndex = hardPuzzleIndices[Math.floor(Math.random() * hardPuzzleIndices.length)];
  return puzzles[revealedPuzzleIndex];
}

// async function checkAnswer(puzzleId, userAnswer) {
//   try {
//     const puzzle = await Puzzle.findById(puzzleId);
//     if (!puzzle) {
//       throw new Error('Puzzle not found');
//     }
//     return puzzle.answer.toLowerCase() === userAnswer.toLowerCase();
//   } catch (error) {
//     console.error('Error checking answer:', error);
//     throw error;
//   }
// }

// //maybe?
// async function updateScore(gameSession, puzzleId, isCorrect) {
//   try {
//     const puzzle = await Puzzle.findById(puzzleId);
//     if (!puzzle) {
//       throw new Error('Puzzle not found');
//     }
//     const puzzleScore = isCorrect ? puzzle.difficulty === 'hard' ? 2 : 1 : 0;
//     gameSession.score += puzzleScore;
//     await gameSession.save();
//   } catch (error) {
//     console.error('Error updating score:', error);
//     throw error;
//   }
// }

module.exports = {
  revealHardPuzzle
}