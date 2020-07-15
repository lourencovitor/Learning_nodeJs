const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");

// Database
connection
  .authenticate()
  .then(() => {
    console.log("conexão feita com o banco de dados");
  })
  .catch((msgErro) => {
    console.log(msgErro);
  });

// Estou dizendo para o express usar o EJS como view engine
app.set("view engine", "ejs");
app.use(express.static("public"));

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// rotas
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
  const { titulo, descricao } = req.body;
  res.send(`Titulo = ${titulo} , Descrição = ${descricao}`);
});

app.listen(3333, () => {
  console.log("Servidor rodando!");
});
