const express = require("express"); // Importando express

const app = express(); // iniciando express

app.get("/", (req, res) => {
  // Req = > dados enviados pelo usuario
  // Res = > resposta que vai ser enviada ao usuario
  res.send("Bem vindo");
  //   res.send("Outra resposta"); // Não vai funcionar
});

app.get("/blog", (req, res) => {
  res.send("Bem vindo Programador Junior");
});

app.get("/canal/youtube", (req, res) => {
  res.send("Bem vindo ao meu canal!");
});

// trabalhando com params obrigatorio
app.get("/ola/:nome", (req, res) => {
  let nome = req.params.nome;
  res.send(`<h1> Olá ${nome} </h1>`);
});

// trabalhando com params não obrigatorio
app.get("/artigo/:nome?", (req, res) => {
  let nome = req.params.nome;
  if (nome) {
    res.send(canal);
  } else {
    res.send(`<h2>Bem vindo ao meu blog </h2>`);
  }
});

app.get("/youtube", (req, res) => {
  let canal = req.query["canal"];
  if (canal) {
    res.send(`O canal passado foi ${canal}`);
  } else {
    res.send("Nenhum canal fornecido!");
  }
});

app.listen(3333, (error) => {
  if (error) {
    console.log("Ocorreu um erro!");
  } else {
    console.log("Servidor iniciado com sucesso");
  }
});
