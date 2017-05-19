const  User = require('../app/controllers/user');
const Book = require('../app/controllers/book');
const _ = require('underscore');
module.exports = function (app) {
    //login page
    app.get('/login', function (req, res) {
        res.render('login', {});
    });

    //index page
    app.get('/index', function (req, res) {
            res.render('index', {
            });
    });

    //book page
    app.get('/book', function (req, res) {
        res.render('book', {
        });
    });
    //signup
    app.post('/user/signup', User.signup);

    //login
    app.post('/user/login', User.login);

    //logout
    app.get('/logout', User.logout);

    app.get('/admin/book', Book.newBook);

    app.post('/admin/book/new', Book.newBookPost);

    app.post('/searchBook',Book.searchBook);

    app.get('/shoppingCart',function (req, res) {
        res.render('shoppingCart', {});
    });

    app.get('/checkoutB',function (req, res) {
        res.render('checkoutB', {});
    });

    app.get('/payResult',function (req, res) {
        res.render('payResult', {});
    });

    app.get('/adminRes',function (req, res) {
        res.render('adminRes',{});
    });

    app.post('/getBook',Book.getBook);

    app.post('/addCart', User.addCart);

    app.post('/addWish', User.addWish);

    app.get('/allCart', User.getCart);
};
