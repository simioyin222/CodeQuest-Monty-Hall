const mongoose = require('mongoose');

const gameSessionSchema = new mongoose.Schema({
  selectedDoor: Number,
  puzzles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Puzzle' }],
  //etc
});

const GameSession = mongoose.model('GameSession', gameSessionSchema);

module.exports = GameSession;