let dataQuizzQuestions: {
  id: number;
  question: string;
  choices: Array<string>;
}[] = [
  {
    id: 350,
    question: "quel réponse est la bonne ?",
    choices: ["reponse 1", "reponse 2", "reponse 3", "reponse 4"],
  },
  {
    id: 879,
    question: "De quel couleur est le cheval blanc d'henri 4 ?",
    choices: ["Jaune", "bleu", "vert", "blanc"],
  },
];

let dataQuizzResponses: {
  id: number;
  response: number;
}[] = [
  {
    id: 350,
    response: 2,
  },
  {
    id: 879,
    response: 4,
  },
];

export { dataQuizzResponses };
export { dataQuizzQuestions };
