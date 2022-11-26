const { Quizz, Trivia } = require("../db/sequelize");

module.exports = (app) => {
  app.get("/api/quizz/goodresponse", (req, res) => {
    if (!req.query.id_trivia || !req.query.response) {
      const message = "Question not found";
      res.status(404).json({ message });
    }
    Trivia.findOne({
      where: {
        id_trivia: req.query.id_trivia,
        reponse1: req.query.response,
      },
    }).then((trivia) => {
      const responseFound = trivia === null ? false : true;
      res.set({
        "Access-Control-Allow-Origin": "http://127.0.0.1:5173",
        "Access-Control-Allow-Methods":
          "GET, POST, OPTIONS, PUT, PATCH, DELETE",
        "Access-Control-Allow-Headers": "X-Requested-With,content-type",
        "Access-Control-Allow-Credentials": true,
      });
      res.json({ is_good_response: responseFound });
    });
  });
};
