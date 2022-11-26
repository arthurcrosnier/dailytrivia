const http = require("https");
const { Trivia } = require("../db/sequelize");
const { decode } = require("html-entities");

const listCategory = {
  entertainment: [11, 12, 13, 14, 15, 16, 32],
  science: [17, 18, 19],
  sport: [21],
  history: [23, 24],
  geography: [22],
  art: [25, 20, 10],
  other: [9, 27, 30],
};

function findProprCateg(number) {
  for (const property in listCategory) {
    for (i = 0; i < listCategory[property].length; i++) {
      if (number == listCategory[property][i]) {
        return property;
      }
    }
  }

  return "other";
}

function getRandomCategory() {
  const keys = Object.keys(listCategory);
  const propriete = keys[Math.floor(Math.random() * keys.length)];
  const random = Math.floor(Math.random() * listCategory[propriete].length);
  return listCategory[propriete][random];
}

let options = (randomCategory) => {
  return {
    method: "GET",
    hostname: "opentdb.com",
    port: null,
    path: "/api.php?amount=50&category=" + randomCategory + "&type=multiple",
    headers: {
      cookie: "PHPSESSID=9908c56b2d458e4e03a42a6f8cd2d16b",
      "Content-Length": "0",
    },
  };
};

module.exports = (app) => {
  app.get("/api/opendb/find", async (req, res) => {
    randomCateg = getRandomCategory();
    const req2 = http.request(options(randomCateg), function (res2) {
      const chunks = [];

      res2.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res2.on("end", function () {
        const body = Buffer.concat(chunks);
        const bodyJson = JSON.parse(body.toString());
        const resultConverted = bodyJson;
        addDb(resultConverted.results, randomCateg);

        resultConverted.options = options(randomCateg);
        res.json(resultConverted);
      });
    });
    req2.end();
  });
};

function addDb(results, categ) {
  var c = findProprCateg(categ);
  results.forEach(async (element) => {
    const questionExist = await Trivia.findOne({
      where: { question: element.question },
    });
    if (questionExist !== null) {
      return;
    }
    var difficulty = 1;
    if (element.difficulty == "medium") {
      difficulty = 2;
    } else if (element.difficulty == "hard") {
      difficulty = 3;
    }
    Trivia.create({
      question: decode(element.question),
      reponse1: decode(element.correct_answer),
      reponse2: decode(element.incorrect_answers[0]),
      reponse3: decode(element.incorrect_answers[1]),
      reponse4: decode(element.incorrect_answers[2]),
      good_answer: 1,
      difficulty: difficulty,
      themes: [c],
    });
  });
}
