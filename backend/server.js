import GameSession from './gameSessionModel';
require('dotenv').config();
const gameLogic = require('../frontend/src/gameLogic.js');
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3001;
const gameController = require('../backend/src/controllers/gameController.js');


//Mongo connection
const uri = `mongodb+srv://chrisquattrocchi:${process.env.MONGODB_PWD}@clustertwo.xomvein.mongodb.net/?retryWrites=true&w=majority&appName=ClusterTwo`

dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// API Endpoints
app.post('/api/game/initialSelection', async (req, res) => {
  try {
    const { doorNumber } = req.body;
    if (doorNumber < 1 || doorNumber > 3) {
      return res.status(400).json({ error: 'Invalid door number' });
    }

    const puzzles = await gameController.assignPuzzles();
    
    const gameSession = new GameSession({
      selectedDoor: doorNumber,
      puzzles: puzzles,
      stageNumber: 1,
      score: 0
    });

    await gameSession.save();

    res.json({ gameSessionId: gameSession._id });
  } catch (error) {
    console.error('Error in initial door selection:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Reveal hard puzzle endpoint
app.get('/api/game/revealHardPuzzle/:gameSessionId', async (req, res) => {
  try {
    const { gameSessionId } = req.params;

    // Find the game session document in the database
    const gameSession = await GameSession.findById(gameSessionId);

    if (!gameSession) {
      return res.status(404).json({ error: 'Game session not found' });
    }

    const { selectedDoor, puzzles } = gameSession;

    // Call the revealHardPuzzle function from gameController.js
    const revealedPuzzle = gameController.revealHardPuzzle(selectedDoor, puzzles);

    // Send the revealed puzzle to the client
    res.json({ puzzle: revealedPuzzle });
  } catch (error) {
    console.error('Error in revealing hard puzzle:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Final door selection endpoint
app.post('/api/game/finalSelection/:gameSessionId', async (req, res) => {
  try {
    const { gameSessionId } = req.params;
    const { doorNumber } = req.body;

    // Find the game session document in the database
    const gameSession = await GameSession.findById(gameSessionId);

    if (!gameSession) {
      return res.status(404).json({ error: 'Game session not found' });
    }

    const { puzzles } = gameSession;

    // Validate the doorNumber input
    if (doorNumber < 1 || doorNumber > 3) {
      return res.status(400).json({ error: 'Invalid door number' });
    }

    // Retrieve the selected puzzle based on the doorNumber
    const selectedPuzzle = puzzles[doorNumber - 1];

    // Update the game session document with the final selected door
    gameSession.finalSelectedDoor = doorNumber;
    await gameSession.save();

    // Send the selected puzzle to the client
    res.json({ puzzle: selectedPuzzle });
  } catch (error) {
    console.error('Error in final door selection:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/puzzles/:doorNumber', async (req, res) => {
  try {
    const { doorNumber } = req.params;
    const gameSession = await GameSession.findById(req.query.gameSessionId);
    if (!gameSession) {
      return res.status(404).json({ error: 'Game session not found' });
    }
    const puzzle = gameSession.puzzles[doorNumber - 1];
    res.json(puzzle);
  } catch (error) {
    console.error('Error fetching puzzle data:', error);
    res.status(500)
  }
});

app.post('/api/submit-answer', async (req, res) => {
  try {
    const { gameSessionId, puzzleId, answer } = req.body;
    const gameSession = await GameSession.findById(gameSessionId);
    if (!gameSession) {
      return res.status(404).json({ error: 'Game session not found' });
    }
    const isCorrect = await gameController.checkAnswer(puzzleId, answer);

    if (isCorrect) {
      //update score
      await gameController.updateScore(gameSession, puzzleId, true);
    }

    res.json({ isCorrect });
  } catch (error) {
    console.error('Error submitting answer: ', error);
    res.status(500).json({ error: 'Internval server error' });
  }
});

app.put('/api/game-state', async (req, res) => {
  try {
    const { gameSessionId, stage, selectedDoor, isCorrect } = req.body;
    const gameSession = await GameSession.findById(gameSessionId);
    if (!gameSession) {
      return res.status(404).json({ error: 'Game session not found' });
    }
    gameSession.stage = stage;
    gameSession.selectedDoor = selectedDoor;
    if (isCorrect) {
      gameSession.score += 1;
    }
    await gameSession.save();
    res.json(gameSession);
  } catch (error) {
    console.error('Error updating game state:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//ALTERNATIVE WAY TO CREATE NEW PUZZLE
app.post('/api/puzzles', async (req, res) => {
  try {
    const { question, answer, difficulty, stage } = req.body;
    const puzzle = new Puzzle({ question, answer, difficulty, stage });
    await puzzle.save();
    res.status(201).json(puzzle);
  } catch (error) {
    console.error('Error creating puzzle:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// basic template for backend

// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(bodyParser.json());

// // MongoDB Connection
// mongoose.connect('mongodb://localhost:27017/game_database', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// // MongoDB Schema and Model for Puzzles
// const puzzleSchema = new mongoose.Schema({
//   difficulty: String,
//   question: String,
//   answer: String,
// });
// const Puzzle = mongoose.model('Puzzle', puzzleSchema);

// // MongoDB Schema and Model for Users
// const userSchema = new mongoose.Schema({
//   username: String,
//   progress: {
//     stage: Number,
//     selectedDoors: [Number],
//     revealedDoor: Number,
//   },
//   score: Number,
// });
// const User = mongoose.model('User', userSchema);

// // MongoDB Schema and Model for Sessions
// const sessionSchema = new mongoose.Schema({
//   sessionId: String,
//   userId: mongoose.Schema.Types.ObjectId,
//   expiration: Date,
// });
// const Session = mongoose.model('Session', sessionSchema);

// // API Endpoints

// // Endpoint to serve puzzles with correct difficulty
// app.get('/puzzles/:difficulty', async (req, res) => {
//   try {
//     const difficulty = req.params.difficulty;
//     const puzzle = await Puzzle.findOne({ difficulty });
//     res.json(puzzle);
//   } catch (error) {
//     console.error('Error fetching puzzle:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Endpoint to handle user progress and scores
// app.get('/users/:userId', async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const user = await User.findById(userId);
//     res.json(user);
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// app.post('/users/:userId/progress', async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const { stage, selectedDoors, revealedDoor } = req.body;
//     await User.findByIdAndUpdate(userId, {
//       progress: { stage, selectedDoors, revealedDoor },
//     });
//     res.status(200).send('Progress updated successfully');
//   } catch (error) {
//     console.error('Error updating user progress:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Endpoint for revealing a hard puzzle behind one of the non-selected doors
// // This would involve logic to determine which door to reveal the puzzle behind

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });


// CODE FROM MONGO ATLAS PAGE ----- NOT SURE WHAT TO DO WITH THIS
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://chrisquattrocchi:L0Qq6JVubQ60wFYg@monty-hall-coding-quest.vo7yal4.mongodb.net/?retryWrites=true&w=majority&appName=monty-hall-coding-quest";
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);