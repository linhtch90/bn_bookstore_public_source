var express = require("express");
var passport = require("passport");
var jwt = require("jsonwebtoken");
var router = express.Router();
var ordersController = require("../controllers/ordersController");
var adminsController = require("../controllers/adminsController");

const adminSecret = process.env.ADMIN_SECRET_KEY;

function authorizationAdminToken(req, res, next) {
  const authorizationHeader = req.headers["authorization"];
  const postedToken = authorizationHeader.split(" ")[1];
  if (!postedToken) {
    res.status(401);
  }
  jwt.verify(postedToken, adminSecret, (err, data) => {
    if (err) {
      next(err);
    } else {
      next();
    }
  });
}

router.get("/orders", authorizationAdminToken, ordersController.showAllOrders);

router.post("/signup", adminsController.createAdmin);

router.post("/signin", adminsController.validateAdmin);

module.exports = router;
