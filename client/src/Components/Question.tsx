interface QuestionProps {
  value: string;
}

function Question(props: QuestionProps) {
  return <div className="question">{props.value}</div>;
}

export default Question;
