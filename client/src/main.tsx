import React from "react";
import ReactDOM from "react-dom/client";
import Game from "./Components/Game";
import "./css/index.css";

ReactDOM.createRoot(document.getElementById("main") as HTMLElement).render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>
);

/*ReactDOM.createRoot(document.getElementById("aside") as HTMLElement).render(
  <React.StrictMode>
    <StatsGame />
  </React.StrictMode>
);*/
