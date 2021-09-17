var Orders = require("../models/ordersModel");
var Users = require("../models/usersModel");
var passport = require("passport");

exports.createOrder = function (req, res, next) {
  const userID = req.body.id;
  const orderBooks = req.body.orderBooks;
  const totalMoney = req.body.totalMoney;

  const newOrder = new Orders({
    userID,
    orderBooks,
    totalMoney,
  });

  Orders.create(newOrder, (err, order) => {
    if (err) {
      next(err);
    }
    res.json({ orderStatus: "success" });
  });
};

exports.createOrder2 = passport.authenticate(
  "jwt",
  { session: false },
  function (req, res, next) {
    if (req.isAuthenticated()) {
      // Send the route data
      res.status(200).send("Web page data");
    } else {
      // Not authorized
      res.status(401).send("You are not authorized to view this ");
    }
  }
);

exports.showAllOrders = function (req, res, next) {
  // Orders.find({}, (err, orders) => {
  //   if (err) {
  //     next(err);
  //   }
  //   Orders.populate(orders, {path: "userID", select: "name"});
  //   res.json(orders);
  // });

  Orders.find({}).populate("userID").exec((err, orders) => {
    if (err) {
      next(err);
    }
    res.json(orders);
  });
};
