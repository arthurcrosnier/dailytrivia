import react, { useState, useEffect } from "react";
import "../css/game.css";
import Board from "./Board";
import { dataQuizzQuestions, dataQuizzResponses } from "../Data/data";
import { globalContent } from "../Data/info";
import Choice from "./Choice";
import ResultPanel from "./ResultPanel";

function Game() {
  //use dtate
  const [isDisabledAllButtonState, setIsDisabledAllButtonState] =
    useState<boolean>(false);
  const [globalContentState, setGlobalContentState] =
    useState<any>(globalContent);
  const quizzResponses = dataQuizzResponses;
  const [quizzObjectState, setQuizzObjectState] =
    useState<any>(dataQuizzQuestions);

  function updateScore() {
    setTimeout(() => {
      setGlobalContentState((globalContentState: any) => ({
        ...globalContentState,
        score: globalContentState.score + 1,
      }));
      setIsDisabledAllButtonState(false);
    }, 700);
  }

  function updateTryLeft() {
    setGlobalContentState((globalContentState: any) => ({
      ...globalContentState,
      tryLeft: globalContentState.tryLeft - 1,
    }));
  }

  function goodAnswer(indexButton: number) {
    quizzObjectState[globalContentState.score as number].choices[
      indexButton
    ].isFound = true;
    setQuizzObjectState((quizzObjectState: any) => ({
      ...quizzObjectState,
    }));
    setIsDisabledAllButtonState(true);
    updateScore();
  }

  function badAnswer(indexButton: number) {
    quizzObjectState[globalContentState.score as number].choices[
      indexButton
    ].isBad = true;
    quizzObjectState[globalContentState.score as number].choices[
      indexButton
    ].isBad = true;
    quizzObjectState[globalContentState.score as number].choices[
      indexButton
    ].isDisabled = true;
    setQuizzObjectState((quizzObjectState: any) => ({
      ...quizzObjectState,
    }));
    updateTryLeft();
  }

  function handleClick(event: any, indexButton: number, idQuestion: number) {
    const goodResponse = quizzResponses.find(
      (element) => element.id === idQuestion
    );
    /* if is good answer */
    if (goodResponse?.response == indexButton + 1) {
      goodAnswer(indexButton);
      /* else is bad answer */
    } else {
      badAnswer(indexButton);
    }
  }

  useEffect(() => {
    // set gameOver state if tryLeft <= 0
    if (globalContentState.tryLeft <= 0 && !globalContentState.gameOver) {
      setGlobalContentState((globalContentState: any) => ({
        ...globalContentState,
        gameOver: true,
      }));
      setIsDisabledAllButtonState(true);
      console.log("gameOver");
    }
    // set win if score == nvrQuestion (game is finish and player win)
    if (
      globalContentState.score >= globalContentState.totalQuestion &&
      !globalContentState.win
    ) {
      setGlobalContentState((globalContentState: any) => ({
        ...globalContentState,
        win: true,
      }));
    }
  });

  return (
    <div id="content" className="Game">
      {!globalContentState.win &&
      !globalContentState.gameOver &&
      quizzObjectState[globalContentState.score as number] ? (
        <Board
          onClickProps={(event: any, indexChoice: number, id: number) =>
            handleClick(event, indexChoice, id)
          }
          quizzObjectProps={
            quizzObjectState[globalContentState.score as number]
          }
          isDisabledAllButtonProps={isDisabledAllButtonState}
        />
      ) : (
        <ResultPanel
          win={globalContentState.win}
          score={globalContentState.score}
          nbrQuestion={globalContentState.totalQuestion}
        />
      )}
    </div>
  );
}

export default Game;
