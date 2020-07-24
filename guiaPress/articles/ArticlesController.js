const express = require("express");
const router = express.Router();
const Category = require("../categories/Category");
const Article = require("./Article");
const slugify = require("slugify");
const adminAuth = require("../middlewares/adminAuth");

router.get("/admin/articles", adminAuth, (req, res) => {
  Article.findAll({
    include: [{ model: Category }],
  }).then((articles) => {
    res.render("admin/articles/index", { articles });
  });
});

router.get("/admin/articles/new", adminAuth, (req, res) => {
  Category.findAll().then((categories) => {
    res.render("admin/articles/new", { categories });
  });
});

router.post("/articles/save", adminAuth, (req, res) => {
  const { title, body, category } = req.body;

  Article.create({
    title,
    body,
    slug: slugify(title),
    categoryId: category,
  }).then(() => {
    res.redirect("/admin/articles");
  });
});

router.post("/articles/delete", adminAuth, (req, res) => {
  let { id } = req.body;
  if (id != undefined) {
    if (!isNaN(id)) {
      Article.destroy({
        where: {
          id,
        },
      }).then(() => {
        res.redirect("/admin/articles");
      });
    } else {
      // NÃO FOR UM NÚMERO
      res.redirect("/admin/articles");
    }
  } else {
    // NULL
    res.redirect("/admin/articles");
  }
});

router.get("/admin/articles/edit/:id", adminAuth, (req, res) => {
  let { id } = req.params;
  Article.findByPk(id)
    .then((article) => {
      if (article != undefined) {
        Category.findAll().then((categories) => {
          res.render("admin/articles/edit", {
            categories,
            article,
          });
        });
      } else {
        res.redirect("/");
      }
    })
    .catch((err) => {
      res.redirect("/");
    });
});

router.post("/articles/update", adminAuth, (req, res) => {
  const { title, body, category, id } = req.body;
  Article.update(
    { title, body, categoryId: category, slug: slugify(title) },
    {
      where: {
        id,
      },
    }
  )
    .then(() => {
      res.redirect("/admin/articles");
    })
    .catch((err) => {
      res.redirect("/");
    });
});

router.get("/articles/page/:num", (req, res) => {
  const page = req.params.num;
  let offset = 0;
  if (isNaN(page) || page == 1) {
    offset = 0;
  } else {
    offset = (parseInt(page) - 1) * 4;
  }
  Article.findAndCountAll({
    limit: 4,
    offset,
    order: [["id", "DESC"]],
  }).then((articles) => {
    let next;
    if (offset + 4 > articles.count) {
      next = false;
    } else {
      next = true;
    }
    let result = {
      page: parseInt(page),
      next,
      articles,
    };
    Category.findAll().then((categories) => {
      res.render("admin/articles/page", { result, categories });
    });
  });
});

module.exports = router;
