var mongoose = require("mongoose");
var Users = require("../models/usersModel");

const Book = mongoose.Schema({
  bookID: { type: String },
  title: { type: String },
  price: { type: Number },
  orderQuantity: { type: Number },
});

var OrdersSchema = mongoose.Schema(
  {
    userID: { type: mongoose.ObjectId, ref: "user" },
    orderBooks: { type: [Book] },
    totalMoney: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", OrdersSchema);
