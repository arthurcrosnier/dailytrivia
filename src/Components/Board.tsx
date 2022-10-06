import react, { useState, useContext } from "react";
import { MyGlobalContext, MyQuizzContext } from "../Context/gameContext";
import Choice from "./Choice";
import Question from "./Question";

interface BoardProps {
  isGoodResponseArrayProps: Array<boolean>;
  onClickProps: (indexChoice: number, id: number) => void;
  isDisabledChoiceArrayProps: Array<boolean>;
}

function Board(props: BoardProps) {
  const { score, setScore } = useContext(MyGlobalContext);
  const { quizzQuestions } = useContext(MyQuizzContext);
  const idQuestion = getIdQuestionFromScore();

  function getQuestionFromScore() {
    if (
      score != undefined &&
      quizzQuestions != undefined &&
      quizzQuestions[score] != undefined
    ) {
      return quizzQuestions[score].question!;
    } else {
      return "";
    }
  }

  function getIdQuestionFromScore() {
    if (
      score != undefined &&
      quizzQuestions != undefined &&
      quizzQuestions[score] != undefined
    ) {
      return quizzQuestions[score].id!;
    } else {
      return 0;
    }
  }

  function getChoicesFromScore() {
    if (
      score != undefined &&
      quizzQuestions != undefined &&
      quizzQuestions[score] != undefined
    ) {
      return quizzQuestions[score].choices!;
    } else {
      return [];
    }
  }

  function getChoices() {
    return getChoicesFromScore().map((choice, index) => {
      return (
        <Choice
          isGoodResponseProps={props.isGoodResponseArrayProps[index]}
          isDisabled={props.isDisabledChoiceArrayProps[index]}
          value={choice}
          key={index}
          id={idQuestion}
          onClickProps={() => {
            return props.onClickProps(index, idQuestion);
          }}
        />
      );
    });
  }

  return (
    console.log(props.isDisabledChoiceArrayProps),
    (
      <div className="board">
        <Question value={getQuestionFromScore()} />
        <div className="container_response">{getChoices()}</div>
      </div>
    )
  );
}

export default Board;
