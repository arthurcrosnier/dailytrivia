import React from "react";

let globalContent: {
  score: number;
  totalQuestion: number;
  tryLeft: number;
  userId: number;
  gameOver: boolean;
  win: boolean;
} = {
  score: 0,
  totalQuestion: 2,
  tryLeft: 3,
  userId: 0,
  gameOver: false,
  win: false,
};

export { globalContent };
