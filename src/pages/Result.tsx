// React
import React from "react";
// Styles
import "../styles/Result.scss";

// Global Types
import { FunctionComponent } from "react";
import { HandleCorrectAnswersT, HandleGameMistakesT, HandlePlayerNameT, HandleSetStageT } from "src/GlobalTypes";
// Local Types
interface Props {
  playerName: string;
  correctAnswers: number;
  gameMistakes: number;
  handlePlayerName: HandlePlayerNameT;
  handleGameMistakes: HandleGameMistakesT;
  handleCorrectAnswers: HandleCorrectAnswersT;
  handleSetStage: HandleSetStageT;
}

interface ResultsObj {
  title: string;
  amount: number;
}

interface ResultsT {
  correctAnswers: ResultsObj;
  gameMistakes: ResultsObj;
}

const Result: FunctionComponent<Props> = ({
  playerName,
  correctAnswers,
  gameMistakes,
  handlePlayerName,
  handleGameMistakes,
  handleCorrectAnswers,
  handleSetStage,
}) => {
  // Results Object
  const results: ResultsT = {
    correctAnswers: {
      title: "Correct answers",
      amount: correctAnswers,
    },
    gameMistakes: {
      title: "Mistakes left",
      amount: gameMistakes === -1 ? 0 : gameMistakes,
    },
  };

  const handleBackBtn = () => {
    handlePlayerName("");
    handleGameMistakes(2);
    handleCorrectAnswers(0);
    handleSetStage(1);
  };

  return (
    <div className="result-container">
      <h1>Game over!</h1>
      <p>Results for {playerName}:</p>
      <ul>
        {Object.keys(results).map((entry, i) => (
          <li key={i}>{`${results[entry].title}: ${results[entry].amount}`}</li>
        ))}
      </ul>
      <p>
        {gameMistakes < 0 ? `Unfortunately, you're out of moves` : `Congratulations, you passed the letter sequence!`}
      </p>
      <button className="back-btn" onClick={handleBackBtn}>
        Back
      </button>
    </div>
  );
};

export default Result;
