interface ResultPanelProps {
  win: boolean;
  score: number;
  nbrQuestion: number;
}

function ResultPanel(props: ResultPanelProps) {
  return (
    <div className="board">
      {props.win
        ? "Congratulation ! you win ! Only x% have find all the answer today!"
        : "You have answer correctly to " +
          props.score +
          "/" +
          props.nbrQuestion +
          " questions like X% peoples today."}
    </div>
  );
}

export default ResultPanel;
