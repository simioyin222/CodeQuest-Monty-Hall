import React, { useState } from 'react';
import './App.css';
import Stage from './Stage';
import Puzzle from './Puzzle';
import StartGame from './StartGame';
import DoorSelection from './DoorSelection';
import GameManager from './GameManager';

function App() {
  const [gameSessionId, setGameSessionId] = useState(null);
  const [currentStage, setCurrentStage] = useState(1);
  const [gameState, setGameState] = useState(null);

  const handleGameStart = (sessionId) => {
    setGameSessionId(sessionId);
    setCurrentStage(1);
  };

  const handleDoorSelected = (selectedPuzzle) => {
    // Update the game state with the selected puzzle
    setGameState((prevState) => ({
      ...prevState,
      selectedPuzzle,
    }));
  };

  const handleAnswerSubmit = (isCorrect) => {
    if (isCorrect) {
      // Move to the next stage
      setCurrentStage((prevStage) => prevStage + 1);
      // Reset the game state for the next stage
      setGameState(null);
    } else {
      // Handle incorrect answer (e.g., show error message)
      console.log('Incorrect Answer');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>CodeQuest: Monty Hall Challenge</h1>
      </header>
      <main>
        {!gameSessionId ? (
          <StartGame onGameStart={handleGameStart} />
        ) : (
          <>
            <Stage stageNumber={currentStage} />
            {gameState ? (
              <Puzzle
                puzzleData={gameState.selectedPuzzle}
                onAnswerSubmit={handleAnswerSubmit}
              />
            ) : (
              <DoorSelection
                gameSessionId={gameSessionId}
                onDoorSelected={handleDoorSelected}
              />
            )}
            <GameManager 
            gameSessionId={gameSessionId}
            currentStage={currentStage}
            selectedDoor={gameState?.selectedDoor}
            isCorrect={gameState?.isCorrect} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;

//Revised for UI????
// // App.js
// import React, { useState } from 'react';
// import { Switch, Route } from 'react-router-dom';
// import StartGame from './StartGame';
// import Stage from './Stage';
// import DoorSelection from './DoorSelection';
// import Puzzle from './Puzzle';
// import GameManager from './GameManager';
// import './App.css';

// const App = () => {
//   const [gameState, setGameState] = useState({
//     gameSessionId: null,
//     currentStage: 1,
//     selectedDoor: null,
//     isCorrect: null,
//   });

//   const handleGameStart = (sessionId) => {
//     setGameState((prevState) => ({
//       ...prevState,
//       gameSessionId: sessionId,
//       currentStage: 1,
//     }));
//   };

//   const handleDoorSelected = (selectedDoor) => {
//     setGameState((prevState) => ({
//       ...prevState,
//       selectedDoor,
//     }));
//   };

//   const handleAnswerSubmit = (isCorrect) => {
//     if (isCorrect) {
//       setGameState((prevState) => ({
//         ...prevState,
//         currentStage: prevState.currentStage + 1,
//         selectedDoor: null,
//         isCorrect: null,
//       }));
//     } else {
//       setGameState((prevState) => ({
//         ...prevState,
//         isCorrect: false,
//       }));
//     }
//   };

//   return (
//     <div className="app">
//       <Switch>
//         <Route exact path="/" component={StartGame} />
//         <Route
//           path="/stage/:stageNumber"
//           render={(props) => (
//             <Stage
//               {...props}
//               gameState={gameState}
//               onDoorSelected={handleDoorSelected}
//             />
//           )}
//         />
//         <Route
//           path="/door-selection"
//           render={(props) => (
//             <DoorSelection
//               {...props}
//               gameState={gameState}
//               onAnswerSubmit={handleAnswerSubmit}
//             />
//           )}
//         />
//         <Route
//           path="/puzzle"
//           render={(props) => (
//             <Puzzle {...props} gameState={gameState} />
//           )}
//         />
//       </Switch>
//       <GameManager gameState={gameState} />
//     </div>
//   );
// };

// export default App;