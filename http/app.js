let http = require("http");

http
  .createServer((req, res) => {
    res.end("<h1>Bem vindo ao meu site</h1></br><h4>Feito por Vitor</h4>");
  })
  .listen(3333);
console.log("Meu servidor está rodando!");
