const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const DB = {
  games: [
    {
      id: 1,
      title: "Call of duty",
      year: 2019,
      price: 120,
    },
    {
      id: 2,
      title: "Pes 2021",
      year: 2020,
      price: 150,
    },
    {
      id: 3,
      title: "Cs Go",
      year: 2015,
      price: 50,
    },
  ],
};

app.get("/games", (req, res) => {
  res.statusCode = 200;
  res.json(DB.games);
});

app.get("/game/:id", (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) {
    res.sendStatus(400);
  } else {
    let game = DB.games.find((game) => game.id === parseInt(id));
    if (game !== undefined) {
      res.json(game);
    } else {
      res.sendStatus(404);
    }
  }
});

app.post("/game", (req, res) => {
  const { title, price, year } = req.body;
  DB.games.push({ id: Math.floor(Math.random() * 65536), title, price, year });
  res.sendStatus(200);
});

app.delete("/game/:id", (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) {
    res.sendStatus(400);
  } else {
    let index = DB.games.findIndex((game) => game.id === parseInt(id));
    if (index === -1) {
      res.sendStatus(404);
    } else {
      DB.games.splice(index, 1);
      res.sendStatus(200);
    }
  }
});

app.put("/game/:id", (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) {
    res.sendStatus(400);
  } else {
    let game = DB.games.find((game) => game.id === parseInt(id));
    if (game !== undefined) {
      let { title, price, year } = req.body;
      if (title !== undefined) {
        game.title = title;
      }
      if (price !== undefined) {
        game.price = price;
      }
      if (year !== undefined) {
        game.year = year;
      }
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  }
});

app.listen(3333, () => {
  console.log("Api rodando");
});
