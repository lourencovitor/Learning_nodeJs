const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const connection = require("./database/connection");

const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/articlesController");
const usersController = require("./users/UserController");

const Article = require("./articles/Article");
const Category = require("./categories/Category");
const User = require("./users/User");

// View engine
app.set("view engine", "ejs");

// Sessions
// utitlizar o Redis em uma aplicação de media a grande scala

app.use(
  session({
    secret: "3e8ce46a215963084ca419a881580515",
    cookie: { maxAge: 30000000 },
  })
);

// Static
app.use(express.static("public"));

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connection
connection
  .authenticate()
  .then(() => {
    console.log("Conexão feita com sucesso");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/", categoriesController);
app.use("/", articlesController);
app.use("/", usersController);

// app.get("/session", (req, res) => {
//   req.session.user = {
//     username: "Vitor Silva",
//     email: "vitor@teste.com",
//     id: 1,
//   };
//   res.send("Sessão gerada");
// });
// app.get("/leitura", (req, res) => {
//   res.json({
//     user: req.session.user,
//   });
// });

app.get("/", (req, res) => {
  Article.findAll({
    order: [["id", "DESC"]],
    limit: 4,
  }).then((articles) => {
    Category.findAll().then((categories) => {
      res.render("index", { articles, categories });
    });
  });
});

app.get("/:slug", (req, res) => {
  let { slug } = req.params;
  console.log("SLUG", slug);
  Article.findOne({
    where: {
      slug,
    },
  })
    .then((article) => {
      if (article != undefined) {
        Category.findAll().then((categories) => {
          res.render("article", { article, categories });
        });
      } else {
        res.redirect("/");
      }
    })
    .catch((err) => {
      res.redirect("/");
    });
});

app.get("/category/:slug", (req, res) => {
  let { slug } = req.params;
  Category.findOne({
    where: {
      slug,
    },
    include: [{ model: Article }],
  })
    .then((category) => {
      if (category !== undefined) {
        Category.findAll().then((categories) => {
          res.render("index", { articles: category.articles, categories });
        });
      } else {
        res.redirect("/");
      }
    })
    .catch((error) => {
      res.redirect("/");
    });
});

app.listen(3333, () => {
  console.log("Servidor está rodando");
});
