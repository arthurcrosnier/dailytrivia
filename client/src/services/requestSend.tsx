import { useCallback } from "react";

export const fetchDataTrivias = async () => {
  const url = "https://trivia.crar1016.odns.fr/api/quizz/active";
  const response = await fetch(url);
  const json = await response.json();
  const results = json.data;
  for (let i = 0; i < json.data.length; i++) {
    for (let ii = 0; ii < json.data[i].reponses.length; ii++) {
      const t = json.data[i].reponses[ii];
      results[i].reponses[ii] = {
        isFound: false,
        isBad: false,
        isDisabled: false,
        text: t,
      };
    }
  }

  return [results];
};

export const fetchResponseTrivia = async (
  idQuestion: number,
  reponseTxt: string
) => {
  try {
    const url = new URL(
      "https://trivia.crar1016.odns.fr/api/quizz/goodresponse"
    );

    const params = [
      ["id_trivia", idQuestion.toString()],
      ["response", reponseTxt],
    ];

    url.search = new URLSearchParams(params).toString();

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (err) {
  } finally {
  }
};
