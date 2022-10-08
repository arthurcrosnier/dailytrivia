const express = require("express");
const helper = require("./src/helper/helper.js");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");
const sequelize = require("./src/db/sequelize");

const app = express();
const port = 3000;
app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(morgan("dev"))
  .use(bodyParser.json());

sequelize.initDb();

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
