var User = require('../app/controls/user');
module.exports = function (app) {
    //login page
    app.get('/login', function (req ,res) {
        res.render('login',{
        });
    });

    //index page
    app.get('/index', function (req, res) {
        res.render('index',{
        });
    });

    //product page
    app.get('/product',function (req, res) {
        res.render('product',{
        });
    });
    //signup
    app.post('/user/signup', User.signup);

    //login
    app.post('/user/login', User.login);

    //logout
    app.get('/logout', User.logout);
};
