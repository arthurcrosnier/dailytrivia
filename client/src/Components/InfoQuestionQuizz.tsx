import pic1 from "../images/1.png";
import pic2 from "../images/2.png";
import pic3 from "../images/3.png";

interface InfoQuestionQuizzProps {
  globalContentProps: object | any;
  themeProps: string;
}

function InfoQuestionQuizz(props: InfoQuestionQuizzProps) {
  const chooseSmiley = () => {
    if (props.globalContentProps.tryLeft == 3) {
      return pic3;
    } else if (props.globalContentProps.tryLeft == 2) {
      return pic2;
    }
    return pic1;
  };

  function displayTheme(theme: string) {
    if (theme === "other") {
      theme = "general knowledge";
    }

    return theme[0].toUpperCase() + theme.slice(1).toLowerCase();
  }

  return (
    <div className={"infoBarGame " + props.themeProps}>
      <div className="score child">
        {props.globalContentProps.score + 1} /{" "}
        {props.globalContentProps.totalQuestion}
      </div>
      <div className="theme child">{displayTheme(props.themeProps)}</div>
      <div className="settings child"></div>
      <img src={chooseSmiley()} className="smiley" />
    </div>
  );
}

export default InfoQuestionQuizz;
