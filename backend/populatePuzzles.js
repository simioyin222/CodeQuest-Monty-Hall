require('dotenv').config({ path: '../.env'});
//THIS IS TO POPULATE WITH PUZZLES. CURRENTLY NONSENSE WE WILL CHANGE IT

//TO POP, WE CAN RUN node populatePuzzles.js in terminal, alternatively a route handler can be created in backend. 
const mongoose = require('mongoose');

// const dotenv = require('dotenv');
// dotenv.config();



const Puzzle = require('../frontend/src/puzzleModel.js');

// MongoDB connection URL
//const uri = `mongodb+srv://chrisquattrocchi:${process.env.MONGODB_PWD}@monty-hall-coding-quest.vo7yal4.mongodb.net/?retryWrites=true&w=majority&appName=monty-hall-coding-quest`;
//mongodb+srv://<username>:${process.env.MONGODB_PWD}@<cluster>/<database>?retryWrites=true&w=majority
//const uri = `mongodb+srv://chrisquattrocchi:${process.env.MONGODB_PWD}@monty-hall-coding-quest.vo7yal4.mongodb.net/monty-hall-coding-quest?retryWrites=true&w=majority&appName=monty-hall-coding-quest`;
//const uri = `mongodb+srv://chrisquattrocchi:${process.env.MONGODB_PWD}@monty-hall-coding-quest.vo7yal4.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=monty-hall-coding-quest`;
console.log(process.env.MONGODB_PWD);
const uri = `mongodb+srv://chrisquattrocchi:${process.env.MONGODB_PWD}@clustertwo.xomvein.mongodb.net/?retryWrites=true&w=majority&appName=ClusterTwo`

// Sample puzzle data
const puzzleData = [
  {
    question: 'What is the capital of France?',
    answer: 'Paris',
    difficulty: 'easy',
    stage: '1',
  },
  {
    question: 'What is the largest planet in our solar system?',
    answer: 'Jupiter',
    difficulty: 'easy',
    stage: '2',
  },
  {
    question: 'What is the square root of 169?',
    answer: '13',
    difficulty: 'hard',
    stage: '1',
  },
  {
    question: 'What is the chemical symbol for gold?',
    answer: 'Au',
    difficulty: 'hard',
    stage: '2',
  },
  // Add more puzzle objects as needed
];

// Function to populate the database with puzzles
const populatePuzzles = async () => {
  try {
    await mongoose.connect(uri);
    // await mongoose.connect(uri, {
    //   //useNewUrlParser: true,
    //   //useUnifiedTopology: true,  DEPRECATED
    // });
    console.log('Connected to MongoDB');

    await Puzzle.insertMany(puzzleData);
    console.log('Puzzles populated successfully');

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error populating puzzles:', error);
  }
};

populatePuzzles();