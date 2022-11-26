const http = require("https");
const { Trivia } = require("../db/sequelize");
const { decode } = require("html-entities");
const axios = require("axios");
const cheerio = require("cheerio");

var options = {
  method: "GET",
  url: "https://www.openquizzdb.org/random.php",
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
  app.get("/api/openquizzdbapi/find/list/ids", async (req, res) => {
    const fs = require("fs");
    var text = fs.readFileSync("ids.txt", "utf8");
    let obj = JSON.parse(text);
    axios
      .request(options)
      .then(function (response) {
        const $ = cheerio.load(response.data);
        $(".myid").each((_, e) => {
          if (!obj.ids.includes($(e).text())) {
            obj.ids.push($(e).text());
          }
        });
        saveInFile(obj);
        res.set({
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods":
            "GET, POST, OPTIONS, PUT, PATCH, DELETE",
          "Access-Control-Allow-Headers": "X-Requested-With,content-type",
          "Access-Control-Allow-Credentials": true,
        });
        res.json({ nbr: obj.ids.length, ...obj });
      })
      .catch(function (error) {
        console.error(error);
      });
  });
};

async function writeInTxt(results) {}
