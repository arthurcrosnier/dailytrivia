import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Game from "./Components/Game";
import StatsGame from "./Components/StatsGame";
import "./css/index.css";

ReactDOM.createRoot(document.getElementById("main") as HTMLElement).render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById("aside") as HTMLElement).render(
  <React.StrictMode>
    <StatsGame />
  </React.StrictMode>
);
