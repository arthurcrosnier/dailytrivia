import react from "react";

interface ChoiceProps {
  isGoodResponseProps: boolean;
  onClickProps: () => void;
  value: string;
  key: number;
  id: number;
  isDisabled: boolean;
}

function Choice(props: ChoiceProps) {
  return (
    <button
      className={props.isGoodResponseProps ? "choice good" : "choice"}
      onClick={props.onClickProps}
      disabled={props.isDisabled}
    >
      {props.value}
    </button>
  );
}

export default Choice;
