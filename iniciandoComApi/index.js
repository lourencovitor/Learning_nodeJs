const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const JWTSecret = "8b1ec4e10903a55df60359e5d0c55bf6d1c7774e";

app.use("/favicon.ico", express.static("images/favicon.ico")); // Adicionando favicon

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function auth(req, res, next) {
  const authToken = req.headers["authorization"];
  if (authToken !== undefined) {
    const bearer = authToken.split(" ");
    const token = bearer[1];
    jwt.verify(token, JWTSecret, (err, data) => {
      if (err) {
        res.status(401);
        res.json({ err: "Token inválido" });
      } else {
        req.token = token;
        req.loggedUser = { id: data.id, email: data.email };
        next();
      }
    });
  } else {
    res.status(401);
    res.json({ err: "token inválido" });
  }
}

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
      year: 2016,
      price: 50,
    },
  ],
  users: [
    {
      id: 1,
      name: "Vitor",
      email: "vitor@teste.com",
      password: "teste123",
    },
    {
      id: 2,
      name: "Raquel",
      email: "raquel@teste.com",
      password: "teste123",
    },
  ],
};

app.get("/games", auth, (req, res) => {
  let HATEOAS = [
    {
      href: "http://localhost:3333/game/:id",
      method: "DELETE",
      rel: "delete_game",
    },
    {
      href: "http://localhost:3333/game/:id",
      method: "GET",
      rel: "get_game",
    },
    {
      href: "http://localhost:3333/auth",
      method: "POST",
      rel: "login",
    },
  ];

  res.statusCode = 200;
  res.json({ games: DB.games, _links: HATEOAS });
});

app.get("/game/:id", auth, (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) {
    res.sendStatus(400);
  } else {
    let HATEOAS = [
      {
        href: `http://localhost:3333/game/${id}`,
        method: "DELETE",
        rel: "delete_game",
      },
      {
        href: `http://localhost:3333/game/${id}`,
        method: "GET",
        rel: "get_game",
      },
      {
        href: "http://localhost:3333/auth",
        method: "POST",
        rel: "login",
      },
    ];
    let game = DB.games.find((game) => game.id === parseInt(id));
    if (game !== undefined) {
      res.json({ game, _links: HATEOAS });
    } else {
      res.sendStatus(404);
    }
  }
});

app.post("/game", auth, (req, res) => {
  const { title, price, year } = req.body;
  DB.games.push({ id: Math.floor(Math.random() * 65536), title, price, year });
  res.sendStatus(200);
});

app.delete("/game/:id", auth, (req, res) => {
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

app.put("/game/:id", auth, (req, res) => {
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

app.post("/auth", (req, res) => {
  const { email, password } = req.body;
  if (email !== undefined) {
    let user = DB.users.find((user) => user.email === email);
    if (user !== undefined) {
      if (user.password === password) {
        jwt.sign(
          { id: user.id, email: user.email },
          JWTSecret,
          {
            expiresIn: "48h",
          },
          (err, token) => {
            if (err) {
              res.status(400);
              res.json({ err: "Falha interna" });
            } else {
              res.status(200);
              res.json({ token });
            }
          }
        ); // chamado de payload
      } else {
        res.status(401);
        res.json({ err: "Credenciais inválidas" });
      }
    } else {
      res.status(404);
      res.json({ err: "O e-mail não existe na base de dados" });
    }
  } else {
    res.status(400);
    res.json({ err: "E-mail enviado é inválido" });
  }
});

app.listen(3333, () => {
  console.log("Api rodando");
});
