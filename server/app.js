const express = require("express");
const helper = require("./server/src/helper/helper.js");
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");
const sequelize = require("./server/src/db/sequelize");

const app = express();
const port = process.env.PORT || 3000;
app.use(favicon(__dirname + "/favicon.ico")).use(bodyParser.json());

sequelize.initDb();

app.get("/", (req, res) => {
  res.json("Hello, Heroku !");
});
//error code

//route below
require("./src/routes/findAllPokemons")(app);
require("./src/routes/findPokemonByPk")(app);
require("./src/routes/createPokemon")(app);
require("./src/routes/updatePokemon")(app);
require("./src/routes/deletePokemon")(app);

// routes 404.
app.use(({ res }) => {
  const message =
    "Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.";
  res.status(404).json({ message });
});

app.listen(port, () => console.log("App started"));
