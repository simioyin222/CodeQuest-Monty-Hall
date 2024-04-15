const mongoose = require('mongoose');

const puzzleSchema = new mongoose.Schema({
  question: String,
  answer: String,
  difficulty: String,
  stage: String,  //maybe int
});

const Puzzle = mongoose.model('Puzzle', puzzleSchema)

module.exports = Puzzle;
