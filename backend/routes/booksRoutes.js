var express = require('express');
var router = express.Router();
var booksController = require('../controllers/booksController');

// GET Books page
router.get('/', booksController.all_books);

// GET a book by ID
router.get('/book_details/:id', booksController.book_details);

// GET books by searching book's title
router.get('/book_search_title/:search_title', booksController.search_book_title);


module.exports = router;
