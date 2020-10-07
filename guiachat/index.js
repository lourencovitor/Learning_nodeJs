const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  socket.emit("userConnection", socket.id);

  socket.on("disconnect", () => {
    console.log(`X desconnectou: ${socket.id}`);
  });

  socket.on("msg", (data) => {
    console.log(data);
    // socket.broadcast.emit()
    io.emit("showmsg", data);
  });
});

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

http.listen(3000, () => {
  console.log("Server running");
});
