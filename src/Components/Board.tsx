import { useContext } from "react";
import Choice from "./Choice";
import Question from "./Question";

interface BoardProps {
  onClickProps: (event: any, indexChoice: number, id: number) => void;
  quizzObjectProps: {
    id: number;
    question: string;
    choices: Array<object>;
  };
  isDisabledAllButtonProps: boolean;
}

function Board(props: BoardProps) {
  function getChoices() {
    return props.quizzObjectProps.choices.map((choice: any, index) => {
      return (
        <Choice
          isBadResponseProps={choice.isBad}
          isGoodResponseProps={choice.isFound}
          isDisabled={choice.isDisabled}
          isDisabledAllButtonProps={props.isDisabledAllButtonProps}
          value={choice.text}
          key={index}
          id={props.quizzObjectProps.id}
          onClickProps={() => {
            return props.onClickProps(event, index, props.quizzObjectProps.id);
          }}
        />
      );
    });
  }

  return (
    <div className="board">
      <Question value={props.quizzObjectProps.question} />
      <div className="container_response">{getChoices()}</div>
    </div>
  );
}

export default Board;
