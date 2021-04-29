//React
import React, { useState } from "react";
// Styles
import "../styles/Welcome.scss";

// Global Types
import { HandlePlayerNameT, HandleSetStageT } from "../GlobalTypes";
import { BaseSyntheticEvent, FunctionComponent } from "react";
// Local Types
interface Props {
  handlePlayerName: HandlePlayerNameT;
  handleSetStage: HandleSetStageT;
}
interface RuleListT {
  ruleOne: string;
  ruleTwo: string;
  ruleThree: string;
}
type HandleNameT = (e: BaseSyntheticEvent) => void;
type HandleFormErrorT = (err: string) => void;
type HandleSubmitNameT = (e: BaseSyntheticEvent, name: string) => void;

const Welcome: FunctionComponent<Props> = ({ handlePlayerName, handleSetStage }) => {
  // Controled form for player name
  const [name, setName] = useState<string>("");
  const handleName: HandleNameT = (e) => setName(e.target.value);

  // Errors
  const [formError, setFormError] = useState<string>("");
  const handleFormError: HandleFormErrorT = (err) => setFormError(err);

  // Submit player name for game start
  const handleSubmitName: HandleSubmitNameT = (e, name) => {
    e.preventDefault();
    if (name.length > 2) {
      handlePlayerName(name);
      handleSetStage(2);
    } else {
      handleFormError("Name must be at least 2 characters long");
    }
  };

  const ruleList: RuleListT = {
    ruleOne: `If you see a letter that was same 2 steps ago, hit the 'm' button on your keyboard.`,
    ruleTwo: `You are allowed only 2 mistakes.`,
    ruleThree: `After 15 letters the game ends!`,
  };

  return (
    <div className="welcome-container">
      <h1>welcome to 2-back game!</h1>
      <ul>
        {Object.keys(ruleList).map((rule, i) => (
          <li key={i}>{ruleList[rule]}</li>
        ))}
      </ul>
      <form onSubmit={(e) => handleSubmitName(e, name)}>
        <label htmlFor="Pname">Enter your name and click start to begin:</label>
        {/*Displays error incase disabled is removed in browser */}
        {formError && <p>{formError}</p>}
        <input type="text" id="Pname" name="PlayerName" value={name} onChange={handleName}></input>
        <input type="submit" value="Start" disabled={name.length < 3 ? true : false}></input>
      </form>
    </div>
  );
};

export default Welcome;
