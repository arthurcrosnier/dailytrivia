import { useState, useEffect, useCallback } from "react";
import "../css/game.css";
import Board from "./Board";
import { globalContent } from "../Data/info";
import ResultPanel from "./ResultPanel";
import ModalEnter from "./ModalEnter";
import { fetchDataTrivias, fetchResponseTrivia } from "../services/requestSend";

function Game() {
  // declare the states
  const [startState, setStartState] = useState<boolean>(false);
  const [isDisabledAllButtonState, setIsDisabledAllButtonState] =
    useState<boolean>(false);
  const [globalContentState, setGlobalContentState] =
    useState<any>(globalContent);
  const [quizzObjectState, setQuizzObjectState] = useState<any>();

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
    setTimeout(() => {
      setGlobalContentState((globalContentState: any) => ({
        ...globalContentState,
        tryLeft: globalContentState.tryLeft - 1,
      }));
      setIsDisabledAllButtonState(false);
    }, 700);
  }

  function goodAnswer(indexButton: number) {
    quizzObjectState[globalContentState.score as number].reponses[
      indexButton
    ].isFound = true;
    setQuizzObjectState((quizzObjectState: any) => ({
      ...quizzObjectState,
    }));
    updateScore();
  }

  function badAnswer(indexButton: number) {
    quizzObjectState[globalContentState.score as number].reponses[
      indexButton
    ].isBad = true;
    quizzObjectState[globalContentState.score as number].reponses[
      indexButton
    ].isBad = true;
    quizzObjectState[globalContentState.score as number].reponses[
      indexButton
    ].isDisabled = true;
    setQuizzObjectState((quizzObjectState: any) => ({
      ...quizzObjectState,
    }));
    updateTryLeft();
  }

  //click on response button
  async function reponseClick(indexButton: number, idQuestion: number) {
    setIsDisabledAllButtonState(true);
    try {
      const ReponseTxt =
        quizzObjectState[globalContentState.score as number].reponses[
          indexButton
        ].text;
      const result = await fetchResponseTrivia(
        idQuestion,
        quizzObjectState[globalContentState.score as number].reponses[
          indexButton
        ].text
      );
      if (result.is_good_response == true) {
        goodAnswer(indexButton);
      } else {
        badAnswer(indexButton);
      }
    } catch (err) {
    } finally {
    }
  }

  //win / lose state
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

  // fetch data and set states on start
  const fetchAndSetDataTrivias = useCallback(async () => {
    const results: any = await fetchDataTrivias();
    setQuizzObjectState(results[0]);
    setGlobalContentState((globalContentState: any) => ({
      ...globalContentState,
      totalQuestion: results[0].length,
    }));
  }, []);

  useEffect(() => {
    fetchAndSetDataTrivias().catch(console.error);
  }, [fetchAndSetDataTrivias]);

  // when user click on start game
  function startClick() {
    if (quizzObjectState) {
      setStartState(true);
    }
  }

  const statsScore = [20, 10, 50, 30, 52, 65, 54];
  return (
    <div id="content" className="Game">
      {quizzObjectState && startState ? (
        !globalContentState.win &&
        !globalContentState.gameOver &&
        quizzObjectState[globalContentState.score as number] ? (
          <Board
            onClickReponseProps={(indexChoice: number, id: number) =>
              reponseClick(indexChoice, id)
            }
            quizzObjectProps={
              quizzObjectState[globalContentState.score as number]
            }
            isDisabledAllButtonProps={isDisabledAllButtonState}
            globalContentProps={globalContentState}
          />
        ) : (
          <ResultPanel
            win={globalContentState.win}
            score={globalContentState.score}
            nbrQuestion={globalContentState.totalQuestion}
            scoreStatsToday={statsScore}
          />
        )
      ) : (
        <ModalEnter start={startState} startClick={() => startClick()} />
      )}
    </div>
  );
}

export default Game;
