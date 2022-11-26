const { Quizz, Trivia } = require("../db/sequelize");
const { shuffle } = require("../helper/helper.js");
module.exports = (app) => {
  app.get("/api/quizz/active", (req, res) => {
    if (
      !req.query.language ||
      (req.query.language &&
        (req.query.language < "1" || req.query.language > "2"))
    ) {
      res.json({
        error: "bad request",
      });
    }
    Quizz.findOne({
      where: {
        is_active: true,
        language: req.query.language,
      },
      order: [["created", "DESC"]],
    }).then((quizz) => {
      if (quizz === null) {
        const message = "Quizz not found";
        res.status(404).json({ message });
      }
      Trivia.findAll({
        where: {
          id_trivia: [
            quizz.id_trivia_1,
            quizz.id_trivia_2,
            quizz.id_trivia_3,
            quizz.id_trivia_4,
            quizz.id_trivia_5,
            quizz.id_trivia_6,
            quizz.id_trivia_7,
          ],
        },
      }).then((trivias) => {
        if (trivias === null) {
          const message = "Trivias not found";
          res.status(404).json({ message });
        }
        const message = "Trivias Found";
        objectTriviaReturn = [];
        trivias.forEach((object) => {
          var reponses = [
            object.dataValues["reponse1"],
            object.dataValues["reponse2"],
            object.dataValues["reponse3"],
            object.dataValues["reponse4"],
          ];
          objectTriviaReturn.push({
            id_trivia: object.dataValues["id_trivia"],
            theme: object.dataValues["themes"],
            question: object.dataValues["question"],
            reponses: shuffle(reponses),
          });
        });
        res.set({
          "Access-Control-Allow-Origin": "http://127.0.0.1:5173",
          "Access-Control-Allow-Methods":
            "GET, POST, OPTIONS, PUT, PATCH, DELETE",
          "Access-Control-Allow-Headers": "X-Requested-With,content-type",
          "Access-Control-Allow-Credentials": true,
        });
        res.json({ message, data: objectTriviaReturn });
      });
    });
  });
};
