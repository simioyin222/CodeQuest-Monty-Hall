const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

// API routes
router.post('/api/game/initialSelection', gameController.initialSelection);
router.get('/api/game/revealHardPuzzle/:gameSessionId', gameController.revealHardPuzzle);
router.post('/api/game/finalSelection/:gameSessionId', gameController.finalSelection);
router.get('/api/game-state/:gameSessionId', gameController.getGameState);
router.put('/api/game-state', gameController.updateGameState);

module.exports = router;