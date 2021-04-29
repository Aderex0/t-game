// Components
import Welcome from "./pages/Welcome";
import Game from "./pages/Game";
import Result from "./pages/Result";
// React
import React, { useState } from "react";
// Styles
import "./styles/App.scss";

// Global Types
import { HandlePlayerNameT, HandleSetStageT, HandleCorrectAnswersT, HandleGameMistakesT } from "./GlobalTypes";
import { FunctionComponent } from "react";

const App: FunctionComponent = () => {
  // Stage of the game; 1. Welcome, 2. Game, 3. Result
  const [stage, setStage] = useState<number>(1);
  const handleSetStage: HandleSetStageT = (n) => setStage(n);

  // 1. Player name state and handler
  const [playerName, setPlayerName] = useState<string>("");
  const handlePlayerName: HandlePlayerNameT = (name) => setPlayerName(name);

  // 2. Tracking current game
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const handleCorrectAnswers: HandleCorrectAnswersT = (n) => setCorrectAnswers(n);
  const [gameMistakes, setGameMistakes] = useState<number>(2);
  const handleGameMistakes: HandleGameMistakesT = (n) => setGameMistakes(n);

  return (
    <main>
      <span className="background-img"> </span>
      {stage === 1 && <Welcome handlePlayerName={handlePlayerName} handleSetStage={handleSetStage} />}
      {stage === 2 && (
        <Game
          handleSetStage={handleSetStage}
          gameMistakes={gameMistakes}
          correctAnswers={correctAnswers}
          handleCorrectAnswers={handleCorrectAnswers}
          handleGameMistakes={handleGameMistakes}
        />
      )}
      {stage === 3 && (
        <Result
          playerName={playerName}
          gameMistakes={gameMistakes}
          correctAnswers={correctAnswers}
          handlePlayerName={handlePlayerName}
          handleGameMistakes={handleGameMistakes}
          handleCorrectAnswers={handleCorrectAnswers}
          handleSetStage={handleSetStage}
        />
      )}
    </main>
  );
};

export default App;
