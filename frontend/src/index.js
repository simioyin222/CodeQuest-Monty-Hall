import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import App from './App';

//Main Menu
const MainMenu = () => {
  return (
    <div className="main-menu">
      <div className="div">
      <Link to="/gameplay-puzzle" className="text-wrapper">PlayQuest</Link>
      <Link to="/quest-guide" className="text-wrapper-2">QuestGuide</Link>
        <p className="created-by">
          Created By:&nbsp;&nbsp;Similoluwa Oyinkolade
          <br />
          Jonathan Song
          <br />
          Trent Dietzel
          <br />
          Christoper Quattrocchi
        </p>
      </div>
    </div>
  );
};
//QuestGuide
export const QuestGuide = () => {
  const navigate = useNavigate();

  return (
    <div className="quest-guide">
      <div className="div">
        <div className="overlap-group">
          <div className="text-wrapper" onClick={() => navigate(-1)}>Back</div>
          <div className="rectangle" />
          <p className="each-stage-has-three">
          -Each stage has three doors, behind which are hidden two challenging puzzles and one easier puzzle.
            <br />
            -Players select one door initially. The application then reveals a hard puzzle behind one of the unchosen
            doors.
            <br />
            -Players have the option to stick with their initial choice or switch to the other unopened door.<br /> -They must
            solve the puzzle behind their final choice to progress to the next stage. Successfully solving an easier
            puzzle allows for smoother progression.
            <br />
            -Stages vary in theme, starting with React-related challenges and including a &#34;palette cleanser&#34;
            stage with non-coding puzzles or tricky questions.
            <br />
            <br />
            Objective: The objective is to advance as far as possible by strategically navigating through stages and
            solving puzzles. Knowledge of the Monty Hall problem can aid players in increasing their chances of
            encountering easier puzzles, thereby progressing further in the game.
          </p>
        </div>
        <div className="text-wrapper-2">QuestGuide</div>
      </div>
    </div>
  );
};
//Gameplay-Puzzle Selection
const GameplayPuzzle = () => {
  const navigate = useNavigate();

  return (
    <div className="gameplay-puzzle">
      <div className="div">
        <div className="overlap-group">
          <div className="frame" />
          <div className="puzzle-piece"></div>
          <Link to="/gameplay-door-closed" className="text-wrapper">Lang 2</Link>
        </div>
        <div className="overlap-2">
          <div className="puzzle-piece-2"></div>
          <Link to="/gameplay-door-closed" className="text-wrapper-2">Lang 1</Link>
        </div>
        <div className="overlap-3">
          <div className="puzzle-piece-3"></div> 
          <Link to="/gameplay-door-closed" className="text-wrapper-3">Lang 3</Link>
        </div>
        <div className="text-wrapper-4" onClick={() => navigate(-1)}>Back</div>
      </div>
    </div>
  );
};
// Gameplay-Door Closed - Start Game Clicking Door(2) (yes walkthrough) (dont need to repeat because this is only for door 2)
export const GameplayDoorClosed = () => {
  return (
    <div className="gameplay-door-closed">
      <div className="div">
        <div className="door">
          <div className="overlap-group">
            <div className="frame" />
            <div className="rectangle" />
            <div className="rectangle-2" />
            <div className="text-wrapper">DOOR 1</div>
          </div>
        </div>
        <div className="overlap-wrapper">
          <div className="overlap-group">
            <div className="frame" />
            <div className="rectangle" />
            <div className="rectangle-2" />
            <Link to="/door-open" className="text-wrapper">DOOR 2</Link>
          </div>
        </div>
        <div className="overlap-group-wrapper">
          <div className="overlap-group">
            <div className="frame" />
            <div className="rectangle" />
            <div className="rectangle-2" />
            <div className="text-wrapper">DOOR 3</div>
          </div>
        </div>
      </div>
    </div>
  );
};
//Gameplay- Door Open clicking door YES or no (2)
export const DoorOpen = () => {
const neavigate = useNavigate();

  return (
    <div className="door-open">
      <div className="door">
        <div className="overlap-group">
          <div className="frame">
            <div className="text-wrapper">Problem</div>
          </div>
          <div className="rectangle"></div>
          <div className="img"></div>
        </div>
      </div>
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="div" />
          <div className="rectangle-2" />
          <div className="rectangle-3" />
          <div className="text-wrapper-2">DOOR 2</div>
        </div>
      </div>
      <div className="overlap-group-wrapper">
        <div className="overlap">
          <div className="div" />
          <div className="rectangle-2" />
          <div className="rectangle-3" />
          <div className="text-wrapper-2">DOOR 3</div>
        </div>
      </div>
      <div className="button-bar">
        <div className="overlap-2">
          <div className="yes-button">
            <div className="div-wrapper">
              <Link to="/gameplay-final" className="text-wrapper-3">Yes</Link>
            </div>
          </div>
          <div className="no-button">
            <div className="div-wrapper">
            <Link to="/gameplay-door-open" className="text-wrapper-3">No</Link>
            </div>
          </div>
          <p className="p">Would you like switch doors?</p>
        </div>
      </div>
    </div>
  );
};
// Gameplay-Final Choice Yes(2) (Yes Walkthrough)

