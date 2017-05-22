const Book = require('../models/book');
const config = require('../../config/config.js');

exports.newBook = function (req,res) {
    res.render('admin',{
        book: {
            bookName:'',
            author:'',
            publish:'',
            old_price:'',
            new_price:'',
            publish_time:'',
            language:'',
            book_photo:'',
            book_tag:'',
            book_desc:'',
            author_desc:''
        }
    })
};

exports.newBookPost = function (req,res) {
    let bookObj = req.body.book;
    let _book;
    _book = new Book({
        bookName:bookObj.bookName,
        author:bookObj.author,
        publish:bookObj.publish,
        old_price:bookObj.old_price,
        new_price:bookObj.new_price,
        publish_time:bookObj.publish_time,
        language:bookObj.language,
        book_photo:bookObj.book_photo,
        book_tag:bookObj.book_tag,
        book_desc:bookObj.book_desc,
        author_desc:bookObj.author_desc
    });
    _book.save(function (err, book) {
        if(err){
            console.log(err);
        }
        res.redirect('/adminRes');
    });
};

exports.searchBook = function (req,res) {
    let {bookId, bookName} = req.body;
    let option = {};
    if (bookId) {
        option['_id'] = bookId;
    }
    if (bookName) {
        option['bookName'] = bookName;
    }
    console.log(option);
    Book.getPage({"$or":[option,{author:bookName}]}, function (err, books) {
            res.json(books);
    });
};

exports.getBook = function (req, res) {
    let pageSize = config.pageSize;
    console.log(req.body.page);
    let page = parseInt(req.body.page) || 1;
    if (page <= 0) {
        page = 1;
    }
    let skip = (page - 1) * pageSize;
    Book.getPage({},{
        "author": 0,
        "publish":0,
        "publish_time":0,
        "language":0,
        "book_tag":0,
        "book_desc":0,
        "author_desc":0,
        "meta":0,
        "__v":0
    },{
        limit: pageSize,
        skip:  skip
    },function (err, books) {
        if(err){
            console.log(err);
        }
        res.json(books);
    });
};

exports.getOneBook = function (req, res) {
    let id = req.body.bookName;
    console.log(req.body);
    Book.findOne({bookName:bookName},function (err, book) {
        if(err){
            console.log(err);
        }
        else{
            res.json(book);
        }
    });
};