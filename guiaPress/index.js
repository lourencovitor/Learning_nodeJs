const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/connection");
const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/articlesController");
const Article = require("./articles/Article");
const Category = require("./categories/Category");

// View engine
app.set("view engine", "ejs");

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

app.get("/", (req, res) => {
  Article.findAll({
    order: [["id", "DESC"]],
  }).then((articles) => {
    Category.findAll().then((categories) => {
      res.render("index", { articles, categories });
    });
  });
});

app.get("/:slug", (req, res) => {
  let { slug } = req.params;
  Article.findOne({
    where: {
      slug,
    },
  })
    .then((article) => {
      if (article !== undefined) {
        Category.findAll().then((categories) => {
          res.render("article", { article, categories });
        });
      } else {
        res.redirect("/");
      }
    })
    .catch((error) => {
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
