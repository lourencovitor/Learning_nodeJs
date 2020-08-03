const express = require("express");
const app = express();
const router = express.Router();
const HomeController = require("../controllers/HomeController");
const UserController = require("../controllers/UserController");

router.get("/", HomeController.index);
router.post("/user", UserController.store);
router.get("/users", UserController.index);
router.get("/user/:id", UserController.show);
router.put("/user/:id", UserController.update);

module.exports = router;
