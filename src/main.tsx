import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Game from "./Components/Game";
import StatsGame from "./Components/StatsGame";
import "./css/index.css";
import { MyGlobalContext, MyQuizzContext } from "./Context/gameContext";
import { dataQuizzQuestions, dataQuizzResponses } from "./Data/data";

ReactDOM.createRoot(document.getElementById("main") as HTMLElement).render(
  <React.StrictMode>
    <MyGlobalContext.Provider
      value={{ score: 1, TotalQuestion: dataQuizzQuestions.length }}
    >
      <MyQuizzContext.Provider
        value={{
          quizzQuestions: dataQuizzQuestions,
          quizzResponses: dataQuizzResponses,
        }}
      >
        <Game />
      </MyQuizzContext.Provider>
    </MyGlobalContext.Provider>
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById("aside") as HTMLElement).render(
  <React.StrictMode>
    <StatsGame />
  </React.StrictMode>
);
