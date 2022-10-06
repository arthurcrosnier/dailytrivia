import React from "react";

export type GlobalContent = {
  score: number;
  setScore: (score: number) => {};
  TotalQuestion: number;
  tryLeft: number;
  userId: number;
};

export type QuizzContent = {
  quizzQuestions: {
    id: number;
    question: string;
    choices: Array<string>;
  }[];
  quizzResponses: {
    id: number;
    response: number;
  }[];
  //setQuizzQuestion: (quizzQuestion: object) => {};
};

export const MyGlobalContext = React.createContext<Partial<GlobalContent>>({});
export const MyQuizzContext = React.createContext<Partial<QuizzContent>>({});
