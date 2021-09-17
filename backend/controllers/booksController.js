const { NotExtended } = require("http-errors");
var Books = require("../models/booksModel");

// Get all available books
exports.all_books = function (req, res, next) {
  Books.find({}, function (err, results) {
    if (err) {
      return next(err);
    }
    res.json(results);
  });
};

// Get a book by ID
exports.book_details = function (req, res, next) {
  Books.findById(req.params.id, function (err, result) {
    if (err) {
      return next(err);
    }
    res.json(result);
  });
};

// Search book by title
exports.search_book_title = function (req, res, next) {
  reg_pattern = `.*${req.params.search_title}.*`;
  Books.find({
    title: new RegExp(reg_pattern, "i"),
  }).exec(function (err, results) {
    if (err) {
      return next(err);
    }
    res.json(results);
  });
};

// Add a book to database
exports.add_book = function (req, res, next) {
  const new_book = new Books({
    title: req.body.title,
    author: req.body.author,
    price: parseFloat(req.body.price),
    image_src: req.body.image_src,
    isbn_13: req.body.isbn_13,
    publisher: req.body.publisher,
    publish_date: req.body.publish_date,
    pages: parseInt(req.body.pages),
  });
  Books.create(new_book, function (err) {
    if (err) {
      return next(err);
    }
  });
};

// Find a book by ID and modify its information
exports.modify_book = function (req, res, next) {
  const new_book = new Books({
    title: req.body.title,
    author: req.body.author,
    price: parseFloat(req.body.price),
    image_src: req.body.image_src,
    isbn_13: req.body.isbn_13,
    publisher: req.body.publisher,
    publish_date: req.body.publish_date,
    pages: parseInt(req.body.pages),
  });
  Books.findByIdAndUpdate(req.params.id, new_book, {}, function (err) {
    if (err) {
      return next(err);
    }
  });
};

// Find a book by ID and delete it from database
exports.delete_book = function (req, res, next) {
  Books.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      return next(err);
    }
  });
};
