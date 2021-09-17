var mongoose = require("mongoose");

var BooksSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: Number, required: true },
  image_src: { type: String, required: true },
  book_detail_src: { type: String, required: false },
  isbn_13: { type: String, required: true },
  publisher: { type: String, required: true },
  publish_date: { type: String, required: true },
  pages: { type: Number, required: true },
});

module.exports = mongoose.model("book", BooksSchema);
