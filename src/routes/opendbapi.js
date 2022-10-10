const http = require("https");

const listCategory = {
  entertainment: [11, 12, 13, 14, 15, 16, 35], //11, 12, 13, 14, 15, 16, 32
  science: [17, 18, 19],
  sport: [21],
  history: [23, 24],
  geography: [22],
  art: [25, 20, 10],
  other: [9, 27, 30],
};

function getRandomCategory() {
  const keys = Object.keys(listCategory);
  const propriete = keys[Math.floor(Math.random() * keys.length)];
  const random = Math.floor(Math.random() * listCategory[propriete].length);
  console.log(propriete);
  console.log(listCategory[propriete][random]);
  return listCategory[propriete][random];
}

let options = (randomCategory) => {
  return {
    method: "GET",
    hostname: "opentdb.com",
    port: null,
    path:
      "/api.php?amount=1&category=" +
      randomCategory +
      "&type=multiple&encode=base64",
    headers: {
      cookie: "PHPSESSID=9908c56b2d458e4e03a42a6f8cd2d16b",
      "Content-Length": "0",
    },
  };
};

module.exports = (app) => {
  app.get("/api/opendb/find", async (req, res) => {
    const req2 = http.request(options(getRandomCategory()), function (res2) {
      const chunks = [];

      res2.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res2.on("end", function () {
        const body = Buffer.concat(chunks);
        const bodyJson = JSON.parse(body.toString());
        //console.log(bodyJson);
        res.json(bodyJson);
      });
    });
    req2.end();
  });
};
