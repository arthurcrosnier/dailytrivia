import GraphItem from "./GraphItem";

interface ResultPanelProps {
  win: boolean;
  score: number;
  scoreStatsToday: number[];
  nbrQuestion: number;
}

function ResultPanel(props: ResultPanelProps) {
  console.log(props);
  function getPerformanceGraph() {
    let returnGraph = [];
    for (let i = 0; i < props.nbrQuestion; i++) {
      returnGraph[i] = <GraphItem indexProps={i + 1} widthProps={50} />;
    }

    return returnGraph;
  }

  return (
    <div className="modal">
      <section className="modal-main">
        <h2>
          You are found <strong>{props.score}</strong> reponse, like{" "}
          <strong>{props.scoreStatsToday[props.score]}%</strong> people today !
        </h2>
        <h3>Statistics</h3>
        <div className="stats">
          <div className="stats-content">
            <div className="stats-line">
              <div className="stats-item games-played">
                <p className="stat-item-figure">5</p>
                <p className="stat-item-label">Number of games</p>
              </div>
              <div className="stats-item win-rate">
                <p className="stat-item-figure">3</p>
                <p className="stat-item-label">Best Score</p>
              </div>
            </div>
            <div className="stats-line">
              <div className="stats-item current-streak">
                <p className="stat-item-figure">0</p>
                <p className="stat-item-label">
                  Average of the parties' best answers
                </p>
              </div>
            </div>
          </div>
        </div>
        <h3>Performances</h3>
        <div className="graph">
          <div className="graph-content">{getPerformanceGraph()}</div>
        </div>
        <div className="share">
          <div className="btn sh4re-btn-anti-adblock">
            <img src="/icons/copy.svg" className="icon" />
            <p>Share</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ResultPanel;

/*
You are found X reponse, like x% people today !
stats : nbr game
moyen response found
best score


Permormance [all response list]

*/
