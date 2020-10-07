const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    console.log(`X desconnectou: ${socket.id}`);
  });

  socket.on("boasvindas", (data) => {
    console.log("Executando eventos de boas vindas");
    console.log(data);
  });

  socket.on("palavra", (data) => {
    console.log(data);
    socket.emit("resultado", data + " - Guia do Programador");
  });
});

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

http.listen(3000, () => {
  console.log("Server running");
});
