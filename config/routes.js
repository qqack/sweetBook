let  User = require('../app/controllers/user');
let Book = require('../app/controllers/book');
let _ = require('underscore');
module.exports = function (app) {
    //login page
    app.get('/login', function (req, res) {
        res.render('login', {});
    });

    //index page
    app.get('/index', function (req, res) {
        res.render('index', {});
    });

    //product page
    app.get('/product', function (req, res) {
        res.render('product', {});
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
};
