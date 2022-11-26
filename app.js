const express = require("express");
const helper = require("./src/helper/helper.js");
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");
const sequelize = require("./src/db/sequelize");

const app = express();
const port = process.env.PORT || 3000;
app.use(favicon(__dirname + "/favicon.ico")); // use(bodyParser.json()

//sequelize.initDb();

app.get("/", (req, res) => {
  res.json("Hello, Trivia !");
});

//route below
require("./src/routes/opendbapi")(app);
require("./src/routes/createQuizz")(app);
require("./src/routes/findActiveQuizz")(app);
require("./src/routes/findIsGoodResponse")(app);
require("./src/routes/openquizzdbapi")(app);
require("./src/routes/openquizzdbapilistids")(app);
// routes 404.
app.use(({ res }) => {
  const message = "Route not found.";
  res.status(404).json({ message });
});

app.listen(port, () => console.log("App started"));
