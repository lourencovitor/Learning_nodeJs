const express = require("express");
const router = express.Router();
const HomeController = require("../controllers/HomeController");
const UserController = require("../controllers/UserController");
const AdminAuth = require("../middleware/AdminAuth");

router.get("/", HomeController.index);
router.post("/user", UserController.store);
router.get("/users", AdminAuth, UserController.index);
router.get("/user/:id", UserController.show);
router.put("/user/:id", UserController.update);
router.delete("/user/:id", UserController.destroy);

router.post("/recoverpassword", UserController.recoverPassword);
router.post("/changepassword", UserController.changePassword);

router.post("/login", UserController.login);

module.exports = router;
