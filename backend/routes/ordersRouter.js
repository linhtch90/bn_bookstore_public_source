var express = require("express");
var passport = require("passport");
var jwt = require("jsonwebtoken");
var router = express.Router();
var ordersController = require("../controllers/ordersController");

const userSecret = process.env.USER_SECRET_KEY;

function authorizationToken(req, res, next) {
  const authorizationHeader = req.headers["authorization"];
  const postedToken = authorizationHeader.split(" ")[1];
  if (!postedToken) {
    res.status(401);
  }
  jwt.verify(postedToken, userSecret, (err, data) => {
    if (err) {
      next(err);
    } else {
      next();
    }    
  });
}

router.post("/", authorizationToken, ordersController.createOrder);

module.exports = router;
