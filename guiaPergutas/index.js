const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

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
app.get("/", async (req, res) => {
  // Select * all from perguntas
  const perguntas = await Pergunta.findAll({
    raw: true,
    order: [["id", "desc"]], // crescente = ASC || DESC = Descrescente
  });
  res.render("index", {
    perguntas,
  });
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
  const { titulo, descricao } = req.body;
  Pergunta.create({
    titulo,
    descricao,
  }).then(() => {
    res.redirect("/");
  });
});

app.get("/pergunta/:id", async (req, res) => {
  let { id } = req.params;
  const pergunta = await Pergunta.findOne({
    where: { id },
  });
  if (pergunta !== undefined) {
    const respostas = await Resposta.findAll({
      where: { pergunta_id: id },
      order: [["id", "desc"]],
    });
    res.render("pergunta", {
      pergunta,
      respostas,
    });
  } else {
    res.redirect("/");
  }
});

app.post("/responder", (req, res) => {
  let { corpo, pergunta_id } = req.body;
  Resposta.create({
    corpo,
    pergunta_id,
  }).then(() => {
    res.redirect(`/pergunta/${pergunta_id}`);
  });
});

app.listen(3333, () => {
  console.log("Servidor rodando!");
});
