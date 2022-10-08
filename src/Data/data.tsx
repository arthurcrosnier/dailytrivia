let dataQuizzQuestions: {
  id: number;
  question: string;
  choices: Array<object>;
}[] = [
  {
    id: 350,
    question: "quel réponse est la bonne ?",
    choices: [
      {
        isFound: false,
        isBad: false,
        isDisabled: false,
        text: "reponse 1",
      },
      {
        isFound: false,
        isBad: false,
        isDisabled: false,
        text: "reponse 2",
      },
      {
        isFound: false,
        isBad: false,
        isDisabled: false,
        text: "reponse 3",
      },
      {
        isFound: false,
        isBad: false,
        isDisabled: false,
        text: "reponse 4",
      },
    ],
  },
  {
    id: 879,
    question: "De quel couleur est le cheval blanc d'henri 4 ?",
    choices: [
      {
        isFound: false,
        isBad: false,
        isDisabled: false,
        text: "Jaune",
      },
      {
        isFound: false,
        isBad: false,
        isDisabled: false,
        text: "bleu",
      },
      {
        isFound: false,
        isBad: false,
        isDisabled: false,
        text: "vert",
      },
      {
        isFound: false,
        isBad: false,
        isDisabled: false,
        text: "blanc",
      },
    ],
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
