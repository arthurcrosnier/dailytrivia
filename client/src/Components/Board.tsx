import Choice from "./Choice";
import Question from "./Question";
import InfoQuestionQuizz from "./InfoQuestionQuizz";

interface BoardProps {
  onClickReponseProps: (indexChoice: number, id: number) => void;
  quizzObjectProps: {
    id_trivia: number;
    question: string;
    reponses: Array<object>;
    theme: string;
  };
  isDisabledAllButtonProps: boolean;
  globalContentProps: object;
}

function Board(props: BoardProps) {
  function getChoices() {
    return props.quizzObjectProps.reponses.map((choice: any, index: number) => {
      return (
        <Choice
          isBadResponseProps={choice.isBad}
          isGoodResponseProps={choice.isFound}
          isDisabled={choice.isDisabled}
          isDisabledAllButtonProps={props.isDisabledAllButtonProps}
          value={choice.text}
          key={index}
          id={choice.id_trivia}
          onClickReponseProps={() => {
            return props.onClickReponseProps(
              index,
              props.quizzObjectProps.id_trivia
            );
          }}
        />
      );
    });
  }

  return (
    <div className="board">
      <InfoQuestionQuizz
        themeProps={props.quizzObjectProps.theme}
        globalContentProps={props.globalContentProps}
      />
      <Question value={props.quizzObjectProps.question} />
      <div className="container_response">{getChoices()}</div>
    </div>
  );
}

export default Board;
