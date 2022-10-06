import react, { useState, useContext } from "react";
import "../css/game.css";
import Board from "./Board";
import { MyGlobalContext, MyQuizzContext } from "../Context/gameContext";

function Game() {
  const { score, setScore } = useContext(MyGlobalContext);
  const { quizzQuestions } = useContext(MyQuizzContext);
  const { quizzResponses } = useContext(MyQuizzContext);
  const [isDisabledChoiceArrayState, setIsDisabledChoiceArrayState] = useState<
    boolean[]
  >([false, false, false, false]);
  const [isGoodResponseArrayState, setIsGoodResponseArrayState] = useState<
    boolean[]
  >([false, false, false, false]);

  function getReponseFromId(id: number) {
    let reponseNumber = -1;
    quizzResponses?.map((response) => {
      if (id == response.id) {
        reponseNumber = response.response;
      }
    });
    return reponseNumber;
  }

  function disableChoice(id: number) {
    let reponseNumber = -1;
    quizzResponses?.map((response) => {
      if (id == response.id) {
        reponseNumber = response.response;
      }
    });
    return reponseNumber;
  }

  function handleClick(choice: number, id: number) {
    //check in quizzReponse[score] if
    if (getReponseFromId(id) == choice + 1) {
      let isGoodResponseArrayStateCopy = isGoodResponseArrayState;
      isGoodResponseArrayStateCopy[choice] = true;
      setIsGoodResponseArrayState([...isGoodResponseArrayStateCopy]);
    } else {
      let isDisabledChoiceArrayStateCopy = isDisabledChoiceArrayState;
      isDisabledChoiceArrayStateCopy[choice] = true;
      setIsDisabledChoiceArrayState([...isDisabledChoiceArrayStateCopy]);
    }
  }

  return (
    console.log("rerender"),
    (
      <div id="content" className="Game">
        <Board
          onClickProps={(indexChoice: number, id: number) =>
            handleClick(indexChoice, id)
          }
          isDisabledChoiceArrayProps={isDisabledChoiceArrayState}
          isGoodResponseArrayProps={isGoodResponseArrayState}
        />
      </div>
    )
  );
}

export default Game;
