const { Quizz, Trivia } = require("../db/sequelize");
const { Sequelize } = require("sequelize");
const { shuffle } = require("../helper/helper.js");

const themes = [
  "entertainment",
  "science",
  "sport",
  "history",
  "geography",
  "art",
  "other",
];

module.exports = (app) => {
  app.get("/api/quizz/create", async (req, res) => {
    if (
      !req.query.passCreate ||
      !req.query.language ||
      (req.query.passCreate && req.query.passCreate != "55sD50$Gyg*m") ||
      (req.query.language &&
        (req.query.language < "1" || req.query.language > "2"))
    ) {
      res.json({
        error: "bad request",
      });
    }
    const themesRandomized = shuffle(themes);
    const trivias = await findTrivias(themesRandomized, req.query.language);
    createQuizz(trivias, req.query.language);
    res.json(trivias);
  });
};

function getDifficulty(orderQuizz) {
  if (orderQuizz == 1 || orderQuizz == 2) {
    return 1;
  } else if (orderQuizz == 3 || orderQuizz == 4 || orderQuizz == 5) {
    return 2;
  } else {
    return 3;
  }
}

async function findTrivias(themesRandomized, language) {
  let t = [];
  for (var i = 0; i < themesRandomized.length; i++) {
    let difficulty = getDifficulty(i + 1);
    var r = await Trivia.findOne({
      where: {
        themes: themesRandomized[i],
        used_in_quizz: false,
        difficulty: difficulty,
        language: language,
      },
      order: [Sequelize.literal("RAND()")],
    });
    console.log(language, difficulty, themesRandomized[i]);
    t.push(r.dataValues);
  }

  return t;
}

function createQuizz(trivias, language) {
  var trivias_ids = [];
  for (var i = 0; i < trivias.length; i++) {
    trivias_ids.push(trivias[i].id_trivia);
  }
  Quizz.update(
    {
      is_active: false,
    },
    {
      where: { is_active: true },
    }
  )
    .then((_) => {
      Quizz.create({
        is_active: true,
        language: language,
        id_trivia_1: trivias_ids[0],
        id_trivia_2: trivias_ids[1],
        id_trivia_3: trivias_ids[2],
        id_trivia_4: trivias_ids[3],
        id_trivia_5: trivias_ids[4],
        id_trivia_6: trivias_ids[5],
        id_trivia_7: trivias_ids[6],
      });
    })
    .then((_) => {
      setTriviasToInQuizz(trivias);
    });
}

function setTriviasToInQuizz(trivias) {
  for (var i = 0; i < trivias.length; i++) {
    trivias[i].used_in_quizz = true;
    Trivia.update(trivias[i], {
      where: { id_trivia: trivias[i].id_trivia },
    });
  }
}
