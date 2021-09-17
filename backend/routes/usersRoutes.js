var express = require("express");
var router = express.Router();
var usersController = require("../controllers/usersController");

router.post("/signup", usersController.createUser);

router.post("/signin", usersController.validateUser);

module.exports = router;