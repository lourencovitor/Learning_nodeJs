const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("express-flash");
const coolieParser = require("cookie-parser");

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(coolieParser("8b1ec4e10903a55df60359e5d0c55bf6d1c7774e"));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);

app.use(flash());

app.get("/", (req, res) => {
  let emailError = req.flash("emailError");
  let nomeError = req.flash("nomeError");
  let pontosError = req.flash("pontosError");
  let email = req.flash("email");
  let nome = req.flash("nome");
  let pontos = req.flash("pontos");

  emailError =
    emailError === undefined || emailError.length === 0
      ? undefined
      : emailError;
  nomeError =
    nomeError === undefined || nomeError.length === 0 ? undefined : nomeError;
  pontosError =
    pontosError === undefined || pontosError.length === 0
      ? undefined
      : pontosError;

  email = email === undefined || email.length === 0 ? undefined : email;
  nome = nome === undefined || nome.length === 0 ? undefined : nome;
  pontos = pontos === undefined || pontos.length === 0 ? undefined : pontos;

  res.render("index", {
    emailError,
    nomeError,
    pontosError,
    email,
    nome,
    pontos,
  });
});

app.post("/form", (req, res) => {
  const { email, nome, pontos } = req.body;
  let emailError;
  let nomeError;
  let pontosError;
  if (email === undefined || email === "") {
    emailError = "O e-mail não pode ser vazio";
  }
  if (pontos === undefined || pontos < 20) {
    pontosError = "Você não pode ter menos de 20 pontos";
  }
  if (nome === undefined || nome === "") {
    nomeError = "O nome não pode ser vazio";
  }
  if (
    emailError !== undefined ||
    pontosError !== undefined ||
    nomeError !== undefined
  ) {
    req.flash("emailError", emailError);
    req.flash("nomeError", nomeError);
    req.flash("pontosError", pontosError);
    req.flash("email", email);
    req.flash("nome", nome);
    req.flash("pontos", pontos);
    res.redirect("/");
  } else {
    res.send("Show de bola esse form!");
  }
});

app.listen(3333, (req, res) => {
  console.log("Servidor rodando!");
});
