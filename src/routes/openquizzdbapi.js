const http = require("https");
const { Trivia } = require("../db/sequelize");
const { decode } = require("html-entities");
const axios = require("axios");
const cheerio = require("cheerio");

const listCategory = {
  entertainment: ["CÉLÉBRITÉS", "CINÉMA", "LOISIRS", "MUSIQUE", "TÉLÉVISION"],
  science: ["INFORMATIQUE", "NATURE", "SCIENCES"],
  sport: ["SPORTS"],
  history: ["ARCHÉOLOGIE", "HISTOIRE", "PAYS DU MONDE"],
  geography: ["GÉOGRAPHIE", "TOURISME"],
  art: ["ARTS", "BANDE DESSINÉE", "LITTÉRATURE"],
  other: [
    "ANIMAUX",
    "CULTURE GÉNÉRALE",
    "GASTRONOMIE",
    "MOTS CROISÉS",
    "VIE QUOTIDIENNE",
    "WEB",
  ],
};

function findProprCateg(categ) {
  for (const property in listCategory) {
    for (i = 0; i < listCategory[property].length; i++) {
      if (categ == listCategory[property][i]) {
        return property;
      }
    }
  }

  return "other";
}

let options = (id) => {
  return {
    method: "POST",
    url: "https://www.openquizzdb.org/download.php",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    data: { q: id, categ: "" },
  };
};

function saveInFile(jsonData) {
  var fs = require("fs");
  fs.writeFile("ids.txt", JSON.stringify(jsonData), function (err) {
    if (err) {
      console.log(err);
    }
  });
}

module.exports = (app) => {
  app.get("/api/openquizzdbapi/find", async (req, res) => {
    const fs = require("fs");
    var text = fs.readFileSync("ids.txt", "utf8");
    let obj = JSON.parse(text);
    if (obj.ids[0] == null) {
      res.json({ error: "empty ids" });
    }
    axios
      .request(options(obj.ids[0]))
      .then(function (response) {
        const $ = cheerio.load(response.data);
        const categ = $("#my_lines")
          .children(".my_line")
          .next()
          .children("a")
          .first()
          .text();
        const info = $("#clip_json").text();
        const results = JSON.parse(info);
        //res.json(results);
        results.categ = categ;
        addDb(results);
        obj.ids.shift();
        saveInFile(obj);
        res.json(results);
      })
      .catch(function (error) {
        console.error(error);
      });
  });
};

async function addDb(results) {
  var c = findProprCateg(results.categ);
  const questionExist = await Trivia.findOne({
    where: { question: results.quizz.question },
  });
  if (questionExist !== null) {
    return;
  }
  var difficulty = 1;
  if (results.difficulté == "3/5") {
    difficulty = 2;
  } else if (results.difficulté == "4/5" || results.difficulté == "5/5") {
    difficulty = 3;
  }
  Trivia.create({
    question: decode(results.quizz.question),
    reponse1: decode(results.quizz.réponse),
    reponse2: decode(results.quizz.propositions[1]),
    reponse3: decode(results.quizz.propositions[2]),
    reponse4: decode(results.quizz.propositions[3]),
    good_answer: 1,
    difficulty: difficulty,
    themes: [c],
    language: 2,
  });
}
