import react from "react";

interface ChoiceProps {
  isDisabledAllButtonProps: boolean;
  isBadResponseProps: boolean;
  isGoodResponseProps: boolean;
  onClickProps: () => void;
  value: string;
  key: number;
  id: number;
  isDisabled: boolean;
}

function Choice(props: ChoiceProps) {
  function getClassName() {
    if (props.isGoodResponseProps) {
      return "choice good bubbly-button animate";
    } else if (props.isBadResponseProps) {
      return "choice bad";
    } else if (props.isDisabledAllButtonProps) {
      return "choice disabled";
    }
    return "choice";
  }
  return (
    <button
      className={getClassName()}
      onClick={props.onClickProps}
      disabled={props.isDisabled || props.isDisabledAllButtonProps}
    >
      {props.value}
    </button>
  );
}

export default Choice;
