const Book = require('../models/book');

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
    let bookName = req.body.bookName;
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

exports.getBook = function (req, res) {
    Book.getPage({},{},{
        limit: 2,
        skip: 2
    },function (err, books) {
        console.log(err,books);
        if(err){
            console.log(err);
        }
        res.json(books);
    });
};