export const GameplayFinal = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/gameplay-actual');
    }, 5000); // Adjust the time as needed

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="gameplay-final">
      <div className="door-open-w-yes-or-wrapper">
        <div className="door-open-w-yes-or">
          <div className="door">
            <div className="overlap-group">
              <div className="frame">
                <div className="text-wrapper">Problem</div>
              </div>
              <div className="rectangle"></div>
          <div className="img"></div>
            </div>
          </div>
          <div className="overlap-wrapper">
            <div className="overlap">
              <div className="div" />
              <div className="rectangle-2" />
              <div className="rectangle-3" />
              <div className="text-wrapper-2">DOOR 2</div>
            </div>
          </div>
          <div className="overlap-group-wrapper">
            <div className="overlap">
              <div className="div" />
              <div className="rectangle-2" />
              <div className="rectangle-3" />
              <div className="text-wrapper-2">DOOR 3</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// Gameplay: Actual Question Page Yes(2)
export const GameplayActual = () => {
  return (
    <div className="gameplay-actual">
      <div className="div-wrapper">
        <div className="text-wrapper">Problem</div>
      </div>
    </div>
  );
};
//Gameplay- Door Open clicking door YES or no (2)  (no walkthrough)
export const GameplayDoorOpen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/gameplay-finalalt');
    }, 3000); // Adjust the time as needed for the automatic routing

    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <div className="gameplay-door-open">
      <div className="door-open-wrapper">
        <div className="door-open">
          <div className="door">
            <div className="overlap-group">
              <div className="frame" />
              <div className="rectangle" />
              <div className="div" />
              <div className="text-wrapper">DOOR 3</div>
            </div>
          </div>
          <div className="overlap-wrapper">
            <div className="overlap">
              <div className="div-wrapper">
                <div className="text-wrapper-2">Problem</div>
              </div>
              <div className="rectangle-2" />
          <div className="rectangle-3" />
            </div>
          </div>
          <div className="overlap-group-wrapper">
            <div className="overlap-group">
              <div className="frame" />
              <div className="rectangle" />
              <div className="div" />
              <div className="text-wrapper">DOOR 1</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

//door fully open user has picked no and stuck with choice 2 
export const GameplayFinalalt = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/gameplay-actual2');
    }, 3000); // Adjust the time as needed for the automatic routing

    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <div className="gameplay-finalalt">
      <div className="door-open-w-yes-or-wrapper">
        <div className="door-open-w-yes-or">
          <div className="door">
            <div className="overlap-group">
              <div className="frame" />
              <div className="rectangle" />
              <div className="div" />
              <div className="text-wrapper">DOOR 3</div>
            </div>
          </div>
          <div className="div-wrapper">
            <div className="text-wrapper-2">Problem</div>
          </div>
          <div className="overlap-wrapper">
            <div className="overlap-group">
              <div className="frame" />
              <div className="rectangle" />
              <div className="div" />
              <div className="text-wrapper">DOOR 1</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// Gameplay: Actual Question Page No(2)

export const GameplayActual2 = () => {
  return (
    <div className="gameplay-actual2">
      <div className="div-wrapper">
        <div className="text-wrapper">Problem</div>
      </div>
    </div>
  );
};


//routes and connections to pages
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/gameplay-puzzle" element={<GameplayPuzzle />} />
        <Route path="/quest-guide" element={<QuestGuide />} />
        <Route path="/gameplay-door-closed" element={<GameplayDoorClosed />} />
        <Route path="/door-open" element={<DoorOpen />} />
        <Route path="/gameplay-final" element={<GameplayFinal />} />
        <Route path="/gameplay-actual" element={<GameplayActual />} />
        <Route path="/gameplay-door-open" element={<GameplayDoorOpen />} />
        <Route path="/gameplay-finalalt" element={<GameplayFinalalt />} />
        <Route path="/gameplay-actual2" element={<GameplayActual2 />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
