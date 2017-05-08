let mongoose = require('mongoose');
let bookSchema = require('../schemas/book');
let Book= mongoose.model('Book',bookSchema);

module.exports = Book;