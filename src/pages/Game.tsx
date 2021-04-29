// React
import React, { useState, useEffect, useRef } from "react";
// Library
import { alphabet } from "../lib/alphabet";
import { getRandomNumber, changeBackgroundStyle } from "../lib/helper_functions";
// Styles
import "../styles/Game.scss";

// Global Types
import { HandleGameMistakesT, HandleCorrectAnswersT, HandleSetStageT } from "../GlobalTypes";
import { FunctionComponent } from "react";
// Local Types
interface Props {
  gameMistakes: number;
  handleGameMistakes: HandleGameMistakesT;
  correctAnswers: number;
  handleCorrectAnswers: HandleCorrectAnswersT;
  handleSetStage: HandleSetStageT;
}

interface EventLogT {
  time: number;
  match: boolean;
}
// 1a. - e. Types
type HandleInitSequenceT = (seq: string[]) => void;
type HandleCurrentLetterT = (l: string) => void;
type HandleHideLetterT = (bl: boolean) => void;
type HandleEventLogT = (log: EventLogT) => void;
type HandleAllowedEventsT = (n: number) => void;
// 2. Tpesypes
type CreateSequenceT = () => void;
type GetRandomLetterT = () => void;
// 3. Types
type HandleKeyDownT = (e: KeyboardEvent) => void;

const Game: FunctionComponent<Props> = ({
  gameMistakes,
  handleGameMistakes,
  correctAnswers,
  handleCorrectAnswers,
  handleSetStage,
}) => {
  // 1a. Letter sequence on load
  const [initSequence, setInitSequence] = useState<string[]>([]);
  const handleInitSequence: HandleInitSequenceT = (seq) => setInitSequence(seq);
  // 1b. Currently displayed letter / 2n letter
  const currentLetter = useRef<string[]>([]);
  const handleCurrentLetter: HandleCurrentLetterT = (l) => (currentLetter.current = [...currentLetter.current, l]);
  // 1c. Trigger to hide/show letter
  const [hideLetter, setHideLetter] = useState<boolean>(false);
  const handleHideLetter: HandleHideLetterT = (bl) => setHideLetter(bl);
  // 1d. After firing event with letter 'm', the event gets logged into this state
  const [eventLog, setEventLog] = useState<EventLogT[]>([]);
  const handleEventLog: HandleEventLogT = (log) => setEventLog([...eventLog, log]);
  // 1e. const [allowedEvent, setAllowedEvent] = useState<number>(1);
  const allowedEvent = useRef<number>(1);
  const handleAllowedEvents: HandleAllowedEventsT = (n) => (allowedEvent.current = n);

  // 2. Creates a sequence of 15 letters to be loaded on game initation
  const createSequence: CreateSequenceT = () => {
    const alphabetLength: number = alphabet.length;
    const letterSequence: string[] = [];

    // Get random letter function helper
    const getRandomLetter: GetRandomLetterT = () => {
      const randomNumber: number = getRandomNumber(alphabetLength);
      const randomLetter: string = alphabet[randomNumber];
      letterSequence.push(randomLetter);
    };

    for (let i = 0; i < 15; i++) {
      if (i <= 1) {
        // First two letters are always randomly generated
        getRandomLetter();
      } else {
        // Other letters have a chance of repeating the letter that was 2 steps ahead, to make sure that repeats happen
        const chancer: number = getRandomNumber(4);
        if (chancer < 3) {
          getRandomLetter();
        } else {
          const repeatedLetter: string = letterSequence[i - 2];
          letterSequence.push(repeatedLetter);
        }
      }
    }

    handleInitSequence(letterSequence);
    handleCurrentLetter(letterSequence[0]);
  };

  // 3. Key down function
  const handleKeyDown: HandleKeyDownT = (e) => {
    if ((e.key === "m" && allowedEvent.current === 1) || (e.type === "touchstart" && allowedEvent.current === 1)) {
      const currentLetterLength: number = currentLetter.current.length;

      const match: boolean =
        currentLetter.current[currentLetterLength - 1] === currentLetter.current[currentLetterLength - 3];
      const eventStamp: EventLogT = {
        time: Date.now(),
        match,
      };

      changeBackgroundStyle(match);

      handleAllowedEvents(0);
      handleEventLog(eventStamp);
    }
  };

  // 4a. Initiation of the game & event listener, set sequence, run
  useEffect(() => {
    createSequence();
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleKeyDown);

    return () => {
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("touchstart", handleKeyDown);
    };
  }, []);

  // 4b. Interval configuration on letter hiding/showing
  useEffect(() => {
    const currLetter: string[] = currentLetter.current;
    const currentLength: number = currLetter.length;

    if (currentLength < 16) {
      const timein: ReturnType<typeof setTimeout> = setTimeout(() => {
        // new letter gets hidden after 3000s
        handleHideLetter(true);
      }, 500);

      const timeout: ReturnType<typeof setTimeout> = setTimeout(() => {
        // If user fails to press button on correct answer, a game mistake gets recorded
        if (currLetter[currentLength - 1] === currLetter[currentLength - 3] && allowedEvent.current === 1) {
          handleGameMistakes(gameMistakes - 1);
          changeBackgroundStyle(false);
        }

        // Exit game after turn 15
        if (currentLength === 15) handleSetStage(3);
        // Next letter gets generated after 3000ms and gets shown if the mistakes are not 0
        handleCurrentLetter(initSequence[currentLength]);
        handleAllowedEvents(1);
        handleHideLetter(false);
      }, 3000);

      return () => {
        clearTimeout(timeout), clearTimeout(timein);
      };
    }
  }, [currentLetter.current]);

  // 5. Event log checker
  useEffect(() => {
    if (eventLog.length > 0) {
      const latestEvent: EventLogT = eventLog[eventLog.length - 1];
      if (!latestEvent.match) handleGameMistakes(gameMistakes - 1);
      if (latestEvent.match) handleCorrectAnswers(correctAnswers + 1);
    }
  }, [eventLog]);

  // 6. Check game mistakes
  useEffect(() => {
    if (gameMistakes < 0) handleSetStage(3);
  }, [gameMistakes]);

  return (
    <p className="game-letter">
      {hideLetter
        ? ""
        : currentLetter.current[currentLetter.current.length - 1] &&
          currentLetter.current[currentLetter.current.length - 1].toLocaleUpperCase()}
    </p>
  );
};

export default Game;
