const { Configuration, OpenAIApi } = require("openai");

module.exports = (app, theme, difficulty) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const message =
    "Trouve moi 20 questions de " +
    theme +
    " " +
    difficulty +
    " avec 4 propositions chacune et sa réponse :";
  app.get("/api/openai/find", async (req, res) => {
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: message,
        temperature: 0.9,
        max_tokens: 1239,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      console.log("result openai");
      const r = resultToObject(
        response.data.choices[0].text,
        theme,
        difficulty
      );
      res.json(r);
    } catch (error) {
      console.log(message);
      res.json(JSON.stringify(error));
    }
  });
};

function resultToObject(result, theme, difficulty) {
  let finalResult = [];

  //split by line
  message_array = result.split("\n");

  function startsWithNumber(str) {
    return /^\d/.test(str);
  }

  //remove empty line
  const message_array_ready = message_array.filter((element) => {
    return element !== "";
  });

  for (i = 0; i < message_array_ready.length; i++) {
    if (startsWithNumber(message_array_ready[i])) {
      let o = {
        question: message_array_ready[i],
        proposition1: message_array_ready[i + 1],
        proposition2: message_array_ready[i + 2],
        proposition3: message_array_ready[i + 3],
        proposition4: message_array_ready[i + 4],
        reponse: message_array_ready[i + 5],
      };
      finalResult.push(o);
    }
  }
  for (i = 0; i < finalResult.length; i++) {
    finalResult[i].question = finalResult[i].question
      .replace(/^\d+/, "")
      .slice(2)
      .trim();
    finalResult[i].proposition1 = finalResult[i].proposition1.slice(3).trim();
    finalResult[i].proposition2 = finalResult[i].proposition2.slice(3).trim();
    finalResult[i].proposition3 = finalResult[i].proposition3.slice(3).trim();
    finalResult[i].proposition4 = finalResult[i].proposition4.slice(3).trim();
    finalResult[i].reponse = finalResult[i].reponse.slice(13).trim();
  }

  let o = {
    difficulty: difficulty,
    themes: theme,
  };

  finalResult.push(o);

  return finalResult;
}
